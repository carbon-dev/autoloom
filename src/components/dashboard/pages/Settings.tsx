import React from 'react';
import { PageHeader } from '../shared/PageHeader';
import { Card, CardContent } from '../shared/Card';
import { useAuthStore } from '../../../store/useAuthStore';

export const Settings: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Settings"
        description="Manage your account settings and preferences."
      />
      
      <div className="mt-6 space-y-6">
        <Card>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Account Information</h3>
                <div className="mt-3 space-y-2">
                  <p className="text-sm text-gray-500">Email: {user?.email}</p>
                  <p className="text-sm text-gray-500">Subscription: {user?.subscription}</p>
                  <p className="text-sm text-gray-500">Trial Images Left: {user?.trialImagesLeft}</p>
                  <p className="text-sm text-gray-500">Total Processed Images: {user?.processedImages}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 