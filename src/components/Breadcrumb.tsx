import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

interface BreadcrumbProps {
  title: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title }) => {
  return (
    <div className="sticky top-16 bg-white border-b z-10">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-1" />
            Back
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">{title}</span>
        </div>
      </div>
    </div>
  );
};