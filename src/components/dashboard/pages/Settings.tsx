import React from 'react';
import { PageHeader } from '../shared/PageHeader';
import { Card, CardContent } from '../shared/Card';

export const SettingsPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader 
        title="Settings"
        description="Manage your account settings and preferences."
      />
      
      <div className="mt-6">
        <Card>
          <CardContent>
            {/* Settings content */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}; 