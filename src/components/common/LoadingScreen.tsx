import React from 'react';
import { Logo } from './Logo';
import { Spinner } from '../dashboard/shared/Spinner';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Logo className="mb-8" />
      <Spinner size="lg" />
      <p className="mt-4 text-sm text-gray-500">Loading...</p>
    </div>
  );
}; 