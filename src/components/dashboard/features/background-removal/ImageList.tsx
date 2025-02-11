import React from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { PreviewImage } from '../../shared/PreviewImage';
import { Button } from '../../shared/Button';

interface ImageListProps {
  images: Array<{
    id: string;
    url: string;
    name: string;
  }>;
  onRemove: (id: string) => void;
  className?: string;
  emptyMessage?: string;
}

export const ImageList: React.FC<ImageListProps> = ({
  images,
  onRemove,
  className = '',
  emptyMessage = 'No images uploaded yet',
}) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4', className)}>
      {images.map((image) => (
        <div key={image.id} className="group relative">
          <PreviewImage
            src={image.url}
            alt={image.name}
            className="aspect-square"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 bg-black/50 transition-opacity group-hover:opacity-100">
            <Button
              variant="danger"
              size="sm"
              onClick={() => onRemove(image.id)}
              leftIcon={<Trash2 className="h-4 w-4" />}
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}; 