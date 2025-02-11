import React from 'react';
import { Image, Clock, Images } from 'lucide-react';

interface StatsProps {
  items: Array<{
    name: string;
    value: string;
    icon: string;
  }>;
}

const iconMap = {
  Image: Image,
  Clock: Clock,
  Images: Images,
};

export const Stats: React.FC<StatsProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {items.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <div key={item.name} className="flex items-center gap-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{item.name}</p>
              <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}; 