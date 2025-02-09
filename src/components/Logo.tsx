import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to="/" className={`inline-flex items-center ${className}`}>
      {!imageError ? (
        <div className="h-7 relative">
          <img
            src="/autoloom.png"
            alt="Autoloom"
            className="h-full w-auto object-contain"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <>
          <Scissors className="h-7 w-7 text-indigo-600" />
          <span className="ml-2 text-lg font-bold text-gray-900">Autoloom</span>
        </>
      )}
    </Link>
  );
};