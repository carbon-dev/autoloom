import React, { useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ImageList } from '../components/ImageList';
import { ProcessButton } from '../components/ProcessButton';
import { Tabs } from '../components/dashboard/Tabs';
import { BackgroundSelector } from '../components/dashboard/BackgroundSelector';
import { useAuthStore } from '../store/useAuthStore';
import { useImageStore } from '../store/useImageStore';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'uploaded' | 'processed'>('uploaded');
  const user = useAuthStore((state) => state.user);
  const images = useImageStore((state) => state.images);

  const uploadedCount = images.filter((img) => img.status === 'pending').length;
  const processedCount = images.filter((img) => img.status === 'completed').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <div className="flex space-x-4">
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
            <p className="text-sm text-gray-600">Trial Images Left</p>
            <p className="text-2xl font-bold text-indigo-600">{user?.trialImagesLeft}</p>
          </div>
          <div className="bg-white rounded-lg px-4 py-2 shadow-sm">
            <p className="text-sm text-gray-600">Images Processed</p>
            <p className="text-2xl font-bold text-gray-900">{user?.processedImages}</p>
          </div>
        </div>
      </div>

      {user?.trialImagesLeft === 0 && user?.subscription === 'trial' ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <p className="text-yellow-800">
            You've used all your trial credits. 
            <a href="/pricing" className="font-medium underline ml-1">
              Upgrade to continue processing images
            </a>
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {activeTab === 'uploaded' && <ImageUploader />}
              <div className="flex justify-end mt-4">
                {activeTab === 'uploaded' && uploadedCount > 0 && <ProcessButton />}
              </div>
            </div>
            <BackgroundSelector />
          </div>
          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            uploadedCount={uploadedCount}
            processedCount={processedCount}
          />
          <ImageList type={activeTab} />
        </div>
      )}
    </div>
  );
};