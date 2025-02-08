import React, { useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose }) => {
  const updateSubscription = useAuthStore((state) => state.updateSubscription);

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

  const handleUpgrade = (plan: 'pro' | 'enterprise') => {
    // In a real app, this would integrate with a payment provider
    updateSubscription(plan);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl z-50"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="bg-white rounded-xl shadow-xl p-8 mx-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          <h2 id="modal-title" className="text-2xl font-bold mb-6">Upgrade Your Plan</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Pro</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">$19</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Unlimited background removals</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-2" />
                  <span>HD quality</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-blue-500 mr-2" />
                  <span>Bulk processing</span>
                </li>
              </ul>
              <button
                onClick={() => handleUpgrade('pro')}
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Enterprise</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Dedicated support</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-gray-500 mr-2" />
                  <span>Custom integration</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-5 w-5 text-gray-500 mr-2" />
                  <span>SLA guarantee</span>
                </li>
              </ul>
              <button
                onClick={() => handleUpgrade('enterprise')}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};