import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { supabase } from '../../../lib/supabase';
import { Grid } from '../../common/effects/Grid';
import { Gradient } from '../../common/effects/Gradient';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSigninClick?: () => void;
  onSuccess?: () => void;
}

export const SignupModal: React.FC<SignupModalProps> = ({
  isOpen,
  onClose,
  onSigninClick,
  onSuccess,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            subscription: 'trial',
            trialImagesLeft: 5,
            processedImages: 0,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        login(data.user.email);
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm" />

        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="relative overflow-hidden">
            <Grid className="opacity-[0.02]" />
            <Gradient />

            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative px-6 py-8">
              <div className="mb-8 text-center">
                <Dialog.Title className="text-2xl font-bold text-gray-900">
                  Create your account
                </Dialog.Title>
                <Dialog.Description className="mt-1 text-gray-600">
                  Start your free trial today
                </Dialog.Description>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="rounded-md bg-red-50 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Creating account...' : 'Create account'}
                </button>

                <p className="text-center text-xs text-gray-600">
                  By signing up, you agree to our{' '}
                  <a
                    href="/terms"
                    className="text-indigo-600 hover:text-indigo-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a
                    href="/privacy"
                    className="text-indigo-600 hover:text-indigo-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>

              {onSigninClick && (
                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={onSigninClick}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}; 