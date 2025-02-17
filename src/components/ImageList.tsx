import React from 'react';
import { ImageCard } from './dashboard/ImageCard';
import { useImageStore } from '../store/useImageStore';

interface ImageListProps {
  type: 'uploaded' | 'processed';
}

export const ImageList: React.FC<ImageListProps> = ({ type }) => {
  const images = useImageStore((state) => state.images);
  const removeImage = useImageStore((state) => state.removeImage);

  // Debug logs
  console.log('ImageList render:', { 
    type, 
    allImages: images,
    pending: images.filter(img => img.status === 'pending'),
    completed: images.filter(img => img.status === 'completed')
  });

  const filteredImages = type === 'uploaded' 
    ? images.filter(img => img.status === 'pending' || img.status === 'processing')
    : images.filter(img => img.status === 'completed');

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredImages.map((image) => (
        <ImageCard
          key={image.id}
          image={image}
          onRemove={removeImage}
          onDownload={type === 'processed' ? handleDownload : undefined}
        />
      ))}
    </div>
  );
};