import React from 'react';

interface GradientProps {
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Gradient: React.FC<GradientProps> = ({ variant = 'primary', className = '' }) => {
  const gradientClasses = {
    primary: 'from-indigo-500/20 via-purple-500/20 to-pink-500/20',
    secondary: 'from-blue-500/20 via-cyan-500/20 to-teal-500/20',
  };

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-br ${gradientClasses[variant]} opacity-30 ${className}`}
    />
  );
}; 