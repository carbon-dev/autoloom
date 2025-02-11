import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  className?: string;
  label?: string;
  description?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onDrop,
  accept,
  maxFiles = 1,
  maxSize,
  disabled = false,
  className = '',
  label = 'Upload a file',
  description = 'Drag & drop a file here, or click to select',
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    maxSize,
    disabled,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer',
        isDragActive
          ? 'border-indigo-500 bg-indigo-50'
          : 'border-gray-300 hover:border-indigo-500',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <input {...getInputProps()} />
      <Upload
        className={cn(
          'w-12 h-12 mb-4',
          isDragActive ? 'text-indigo-500' : 'text-gray-400'
        )}
      />
      <p className="mb-2 text-sm font-medium text-gray-900">{label}</p>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}; 