import React from 'react';
import { Menu } from 'lucide-react';
import { Logo } from '../../common/Logo';

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onMenuClick }) => {
  return (
    <div className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="p-2 lg:hidden text-gray-500 hover:text-gray-600"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Logo className="h-8 w-auto" />
        </div>
      </div>
    </div>
  );
}; 