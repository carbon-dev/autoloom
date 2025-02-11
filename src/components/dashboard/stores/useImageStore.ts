import { create } from 'zustand';
import { ImageFile } from '../types';

interface ImageStore {
  images: ImageFile[];
  addImages: (files: File[]) => void;
  removeImage: (id: string) => void;
  updateImageStatus: (id: string, status: 'pending' | 'processing' | 'completed' | 'error', processedUrl?: string, error?: string) => void;
  processImages: () => Promise<void>;
}

export const useImageStore = create<ImageStore>((set, get) => ({
  images: [],
  
  addImages: (files) => {
    const newImages = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      file,
      status: 'pending' as const,
      preview: URL.createObjectURL(file)
    }));

    set((state) => ({
      images: [...state.images, ...newImages]
    }));

    get().processImages();
  },

  removeImage: (id) => set((state) => ({
    images: state.images.filter(img => img.id !== id)
  })),

  updateImageStatus: (id, status, processedUrl, error) => set((state) => ({
    images: state.images.map(img => 
      img.id === id ? { ...img, status, processedUrl, error } : img
    )
  })),

  processImages: async () => {
    const { images, updateImageStatus } = get();
    const pendingImages = images.filter(img => img.status === 'pending');

    for (const image of pendingImages) {
      updateImageStatus(image.id, 'processing');
      try {
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2000));
        updateImageStatus(image.id, 'completed', image.preview);
      } catch (error) {
        updateImageStatus(image.id, 'error', undefined, 'Failed to process image');
      }
    }
  }
})); 