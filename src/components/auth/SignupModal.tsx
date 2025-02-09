import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useModalStore } from '../../store/useModalStore';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onSigninClick?: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSuccess, onSigninClick }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExistingUser, setIsExistingUser] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const { openLogin } = useModalStore();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const validatePassword = (value: string) => {
    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }
    if (!/(?=.*[0-9])/.test(value)) {
      return 'Password must contain at least one number';
    }
    if (!/(?=.*[a-zA-Z])/.test(value)) {
      return 'Password must contain at least one letter';
    }
    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsExistingUser(false);
    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }
    setIsLoading(true);
    
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }
    
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            subscription_tier: 'trial',
            trial_images_left: 5,
            processed_images: 0,
          }
        }
      });

      if (signUpError) {
        if (signUpError.message.includes('User already registered')) {
          setError('You already have an account.');
          setIsExistingUser(true);
          return;
        }
        throw signUpError;
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      onSuccess?.();
      
      // Navigate but don't close modal yet
      navigate('/dashboard', { replace: true });
      
      // Wait for navigation animation to complete before closing modal
      setTimeout(() => {
        onClose();
      }, 400); // Match this with your PageTransition duration

    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 modal-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50">
            <motion.div
              className="relative bg-white rounded-xl shadow-xl mx-4"
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              <div className="flex items-center justify-between border-b p-4 md:p-6">
                <h2 id="modal-title" className="text-xl font-semibold">Start Your Free Trial</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-4 md:p-8">
                <p className="text-gray-600 mb-6">
                  Get 5 free background removals. No credit card required.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="you@example.com"
                      autoComplete="email"
                      autoFocus
                    />
                    {error && (
                      <p className="mt-1 text-sm text-red-500" role="alert">
                        {error}
                        {isExistingUser && (
                          <>
                            {' '}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onClose(); // Close signup modal
                                setTimeout(() => {
                                  openLogin(); // Open login modal directly from the store
                                }, 100);
                              }}
                              className="text-blue-500 hover:text-blue-600 font-medium"
                            >
                              Sign in instead
                            </button>
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div>
                    <label 
                      htmlFor="password" 
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        passwordError ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Password"
                      autoComplete="new-password"
                    />
                    {passwordError && (
                      <p className="mt-1 text-sm text-red-500">
                        {passwordError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed relative"
                  >
                    {isLoading ? (
                      <>
                        <span className="opacity-0">Start Free Trial</span>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                      </>
                    ) : (
                      'Start Free Trial'
                    )}
                  </button>

                  <p className="text-sm text-gray-500 text-center">
                    By signing up, you agree to our{' '}
                    <a href="/terms" className="text-blue-500 hover:text-blue-600">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="/privacy" className="text-blue-500 hover:text-blue-600">
                      Privacy Policy
                    </a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};