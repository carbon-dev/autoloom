import React from 'react';
import { ActivityItem } from './ActivityItem';
import { useImageStore } from '../../../store/useImageStore';

export const RecentActivity: React.FC = () => {
  const images = useImageStore((state) => state.images);

  return (
    <div className="rounded-lg bg-white shadow-sm ring-1 ring-gray-200/50">
      <div className="p-6">
        <h2 className="text-base font-semibold text-gray-900">
          Recent Activity
        </h2>
        {images.length > 0 ? (
          <div className="mt-6 flow-root">
            <ul className="-my-5 divide-y divide-gray-200">
              {images.slice(0, 5).map((image) => (
                <ActivityItem key={image.id} image={image} />
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            No recent activity to show.
          </p>
        )}
      </div>
    </div>
  );
};