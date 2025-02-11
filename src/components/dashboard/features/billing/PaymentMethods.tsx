import React from 'react';
import { CreditCard, Plus } from 'lucide-react';
import { Button } from '../../shared/Button';
import { Badge } from '../../shared/Badge';

interface PaymentMethod {
  id: string;
  type: 'card';
  last4: string;
  expMonth: number;
  expYear: number;
  brand: string;
  isDefault: boolean;
}

export const PaymentMethods: React.FC = () => {
  const [methods] = React.useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      last4: '4242',
      expMonth: 12,
      expYear: 2024,
      brand: 'visa',
      isDefault: true,
    },
    {
      id: '2',
      type: 'card',
      last4: '5555',
      expMonth: 8,
      expYear: 2025,
      brand: 'mastercard',
      isDefault: false,
    },
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Payment Methods
        </h3>
        <Button
          variant="outline"
          size="sm"
          leftIcon={<Plus className="h-4 w-4" />}
        >
          Add Method
        </Button>
      </div>

      <div className="space-y-4">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="h-8 w-8 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">
                  {method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} ending in {method.last4}
                </p>
                <p className="text-sm text-gray-500">
                  Expires {method.expMonth.toString().padStart(2, '0')}/{method.expYear}
                </p>
              </div>
              {method.isDefault && (
                <Badge variant="success" className="ml-2">
                  Default
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                Edit
              </Button>
              {!method.isDefault && (
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 