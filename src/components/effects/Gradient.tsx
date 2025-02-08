import React from 'react';
import { cn } from '../../utils/cn';

interface GradientProps {
  className?: string;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export const Gradient: React.FC<GradientProps> = ({ 
  className, 
  children, 
  variant = 'primary' 
}) => {
  return (
    <div className={cn(
      'absolute inset-0 pointer-events-none',
      variant === 'primary' 
        ? 'bg-gradient-to-br from-indigo-500/30 via-purple-500/30 to-pink-500/30 blur-3xl opacity-20'
        : 'bg-gradient-to-br from-sky-500/30 via-blue-500/30 to-indigo-500/30 blur-3xl opacity-20',
      className
    )}>
      {children}
    </div>
  );
};