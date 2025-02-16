import { create } from 'zustand';
import { ImageFile } from '../types';
import { useAuthStore } from '../../../store/useAuthStore';
import { supabase } from '../../../lib/supabase';
import { useToastStore } from '../shared/useToast';

// Create a simple event emitter for image processing completion
type Listener = () => void;
type CompletionListener = (imageId: string) => void;
const listeners = new Set<Listener>();
const completionListeners = new Set<CompletionListener>();
const completedImages = new Set<string>();
const deletingImages = new Set<string>();
let lastDeletionTime = Date.now();

const notifyImageProcessed = (imageId: string) => {
  // Only notify if we haven't already notified for this image
  if (!completedImages.has(imageId)) {
    console.log('Notifying listeners of image completion:', imageId);
    completedImages.add(imageId);
    
    listeners.forEach(listener => {
      console.log('Calling general listener');
      listener();
    });
    completionListeners.forEach(listener => {
      console.log('Calling completion listener with imageId:', imageId);
      listener(imageId);
    });
  }
};

interface ImageStore {
  images: ImageFile[];
  activeTab: 'uploaded' | 'processed';
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  updateImageStatus: (id: string, status: 'pending' | 'processing' | 'completed' | 'error', processedUrl?: string, error?: string) => void;
  processImages: () => Promise<void>;
  loadImages: () => Promise<void>;
  setActiveTab: (tab: 'uploaded' | 'processed') => void;
  processingCount: number;
  totalCount: number;
  onImageProcessed: (listener: Listener) => () => void;
  onImageComplete: (listener: CompletionListener) => () => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  activeTab: 'uploaded',
  processingCount: 0,
  totalCount: 0,

