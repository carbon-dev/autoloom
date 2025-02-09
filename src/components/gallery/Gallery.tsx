import React from 'react';
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface GalleryProps {
  currentImage: { preview: string; processedUrl?: string } | null;
  onClose: () => void;
}

export const Gallery: React.FC<GalleryProps> = ({ currentImage, onClose }) => {
  if (!currentImage) return null;

  const content = (
    <div 
      className="fixed inset-0 bg-black/90 z-[9999]"
      onClick={onClose}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 p-2 text-white/50 hover:text-white"
      >
        <X className="h-6 w-6" />
      </button>

      <div 
        className="absolute inset-0 flex items-center justify-center p-4"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={currentImage.processedUrl || currentImage.preview}
          alt=""
          className="max-h-[85vh] max-w-[85vw] object-contain"
          loading="eager"
        />
      </div>
    </div>
  );

  return createPortal(content, document.body);
}; 