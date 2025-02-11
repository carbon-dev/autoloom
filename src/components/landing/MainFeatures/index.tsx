import React from 'react';
import { Grid } from '../../common/effects/Grid';
import { Gradient } from '../../common/effects/Gradient';
import { Glow } from '../../common/effects/Glow';
import { 
  Wand2, 
  Palette, 
  Layers, 
  Zap,
  CloudLightning,
  Droplets
} from 'lucide-react';

const features = [
  {
    icon: Wand2,
    title: 'One-Click Background Removal',
    description: 'Our AI automatically detects and removes backgrounds with professional precision.',
  },
  {
    icon: Palette,
    title: 'Custom Backgrounds',
    description: 'Choose from our library of backgrounds or upload your own branded designs.',
  },
  {
    icon: Layers,
    title: 'Batch Processing',
    description: 'Process multiple images at once to save time and maintain consistency.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get results in seconds, not minutes. Perfect for high-volume dealerships.',
  },
  {
    icon: CloudLightning,
    title: 'Cloud Storage',
    description: 'Access your processed images from anywhere, anytime.',
  },
  {
    icon: Droplets,
    title: 'Shadow & Reflection',
    description: 'Add natural-looking shadows and reflections for a professional finish.',
  },
];

export const MainFeatures: React.FC = () => {
  return (
    <div className="relative bg-white py-16 overflow-hidden">
      <Grid className="opacity-[0.02]" />
      <Gradient />
      <Glow className="left-1/4 top-1/4" />
      <Glow className="right-1/4 bottom-1/4" color="rgba(236, 72, 153, 0.2)" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to create stunning vehicle photos
          </h2>
          <p className="text-xl text-gray-600">
            Professional-grade tools designed specifically for automotive photography
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
              <feature.icon className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 