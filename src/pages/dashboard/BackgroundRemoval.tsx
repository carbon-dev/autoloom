import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Upload } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useImageStore } from '../../store/useImageStore';
import { Toast } from '../../components/Toast';
import { ImageUploader } from '../../components/ImageUploader';
import { ImageList } from '../../components/ImageList';
import { Tabs } from '../../components/dashboard/Tabs';

export const BackgroundRemoval = () => {
  const user = useAuthStore((state) => state.user);
  const activeTab = useImageStore((state) => {
    console.log('Getting activeTab:', state.activeTab);
    return state.activeTab;
  });
  const setActiveTab = useImageStore((state) => state.setActiveTab);
  
  const uploadedCount = useImageStore((state) => 
    state.images.filter(img => img.status === 'pending').length
  );
  const processedCount = useImageStore((state) => {
    const count = state.images.filter(img => img.status === 'completed').length;
    console.log('Processed count:', count);
    return count;
  });

  console.log('BackgroundRemoval render - activeTab:', activeTab);

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">Background Removal</h1>
          <p className="text-sm text-gray-600 mt-1 lg:hidden">
            {user?.subscription === 'trial' && `${user.trialImagesLeft} images left`}
          </p>
        </div>
        <span className="hidden lg:block text-sm text-gray-600">
          {user?.subscription === 'trial' && `${user.trialImagesLeft} images left`}
        </span>
      </div>

      {/* Main Upload Area */}
      <ImageUploader />

      {/* Background Images Section */}
      <div className="mt-6 lg:mt-8">
        <details className="lg:details-none bg-white rounded-lg border border-gray-200">
          <summary className="px-4 py-3 lg:hidden cursor-pointer text-sm font-medium text-gray-900 flex items-center justify-between">
            Background Images
            <span className="text-xs text-gray-500">Optional</span>
          </summary>
          <div className="p-4 lg:p-0 border-t border-gray-200 lg:border-0">
            <div className="hidden lg:block mb-4">
              <h2 className="text-lg font-medium text-gray-900">Background Images</h2>
            </div>
            <ImageUploader isBackground />
          </div>
        </details>
      </div>

      {/* Tabs */}
      <Tabs
        activeTab={activeTab}
        onChange={(tab) => {
          console.log('Tab clicked:', tab);
          setActiveTab(tab);
        }}
        uploadedCount={uploadedCount}
        processedCount={processedCount}
      />

      {/* Image List */}
      <div className="mt-6">
        <ImageList type={activeTab} />
      </div>
    </div>
  );
}; 