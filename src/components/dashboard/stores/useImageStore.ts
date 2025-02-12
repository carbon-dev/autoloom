import { create } from 'zustand';
import { ImageFile } from '../types';
import { useAuthStore } from '../../../store/useAuthStore';
import { supabase } from '../../../lib/supabase';

// Create a simple event emitter for image processing completion
type Listener = () => void;
const listeners = new Set<Listener>();

const notifyImageProcessed = () => {
  listeners.forEach(listener => listener());
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
  
  loadImages: async () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      console.log('No user found when loading images');
      return;
    }

    try {
      console.log('Loading images for user:', user.id);
      const { data: images, error } = await supabase
        .from('processed_images')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error loading images:', error);
        throw error;
      }

      if (images) {
        console.log('Loaded images:', images);
        const loadedImages: ImageFile[] = images.map(img => ({
          id: img.id,
          file: new File([], 'placeholder'),
          preview: img.original_url,
          processedUrl: img.processed_url,
          status: 'completed' as const,
        }));

        // Get current processing images
        const currentState = get();
        const processingImages = currentState.images.filter(img => 
          img.status === 'processing' || img.status === 'pending'
        );

        // Combine and update state
        set({
          ...currentState,
          images: [...processingImages, ...loadedImages],
          processingCount: processingImages.length
        });
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  },

  addImages: (files) => {
    console.log('Adding images to store:', files);
    const newImages = Array.from(files).map((file) => ({
      id: crypto.randomUUID().replace(/-/g, ''), // Remove hyphens from UUID
      file,
      status: 'pending' as const,
      preview: URL.createObjectURL(file)
    }));
    console.log('Created new image objects:', newImages);

    set((state) => {
      const updatedState = {
        images: [...state.images, ...newImages],
        totalCount: state.totalCount + newImages.length,
        processingCount: state.processingCount + newImages.length
      };
      console.log('Updated store state:', updatedState);
      return updatedState;
    });

    console.log('Starting image processing...');
    get().processImages();
  },

  removeImage: async (id) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set((state) => ({
      images: state.images.filter(img => img.id !== id)
    }));

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('images')
        .remove([
          `${user.id}/${id}/original.jpg`,
          `${user.id}/${id}/processed.png`
        ]);

      if (storageError) {
        console.error('Error deleting from storage:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('processed_images')
        .delete()
        .eq('id', id)
        .eq('customer_id', user.id);

      if (dbError) {
        console.error('Error deleting from database:', dbError);
      }
    } catch (error) {
      console.error('Error removing image:', error);
    }
  },

  updateImageStatus: (id, status, processedUrl, error) => {
    set((state) => {
      const newImages = state.images.map(img => 
        img.id === id ? { ...img, status, processedUrl, error } : img
      );
      return {
        images: newImages,
        processingCount: status === 'completed' || status === 'error' 
          ? Math.max(0, state.processingCount - 1) 
          : state.processingCount
      };
    });
  },

  processImages: async () => {
    const { images, updateImageStatus } = get();
    const user = useAuthStore.getState().user;
    if (!user) {
      console.log('No user found when processing images');
      return;
    }

    const pendingImages = images.filter(img => img.status === 'pending');
    console.log('Processing pending images:', pendingImages.length);

    for (const image of pendingImages) {
      console.log('Processing image:', image.id);
      updateImageStatus(image.id, 'processing');
      try {
        // Upload original image to storage
        const originalFileName = `${user.id}/${image.id}/original.jpg`;

        console.log('Preparing original image for upload:', {
          fileName: originalFileName,
          fileType: image.file.type,
          fileSize: image.file.size
        });

        // Create a timeout promise
        const timeout = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Upload timed out after 30 seconds')), 30000)
        );

        console.log('Starting upload with timeout...');
        
        try {
          // Upload with timeout
          const { data: originalUpload, error: uploadError } = await Promise.race([
            supabase.storage
              .from('images')
              .upload(originalFileName, image.file, {
                contentType: image.file.type,
                upsert: true
              }),
            timeout
          ]) as { data: any, error: any };

          if (uploadError) {
            console.error('Original image upload error:', uploadError);
            throw new Error(`Failed to upload original image: ${uploadError.message}`);
          }

          if (!originalUpload) {
            throw new Error('Upload failed - no response from server');
          }

          console.log('Original image uploaded successfully:', originalUpload);

          // Get public URL
          console.log('Getting public URL');
          const { data: originalUrlData } = supabase.storage
            .from('images')
            .getPublicUrl(originalFileName);

          if (!originalUrlData) {
            throw new Error('Failed to generate public URL');
          }

          const originalUrl = originalUrlData.publicUrl;

          console.log('Got public URL:', originalUrl);

          const dbRecord = {
            id: image.id,
            customer_id: user.id,
            original_url: originalUrl,
            processed_url: originalUrl, // Temporarily use the original URL until we implement background removal
            created_at: new Date().toISOString()
          };
          console.log('Storing in database:', dbRecord);

          // Store the image record in the database
          const { data: dbData, error: dbError } = await supabase
            .from('processed_images')
            .insert(dbRecord)
            .select()
            .single();

          if (dbError) {
            console.error('Database insert error:', dbError);
            throw new Error(`Failed to save image data: ${dbError.message}`);
          }
          console.log('Database record created successfully:', dbData);

          // After successful upload and database insert, update all states
          console.log('Updating states after successful processing');

          // First update auth store
          const { updateProcessedImages } = useAuthStore.getState();
          await updateProcessedImages();

          // Then update image status
          updateImageStatus(image.id, 'completed');

          // Finally update the full image state
          set((state) => {
            const updatedImages = state.images.map(img => 
              img.id === image.id 
                ? { 
                    ...img, 
                    status: 'completed' as const,
                    preview: originalUrl
                  }
                : img
            );

            return {
              ...state,
              images: updatedImages,
              processingCount: Math.max(0, state.processingCount - 1)
            };
          });

          // Notify listeners that an image has been processed
          notifyImageProcessed();

          console.log('Successfully processed image:', image.id);
        } catch (error) {
          console.error('Error processing image:', error);
          const errorMessage = error instanceof Error ? error.message : 'Failed to process image';
          updateImageStatus(image.id, 'error', undefined, errorMessage);
        }
      } catch (error) {
        console.error('Error processing image:', error);
        const errorMessage = error instanceof Error ? error.message : 'Failed to process image';
        updateImageStatus(image.id, 'error', undefined, errorMessage);
      }
    }
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  }
})); 