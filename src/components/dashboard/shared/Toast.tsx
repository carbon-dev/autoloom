import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useToastStore } from './useToast';

interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: 'default' | 'success' | 'error';
  duration?: number;
}

export const ToastContainer: React.FC = () => {
  const toasts = useToastStore((state: { toasts: Toast[] }) => state.toasts);
  const removeToast = useToastStore((state: { removeToast: (id: string) => void }) => state.removeToast);

  return (
    <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
      {toasts.map((toast: Toast) => (
        <div
          key={toast.id}
          className={cn(
            'bg-white rounded-lg shadow-lg p-4 max-w-sm w-full transform transition-all duration-300 ease-in-out',
            'border border-gray-200',
            'animate-slide-in-right'
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">
                {toast.title}
              </h3>
              {toast.description && (
                <p className="mt-1 text-sm text-gray-500">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}; 