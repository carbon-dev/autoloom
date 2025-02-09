import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { MainFeatures } from '../components/landing/MainFeatures';
import { Pricing } from '../components/landing/Pricing';
import { ValueProps } from '../components/landing/ValueProps';
import { Footer } from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const LandingPage: React.FC = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if we have a section to scroll to
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        // Small delay to ensure the page is loaded
        setTimeout(() => {
          const headerOffset = 80; // Same offset as in Footer
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="bg-white overflow-x-hidden">
      <Helmet>
        {/* Basic metadata */}
        <title>Autoloom - AI-Powered Background Removal for Car Dealerships</title>
        <meta name="description" content="Professional background removal powered by artificial intelligence. Help your dealership's photos stand out in a crowded marketplace." />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://autoloom.co/" />
        <meta property="og:title" content="AI-Powered Background Removal from Autoloom" />
        <meta property="og:description" content="Professional background removal powered by artificial intelligence. Make your dealership's photos stand out in a crowded marketplace." />
        <meta property="og:image" content="/og-image.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://autoloom.co/" />
        <meta property="twitter:title" content="Autoloom - AI-Powered Background Removal" />
        <meta property="twitter:description" content="Professional background removal powered by artificial intelligence. Help your dealership's photos stand out in a crowded marketplace." />
        <meta property="twitter:image" content="/og-image.png" />

        {/* Additional SEO tags */}
        <meta name="keywords" content="background removal, car dealership, automotive photography, AI image editing" />
        <meta name="author" content="Autoloom" />
        <link rel="canonical" href="https://autoloom.co/" />
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