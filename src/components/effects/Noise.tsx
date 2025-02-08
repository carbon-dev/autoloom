import React from 'react';
import { cn } from '../../utils/cn';

interface NoiseProps {
  className?: string;
  opacity?: number;
}

export const Noise: React.FC<NoiseProps> = ({ 
  className,
  opacity = 0.4
}) => {
  return (
    <div 
      className={cn(
        'absolute inset-0 bg-repeat pointer-events-none',
        className
      )}
      style={{
        opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }}
    />
  );
};