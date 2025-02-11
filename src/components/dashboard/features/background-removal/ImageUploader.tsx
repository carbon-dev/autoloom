import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { useImageStore } from '../../../../store/useImageStore';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'link';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant, 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <button
      className={cn(
        variant === 'link' && 'text-indigo-600 hover:text-indigo-700 underline',
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
  isBackground?: boolean;
}

interface Image {
  id: string;
  file: File;
  preview: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  processedUrl?: string;
  error?: string;
  isBackground?: boolean;
}

interface ImageStore {
  images: Image[];
  backgroundImages: Image[];
  selectedBackground: Image | null;
  toastStatus: 'processing' | 'complete' | null;
  activeTab: 'uploaded' | 'processed';
  addImages: (files: File[], isBackground?: boolean) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  className = '',
  title,
  description,
  helpText = 'Support for JPG, PNG and WEBP (max 5MB)',
  isBackground = false
}) => {
  const addImages = useImageStore((state) => state.addImages);
  const [isDragging, setIsDragging] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      console.log('Accepted files:', acceptedFiles);
      // Convert FileList to Array to ensure we have all files
      const filesArray = Array.from(acceptedFiles);
      console.log('Files array:', filesArray);
      
      setSelectedFiles(prev => {
        const updated = [...prev, ...filesArray];
        console.log('Updated selected files:', updated.map(f => f.name));
        return updated;
      });
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: true,
  });

  // Add a direct file input handler as a backup
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      console.log('Files from input:', filesArray);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  React.useEffect(() => {
    setIsDragging(isDragActive);
  }, [isDragActive]);

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length > 0) {
      console.log('Uploading files:', selectedFiles.map(f => f.name));
      addImages(selectedFiles, isBackground);
      setSelectedFiles([]);
    }
  };

  // Cleanup URLs when component unmounts or files change
  React.useEffect(() => {
    return () => {
      selectedFiles.forEach(file => {
        if ('preview' in file) {
          URL.revokeObjectURL((file as any).preview);
        }
      });
    };
  }, [selectedFiles]);

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragging
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-gray-400',
          className
        )}
      >
        <input 
          {...getInputProps()}
          onChange={handleFileInput}
          multiple
          accept="image/*"
        />
        <div className="flex flex-col items-center">
          <Upload
            className={cn(
              'h-12 w-12 mb-4',
              isDragging ? 'text-indigo-500' : 'text-gray-400'
            )}
          />
          <p className="text-base font-medium text-gray-900">
            Drop your images here, or{' '}
            <Button variant="link" className="p-0">
              browse
            </Button>
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {helpText}
          </p>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {selectedFiles.map((file, index) => (
                <div 
                  key={`${file.name}-${index}`} 
                  className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Selected ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-sm hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <button
            onClick={handleUpload}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Upload {selectedFiles.length} Image{selectedFiles.length !== 1 ? 's' : ''}
          </button>
        </div>
      )}
    </div>
  );
}; 