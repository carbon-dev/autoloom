import React from 'react';
import { Toggle } from '../../shared/Toggle';

const notifications = [
  {
    id: 'processing-complete',
    title: 'Processing Complete',
    description: 'Get notified when your image processing is complete.',
  },
  {
    id: 'usage-limit',
    title: 'Usage Limit',
    description: 'Receive alerts when you approach your usage limit.',
  },
  {
    id: 'newsletter',
    title: 'Product Updates',
    description: 'Get notified about new features and improvements.',
  },
];

export const NotificationSettings: React.FC = () => {
  const [settings, setSettings] = React.useState({
    'processing-complete': true,
    'usage-limit': true,
    'newsletter': false,
  });

  const handleToggle = (id: string) => (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [id]: checked }));
  };

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 mb-6">
        Notification Preferences
      </h3>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <Toggle
            key={notification.id}
            checked={settings[notification.id as keyof typeof settings]}
            onChange={handleToggle(notification.id)}
            label={notification.title}
            description={notification.description}
          />
        ))}
      </div>
    </div>
  );
}; 