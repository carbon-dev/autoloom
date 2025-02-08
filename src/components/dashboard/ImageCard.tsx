import React from 'react';
import { X, RefreshCw, Download } from 'lucide-react';
import { ImageFile } from '../../types';

interface ImageCardProps {
  image: ImageFile;
  onRemove: (id: string) => void;
  onDownload?: (url: string) => void;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  onRemove,
  onDownload,
}) => {
  const handleDownload = () => {
    if (image.processedUrl && onDownload) {
      onDownload(image.processedUrl);
    }
  };

  return (
    <div className="relative group rounded-lg overflow-hidden bg-gray-100">
      <img
        src={image.processedUrl || image.preview}
        alt="Preview"
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
      <button
        onClick={() => onRemove(image.id)}
        className="absolute top-2 right-2 p-1 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <X className="h-4 w-4 text-gray-600" />
      </button>
      {image.status === 'processing' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <RefreshCw className="animate-spin h-8 w-8 text-white" />
        </div>
      )}
      {image.status === 'completed' && (
        <button
          onClick={handleDownload}
          className="absolute bottom-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Download className="h-4 w-4 text-gray-600" />
        </button>
      )}
      {image.error && (
        <div className="absolute bottom-0 inset-x-0 bg-red-500 text-white text-sm px-3 py-1">
          {image.error}
        </div>
      )}
    </div>
  );
};