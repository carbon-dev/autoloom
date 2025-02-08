import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { MainFeatures } from '../components/landing/MainFeatures';
import { Pricing } from '../components/landing/Pricing';
import { ValueProps } from '../components/landing/ValueProps';
import { Footer } from '../components/Footer';
import { Helmet } from 'react-helmet';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-white">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
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