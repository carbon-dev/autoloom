import { create } from 'zustand';
import { ImageFile } from '../types';

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

    if (!isBackground) {
      get().processImages();
    }
  },

  updateImageStatus: (id, status, processedUrl, error) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, status, processedUrl, error } : img
      ),
      backgroundImages: state.backgroundImages.map((img) =>
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

    if (pendingImages.length > 0) {
      setToastStatus('processing');
    }

    for (const image of pendingImages) {
      console.log('Processing image:', image.id);
      updateImageStatus(image.id, 'processing');
      
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log('Image completed:', image.id);
        updateImageStatus(image.id, 'completed', image.preview);
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

    console.log('All images processed');
    if (pendingImages.length > 0) {
      setToastStatus('complete');
      setTimeout(() => setToastStatus(null), 5000);
    }
  },

  setActiveTab: (tab) => {
    console.log('Setting active tab:', tab);
    console.log('Current images:', get().images);
    set({ activeTab: tab });
    console.log('New active tab:', get().activeTab);
  },
}));