import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
  beforeLabel?: string;
  afterLabel?: string;
  showBackground?: boolean;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  className = '',
  beforeLabel = 'Before',
  afterLabel = 'After',
  showBackground = true,
}) => {
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setPosition(percentage);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setPosition(percentage);
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image */}
      <div className="absolute inset-0">
        <img
          src={beforeImage}
          alt="Before"
          className="w-full h-full object-cover rounded-lg"
        />
        {beforeLabel && (
          <span className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {beforeLabel}
          </span>
        )}
      </div>

      {/* After Image */}
      <div
        className="absolute inset-0 overflow-hidden rounded-lg"
        style={{ width: `${position}%` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute top-0 right-0 h-full object-cover"
          style={{
            width: `${100 / (position / 100)}%`,
            maxWidth: 'none',
          }}
        />
        {afterLabel && (
          <span className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
            {afterLabel}
          </span>
        )}
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: `${position}%` }}
        onMouseDown={() => setIsResizing(true)}
        onTouchStart={() => setIsResizing(true)}
      >
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_5px_rgba(0,0,0,0.3)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-[0_0_5px_rgba(0,0,0,0.3)] cursor-ew-resize">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-1 h-4 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}; 