import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../dashboard/shared/Button';
import { cn } from '../../utils/cn';

interface CTASectionProps {
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({ className = '' }) => {
  return (
    <div className={cn('bg-white', className)}>
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Start removing backgrounds today
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
            Join thousands of satisfied users who trust our AI-powered tool for their image editing needs.
            Try it free today!
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/signup">
              <Button size="lg">
                Get started for free
              </Button>
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-semibold leading-6 text-white"
            >
              View pricing <span aria-hidden="true">→</span>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#gradient)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#4F46E5" />
                <stop offset={1} stopColor="#4F46E5" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}; 