import React from 'react';
import { PageHeader } from '../shared/PageHeader';
import { Card, CardContent } from '../shared/Card';
import { Stats } from '../shared/Stats';
import { useAuthStore } from '../../../store/useAuthStore';

export const DashboardOverview: React.FC = () => {
  const user = useAuthStore((state) => state.user);

  const stats = [
    { name: 'Images Processed', value: '0', icon: 'Image' },
    { name: 'Trial Images Left', value: '5', icon: 'Images' },
    { name: 'Images Pending', value: '0', icon: 'Clock' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Dashboard"
        description="Welcome back! Here's an overview of your account."
      />
      
      <div className="mt-6">
        <Card>
          <CardContent>
            <Stats items={stats} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 