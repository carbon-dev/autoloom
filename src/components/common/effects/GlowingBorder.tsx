import React from 'react';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
}

export const GlowingBorder: React.FC<GlowingBorderProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
      {children}
    </div>
  );
}; 