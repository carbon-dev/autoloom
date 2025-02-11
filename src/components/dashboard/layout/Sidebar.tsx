import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Image, CreditCard } from 'lucide-react';
import { Logo } from '../../common/Logo';
import { cn } from '../../../utils/cn';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Image },
  { name: 'Background Removal', href: '/dashboard/remove-background', icon: Image },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Logo className="h-8 w-auto" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                          location.pathname === item.href
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className={cn(
                            location.pathname === item.href
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600',
                            'h-6 w-6 shrink-0'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className="lg:hidden fixed inset-0 z-50 bg-gray-900/80 backdrop-blur-sm sidebar-backdrop hidden"
        onClick={() => document.documentElement.classList.remove('sidebar-open')}
      />
      <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-white sidebar transform -translate-x-full transition-transform duration-300">
        <div className="flex h-16 shrink-0 items-center gap-x-6 px-6 border-b border-gray-200">
          <Logo className="h-8 w-auto" />
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700"
            onClick={() => document.documentElement.classList.remove('sidebar-open')}
          >
            <span className="sr-only">Close sidebar</span>
            <X className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col px-6 pb-4 mt-4">
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    location.pathname === item.href
                      ? 'bg-gray-50 text-indigo-600'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                  )}
                  onClick={() => document.documentElement.classList.remove('sidebar-open')}
                >
                  <item.icon
                    className={cn(
                      location.pathname === item.href
                        ? 'text-indigo-600'
                        : 'text-gray-400 group-hover:text-indigo-600',
                      'h-6 w-6 shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}; 