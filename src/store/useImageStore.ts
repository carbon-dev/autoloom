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
  addImages: (files: File[], isBackground?: boolean) => void;
  updateImageStatus: (id: string, status: Image['status'], processedUrl?: string, error?: string) => void;
  removeImage: (id: string, isBackground?: boolean) => void;
  clearImages: () => void;
  setSelectedBackground: (image: Image | null) => void;
  processImages: () => Promise<void>;
  setToastStatus: (status: 'processing' | 'complete' | null) => void;
  setActiveTab: (tab: 'uploaded' | 'processed') => void;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  backgroundImages: [],
  selectedBackground: null,
  toastStatus: null,
  activeTab: 'uploaded',

  setToastStatus: (status) => set({ toastStatus: status }),

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
      };
    });
  },

  updateImageStatus: (id, status, processedUrl, error) => {
    set((state) => ({
      ...state,
      images: state.images.map((img) =>
        img.id === id ? { ...img, status, processedUrl, error } : img
      ),
    }));
  },

  removeImage: (id, isBackground = false) => {
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
  },

  clearImages: () => {
    set({ images: [], backgroundImages: [], selectedBackground: null });
  },

  setSelectedBackground: (image) => {
    set({ selectedBackground: image });
  },

  processImages: async () => {
    const { images, updateImageStatus, setToastStatus } = get();
    const pendingImages = images.filter((img) => img.status === 'pending');

    if (pendingImages.length === 0) return;

    setToastStatus('processing');
    const user = useAuthStore.getState().user;
    
    if (!user) {
      console.error('No user found');
      return;
    }

    if (user.subscription === 'trial' && user.trialImagesLeft < pendingImages.length) {
      setToastStatus(null);
      // You might want to show an error message here
      return;
    }

    let successCount = 0;

    try {
      for (const image of pendingImages) {
        updateImageStatus(image.id, 'processing');
        
        try {
          // Simulate processing delay
          await new Promise((resolve) => setTimeout(resolve, 2000));
          
          // In a real implementation, you would upload the image to your backend here
          // const response = await uploadAndProcess(image.file);
          // const processedUrl = response.url;
          
          // For now, we'll just use the preview as the processed image
          updateImageStatus(image.id, 'completed', image.preview);
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
        // Update the user's stats in Supabase
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
          // Update local state
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

        // Switch to the processed images tab after successful processing
        set({ activeTab: 'processed' });
      }

      setToastStatus('complete');
      setTimeout(() => setToastStatus(null), 5000);
    } catch (error) {
      console.error('Processing failed:', error);
      setToastStatus(null);
    }
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },
}));