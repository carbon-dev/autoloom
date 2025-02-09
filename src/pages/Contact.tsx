import React from 'react';
import { Helmet } from 'react-helmet';
import { Footer } from '../components/Footer';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formRef.current) return;

    // Prepare the form data with the correct parameter names
    const formData = {
      from_name: "Website Contact Form", // Static name for the form
      to_name: "Your Name", // Your name as the recipient
      reply_to: formRef.current.email.value, // Visitor's email
      message: `
        Name: ${formRef.current.firstName.value} ${formRef.current.lastName.value}
        Company: ${formRef.current.company.value}
        Employees: ${formRef.current.employees.value}
        Email: ${formRef.current.email.value}
        
        Message:
        ${formRef.current.message.value}
      `, // Structured message
    };
    
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      setSubmitted(true);
      formRef.current.reset();
    } catch (error) {
      console.error('Email error:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Helmet>
        <title>Contact Us - Autoloom</title>
        <meta name="description" content="Get in touch with the Autoloom team for questions about our AI-powered background removal service." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight text-gray-900 mb-6">
            Let's talk.
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Autoloom is the easiest way to remove backgrounds from your images using AI. Talk to our team to:
          </p>
          <ul className="space-y-4 text-gray-600">
            <li>• Understand how our product may fit in your workflow</li>
            <li>• Discover the capabilities and get answers to your questions</li>
            <li>• Get a customized quote for your business</li>
            <li>• Get help with technical support or account issues</li>
          </ul>
        </div>

        <div className="bg-white rounded-xl p-6">
          {submitted ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold mb-4">Thanks for reaching out!</h2>
              <p className="text-gray-600">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First name*
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last name*
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="workEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email*
                </label>
                <input
                  type="email"
                  name="email"
                  id="workEmail"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company name*
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                />
              </div>

              <div>
                <label htmlFor="employees" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of employees*
                </label>
                <select
                  name="employees"
                  id="employees"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                >
                  <option value="">Please Select</option>
                  <option value="1-10">1-10</option>
                  <option value="11-50">11-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501+">501+</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message*
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6b6b] focus:border-[#ff6b6b]"
                  placeholder="How can we help you?"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#ff6b6b] hover:bg-[#ff5252] text-white py-3 px-4 rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed relative"
              >
                {isSubmitting ? (
                  <>
                    <span className="opacity-0">Send</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  </>
                ) : (
                  'Send'
                )}
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}; 