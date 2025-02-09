import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Terms of Service - Autoloom</title>
        <meta name="description" content="Terms of service and conditions for using Autoloom's AI-powered background removal service." />
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
          <span className="text-gray-600">Terms of Service</span>
        </nav>

        <h1 className="text-4xl font-bold mb-8 text-gray-900">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">1. Agreement to Terms</h2>
            <p className="text-gray-600 mb-4">
              By accessing or using Autoloom's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">2. Use License</h2>
            <p className="text-gray-600 mb-4">
              Autoloom grants you a personal, non-exclusive, non-transferable license to use our service for your business purposes in accordance with these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">3. Image Processing</h2>
            <p className="text-gray-600 mb-4">
              You retain all rights to your images. By using our service, you grant us permission to process and temporarily store your images for the purpose of background removal and editing.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">4. Privacy & Data</h2>
            <p className="text-gray-600 mb-4">
              We handle all user data in accordance with our Privacy Policy. Your images are processed securely and are not shared with third parties.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">5. Service Availability</h2>
            <p className="text-gray-600 mb-4">
              While we strive for 100% uptime, we cannot guarantee uninterrupted access to our services. We reserve the right to modify or discontinue services with or without notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">6. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Autoloom shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">7. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to modify these terms at any time. Continued use of the service after changes constitutes acceptance of new terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact</h2>
            <p className="text-gray-600">
              For questions about these Terms, please contact us at{' '}
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