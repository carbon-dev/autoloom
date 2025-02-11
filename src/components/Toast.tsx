import React from 'react';
import { Loader2, Check } from 'lucide-react';

interface ToastProps {
  status: 'processing' | 'complete';
  count?: number;
}

export const Toast: React.FC<ToastProps> = ({ status, count = 1 }) => {
  return (
    <div className="bg-white rounded-full shadow-lg border border-gray-100 py-3 px-4 flex items-center gap-3">
      {status === 'processing' ? (
        <>
          <Loader2 className="h-4 w-4 text-indigo-600 animate-spin" />
          <span className="text-sm text-gray-700">
            Processing {count} image{count !== 1 ? 's' : ''}...
          </span>
        </>
      ) : (
        <>
          <div className="bg-green-50 rounded-full p-1">
            <Check className="h-3 w-3 text-green-600" />
          </div>
          <span className="text-sm text-gray-700">
            {count} image{count !== 1 ? 's' : ''} uploaded successfully
          </span>
        </>
      )}
    </div>
  );
}; 