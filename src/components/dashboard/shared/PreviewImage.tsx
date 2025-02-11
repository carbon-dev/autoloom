import React, { useState } from 'react';
import { cn } from '../../../utils/cn';

interface PreviewImageProps {
  src: string;
  alt?: string;
  className?: string;
  aspectRatio?: 'square' | '16/9' | '4/3';
  objectFit?: 'contain' | 'cover';
}

export const PreviewImage: React.FC<PreviewImageProps> = ({
  src,
  alt = '',
  className = '',
  aspectRatio = 'square',
  objectFit = 'cover',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
  };

  const objectFitClasses = {
    contain: 'object-contain',
    cover: 'object-cover',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-100',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-sm text-gray-500">Failed to load image</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={cn(
            'h-full w-full transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoading ? 'opacity-0' : 'opacity-100'
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setError(true);
          }}
        />
      )}
    </div>
  );
}; 