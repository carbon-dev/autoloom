import React, { useState } from 'react';
import { Github, Twitter } from 'lucide-react';
import { Logo } from './Logo';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LegalModal } from './legal/LegalModal';
import { PrivacyPolicyContent } from './legal/PrivacyPolicyContent';
import { TermsOfServiceContent } from './legal/TermsOfServiceContent';

export const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const scrollToSection = (id: string) => {
    if (location.pathname === '/') {
      // If we're on homepage, just scroll
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 80; // Adjust this value to control the scroll position
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // If we're on another page, navigate to homepage then scroll
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <>
      <footer className="bg-white w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-2 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-[1fr_auto_auto] gap-y-4 gap-x-0 mb-2 md:mb-4">
            <div className="col-span-2 md:col-span-1">
              <div className="max-w-[120px] md:max-w-none">
                <Logo className="mb-0.5 md:mb-4 w-auto h-8" />
              </div>
              <p className="text-sm text-gray-600">
                Professional background removal powered by artificial intelligence.
              </p>
            </div>

            <div className="md:text-right md:pr-16">
              <h3 className="font-semibold text-gray-900 mb-2">Product</h3>
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

            <div className="md:text-right">
              <h3 className="font-semibold text-gray-900 mb-2">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-[#ff6b6b] transition-colors"
                  >
                    Contact
                  </Link>
                </li>
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

          <div className="border-t border-gray-200 mt-4 md:mt-12 pt-3 md:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© 2025 Autoloom. All rights reserved.</p>
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