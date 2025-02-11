import React from 'react';
import { BackgroundRemovalDashboard } from '../components/dashboard/features/background-removal/BackgroundRemovalDashboard';
import { useAuthStore } from '../store/useAuthStore';

export const Dashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="px-4 py-8">
      {user?.trialImagesLeft === 0 && user?.subscription === 'trial' ? (
        <div className="max-w-7xl mx-auto">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-yellow-800">
              You've used all your trial credits. 
              <a href="/pricing" className="font-medium underline ml-1">
                Upgrade to continue processing images
              </a>
            </p>
          </div>
        </div>
      ) : (
        <BackgroundRemovalDashboard />
      )}
    </div>
  );
};