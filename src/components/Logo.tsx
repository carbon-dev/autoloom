import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to="/" className={`flex items-center ${className}`}>
      {!imageError ? (
        <img
          src="/autoloom.png"
          alt="Autoloom"
          className="h-8 w-auto"
          onError={() => setImageError(true)}
        />
      ) : (
        <>
          <Scissors className="h-8 w-8 text-indigo-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">Autoloom</span>
        </>
      )}
    </Link>
  );
};