import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface DropZoneProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

export const DropZone: React.FC<DropZoneProps> = ({
  onDrop,
  accept = {
    'image/*': ['.png', '.jpg', '.jpeg'],
  },
  maxFiles = 1,
  maxSize,
  icon = <Upload className="h-8 w-8" />,
  title = 'Upload files',
  description = 'Drag & drop files here, or click to select',
  className = '',
  compact = false,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors',
        isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-500',
        compact ? 'p-4' : 'p-8',
        className
      )}
    >
      <input {...getInputProps()} />
      <div className={cn('text-gray-400', compact ? 'h-6 w-6' : 'h-12 w-12', 'mx-auto')}>
        {icon}
      </div>
      <p className={cn('mt-2 text-gray-600', compact ? 'text-sm' : 'text-lg')}>
        {isDragActive ? 'Drop the files here...' : title}
      </p>
      <p className="mt-2 text-sm text-gray-500">{description}</p>
    </div>
  );
}; 