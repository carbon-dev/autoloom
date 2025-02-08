import React from 'react';
import { Helmet } from 'react-helmet';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { MainFeatures } from '../components/landing/MainFeatures';
import { Pricing } from '../components/landing/Pricing';
import { ValueProps } from '../components/landing/ValueProps';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="bg-white overflow-x-hidden">
      <Helmet>
        {/* Basic metadata */}
        <title>Autoloom - AI-Powered Background Removal for Car Dealerships</title>
        <meta name="description" content="Professional background removal powered by artificial intelligence. Help your dealership's photos stand out in a crowded marketplace." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autoloom.com/" />
        <meta property="og:title" content="Autoloom - AI-Powered Background Removal" />
        <meta property="og:description" content="Professional background removal powered by artificial intelligence. Help your dealership's photos stand out in a crowded marketplace." />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://autoloom.com/" />
        <meta property="twitter:title" content="Autoloom - AI-Powered Background Removal" />
        <meta property="twitter:description" content="Professional background removal powered by artificial intelligence. Help your dealership's photos stand out in a crowded marketplace." />
        <meta property="twitter:image" content="/og-image.png" />

        {/* Additional SEO tags */}
        <meta name="keywords" content="background removal, car dealership, automotive photography, AI image editing" />
        <meta name="author" content="Autoloom" />
        <link rel="canonical" href="https://autoloom.com/" />
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