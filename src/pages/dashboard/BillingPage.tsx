import React, { useState } from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

const plans = [
  {
    name: 'Essentials',
    price: '$19',
    interval: 'month',
    description: 'Perfect for freelancers and occasional users',
    features: [
      '20 images/month',
      'API access',
      'Basic support',
      'Web interface'
    ],
  },
  {
    name: 'Professional',
    price: '$59',
    interval: 'month',
    description: 'Ideal for small businesses and agencies',
    features: [
      '100 images/month',
      'API access',
      'Priority support',
      'Bulk processing',
      'Web interface'
    ],
  },
  {
    name: 'Enterprise',
    price: '$199',
    interval: 'month',
    description: 'Best for high-volume users',
    features: [
      '1,000 images/month',
      'API access',
      'Premium support',
      'Bulk processing',
      'Web interface',
      'Custom integration support'
    ],
  }
];

export const BillingPage: React.FC = () => {
  const { user, updateSubscription } = useAuthStore();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = async (plan: 'essentials' | 'professional' | 'enterprise') => {
    setIsUpgrading(true);
    try {
      await updateSubscription(plan);
      // In production, this would integrate with Stripe
    } catch (error) {
      console.error('Error upgrading plan:', error);
    } finally {
      setIsUpgrading(false);
    }
  };

  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      try {
        await updateSubscription('trial');
      } catch (error) {
        console.error('Error canceling subscription:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <div className="bg-white rounded-lg shadow-sm ring-1 ring-gray-200/50 p-6">
        <h2 className="text-lg font-semibold text-gray-900">Current Plan</h2>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900">
              {user?.subscription === 'trial' ? 'Free Trial' : `${user?.subscription.charAt(0).toUpperCase()}${user?.subscription.slice(1)} Plan`}
            </p>
            {user?.subscription === 'trial' && (
              <p className="text-sm text-gray-500 mt-1">
                {user.trialImagesLeft} images remaining
              </p>
            )}
          </div>
          {user?.subscription !== 'trial' && (
            <button
              onClick={handleCancel}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Cancel subscription
            </button>
          )}
        </div>
      </div>

      {/* Available Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="relative bg-white rounded-lg shadow-sm ring-1 ring-gray-200/50 p-6"
          >
            {user?.subscription === plan.name.toLowerCase() && (
              <div className="absolute -top-2 -right-2">
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  Current Plan
                </span>
              </div>
            )}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  {plan.interval && (
                    <span className="text-gray-500">/{plan.interval}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="ml-2 text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(plan.name.toLowerCase() as 'essentials' | 'professional' | 'enterprise')}
              disabled={isUpgrading || user?.subscription === plan.name.toLowerCase()}
              className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-medium ${
                user?.subscription === plan.name.toLowerCase()
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {user?.subscription === plan.name.toLowerCase()
                ? 'Current Plan'
                : `Upgrade to ${plan.name}`}
            </button>
          </div>
        ))}
      </div>

      {/* Usage Warning */}
      {user?.subscription === 'trial' && user.trialImagesLeft < 2 && (
        <div className="rounded-lg bg-yellow-50 p-4">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Low trial credits
              </h3>
              <p className="mt-1 text-sm text-yellow-700">
                You're running low on trial credits. Upgrade to continue using all features.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};