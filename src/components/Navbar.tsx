import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SignupModal } from './auth/SignupModal';
import { LoginModal } from './auth/LoginModal';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSignupClick = () => {
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  return (
    <>
      <nav className="bg-white/80 backdrop-blur-sm supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => scrollToSection('features')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100/70 transition-colors"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100/70 transition-colors"
                >
                  Pricing
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-full hover:bg-gray-100/70 transition-colors"
                >
                  Log in
                </button>
                <button
                  onClick={() => setIsSignupModalOpen(true)}
                  className="px-4 py-2 text-sm font-medium bg-[#ff6b6b] text-white rounded-full hover:bg-[#ff5252] transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/70 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200/50">
            <div className="px-4 py-2 space-y-1">
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100/70 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100/70 transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => {
                  setIsLoginModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-left text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-100/70 transition-colors"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setIsSignupModalOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full px-4 py-2 text-sm font-medium bg-[#ff6b6b] text-white rounded-lg hover:bg-[#ff5252] transition-colors"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        )}
      </nav>

      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSignupClick={handleSignupClick}
      />
    </>
  );
};