import React from 'react';
import { Image } from 'lucide-react';
import { useImageStore } from '../../../../store/useImageStore';
import { useAuthStore } from '../../../../store/useAuthStore';

export const ProcessButton: React.FC = () => {
  const images = useImageStore((state) => state.images);
  const updateImageStatus = useImageStore((state) => state.updateImageStatus);
  const updateProcessedImages = useAuthStore((state) => state.updateProcessedImages);

  const handleProcess = async () => {
    const pendingImages = images.filter((img) => img.status === 'pending');
    
    for (const image of pendingImages) {
      updateImageStatus(image.id, 'processing');
      
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        updateImageStatus(image.id, 'completed', image.preview);
        updateProcessedImages();
      } catch (error) {
        updateImageStatus(
          image.id,
          'error',
          undefined,
          'Failed to process image'
        );
      }
    }
  };

  const pendingCount = images.filter((img) => img.status === 'pending').length;

  return (
    <button
      onClick={handleProcess}
      disabled={pendingCount === 0}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium
        ${
          pendingCount > 0
            ? 'bg-blue-500 hover:bg-blue-600'
            : 'bg-gray-300 cursor-not-allowed'
        }`}
    >
      <Image className="h-5 w-5" />
      <span>
        Process {pendingCount > 0 ? `(${pendingCount})` : ''} Images
      </span>
    </button>
  );
}; 