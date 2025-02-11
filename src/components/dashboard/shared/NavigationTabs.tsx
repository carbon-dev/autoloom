import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../../utils/cn';

interface Tab {
  name: string;
  href: string;
  count?: number;
}

interface NavigationTabsProps {
  tabs: Tab[];
  className?: string;
}

export const NavigationTabs: React.FC<NavigationTabsProps> = ({
  tabs,
  className = '',
}) => {
  const location = useLocation();

  return (
    <div className={className}>
      <div className="sm:hidden">
        <select
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          defaultValue={tabs.find((tab) => tab.href === location.pathname)?.href}
          onChange={(e) => {
            window.location.href = e.target.value;
          }}
        >
          {tabs.map((tab) => (
            <option key={tab.href} value={tab.href}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <nav className="flex space-x-4" aria-label="Tabs">
          {tabs.map((tab) => (
            <Link
              key={tab.name}
              to={tab.href}
              className={cn(
                tab.href === location.pathname
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700',
                'rounded-md px-3 py-2 text-sm font-medium'
              )}
            >
              {tab.name}
              {tab.count !== undefined && (
                <span
                  className={cn(
                    'ml-2 rounded-full px-2 py-0.5 text-xs font-medium',
                    tab.href === location.pathname
                      ? 'bg-indigo-200'
                      : 'bg-gray-100 text-gray-900'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}; 