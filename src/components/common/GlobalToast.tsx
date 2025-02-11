import React from 'react';
import { useImageStore } from '../../store/useImageStore';

export const GlobalToast: React.FC = () => {
  const toastStatus = useImageStore((state) => state.toastStatus);

  if (!toastStatus) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center space-x-3">
      {toastStatus === 'processing' ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600" />
          <p className="text-gray-600">Processing images...</p>
        </>
      ) : (
        <>
          <div className="h-4 w-4 rounded-full bg-green-500" />
          <p className="text-gray-600">All images processed!</p>
        </>
      )}
    </div>
  );
}; 