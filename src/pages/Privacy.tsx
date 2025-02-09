import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Privacy Policy - Autoloom</title>
        <meta name="description" content="Privacy policy and data handling practices for Autoloom's AI-powered background removal service." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Breadcrumbs */}
        <nav className="flex items-center mb-8 text-sm font-medium">
          <Link 
            to="/" 
            className="text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            Home
          </Link>
          <span className="text-gray-400 mx-2">›</span>
          <span className="text-gray-600">Privacy Policy</span>
        </nav>

        <h1 className="text-4xl font-bold mb-8 text-gray-900">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Information We Collect</h2>
            <p className="text-gray-600 mb-4">
              We collect information that you provide directly to us, including your email address, images you upload, and usage data to improve our services.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to provide and improve our services, process your images, and communicate with you about your account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Image Processing & Storage</h2>
            <p className="text-gray-600 mb-4">
              Your images are processed securely and temporarily stored for the purpose of background removal. We do not share your images with third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Data Security</h2>
            <p className="text-gray-600 mb-4">
              We implement appropriate security measures to protect your personal information and images from unauthorized access or disclosure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to access, correct, or delete your personal information. You can also request a copy of your data or opt out of certain data collection.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Cookies & Tracking</h2>
            <p className="text-gray-600 mb-4">
              We use cookies and similar tracking technologies to improve your experience and analyze how our services are used.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Updates to Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact</h2>
            <p className="text-gray-600">
              For questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:support@autoloom.co" className="text-indigo-600 hover:text-indigo-700">
                support@autoloom.co
              </a>
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}; 