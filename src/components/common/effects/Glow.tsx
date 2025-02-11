import React from 'react';

interface GlowProps {
  className?: string;
  color?: string;
}

export const Glow: React.FC<GlowProps> = ({ 
  className = '', 
  color = 'rgba(99, 102, 241, 0.2)' 
}) => {
  return (
    <div
      className={`absolute w-72 h-72 rounded-full blur-3xl animate-pulse ${className}`}
      style={{ backgroundColor: color }}
    />
  );
}; 