import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useImageStore } from '../../store/useImageStore';
import { useAuthStore } from '../../store/useAuthStore';
import { QuickPreview } from './QuickPreview';
import { SignupModal } from '../auth/SignupModal';
import { Grid } from '../effects/Grid';
import { Gradient } from '../effects/Gradient';
import { Glow } from '../effects/Glow';
import { GlowingBorder } from '../effects/GlowingBorder';

export const QuickUpload: React.FC = () => {
  const navigate = useNavigate();
  const addImages = useImageStore((state) => state.addImages);
  const updateImageStatus = useImageStore((state) => state.updateImageStatus);
  const login = useAuthStore((state) => state.login);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const processImage = async (file: File, imageId: string) => {
    setIsProcessing(true);
    updateImageStatus(imageId, 'processing');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const processedImageUrl = URL.createObjectURL(file);
      updateImageStatus(imageId, 'completed', processedImageUrl);
      setProcessedImage(processedImageUrl);
    } catch (error) {
      updateImageStatus(imageId, 'error', undefined, 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContinue = () => {
    setIsSignupModalOpen(true);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const tempEmail = `trial_${Math.random().toString(36).substring(7)}@anonymous.com`;
      login(tempEmail);
      
      const imageId = Math.random().toString(36).substring(7);
      const preview = URL.createObjectURL(file);
      
      addImages([file]);
      await processImage(file, imageId);
    },
    [addImages, login]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
    maxFiles: 1,
    disabled: isProcessing,
  });

  if (isProcessing || processedImage) {
    return (
      <>
        <QuickPreview 
          isProcessing={isProcessing}
          processedImage={processedImage}
          onTryAgain={() => {
            setProcessedImage(null);
            setIsProcessing(false);
          }}
          onContinue={handleContinue}
        />
        <SignupModal 
          isOpen={isSignupModalOpen} 
          onClose={() => {
            setIsSignupModalOpen(false);
            navigate('/dashboard');
          }} 
        />
      </>
    );
  }

  return (
    <GlowingBorder>
      <div
        {...getRootProps()}
        className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 text-center cursor-pointer group overflow-hidden"
      >
        {/* Background Effects */}
        <Grid className="opacity-[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute -top-4 -left-4 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        {/* Animated Gradient Background */}
        <div 
          className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(45deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2), rgba(236,72,153,0.2))',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
          }}
        />
        
        <div className="relative">
          <div className="mb-6 relative">
            <Upload 
              className="mx-auto h-16 w-16 text-indigo-600 animate-bounce" 
              style={{ animationDuration: '3s' }} 
            />
            <ImageIcon 
              className="mx-auto h-12 w-12 text-indigo-500 animate-pulse" 
            />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
            {isDragActive ? 'Drop your image here...' : 'Try it now!'}
          </h3>
          <p className="text-lg text-gray-600 mb-4 group-hover:text-gray-900 transition-colors">
            Drag & drop or click to upload an image
          </p>
          <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
            No signup required
          </p>
        </div>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}</style>
      </div>
    </GlowingBorder>
  );
};