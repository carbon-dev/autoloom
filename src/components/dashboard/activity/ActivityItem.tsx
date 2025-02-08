import React from 'react';
import { ImageFile } from '../../../types';

interface ActivityItemProps {
  image: ImageFile;
}

export const ActivityItem: React.FC<ActivityItemProps> = ({ image }) => {
  return (
    <li className="py-5">
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 flex-shrink-0">
          <img
            src={image.preview}
            alt=""
            className="h-12 w-12 rounded-lg object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {image.file.name}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(image.file.lastModified).toLocaleDateString()}
          </p>
        </div>
        <div>
          <StatusBadge status={image.status} />
        </div>
      </div>
    </li>
  );
};

const StatusBadge: React.FC<{ status: ImageFile['status'] }> = ({ status }) => {
  const styles = {
    completed: 'bg-green-100 text-green-800',
    processing: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
        styles[status]
      }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};