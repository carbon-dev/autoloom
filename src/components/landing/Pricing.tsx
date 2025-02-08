import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { SignupModal } from '../auth/SignupModal';
import { cn } from '../../utils/cn';
import { Grid } from '../effects/Grid';
import { Gradient } from '../effects/Gradient';
import { Glow } from '../effects/Glow';

export const Pricing: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(1); // Default to Essentials

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Try it out risk-free',
      features: [
        '5 free images',
        'Basic support',
        'Web interface'
      ],
    },
    {
      name: 'Essentials',
      price: '$19',
      description: 'Perfect for freelancers and occasional users',
      popular: true,
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

  return (
    <div id="pricing" className="relative bg-white py-24">
      <Grid className="opacity-[0.02]" />
      <Gradient />
      <Glow className="left-1/3 top-1/3" />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">Fair, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className="relative"
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              <div className={cn(
                'h-full rounded-2xl transition-all duration-300',
                hoveredPlan === index ? 'scale-105' : 'scale-100',
                plan.popular ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white' : 'bg-white border border-gray-200'
              )}>
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className={cn(
                    "text-xl font-semibold",
                    !plan.popular && "text-gray-900"
                  )}>{plan.name}</h3>
                  <p className={cn(
                    "text-sm mt-1",
                    plan.popular ? "text-indigo-100" : "text-gray-500"
                  )}>{plan.description}</p>

                  <div className="mt-6 mb-8">
                    <span className={cn(
                      "text-4xl font-bold",
                      !plan.popular && "text-gray-900"
                    )}>{plan.price}</span>
                    <span className={cn(
                      "text-lg ml-2",
                      plan.popular ? "text-indigo-100" : "text-gray-500"
                    )}>/month</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center">
                        <Check className={cn(
                          "h-5 w-5 mr-3",
                          plan.popular ? "text-indigo-100" : "text-indigo-500"
                        )} />
                        <span className={cn(
                          "text-sm",
                          plan.popular ? "text-indigo-100" : "text-gray-600"
                        )}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className={cn(
                      "w-full py-3 px-4 rounded-lg font-medium transition-colors",
                      plan.popular
                        ? "bg-white text-indigo-600 hover:bg-indigo-50"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    )}
                  >
                    {plan.name === 'Free' ? 'Start Free Trial' : `Choose ${plan.name}`}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <SignupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};