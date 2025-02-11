import React from 'react';
import { PageHeader } from '../../shared/PageHeader';
import { Card, CardContent } from '../../shared/Card';
import { ImageUploader } from './ImageUploader';
import { ProcessingStatus } from './ProcessingStatus';
import { useImageStore } from '../../stores/useImageStore';

export const BackgroundRemoval: React.FC = () => {
  const images = useImageStore((state) => state.images);
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Remove Background"
        description="Upload images to remove their backgrounds automatically."
      />
      
      <div className="mt-6">
        <Card>
          <CardContent>
            <ImageUploader />
            <ProcessingStatus 
              status={images.some(img => img.status === 'processing') ? 'processing' : 'idle'} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 