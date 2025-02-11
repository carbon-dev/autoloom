import React from 'react';
import { PageHeader } from '../shared/PageHeader';
import { Card, CardContent } from '../shared/Card';
import { useImageStore } from '../stores/useImageStore';

export const MyImages: React.FC = () => {
  const images = useImageStore((state) => state.images);
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="My Images"
        description="View and manage your processed images."
      />
      
      <div className="mt-6">
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-lg border border-gray-200"
                >
                  <img
                    src={image.processedUrl || image.preview}
                    alt="Processed"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <p className="text-sm text-white">
                      Status: {image.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 