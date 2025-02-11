import React from 'react';
import { PageHeader } from '../../shared/PageHeader';
import { Card, CardContent } from '../../shared/Card';
import { ImageUploader } from './ImageUploader';
import { ImageList } from './ImageList';
import { ProcessingStatus } from './ProcessingStatus';
import { ResultPreview } from './ResultPreview';
import { useImageStore } from '../../../../store/useImageStore';
import { NavigationTabs } from '../../shared/NavigationTabs';

const tabs = [
  { name: 'Uploaded', href: '/dashboard/background-removal?tab=uploaded' },
  { name: 'Processed', href: '/dashboard/background-removal?tab=processed' },
];

export const BackgroundRemovalPage: React.FC = () => {
  const images = useImageStore((state) => state.images);
  const removeImage = useImageStore((state) => state.removeImage);
  const currentTab = new URLSearchParams(window.location.search).get('tab') || 'uploaded';

  const uploadedImages = images.filter(img => img.status === 'pending' || img.status === 'processing');
  const processedImages = images.filter(img => img.status === 'completed');

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Background Removal"
        description="Upload images to remove their backgrounds automatically."
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Background Removal' },
        ]}
      />

      <Card>
        <CardContent>
          <NavigationTabs
            tabs={tabs}
            className="mb-6"
          />

          {currentTab === 'uploaded' ? (
            <div className="space-y-6">
              <ImageUploader />
              <ImageList
                images={uploadedImages.map(img => ({
                  id: img.id,
                  url: img.originalUrl,
                  name: img.name,
                }))}
                onRemove={removeImage}
                emptyMessage="No images uploaded yet. Upload some images to get started!"
              />
              {uploadedImages.map(img => (
                img.status === 'processing' && (
                  <ProcessingStatus
                    key={img.id}
                    status={img.status}
                    progress={img.progress}
                  />
                )
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {processedImages.map(img => (
                <ResultPreview
                  key={img.id}
                  originalImage={img.originalUrl}
                  processedImage={img.processedUrl!}
                  onDownload={() => handleDownload(img.processedUrl!)}
                />
              ))}
              {processedImages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm text-gray-500">
                    No processed images yet. Upload and process some images to see them here!
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 