import React from 'react';
import { Grid } from '../../common/effects/Grid';
import { Gradient } from '../../common/effects/Gradient';
import { Glow } from '../../common/effects/Glow';
import { Clock, DollarSign, Camera } from 'lucide-react';

const valueProps = [
  {
    icon: Clock,
    title: 'Save Time',
    description: 'Process hundreds of images in minutes, not hours. Our AI handles the tedious work so you can focus on selling.',
  },
  {
    icon: DollarSign,
    title: 'Increase Revenue',
    description: 'Better photos lead to more inquiries and faster sales. Stand out from the competition with professional imagery.',
  },
  {
    icon: Camera,
    title: 'No Equipment Needed',
    description: 'Skip the expensive photo equipment and studio setup. Get professional results with just your smartphone camera.',
  },
];

export const ValueProps: React.FC = () => {
  return (
    <div className="relative bg-white py-16 overflow-hidden">
      <Grid className="opacity-[0.02]" />
      <Gradient variant="secondary" />
      <Glow className="left-1/4 top-1/4" color="rgba(56, 189, 248, 0.2)" />
      <Glow className="right-1/4 bottom-1/4" color="rgba(56, 189, 248, 0.2)" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Focus on what matters: selling cars
          </h2>
          <p className="text-xl text-gray-600">
            Let us handle the image editing while you handle the deals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueProps.map((prop, index) => (
            <div
              key={index}
              className="relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <prop.icon className="h-8 w-8 text-cyan-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {prop.title}
              </h3>
              <p className="text-gray-600">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 