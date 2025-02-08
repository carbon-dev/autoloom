import React from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  showBackground?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  className = '',
  showBackground = true,
}) => {
  return (
    <div className={`grid grid-cols-2 gap-2 rounded-xl overflow-hidden h-[280px] ${className}`}>
      <div className="relative h-full">
        <img
          src={beforeImage}
          alt="Original"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          Original
        </div>
      </div>
      
      <div className="relative h-full">
        <img
          src={afterImage}
          alt="No Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          No Background
        </div>
      </div>
    </div>
  );
};