import { create } from 'zustand';
import { ImageFile } from '../types';

interface ImageStore {
  images: ImageFile[];
  backgroundImages: ImageFile[];
  selectedBackground: ImageFile | null;
  addImages: (files: File[], isBackground?: boolean) => void;
  updateImageStatus: (id: string, status: ImageFile['status'], processedUrl?: string, error?: string) => void;
  removeImage: (id: string, isBackground?: boolean) => void;
  clearImages: () => void;
  setSelectedBackground: (image: ImageFile | null) => void;
}

export const useImageStore = create<ImageStore>((set) => ({
  images: [],
  backgroundImages: [],
  selectedBackground: null,
  addImages: (files, isBackground = false) => {
    set((state) => {
      const newImages = files.map((file) => ({
        id: Math.random().toString(36).substring(7),
        file,
        preview: URL.createObjectURL(file),
        status: 'pending',
        isBackground,
      }));

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
}));