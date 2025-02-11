import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.slice(
    Math.max(0, currentPage - 2),
    Math.min(totalPages, currentPage + 1)
  );

  return (
    <nav
      className={cn('flex items-center justify-between border-t border-gray-200 px-4 sm:px-0', className)}
      aria-label="Pagination"
    >
      <div className="-mt-px flex w-0 flex-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={cn(
            'inline-flex items-center border-t-2 pt-4 pr-1 text-sm font-medium',
            currentPage === 1
              ? 'border-transparent text-gray-400 cursor-not-allowed'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          )}
        >
          <ChevronLeft className="mr-3 h-5 w-5" aria-hidden="true" />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {showPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={cn(
              'inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium',
              page === currentPage
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            )}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={cn(
            'inline-flex items-center border-t-2 pt-4 pl-1 text-sm font-medium',
            currentPage === totalPages
              ? 'border-transparent text-gray-400 cursor-not-allowed'
              : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
          )}
        >
          Next
          <ChevronRight className="ml-3 h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}; 