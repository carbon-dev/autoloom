import React from 'react';
import { ImageUploader } from './ImageUploader';
import { ImageLibrary } from './ImageLibrary';
import { useAuthStore } from '../../../../store/useAuthStore';
import { useImageStore } from '../../../../store/useImageStore';
import { cn } from '../../../../utils/cn';

interface Image {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  processedUrl?: string;
  error?: string;
  isBackground?: boolean;
}

interface ImageStore {
  images: Image[];
  backgroundImages: Image[];
  selectedBackground: Image | null;
  toastStatus: 'processing' | 'complete' | null;
  activeTab: 'uploaded' | 'processed';
  processImages: () => Promise<void>;
  setActiveTab: (tab: 'uploaded' | 'processed') => void;
}

interface TabProps {
  label: string;
  count?: number;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, count, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={cn(
      'px-4 py-2 text-sm font-medium rounded-lg',
      isActive
        ? 'bg-indigo-50 text-indigo-700'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
    )}
  >
    {label}
    {count !== undefined && (
      <span className={cn(
        'ml-2 px-2 py-0.5 rounded-full text-xs',
        isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-600'
      )}>
        {count}
      </span>
    )}
  </button>
);

export const BackgroundRemovalDashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const images = useImageStore((state) => state.images);
  const backgroundImages = useImageStore((state) => state.backgroundImages);
  const activeTab = useImageStore((state) => state.activeTab);
  const setActiveTab = useImageStore((state) => state.setActiveTab);
  
  const pendingCount = images.filter(img => img.status === 'pending').length;
  const processedCount = images.filter(img => img.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="mt-1 text-sm text-gray-600">
          Remove backgrounds from your images and customize them with new backgrounds
        </p>
      </div>

      <div className="mb-6 flex space-x-2">
        <Tab
          label="Upload"
          isActive={activeTab === 'uploaded'}
          onClick={() => setActiveTab('uploaded')}
        />
        <Tab
          label="My Images"
          count={pendingCount + processedCount}
          isActive={activeTab === 'processed'}
          onClick={() => setActiveTab('processed')}
        />
      </div>

      {activeTab === 'uploaded' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Source Images Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Images to Process</h3>
                  <p className="text-sm text-gray-500">Trial Images Left: {user?.trialImagesLeft}</p>
                </div>
              </div>
            </div>

            <ImageUploader
              title="Upload Images"
              description="Select the images you want to remove backgrounds from"
              helpText="Drop your images here, or click to browse (PNG, JPG, JPEG up to 5MB)"
              isBackground={false}
            />
          </div>

          {/* Background Images Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Background Images</h3>
                  <p className="text-sm text-gray-500">{backgroundImages.length} Background{backgroundImages.length !== 1 ? 's' : ''} Available</p>
                </div>
              </div>
            </div>

            <ImageUploader
              title="Background Images"
              description="Upload images to use as new backgrounds for your processed images"
              helpText="Drop background images here, or click to browse (PNG, JPG, JPEG up to 5MB)"
              isBackground={true}
            />
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <ImageLibrary />
        </div>
      )}
    </div>
  );
}; 