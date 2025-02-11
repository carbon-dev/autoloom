import React, { useState } from 'react';
import { cn } from '../../../utils/cn';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positions = {
    top: '-translate-x-1/2 -translate-y-full left-1/2 bottom-[calc(100%+5px)]',
    right: 'translate-y-[-50%] left-[calc(100%+5px)] top-1/2',
    bottom: '-translate-x-1/2 translate-y-full left-1/2 top-[calc(100%+5px)]',
    left: 'translate-y-[-50%] right-[calc(100%+5px)] top-1/2',
  };

  const arrows = {
    top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent',
    right: 'left-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent',
    bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent',
    left: 'right-[-4px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-sm whitespace-nowrap',
            positions[position],
            className
          )}
          role="tooltip"
        >
          {content}
          <div
            className={cn(
              'absolute border-4 border-gray-900',
              arrows[position]
            )}
          />
        </div>
      )}
    </div>
  );
}; 