import React from 'react';

interface StatCardProps {
  name: string;
  value: number;
}

export const StatCard: React.FC<StatCardProps> = ({ name, value }) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow-sm ring-1 ring-gray-200/50">
      <dt className="truncate text-sm font-medium text-gray-500">{name}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
    </div>
  );
};