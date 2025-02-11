import React from 'react';
import { cn } from '../../../utils/cn';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
    />
  );
};

export const SkeletonText: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <Skeleton className={cn('h-4 w-full', className)} />;
};

export const SkeletonCircle: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <Skeleton className={cn('h-12 w-12 rounded-full', className)} />;
};

export const SkeletonButton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return <Skeleton className={cn('h-10 w-24', className)} />;
}; 