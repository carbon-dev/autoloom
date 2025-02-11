import React from 'react';
import { BarChart3 } from 'lucide-react';

interface UsageData {
  used: number;
  total: number;
  percentage: number;
  periodStart: string;
  periodEnd: string;
}

export const UsageStats: React.FC = () => {
  const [usage] = React.useState<UsageData>({
    used: 75,
    total: 100,
    percentage: 75,
    periodStart: '2024-01-01',
    periodEnd: '2024-01-31',
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Usage This Month
        </h3>
        <BarChart3 className="h-5 w-5 text-gray-400" />
      </div>

      <div className="mt-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{usage.used}</span>
          <span className="ml-1 text-gray-500">/ {usage.total} images</span>
        </div>

        <div className="mt-4">
          <div className="relative">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
              <div
                style={{ width: `${usage.percentage}%` }}
                className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                  usage.percentage > 90
                    ? 'bg-red-500'
                    : usage.percentage > 75
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            {usage.total - usage.used} images remaining
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Current billing period:{' '}
            <span className="font-medium">
              {new Date(usage.periodStart).toLocaleDateString()} -{' '}
              {new Date(usage.periodEnd).toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}; 