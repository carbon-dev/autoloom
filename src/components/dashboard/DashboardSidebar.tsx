import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Image as ImageIcon, 
  FolderOpen, 
  Settings, 
  CreditCard,
  X
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { cn } from '../../utils/cn';

const navigation = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Background Removal', href: '/dashboard/remove-background', icon: ImageIcon },
  { name: 'My Images', href: '/dashboard/images', icon: FolderOpen },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

interface DashboardSidebarProps {
  onClose?: () => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ onClose }) => {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  const isLinkActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="w-80 lg:w-64 bg-white border-r min-h-screen p-4">
      <div className="flex items-center justify-between lg:hidden mb-4">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose} className="p-2 text-gray-600 hover:text-gray-900">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="px-3 py-2">
          <div className="text-sm font-medium text-gray-400">ACCOUNT</div>
          <div className="mt-2">
            <div className="text-sm font-medium text-gray-900">{user?.email}</div>
            <div className="text-xs text-gray-500 mt-1">
              {user?.subscription === 'trial' ? (
                <>
                  Trial • {user.trialImagesLeft} images left
                </>
              ) : (
                <>
                  {user?.subscription.charAt(0).toUpperCase() + user?.subscription.slice(1)} Plan
                </>
              )}
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                'flex items-center px-3 py-2 text-sm font-medium rounded-lg',
                isLinkActive(item.href)
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {user?.subscription === 'trial' && (
          <div className="px-3 py-4">
            <div className="rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 text-white">
              <h3 className="text-sm font-semibold">Upgrade to Pro</h3>
              <p className="mt-1 text-xs text-indigo-100">
                Get unlimited background removals and premium features
              </p>
              <button className="mt-3 w-full rounded-md bg-white px-2 py-1.5 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};