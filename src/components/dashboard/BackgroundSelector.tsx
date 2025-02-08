import React from 'react';
import { useImageStore } from '../../store/useImageStore';
import { ImageUploader } from '../ImageUploader';
import { ImageCard } from './ImageCard';

export const BackgroundSelector: React.FC = () => {
  const { backgroundImages, selectedBackground, setSelectedBackground } = useImageStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Background Images</h3>
        <ImageUploader isBackground />
      </div>
      
      {backgroundImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {backgroundImages.map((image) => (
            <div
              key={image.id}
              className={`relative cursor-pointer ${
                selectedBackground?.id === image.id ? 'ring-2 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedBackground(image)}
            >
              <ImageCard
                image={image}
                onRemove={() => useImageStore.getState().removeImage(image.id, true)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Upload background images to use when removing backgrounds.</p>
        </div>
      )}
    </div>
  );
};