import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, Image, Images, CreditCard, Settings, LogOut } from 'lucide-react';
import { Logo } from '../../common/Logo';
import { cn } from '../../../utils/cn';
import { useDashboardStore } from '../stores/useDashboardStore';
import { useAuthStore } from '../../../store/useAuthStore';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Background Removal', href: '/dashboard/remove-background', icon: Image },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface DashboardSidebarProps {
  onLogoutStart?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onLogoutStart }) => {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useDashboardStore();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    onLogoutStart?.();
    await logout();
  };

  return (
    <>
      {/* Desktop sidebar */}
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
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                          location.pathname === item.href
                            ? 'bg-gray-50 text-indigo-600'
                            : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        )}
                      >
                        <item.icon
                          className={cn(
                            'h-6 w-6 shrink-0',
                            location.pathname === item.href
                              ? 'text-indigo-600'
                              : 'text-gray-400 group-hover:text-indigo-600'
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                  <span>{user?.email}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-700 hover:text-indigo-600"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="relative z-50 lg:hidden">
          <div className="fixed inset-0 bg-gray-900/80" />
          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-white"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
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
                                'group flex gap-x-3 rounded-md p-2 text-sm leading-6',
                                location.pathname === item.href
                                  ? 'bg-gray-50 text-indigo-600'
                                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                              )}
                              onClick={() => setSidebarOpen(false)}
                            >
                              <item.icon
                                className={cn(
                                  'h-6 w-6 shrink-0',
                                  location.pathname === item.href
                                    ? 'text-indigo-600'
                                    : 'text-gray-400 group-hover:text-indigo-600'
                                )}
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="-mx-6 mt-auto">
                      <div className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
                        <span>{user?.email}</span>
                        <button
                          onClick={handleLogout}
                          className="flex items-center text-gray-700 hover:text-indigo-600"
                        >
                          <LogOut className="h-5 w-5" />
                        </button>
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}; 