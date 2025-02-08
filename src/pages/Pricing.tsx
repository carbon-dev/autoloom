import React from 'react';
import { Check } from 'lucide-react';

export const Pricing: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Free Trial</h2>
          <p className="text-4xl font-bold mb-6">
            5 <span className="text-lg font-normal text-gray-600">free credits</span>
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>5 background removals</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Basic support</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>Standard quality</span>
            </li>
          </ul>
          <button className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors">
            Start Free Trial
          </button>
        </div>

        <div className="bg-blue-500 p-8 rounded-lg shadow-sm text-white">
          <h2 className="text-xl font-semibold mb-4">Pro</h2>
          <p className="text-4xl font-bold mb-6">
            $19 <span className="text-lg font-normal">/month</span>
          </p>
          <ul className="space-y-3 mb-8">
            <li className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <span>Unlimited background removals</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <span>Priority support</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <span>HD quality</span>
            </li>
            <li className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <span>Bulk processing</span>
            </li>
          </ul>
          <button className="w-full py-2 px-4 bg-white text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
};