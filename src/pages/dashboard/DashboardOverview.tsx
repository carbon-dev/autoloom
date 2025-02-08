import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, Clock, Images } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const DashboardOverview = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const stats = [
    { name: 'Images Processed', value: '0', icon: ImageIcon },
    { name: 'Trial Images Left', value: '5', icon: Images },
    { name: 'Images Pending', value: '0', icon: Clock },
  ];

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Welcome back! Here's an overview of your account.</p>
      </div>

      {/* Stats Grid - More compact */}
      <div className="flex gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white px-4 py-3 rounded-lg shadow-sm border border-gray-100 flex-1 max-w-[180px]"
          >
            <div className="flex items-center text-gray-600 mb-1">
              <stat.icon className="h-4 w-4" />
            </div>
            <div className="text-xl font-semibold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-600 truncate">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Upload CTA */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Start Removing Backgrounds</h2>
            <p className="mt-1 text-sm text-indigo-100">
              Upload your first image.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/remove-background')}
            className="ml-4 bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition-colors whitespace-nowrap"
          >
            Upload Your First Image
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <h3 className="font-medium text-gray-900">Recent Activity</h3>
        <div className="mt-2 text-sm text-gray-600">
          No recent activity to show.
        </div>
      </div>
    </div>
  );
};