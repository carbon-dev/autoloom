import React from 'react';
import { PageHeader } from '../shared/PageHeader';
import { Card, CardContent } from '../shared/Card';
import { useAuthStore } from '../../../store/useAuthStore';

export const BillingPage: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Billing"
        description="Manage your subscription and billing details."
      />
      
      <div className="mt-6">
        <Card>
          <CardContent>
            {/* Billing content */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 