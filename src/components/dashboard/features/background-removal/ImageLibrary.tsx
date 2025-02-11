import React from 'react';
import { useImageStore } from '../../../../store/useImageStore';
import { cn } from '../../../../utils/cn';

export const ImageLibrary: React.FC = () => {
  const images = useImageStore((state) => state.images);
  const processImages = useImageStore((state) => state.processImages);

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No images uploaded yet.</p>
        <p className="text-sm text-gray-400 mt-1">Upload some images in the Upload tab to get started.</p>
      </div>
    );
  }

  const pendingImages = images.filter(img => img.status === 'pending');
  const processedImages = images.filter(img => img.status === 'completed');
  const processingImages = images.filter(img => img.status === 'processing');
  const failedImages = images.filter(img => img.status === 'error');

  return (
    <div className="space-y-8">
      {pendingImages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Ready to Process</h3>
            <button
              onClick={() => processImages()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Process {pendingImages.length} Image{pendingImages.length !== 1 ? 's' : ''}
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pendingImages.map((image) => (
              <div
                key={image.id}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={image.preview}
                    alt="Original image"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      )}

      {processingImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Processing</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {processingImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={image.preview}
                    alt="Processing image"
                    className="h-full w-full object-contain opacity-50"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {processedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Processed Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {processedImages.map((image) => (
              <div
                key={image.id}
                className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={image.processedUrl}
                    alt="Processed image"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                <a
                  href={image.processedUrl}
                  download
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                    Download
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {failedImages.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Failed to Process</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {failedImages.map((image) => (
              <div
                key={image.id}
                className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src={image.preview}
                    alt="Failed image"
                    className="h-full w-full object-contain opacity-50"
                  />
                </div>
                <div className="absolute inset-0 bg-red-50 bg-opacity-50 flex items-center justify-center">
                  <p className="text-red-600 text-sm text-center px-4">
                    {image.error || 'Failed to process'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 