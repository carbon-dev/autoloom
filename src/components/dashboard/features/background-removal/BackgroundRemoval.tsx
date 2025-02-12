import React from 'react';
import { PageHeader } from '../../shared/PageHeader';
import { Card, CardContent } from '../../shared/Card';
import { ImageUploader } from './ImageUploader';
import { ProcessingStatus } from './ProcessingStatus';
import { useImageStore } from '../../stores/useImageStore';
import { Trash2 } from 'lucide-react';

export const BackgroundRemoval: React.FC = () => {
  const images = useImageStore((state) => state.images.filter(img => img.status === 'processing' || img.status === 'pending'));
  const processingCount = useImageStore((state) => state.processingCount);
  const totalCount = useImageStore((state) => state.totalCount);
  const removeImage = useImageStore((state) => state.removeImage);
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Remove Background"
        description="Upload images to remove their backgrounds automatically."
      />
      
      <div className="mt-6 space-y-6">
        <Card>
          <CardContent>
            <ImageUploader 
              title="Upload images"
              description="Drag and drop images here or click to browse"
            />
          </CardContent>
        </Card>

        {processingCount > 0 && (
          <Card>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Processing Images</h3>
                  <span className="text-sm text-gray-500">
                    {totalCount - processingCount}/{totalCount} complete
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${((totalCount - processingCount) / totalCount) * 100}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {images.length > 0 && (
          <Card>
            <CardContent>
              <h3 className="text-sm font-medium text-gray-900 mb-4">Currently Processing</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200"
                  >
                    <img
                      src={image.preview}
                      alt="Preview"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                      <p className="text-sm text-white">
                        Status: {image.status}
                      </p>
                    </div>
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => removeImage(image.id)}
                        className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <ProcessingStatus 
          status={images.some(img => img.status === 'processing') ? 'processing' : 'idle'} 
        />
      </div>
    </div>
  );
}; 