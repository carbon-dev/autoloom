import React, { useState } from 'react';
import { Zap, Image as ImageIcon, Clock, Shield, Layers, Cloud } from 'lucide-react';
import { SignupModal } from '../auth/SignupModal';
import { Grid } from '../effects/Grid';
import { Gradient } from '../effects/Gradient';
import { Glow } from '../effects/Glow';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Our optimized AI engine processes images in seconds, so you can focus on the next sale.',
    delay: 0,
  },
  {
    icon: ImageIcon,
    title: 'Pixel Perfect',
    description: 'Get precise edge detection and natural-looking results.',
    delay: 1000,
  },
  {
    icon: Clock,
    title: 'Bulk Processing',
    description: 'Handle hundreds of images simultaneously, saving hours every week.',
    delay: 2000,
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Your images are processed with security in mind.',
    delay: 3000,
  },
  {
    icon: Layers,
    title: 'Library Access',
    description: 'Access your uploads at any time to swap backgrounds or branding.',
    delay: 4000,
  },
  {
    icon: Cloud,
    title: 'Cloud Storage',
    description: 'Access your processed images anywhere, anytime.',
    delay: 5000,
  },
];

export const MainFeatures: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative bg-gradient-to-br from-sky-50 to-indigo-50 py-16">
      <Grid className="opacity-[0.02]" />
      <Gradient variant="secondary" />
      <Glow className="left-1/4 top-1/4" />
      <Glow className="right-1/4 bottom-1/4" color="rgba(56, 189, 248, 0.2)" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Your photos should be your best salesperson</h2>
          <p className="text-xl text-gray-600">Features you need, none of the fluff.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <feature.icon 
                  className="h-12 w-12 text-indigo-600 mb-4 transition-all duration-500"
                  style={{
                    animation: `iconFloat 3s ease-in-out ${feature.delay}ms infinite`,
                  }}
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-900 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-all duration-300 hover:scale-105"
          >
            Get Started Free
          </button>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        @keyframes iconFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};