import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useDashboardStore } from '../stores/useDashboardStore';

export const DashboardHeader: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  const { setSidebarOpen } = useDashboardStore();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex flex-1" />
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>

          {/* Profile dropdown */}
          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <span
              className="hidden lg:flex lg:items-center"
            >
              <span
                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                aria-hidden="true"
              >
                {user?.email}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}; 