  onImageProcessed: (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  onImageComplete: (listener: CompletionListener) => {
    console.log('Adding completion listener');
    completionListeners.add(listener);
    return () => {
      console.log('Removing completion listener');
      completionListeners.delete(listener);
    };
  },
  
  loadImages: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const { data: images, error } = await supabase
        .from('processed_images')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      if (images) {
        console.log('Loading images from database:', images);
        const loadedImages: ImageFile[] = images.map(img => ({
          id: img.id,
          file: new File([], 'placeholder'),
          preview: img.original_url,
          processedUrl: img.processed_url,
          status: 'completed' as const,
        }));

        // Always set the full state, don't try to merge with existing
        set({
          images: loadedImages,
          processingCount: 0,
          totalCount: loadedImages.length
        });
      } else {
        set({
          images: [],
          processingCount: 0,
          totalCount: 0
        });
      }
    } catch (error) {
      console.error('Error loading images:', error);
      useToastStore.getState().addToast({
        title: 'Error',
        description: 'Failed to load images',
        duration: 5000,
        type: 'error'
      });
    }
  },

  addImages: (files) => {
    console.log('Adding images to store:', files);
    const newImages = Array.from(files).map((file) => {
      const objectUrl = URL.createObjectURL(file);
      console.log('Created object URL for preview:', objectUrl);
      return {
        id: crypto.randomUUID(),
        file,
        status: 'pending' as const,
        preview: objectUrl,
        processedUrl: undefined
      };
    });
    console.log('Created new image objects:', newImages);

    // Add new images while preserving existing ones
    set((state) => {
      // Get existing images, filtering out any that are completed
      const existingImages = state.images.filter(img => 
        img.status === 'pending' || img.status === 'processing'
      );
      
      // Combine with new images
      const allImages = [...existingImages, ...newImages];
      
      // Update counts
      const pendingCount = allImages.filter(img => 
        img.status === 'pending' || img.status === 'processing'
      ).length;
      
      return {
        ...state,
        activeTab: 'uploaded',
        images: allImages,
        processingCount: pendingCount,
        totalCount: state.totalCount + newImages.length
      };
    });

    // Start processing in the next tick to ensure state is updated
    setTimeout(() => {
      const { processImages } = get();
      processImages();
    }, 0);
  },

  removeImage: async (id: string) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      useToastStore.getState().addToast({
        title: 'Error',
        description: 'You must be logged in to delete images.',
        duration: 5000,
        type: 'error'
      });
      return;
    }

    console.log('Starting deletion for image:', id);

    // Update UI immediately to show deletion in progress
    set(state => ({
      ...state,
      images: state.images.map(img => 
        img.id === id ? { ...img, status: 'deleting' } : img
      )
    }));

    try {
      // Delete from database first
      const { error: dbError } = await supabase
        .from('processed_images')
        .delete()
        .eq('id', id)
        .eq('customer_id', user.id);

      if (dbError) throw dbError;

      // If database deletion succeeds, remove from UI
      set(state => ({
        ...state,
        images: state.images.filter(img => img.id !== id),
        totalCount: Math.max(0, state.totalCount - 1)
      }));

      // Delete from storage in the background
      supabase.storage
        .from('images')
        .remove([`${user.id}/${id}/original.jpg`])
        .then(({ error }) => {
          if (error) console.error('Storage deletion error:', error);
        });

      console.log('Successfully deleted image:', id);
      useToastStore.getState().addToast({
        title: 'Success',
        description: 'Image deleted successfully',
        duration: 3000,
      });

    } catch (error) {
      console.error('Error during deletion:', error);
      
      // Restore the image state in UI
      set(state => ({
        ...state,
        images: state.images.map(img => 
          img.id === id ? { ...img, status: 'completed' } : img
        )
      }));

      useToastStore.getState().addToast({
        title: 'Error',
        description: 'Failed to delete image. Please try again.',
        duration: 5000,
        type: 'error'
      });
    }
  },

  updateImageStatus: (id: string, status: 'pending' | 'processing' | 'completed' | 'error', processedUrl?: string, error?: string) => {
    set((state) => {
      const updatedImages = state.images.map((img) =>
        img.id === id ? { 
          ...img, 
          status,
          preview: processedUrl || img.preview,
          processedUrl: processedUrl || img.processedUrl,
          error 
        } : img
      );

      return {
        ...state,
        images: updatedImages,
        processingCount: updatedImages.filter(img => 
          img.status === 'processing' || img.status === 'pending'
        ).length
      };
    });

    if (status === 'completed') {
      notifyImageProcessed(id);
    }
  },

  processImages: async () => {
    const { images, updateImageStatus } = get();
    const user = useAuthStore.getState().user;
    if (!user) {
      useToastStore.getState().addToast({
        title: 'Error',
        description: 'You must be logged in to upload images.',
        duration: 5000,
        type: 'error'
      });
      return;
    }

    const pendingImages = images.filter(img => img.status === 'pending');
    console.log('Processing pending images:', pendingImages.length);

    for (const image of pendingImages) {
      console.log('Processing image:', image.id);
      updateImageStatus(image.id, 'processing');
      
      try {
        // Upload original image
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('images')
          .upload(`${user.id}/${image.id}/original.jpg`, image.file, {
            contentType: image.file.type,
            upsert: true
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        // Get the public URL using Supabase's createSignedUrl method
        const { data: signedUrlData, error: signedUrlError } = await supabase.storage
          .from('images')
          .createSignedUrl(`${user.id}/${image.id}/original.jpg`, 60 * 60 * 24 * 7); // 7 days expiry

        if (signedUrlError || !signedUrlData?.signedUrl) {
          console.error('Failed to get signed URL:', signedUrlError);
          throw signedUrlError || new Error('Failed to get signed URL');
        }

        const publicUrl = signedUrlData.signedUrl;
        console.log('Got signed URL:', publicUrl);

        // Store in database
        const { error: dbError } = await supabase
          .from('processed_images')
          .insert({
            id: image.id,
            customer_id: user.id,
            original_url: publicUrl,
            processed_url: publicUrl,
            created_at: new Date().toISOString()
          });

        if (dbError) {
          console.error('Database error:', dbError);
          throw dbError;
        }

        // Update status with the public URL
        updateImageStatus(image.id, 'completed', publicUrl);
        
        // Update processed images count
        const { updateProcessedImages } = useAuthStore.getState();
        await updateProcessedImages();

        useToastStore.getState().addToast({
          title: 'Success',
          description: 'Image uploaded successfully',
          duration: 3000,
        });

      } catch (error) {
        console.error('Error processing image:', error);
        updateImageStatus(image.id, 'error', undefined, error instanceof Error ? error.message : 'Failed to process image');
        useToastStore.getState().addToast({
          title: 'Error',
          description: 'Failed to process image. Please try again.',
          duration: 5000,
          type: 'error'
        });
      }
    }
  },

  setActiveTab: (tab) => {
    console.warn('Setting active tab:', { tab });
    
    set(state => {
      if (tab === 'processed') {
        // Keep track of current images
        const currentImages = state.images;
        
        // Load processed images
        get().loadImages().then(() => {
          // After loading, combine current with loaded images
          set(currentState => {
            const loadedImages = currentState.images;
            // Combine images, prioritizing current ones
            const combinedImages = [...currentImages, ...loadedImages.filter(loaded => 
              !currentImages.some(current => current.id === loaded.id)
            )];
            
            const pendingCount = combinedImages.filter(img => 
              img.status === 'pending' || img.status === 'processing'
            ).length;

            return {
              ...currentState,
              images: combinedImages,
              processingCount: pendingCount,
              totalCount: combinedImages.length
            };
          });
        });
      }
      
      // Just update the tab, preserve all images
      return {
        ...state,
        activeTab: tab
      };
    });
  }
})); 