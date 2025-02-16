import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { useImageStore } from '../../stores/useImageStore';
import { useToast } from '../../shared/useToast';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg font-medium transition-colors',
        variant === 'primary' && 'bg-indigo-600 text-white hover:bg-indigo-700',
        variant === 'secondary' && 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

interface ImageUploaderProps {
  className?: string;
  title: string;
  description: string;
  helpText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  className = '',
  title,
  description,
  helpText = 'Support for JPG, PNG and WEBP (max 5MB)'
}) => {
  const addImages = useImageStore((state) => state.addImages);
  const { toast } = useToast();
  const [previewFiles, setPreviewFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log('Accepted files:', acceptedFiles);
      // Create object URLs for previews while preserving existing ones
      const urls = acceptedFiles.map(file => URL.createObjectURL(file));
      setPreviewFiles(prev => [...prev, ...acceptedFiles]);
      setPreviewUrls(prev => [...prev, ...urls]);
    },
    []
  );

  const handleUpload = () => {
    if (previewFiles.length > 0) {
      console.log('Uploading files:', previewFiles.length);
      // Add images to store first
      addImages(previewFiles);
      
      // Show processing toast notification
      toast({
        title: 'Processing images',
        description: 'Your images are being processed. This may take a few moments.',
      });

      // Clear local preview state
      previewUrls.forEach(url => URL.revokeObjectURL(url));
      setPreviewFiles([]);
      setPreviewUrls([]);
    }
  };

  const removePreview = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setPreviewFiles(files => files.filter((_, i) => i !== index));
    setPreviewUrls(urls => urls.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
  });

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div
        {...getRootProps()}
        className={cn(
          'relative rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors cursor-pointer',
          isDragActive && 'border-indigo-500 bg-indigo-50',
          'hover:border-indigo-500 hover:bg-indigo-50'
        )}
      >
        <input {...getInputProps()} />
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
          <p className="mt-1 text-xs text-gray-400">{helpText}</p>
        </div>
      </div>

      {previewUrls.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {previewUrls.map((url, index) => (
              <div
                key={index}
                className="relative group aspect-square overflow-hidden rounded-lg border border-gray-200"
              >
                <img
                  src={url}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity" />
                <button
                  onClick={() => removePreview(index)}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button onClick={handleUpload}>
              Upload {previewFiles.length} {previewFiles.length === 1 ? 'Image' : 'Images'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 