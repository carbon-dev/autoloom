import React from 'react';

interface GlowingBorderProps {
  children: React.ReactNode;
}

export const GlowingBorder: React.FC<GlowingBorderProps> = ({ children }) => {
  return (
    <div className="relative">
      {/* Animated border */}
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
        <div className="absolute inset-[-50%] animate-border-flow">
          <div className="absolute h-[200%] w-[200%] bg-[length:50%_50%] bg-no-repeat"
               style={{
                 backgroundImage: `
                   linear-gradient(to right, transparent, transparent 45%, rgba(99, 102, 241, 0.5) 50%, transparent 55%, transparent),
                   linear-gradient(to bottom, transparent, transparent 45%, rgba(99, 102, 241, 0.5) 50%, transparent 55%, transparent)
                 `
               }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="relative">
        {children}
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes border-flow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-border-flow {
          animation: border-flow 4s linear infinite;
        }
      `}</style>
    </div>
  );
};