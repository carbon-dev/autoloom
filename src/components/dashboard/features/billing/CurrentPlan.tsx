import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../shared/Button';
import { Badge } from '../../shared/Badge';

interface Plan {
  name: string;
  price: string;
  interval: string;
  status: 'active' | 'canceled' | 'past_due';
  renewalDate: string;
  features: string[];
}

export const CurrentPlan: React.FC = () => {
  const [plan] = React.useState<Plan>({
    name: 'Pro Plan',
    price: '$19',
    interval: 'month',
    status: 'active',
    renewalDate: '2024-12-31',
    features: [
      '100 images per month',
      'Advanced background removal',
      'HD quality exports',
      'Priority support',
      'API access',
    ],
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Current Plan
        </h3>
        <Badge
          variant={
            plan.status === 'active'
              ? 'success'
              : plan.status === 'canceled'
              ? 'error'
              : 'warning'
          }
        >
          {plan.status === 'active'
            ? 'Active'
            : plan.status === 'canceled'
            ? 'Canceled'
            : 'Past Due'}
        </Badge>
      </div>

      <div className="mt-6">
        <div className="flex items-baseline">
          <h4 className="text-2xl font-bold text-gray-900">{plan.price}</h4>
          <span className="ml-1 text-gray-500">/{plan.interval}</span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Next renewal on {new Date(plan.renewalDate).toLocaleDateString()}
        </p>
      </div>

      <ul className="mt-6 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center text-sm text-gray-600">
            <svg
              className="h-4 w-4 text-green-500 mr-3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex space-x-4">
        <Link to="/dashboard/billing/change-plan">
          <Button variant="outline">Change Plan</Button>
        </Link>
        <Button variant="danger">Cancel Plan</Button>
      </div>
    </div>
  );
}; 