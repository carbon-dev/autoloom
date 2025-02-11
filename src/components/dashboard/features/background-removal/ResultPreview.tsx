import React from 'react';
import { Download } from 'lucide-react';
import { cn } from '../../../../utils/cn';
import { PreviewImage } from '../../shared/PreviewImage';
import { Button } from '../../shared/Button';

interface ResultPreviewProps {
  originalImage: string;
  processedImage: string;
  onDownload: () => void;
  className?: string;
}

export const ResultPreview: React.FC<ResultPreviewProps> = ({
  originalImage,
  processedImage,
  onDownload,
  className = '',
}) => {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Original Image</h3>
          <PreviewImage
            src={originalImage}
            alt="Original image"
            aspectRatio="4/3"
            objectFit="contain"
            className="bg-gray-100 border border-gray-200"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-2">Processed Image</h3>
          <PreviewImage
            src={processedImage}
            alt="Processed image"
            aspectRatio="4/3"
            objectFit="contain"
            className="bg-[url('/checkered-pattern.svg')] border border-gray-200"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onDownload}
          leftIcon={<Download className="h-4 w-4" />}
        >
          Download Result
        </Button>
      </div>
    </div>
  );
}; 