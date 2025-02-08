import React from 'react';

export const TermsOfServiceContent: React.FC = () => {
  return (
    <div className="prose prose-gray max-w-none">
      <p className="text-gray-600 mb-8">Last updated: March 19, 2024</p>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h3>
        <p className="text-gray-600 mb-4">
          By accessing and using Autoloom's services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">2. Description of Service</h3>
        <p className="text-gray-600 mb-4">
          Autoloom provides an AI-powered background removal service for images. We offer both free and paid subscription plans with different features and usage limits.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">3. User Accounts</h3>
        <p className="text-gray-600 mb-4">
          To access certain features of our service, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4. Subscription and Payments</h3>
        <p className="text-gray-600 mb-4">
          Paid subscriptions are billed in advance on a monthly basis. You can cancel your subscription at any time, but we do not provide refunds for partial months of service.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">5. Intellectual Property</h3>
        <p className="text-gray-600 mb-4">
          You retain all rights to the images you upload. By using our service, you grant us a limited license to process and store your images for the purpose of providing our service.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">6. Limitations of Liability</h3>
        <p className="text-gray-600 mb-4">
          Autoloom provides the service "as is" without any warranty. We are not liable for any damages arising from the use of our service.
        </p>
      </section>

      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">7. Contact</h3>
        <p className="text-gray-600">
          If you have any questions about these Terms, please contact us at legal@autoloom.com
        </p>
      </section>
    </div>
  );
};