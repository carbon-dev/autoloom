import React from 'react';
import { PageHeader } from '../../shared/PageHeader';
import { Card, CardContent } from '../../shared/Card';
import { ProfileSettings } from './ProfileSettings';
import { NotificationSettings } from './NotificationSettings';
import { APISettings } from './APISettings';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your account settings and preferences."
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings' },
        ]}
      />

      <div className="space-y-6">
        <Card>
          <CardContent>
            <ProfileSettings />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <NotificationSettings />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <APISettings />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 