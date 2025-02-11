import React from 'react';
import { PageHeader } from '../../shared/PageHeader';
import { Card, CardContent } from '../../shared/Card';
import { CurrentPlan } from './CurrentPlan';
import { UsageStats } from './UsageStats';
import { PaymentMethods } from './PaymentMethods';
import { BillingHistory } from './BillingHistory';

export const BillingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage your subscription and billing information."
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Billing' },
        ]}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent>
            <CurrentPlan />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <UsageStats />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent>
          <PaymentMethods />
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <BillingHistory />
        </CardContent>
      </Card>
    </div>
  );
}; 