import React from 'react';
import { cn } from '../../../utils/cn';

interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const SpotlightButton: React.FC<SpotlightButtonProps> = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <button
      className={cn(
        'group relative inline-flex items-center overflow-hidden rounded-lg px-6 py-3 transition-all duration-300',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 rounded-lg transition-all duration-300 group-hover:bg-white/10" />
      <div className="absolute -inset-full rounded-full bg-white/20 transition-all duration-500 group-hover:inset-0" />
      <span className="relative flex items-center gap-2">{children}</span>
    </button>
  );
}; 