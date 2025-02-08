import React from 'react';
import { useImageStore } from '../store/useImageStore';
import { Toast } from './Toast';

export const GlobalToast = () => {
  const toastStatus = useImageStore((state) => state.toastStatus);

  if (!toastStatus) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-[9999]">
      <Toast status={toastStatus} />
    </div>
  );
}; 