import React from 'react';
import { cn } from '../../utils/cn';

interface TabsProps {
  activeTab: 'uploaded' | 'processed';
  onChange: (tab: 'uploaded' | 'processed') => void;
  uploadedCount: number;
  processedCount: number;
}

export const Tabs: React.FC<TabsProps> = ({
  activeTab,
  onChange,
  uploadedCount,
  processedCount,
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex space-x-8" aria-label="Tabs">
        <button
          onClick={() => onChange('uploaded')}
          className={cn(
            'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
            activeTab === 'uploaded'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          Uploaded Images
          {uploadedCount > 0 && (
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full">
              {uploadedCount}
            </span>
          )}
        </button>
        <button
          onClick={() => onChange('processed')}
          className={cn(
            'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
            activeTab === 'processed'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          )}
        >
          Processed Images
          {processedCount > 0 && (
            <span className="ml-2 bg-gray-100 text-gray-600 py-0.5 px-2 rounded-full">
              {processedCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};