import React from 'react';

const stats = [
  { number: '10M+', label: 'Images Processed' },
  { number: '99.9%', label: 'Accuracy Rate' },
  { number: '50K+', label: 'Happy Users' },
  { number: '24/7', label: 'Support' },
];

export const Stats: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-sky-100 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold mb-2 text-indigo-600">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};