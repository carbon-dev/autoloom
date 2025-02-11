import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../../../utils/cn';

interface ProcessingStatusProps {
  status: 'idle' | 'processing';
  className?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ 
  status,
  className = ''
}) => {
  if (status === 'idle') return null;

  return (
    <div className={cn('flex items-center justify-center py-4', className)}>
      <Loader2 className="h-5 w-5 animate-spin text-indigo-600 mr-2" />
      <span className="text-sm text-gray-600">Processing images...</span>
    </div>
  );
}; 