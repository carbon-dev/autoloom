import React from 'react';
import { cn } from '../../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'link';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        {
          'bg-indigo-600 text-white hover:bg-indigo-700': variant === 'primary',
          'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50': variant === 'secondary',
          'text-indigo-600 hover:text-indigo-700': variant === 'link',
          'px-2.5 py-1.5 text-sm': size === 'sm',
          'px-3 py-2 text-sm': size === 'md',
          'px-4 py-2.5 text-base': size === 'lg',
        },
        className
      )}
      {...props}
    />
  );
}; 