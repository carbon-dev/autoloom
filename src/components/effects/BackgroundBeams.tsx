import React from 'react';
import { cn } from '../../utils/cn';

interface BackgroundBeamsProps {
  className?: string;
}

export const BackgroundBeams: React.FC<BackgroundBeamsProps> = ({ className }) => {
  return (
    <div className={cn(
      'absolute inset-0 overflow-hidden',
      className
    )}>
      <div className="absolute -top-[40%] -left-[40%] w-[180%] h-[180%] rotate-12">
        <div className="absolute w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[20%] bg-indigo-500/30 blur-[120px] rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[30%] bg-sky-500/20 blur-[120px] rounded-full rotate-45" />
        </div>
      </div>
    </div>
  );
};