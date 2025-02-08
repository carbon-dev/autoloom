import React from 'react';
import { StatsGrid } from '../../components/dashboard/stats/StatsGrid';
import { RecentActivity } from '../../components/dashboard/activity/RecentActivity';

export const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here's an overview of your account.
        </p>
      </div>

      <StatsGrid />
      <RecentActivity />
    </div>
  );
};