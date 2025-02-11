import React from 'react';
import { cn } from '../../utils/cn';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <svg
        className="h-8 w-auto"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="8" fill="#4F46E5" />
        <path
          d="M20 10L28.6603 25H11.3397L20 10Z"
          fill="white"
          fillOpacity="0.8"
        />
        <path
          d="M20 30L11.3397 15H28.6603L20 30Z"
          fill="white"
        />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-900">
        ImageAI
      </span>
    </div>
  );
}; 