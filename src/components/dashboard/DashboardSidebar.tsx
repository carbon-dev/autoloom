import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Image, Images, CreditCard, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

interface DashboardSidebarProps {
  onClose?: () => void;
  onLogoutStart?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onClose, onLogoutStart }) => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    onLogoutStart?.();
    // Add a small delay to show the loading state
    await new Promise(resolve => setTimeout(resolve, 1000));
    logout();
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full w-64 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="px-4">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            Account
          </div>
          <div className="mt-2">
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            <p className="text-xs text-gray-500">
              {user?.subscription === 'trial' && `${user.trialImagesLeft} images left`}
            </p>
          </div>
        </div>

        <nav className="mt-8 flex-1 px-2 space-y-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Home className="mr-3 h-5 w-5" />
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/remove-background"
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Image className="mr-3 h-5 w-5" />
            Background Removal
          </NavLink>

          <NavLink
            to="/dashboard/my-images"
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Images className="mr-3 h-5 w-5" />
            My Images
          </NavLink>

          <NavLink
            to="/dashboard/billing"
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <CreditCard className="mr-3 h-5 w-5" />
            Billing
          </NavLink>

          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </NavLink>

          <button
            onClick={handleLogout}
            className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-md"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </nav>
      </div>

      {user?.subscription === 'trial' && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
            <h3 className="text-sm font-medium text-indigo-900">Upgrade to Pro</h3>
            <p className="mt-1 text-xs text-indigo-700">
              Get unlimited background removals and premium features
            </p>
            <button
              onClick={() => window.location.href = '/dashboard/billing'}
              className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};