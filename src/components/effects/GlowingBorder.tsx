import React from 'react';
import { cn } from '../../utils/cn';

interface GlowingBorderProps {
  className?: string;
  children: React.ReactNode;
}

export const GlowingBorder: React.FC<GlowingBorderProps> = ({ className, children }) => {
  return (
    <div className={cn(
      'relative rounded-2xl p-px overflow-hidden group/border',
      'before:absolute before:inset-0',
      'before:bg-[linear-gradient(45deg,transparent_25%,rgba(68,68,68,.2)_50%,transparent_75%,transparent_100%)]',
      'before:bg-[length:250%_250%,100%_100%]',
      'before:animate-border-glow',
      'after:absolute after:inset-0',
      'after:bg-gradient-to-r after:from-indigo-500/50 after:via-purple-500/50 after:to-pink-500/50',
      'after:opacity-0 after:group-hover/border:opacity-100',
      'after:transition-opacity after:duration-500',
      className
    )}>
      <div className="relative bg-white rounded-2xl h-full">
        {children}
      </div>
    </div>
  );
};