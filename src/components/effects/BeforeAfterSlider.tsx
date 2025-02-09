import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  showBackground?: boolean;
  beforeLabel?: string;
  afterLabel?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  className = '',
  showBackground = true,
  beforeLabel = 'Original',
  afterLabel = 'No Background'
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setPosition(percentage);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;
    handleMove(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const handleTouchEnd = () => {
    setIsResizing(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isResizing) return;
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isResizing]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{ 
        backgroundColor: showBackground ? '#f3f4f6' : 'transparent',
        touchAction: 'none'
      }}
    >
      {/* Bottom layer - "after" image */}
      <img
        src={afterImage}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Top layer - "before" image with clip mask */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - position}% 0 0)`,
        }}
      >
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: `${position}%`,
          transform: 'translateX(-50%)',
          cursor: 'ew-resize',
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute inset-y-0 w-0.5 bg-white/80" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gray-100/50" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 text-xs font-medium rounded-md backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 text-xs font-medium rounded-md backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
};