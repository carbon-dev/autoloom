import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import { Grid } from '../effects/Grid';
import { Gradient } from '../effects/Gradient';
import { Glow } from '../effects/Glow';
import { GlowingBorder } from '../effects/GlowingBorder';
import { SignupModal } from '../auth/SignupModal';
import { useImageStore } from '../../store/useImageStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

export const QuickUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pendingFileRef = useRef<File | null>(null);
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const addImage = useImageStore((state) => state.addImage);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }
    
    try {
      if (isAuthenticated) {
        // If user is already logged in, add image and go to dashboard
        const objectUrl = URL.createObjectURL(file);
        addImage({
          id: Date.now().toString(),
          file,
          preview: objectUrl,
          status: 'pending'
        });
        navigate('/dashboard');
      } else {
        // Store the file and show signup modal
        pendingFileRef.current = file;
        setIsSignupModalOpen(true);
      }
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing file. Please try again.');
    }
  };

  const handleSignupSuccess = () => {
    if (pendingFileRef.current) {
      const file = pendingFileRef.current;
      const objectUrl = URL.createObjectURL(file);
      addImage({
        id: Date.now().toString(),
        file,
        preview: objectUrl,
        status: 'pending'
      });
      pendingFileRef.current = null;
      navigate('/dashboard');
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <GlowingBorder>
        <div
          className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-10 text-center cursor-pointer group overflow-hidden"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          role="button"
          tabIndex={0}
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
          
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
            aria-label="Upload image"
          />

          <div className="relative z-10">
            <div className="mb-4">
              <Upload 
                className="mx-auto h-12 w-12 text-indigo-600 animate-bounce" 
                style={{ animationDuration: '3s' }} 
              />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
              {dragActive ? 'Drop your image here...' : 'Try it now!'}
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

      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)}
        onSuccess={handleSignupSuccess}
      />
    </>
  );
};