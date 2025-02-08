import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { useImageStore } from '../store/useImageStore';

interface ImageUploaderProps {
  isBackground?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ isBackground = false }) => {
  const addImages = useImageStore((state) => state.addImages);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addImages(acceptedFiles, isBackground);
    },
    [addImages, isBackground]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    multiple: true,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 transition-colors ${
        isBackground ? 'p-4' : ''
      }`}
    >
      <input {...getInputProps()} />
      <Upload className={`mx-auto text-gray-400 ${isBackground ? 'h-6 w-6' : 'h-12 w-12'}`} />
      <p className={`mt-2 text-gray-600 ${isBackground ? 'text-sm' : 'text-lg'}`}>
        {isDragActive
          ? 'Drop the images here...'
          : `Drag & drop ${isBackground ? 'background ' : ''}images here, or click to select files`}
      </p>
      <p className="mt-2 text-sm text-gray-500">Supports PNG, JPG, JPEG</p>
    </div>
  );
};