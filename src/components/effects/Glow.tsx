import React from 'react';
import { cn } from '../../utils/cn';

interface GlowProps {
  className?: string;
  color?: string;
}

export const Glow: React.FC<GlowProps> = ({ 
  className,
  color = 'rgba(99, 102, 241, 0.3)' // Indigo by default
}) => {
  return (
    <div
      className={cn(
        'absolute -z-10 transform-gpu overflow-hidden blur-3xl',
        className
      )}
      aria-hidden="true"
    >
      <div
        className="relative aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  );
};