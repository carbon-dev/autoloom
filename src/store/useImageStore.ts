import { create } from 'zustand';
import { useAuthStore } from './useAuthStore';
import { supabase } from '../lib/supabase';

interface Image {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  processedUrl?: string;
  error?: string;
  isBackground?: boolean;
}

interface ImageStore {
  images: Image[];
  backgroundImages: Image[];
  selectedBackground: Image | null;
  toastStatus: 'processing' | 'complete' | null;
  activeTab: 'uploaded' | 'processed';
  processingCount: number;
  addImages: (files: File[], isBackground?: boolean) => void;
  updateImageStatus: (id: string, status: Image['status'], processedUrl?: string, error?: string) => void;
  removeImage: (id: string, isBackground?: boolean) => void;
  clearImages: () => void;
  setSelectedBackground: (image: Image | null) => void;
  processImages: () => Promise<void>;
  setToastStatus: (status: 'processing' | 'complete' | null) => void;
  setActiveTab: (tab: 'uploaded' | 'processed') => void;
  loadImages: () => Promise<void>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  backgroundImages: [],
  selectedBackground: null,
  toastStatus: null,
  activeTab: 'uploaded',
  processingCount: 0,

  setToastStatus: (status) => {
    set({ toastStatus: status });
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
        const loadedImages = images.map(img => ({
          id: img.id,
          preview: img.original_url,
          processedUrl: img.processed_url,
          status: 'completed' as const,
          file: null as any, // We don't store the actual file
          isBackground: false
        }));

        set({ images: loadedImages });
      }
    } catch (error) {
      console.error('Error loading images:', error);
    }
  },

  addImages: (files, isBackground = false) => {
    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending' as const,
      isBackground
    }));

    set((state) => {
      if (isBackground) {
        return {
          ...state,
          backgroundImages: [...state.backgroundImages, ...newImages],
        };
      }
      return {
        ...state,
        images: [...state.images, ...newImages],
        toastStatus: 'processing',
        processingCount: files.length
      };
    });
  },

  updateImageStatus: async (id, status, processedUrl, error) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set((state) => ({
      ...state,
      images: state.images.map((img) =>
        img.id === id ? { ...img, status, processedUrl, error } : img
      ),
    }));

    // If the image is completed, store it in Supabase
    if (status === 'completed' && processedUrl) {
      try {
        console.log('Storing image in Supabase:', id);
        const image = get().images.find(img => img.id === id);
        if (!image) {
          console.error('Image not found in store:', id);
          return;
        }

        // Upload original image to storage
        const originalFileName = `${user.id}/${id}/original.jpg`;
        console.log('Uploading to storage:', originalFileName);
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('images')
          .upload(originalFileName, image.file, {
            contentType: image.file.type,
            upsert: true
          });

        if (uploadError) {
          console.error('Storage upload error:', uploadError);
          throw uploadError;
        }

        console.log('Upload successful:', uploadData);

        // Get public URL for the original image
        const { data: originalUrl } = supabase.storage
          .from('images')
          .getPublicUrl(originalFileName);

        if (!originalUrl) {
          console.error('Failed to get public URL for:', originalFileName);
          return;
        }

        console.log('Got public URL:', originalUrl);

        // Store the image record in the database
        const { error: dbError, data: dbData } = await supabase
          .from('processed_images')
          .insert({
            id,
            customer_id: user.id,
            original_url: originalUrl.publicUrl,
            processed_url: processedUrl,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (dbError) {
          console.error('Database insert error:', dbError);
          throw dbError;
        }

        console.log('Successfully stored image in database:', dbData);
      } catch (error) {
        console.error('Error storing image:', error);
      }
    }
  },

  removeImage: async (id, isBackground = false) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    set((state) => {
      if (isBackground) {
        return {
          ...state,
          backgroundImages: state.backgroundImages.filter((img) => img.id !== id),
          selectedBackground: state.selectedBackground?.id === id ? null : state.selectedBackground,
        };
      }
      return {
        ...state,
        images: state.images.filter((img) => img.id !== id),
      };
    });

    // Remove from Supabase if it exists
    try {
      // Delete from storage
      await supabase.storage
        .from('images')
        .remove([`${user.id}/${id}/original.jpg`]);

      // Delete from database
      await supabase
        .from('processed_images')
        .delete()
        .eq('id', id)
        .eq('customer_id', user.id);
    } catch (error) {
      console.error('Error removing image:', error);
    }
  },

  clearImages: () => {
    set({ images: [], backgroundImages: [], selectedBackground: null });
  },

  setSelectedBackground: (image) => {
    set({ selectedBackground: image });
  },

  processImages: async () => {
    const { images, updateImageStatus } = get();
    const pendingImages = images.filter(img => img.status === 'pending');
    const count = pendingImages.length;

    if (count === 0) return;

    // Show initial processing message
    set({ toastStatus: 'processing', processingCount: count });
    
    const user = useAuthStore.getState().user;
    
    if (!user) {
      console.error('No user found');
      set({ toastStatus: null, processingCount: 0 });
      return;
    }

    if (user.subscription === 'trial' && user.trialImagesLeft < count) {
      set({ toastStatus: null, processingCount: 0 });
      return;
    }

    let successCount = 0;

    try {
      for (const image of pendingImages) {
        updateImageStatus(image.id, 'processing');
        
        try {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          await updateImageStatus(image.id, 'completed', image.preview);
          successCount++;
        } catch (error) {
          console.error('Processing failed:', error);
          updateImageStatus(
            image.id,
            'error',
            undefined,
            'Failed to process image'
          );
        }
      }

      if (successCount > 0) {
        const { error } = await supabase
          .from('customers')
          .update({
            processed_images: user.processedImages + successCount,
            trial_images_left: user.subscription === 'trial' 
              ? user.trialImagesLeft - successCount 
              : user.trialImagesLeft
          })
          .eq('id', user.id);

        if (!error) {
          useAuthStore.setState((state) => ({
            user: state.user ? {
              ...state.user,
              processedImages: state.user.processedImages + successCount,
              trialImagesLeft: state.user.subscription === 'trial'
                ? state.user.trialImagesLeft - successCount
                : state.user.trialImagesLeft
            } : null
          }));
        }

        set({ activeTab: 'processed' });

        // Show completion message
        set({ toastStatus: 'complete', processingCount: successCount });

        // Use a separate function for the timeout to ensure it runs after state updates
        const hideToast = () => {
          set({ toastStatus: null, processingCount: 0 });
        };

        setTimeout(hideToast, 5000);
      }
    } catch (error) {
      console.error('Processing failed:', error);
      set({ toastStatus: null, processingCount: 0 });
    }
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
}));