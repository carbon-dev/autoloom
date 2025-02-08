import React from 'react';
import { cn } from '../../utils/cn';

interface GridProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  intensity?: 'light' | 'medium' | 'dark';
  fade?: 'none' | 'top' | 'bottom' | 'left' | 'right' | 'edges';
}

export const Grid: React.FC<GridProps> = ({ 
  className,
  size = 'md',
  intensity = 'light',
  fade = 'edges'
}) => {
  const sizeMap = {
    sm: '14px 14px',
    md: '24px 24px',
    lg: '48px 48px',
  };

  const intensityMap = {
    light: '#8882',
    medium: '#8883',
    dark: '#8885',
  };

  const fadeMap = {
    none: '',
    top: 'radial-gradient(ellipse 50% 50% at 50% 0%, #000, transparent)',
    bottom: 'radial-gradient(ellipse 50% 50% at 50% 100%, #000, transparent)',
    left: 'radial-gradient(ellipse 50% 50% at 0% 50%, #000, transparent)',
    right: 'radial-gradient(ellipse 50% 50% at 100% 50%, #000, transparent)',
    edges: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000, transparent)',
  };

  return (
    <div 
      className={cn(
        'absolute inset-0',
        'bg-[linear-gradient(to_right,var(--grid-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-color)_1px,transparent_1px)]',
        className
      )}
      style={{
        '--grid-color': intensityMap[intensity],
        backgroundSize: sizeMap[size],
        maskImage: fadeMap[fade],
        WebkitMaskImage: fadeMap[fade],
      } as React.CSSProperties}
    />
  );
};