import React from 'react';
import { Loader, ArrowRight, RotateCcw } from 'lucide-react';

interface QuickPreviewProps {
  isProcessing: boolean;
  processedImage: string | null;
  onTryAgain: () => void;
  onContinue: () => void;
}

export const QuickPreview: React.FC<QuickPreviewProps> = ({
  isProcessing,
  processedImage,
  onTryAgain,
  onContinue,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 text-center">
      <div className="absolute -top-4 -left-4 bg-blue-500/20 w-24 h-24 rounded-full blur-2xl" />
      <div className="absolute -bottom-4 -right-4 bg-purple-500/20 w-24 h-24 rounded-full blur-2xl" />
      
      <div className="relative">
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="h-12 w-12 text-white animate-spin mb-4" />
            <p className="text-xl text-white font-medium">Removing background...</p>
            <p className="text-white/70 mt-2">This will only take a moment</p>
          </div>
        ) : processedImage ? (
          <div className="space-y-6">
            <div className="aspect-video relative rounded-lg overflow-hidden bg-black/20">
              <img
                src={processedImage}
                alt="Processed"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onTryAgain}
                className="inline-flex items-center justify-center px-6 py-3 border border-white/30 rounded-full text-white font-medium hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                Try Another
              </button>
              <button
                onClick={onContinue}
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-100 transition-colors"
              >
                Continue to Dashboard
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};