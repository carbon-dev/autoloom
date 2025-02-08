import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { MainFeatures } from '../components/landing/MainFeatures';
import { Pricing } from '../components/landing/Pricing';
import { ValueProps } from '../components/landing/ValueProps';
import { Footer } from '../components/Footer';
// Import Helmet conditionally
let Helmet: any;
try {
  Helmet = require('react-helmet').Helmet;
} catch (e) {
  Helmet = ({ children }: { children: React.ReactNode }) => <>{children}</>;
}

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>
      <Hero />
      <div id="features">
        <Features />
      </div>
      <ValueProps />
      <MainFeatures />
      <div id="pricing">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};