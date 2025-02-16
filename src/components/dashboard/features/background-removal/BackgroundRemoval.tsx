import React, { useState } from 'react';
import { PageHeader } from '../../shared/PageHeader';
import { Card, CardContent } from '../../shared/Card';
import { ImageUploader } from './ImageUploader';
import { ProcessingStatus } from './ProcessingStatus';
import { useImageStore } from '../../stores/useImageStore';
import { Trash2, Download } from 'lucide-react';
import { useAuthStore } from '../../../../store/useAuthStore';
import { supabase } from '../../../../lib/supabase';

const Tab: React.FC<{ 
  label: string; 
  isActive: boolean; 
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  const handleClick = () => {
    console.warn('🔘 Tab clicked:', { label, isActive });
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        isActive 
          ? 'bg-indigo-100 text-indigo-700' 
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );
};

export const BackgroundRemoval: React.FC = () => {
  const [key, setKey] = React.useState(0);
  const user = useAuthStore((state) => state.user);
  const {
    images,
    activeTab,
    setActiveTab,
    processingCount,
    totalCount,
    removeImage,
    loadImages
  } = useImageStore((state) => ({
    images: state.images,
    activeTab: state.activeTab,
    setActiveTab: state.setActiveTab,
    processingCount: state.processingCount,
    totalCount: state.totalCount,
    removeImage: state.removeImage,
    loadImages: state.loadImages
  }));

  // Force initial load of images
  React.useEffect(() => {
    console.warn('🔄 Initial load of images');
    loadImages();
  }, [loadImages]);

  const processingImages = images.filter(img => 
    img.status === 'processing' || img.status === 'pending'
  );
  const completedImages = images.filter(img => img.status === 'completed');

  // Add debugging for image URLs
  React.useEffect(() => {
    console.warn('🔄 Component re-rendered with key:', key);
    if (completedImages.length > 0) {
      console.warn('🖼️ Completed Images URLs:', completedImages.map(img => ({
        id: img.id,
        processedUrl: img.processedUrl,
        preview: img.preview
      })));
    }
  }, [completedImages, key]);

  const handleTabChange = (tab: 'uploaded' | 'processed') => {
    console.warn('👆 Tab change requested:', { 
      currentTab: activeTab,
      newTab: tab,
      imagesCount: images.length,
      completedCount: completedImages.length
    });
    
    setActiveTab(tab);
    
    if (tab === 'processed') {
      console.warn('🔄 Reloading images for processed tab...');
      loadImages();
      setKey(prev => prev + 1);
    }
  };

  console.warn('🖼️ BackgroundRemoval render:', { 
    key,
    totalImages: images.length,
    processingImages: processingImages.length,
    completedImages: completedImages.length,
    activeTab,
    firstCompletedImage: completedImages[0]
  });

  const handleDownload = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'processed-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Add a function to verify image URLs
  const verifyImageUrl = async (url: string) => {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      console.warn('🔍 Image URL verification:', {
        url,
        status: response.status,
        ok: response.ok,
        contentType: response.headers.get('content-type')
      });
      return response.ok;
    } catch (error) {
      console.error('❌ Error verifying image URL:', { url, error });
      return false;
    }
  };

  // Verify URLs when completed images change
  React.useEffect(() => {
    completedImages.forEach(image => {
      if (image.processedUrl) {
        verifyImageUrl(image.processedUrl);
      }
    });
  }, [completedImages]);
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Remove Background"
        description="Upload images to remove their backgrounds automatically."
      />
      
      <div className="mt-6 space-y-6">
        <div className="flex space-x-4 border-b border-gray-200">
          <Tab
            label="Upload"
            isActive={activeTab === 'uploaded'}
            onClick={() => handleTabChange('uploaded')}
          />
          <Tab
            label="My Images"
            isActive={activeTab === 'processed'}
            onClick={() => handleTabChange('processed')}
          />
        </div>

        {activeTab === 'uploaded' ? (
          <>
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

            {processingImages.length > 0 && (
              <Card>
                <CardContent>
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Currently Processing</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {processingImages.map((image) => (
                      <div
                        key={image.id}
                        className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200"
                      >
                        <img
                          src={image.preview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            console.error('Error loading preview image:', {
                              id: image.id,
                              url: image.preview,
                              error: e
                            });
                          }}
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
          </>
        ) : (
          <Card>
            <CardContent>
              {completedImages.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {completedImages.map((image) => (
                    <div
                      key={image.id}
                      className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200"
                    >
                      <img
                        src={image.processedUrl}
                        alt="Processed"
                        className="h-full w-full object-cover"
                        onLoad={() => {
                          console.warn('✅ Image loaded successfully:', {
                            id: image.id,
                            url: image.processedUrl
                          });
                        }}
                        onError={(e) => {
                          console.error('❌ Error loading processed image:', {
                            id: image.id,
                            url: image.processedUrl,
                            error: e
                          });
                        }}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
                      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => image.processedUrl && handleDownload(image.processedUrl)}
                          className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Download className="h-4 w-4 text-gray-600" />
                        </button>
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
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500">No processed images yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Upload some images in the Upload tab to get started.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}; 