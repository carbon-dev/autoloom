import React, { useState, useEffect } from 'react';
import { SignupModal } from '../../auth/SignupModal';
import { Grid } from '../../common/effects/Grid';
import { Gradient } from '../../common/effects/Gradient';
import { Glow } from '../../common/effects/Glow';
import { BeforeAfterSlider } from '../../common/effects/BeforeAfterSlider';

const features = [
  {
    stat: '32%',
    title: 'Faster Sales',
    description: 'Cars with clean, professional backgrounds sell faster and see increases in price up to 20%.',
  },
  {
    stat: '118%',
    title: 'More Views',
    description: 'Level up your listing views with professional imagery and custom branding.',
  },
  {
    stat: '41%',
    title: 'Increase in Click-Through Rate',
    description: 'Your listing photos are everywhere. Make sure your inventory is represented well.',
  },
];

export const Features: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Auto-cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => {
        if (current === null || current >= features.length - 1) {
          return 0;
        }
        return current + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white py-12">
      <Grid className="opacity-[0.02]" />
      <Gradient variant="secondary" />
      <Glow className="left-1/4 top-1/4" />
      <Glow className="right-1/4 bottom-1/4" color="rgba(56, 189, 248, 0.2)" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 text-gray-900">It's simple: better photos sell more cars.</h2>
          <p className="text-xl text-gray-600">autoloom makes creating better images easier, saving you time and money.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl bg-gradient-to-br from-white to-gray-50 shadow-sm hover:shadow-md transition-all duration-500 group cursor-pointer overflow-hidden"
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br from-transparent to-gray-50/50 transition-opacity duration-500 ${
                  activeIndex === index ? 'opacity-100' : 'opacity-0'
                }`} />
                <div className="relative flex items-start gap-6">
                  <div className="flex-shrink-0 relative">
                    <div className={`absolute -inset-4 bg-indigo-500/10 rounded-full blur-lg transition-opacity duration-500 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`} />
                    <div className="relative">
                      <div className={`text-5xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent transition-all duration-500 ${
                        activeIndex === index ? 'scale-110' : 'scale-100'
                      }`}>
                        {feature.stat}
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold transition-colors duration-500 ${
                      activeIndex === index ? 'text-indigo-600' : 'text-gray-900'
                    }`}>
                      {feature.title}
                    </h3>
                    <p className={`text-gray-600 transition-colors duration-500 ${
                      activeIndex === index ? 'text-gray-900' : ''
                    }`}>
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-[400px] group">
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-20 group-hover:opacity-30 blur transition duration-500" />
            <div className="relative h-full">
              <BeforeAfterSlider
                beforeImage="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80"
                afterImage="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80"
                className="h-full rounded-lg shadow-2xl"
                beforeLabel="Original"
                afterLabel="No Background"
                showBackground={false}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <a
            href="https://360booth.com/the-power-of-professional-photography-studies-and-statistics/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-600 hover:text-indigo-600 transition-colors inline-flex items-center"
          >
            Don't believe us? Read for yourself →
          </a>
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}; 