import React, { useState } from 'react';
import { Github, Twitter } from 'lucide-react';
import { Logo } from './Logo';
import { Link } from 'react-router-dom';
import { LegalModal } from './legal/LegalModal';
import { PrivacyPolicyContent } from './legal/PrivacyPolicyContent';
import { TermsOfServiceContent } from './legal/TermsOfServiceContent';

export const Footer: React.FC = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <footer className="bg-white w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="max-w-[120px] md:max-w-none">
                <Logo className="mb-4 w-auto h-8" />
              </div>
              <p className="text-sm text-gray-600">
                Professional background removal powered by artificial intelligence.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('features')}
                    className="text-gray-600 hover:text-[#ff6b6b] transition-colors"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className="text-gray-600 hover:text-[#ff6b6b] transition-colors"
                  >
                    Pricing
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection('testimonials')}
                    className="text-gray-600 hover:text-[#ff6b6b] transition-colors"
                  >
                    Testimonials
                  </button>
                </li>
                <li>
                  <button className="text-gray-600 hover:text-[#ff6b6b] transition-colors">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-600 hover:text-[#ff6b6b] transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-600 hover:text-[#ff6b6b] transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2024 Autoloom. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <LegalModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        title="Privacy Policy"
      >
        <PrivacyPolicyContent />
      </LegalModal>
    </>
  );
};