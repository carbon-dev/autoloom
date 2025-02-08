import React from 'react';
import { Grid } from '../effects/Grid';
import { Gradient } from '../effects/Gradient';
import { Glow } from '../effects/Glow';

export const ValueProps: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-sky-50 to-indigo-50">
      <Grid className="opacity-[0.02]" />
      <Gradient />
      <Glow className="left-1/3 top-1/3" />
      
      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-2">
          We don't overcomplicate things.
        </h2>
        <p className="text-xl text-center text-gray-600">
          AI-powered background removal and replacement, done right.
        </p>
      </div>

      {/* First Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Virtually teleport your inventory anywhere
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Car photos with simple, neutral backgrounds sell faster. autoloom removes backgrounds with incredible precision, letting you place vehicles in any setting.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1 group-hover:bg-indigo-200 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-indigo-600 group-hover:bg-indigo-700 transition-colors"></div>
                </div>
                <span className="ml-3 text-gray-600 group-hover:text-gray-900 transition-colors">Process hundreds of images in minutes</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
                <span className="ml-3 text-gray-600">Reduce time-to-sale and increase listing engagement</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
                <span className="ml-3 text-gray-600">Create professional virtual showrooms instantly</span>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2 group">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80"
              alt="Luxury car in showroom"
              className="rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl"
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-16 border-t border-indigo-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="group">
            <img
              src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80"
              alt="Professional car photography"
              className="rounded-2xl shadow-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-3xl"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Branding that buyers trust
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              In today's digital-first car buying experience, your photos need to 
              capture attention and drive engagement. autoloom helps you create 
              imagery that converts browsers into buyers.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
                <span className="ml-3 text-gray-600">Maintain consistent branding across listing platforms</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
                <span className="ml-3 text-gray-600">Create positive perceptions about your brand and inventory</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                </div>
                <span className="ml-3 text-gray-600">Generate professional photos you're proud to share</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};