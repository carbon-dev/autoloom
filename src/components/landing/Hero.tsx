import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SignupModal } from '../auth/SignupModal';
import { useAuthStore } from '../../store/useAuthStore';
import { QuickUpload } from './QuickUpload';
import { Grid } from '../effects/Grid';
import { Gradient } from '../effects/Gradient';
import { Glow } from '../effects/Glow';
import { SpotlightButton } from '../effects/SpotlightButton';

export const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50">
      <Grid className="opacity-[0.02]" />
      <Gradient />
      <Glow className="left-1/3 top-0" />
      <Glow className="right-1/3 bottom-0" color="rgba(99, 102, 241, 0.2)" />
      
      <div className="relative max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-8 -left-8 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="relative">
              <h1 className="font-display text-5xl lg:text-7xl font-bold mb-6 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Sell your cars faster with better photos.
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                AI-powered background removal, virtual showrooms, and custom branding in the blink of an eye. Let your dealership's photos stand out in a crowded marketplace.
              </p>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <SpotlightButton className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700">
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                      </SpotlightButton>
                    </Link>
                  ) : (
                    <SpotlightButton
                      onClick={() => setIsModalOpen(true)}
                      className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
                    >
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 inline-block" />
                    </SpotlightButton>
                  )}
                  <button
                    onClick={scrollToPricing}
                    className="inline-flex items-center justify-center px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-all duration-300"
                  >
                    View Pricing
                  </button>
                </div>
                <p className="text-sm text-gray-600">
                  5 free images • No credit card required
                </p>
              </div>
            </div>
          </div>
          <div className="lg:ml-auto lg:w-[120%]">
            <QuickUpload />
          </div>
        </div>
      </div>
      
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};