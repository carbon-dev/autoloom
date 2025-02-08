import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Crown, Menu } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UpgradeModal } from './UpgradeModal';
import { Logo } from '../Logo';
import { LoadingOverlay } from '../LoadingOverlay';

interface DashboardNavbarProps {
  onMenuClick: () => void;
}

export const DashboardNavbar: React.FC<DashboardNavbarProps> = ({ onMenuClick }) => {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    // Add a small delay to show the animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    logout();
    navigate('/');
  };

  return (
    <>
      {isLoggingOut && <LoadingOverlay message="Logging you out..." />}
      <nav className="fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 -ml-2 mr-2 text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <Logo className="h-6" />
          </div>

          <div className="flex items-center space-x-4">
            {user?.subscription === 'trial' && (
              <button
                onClick={() => setIsUpgradeModalOpen(true)}
                className="flex items-center space-x-1 bg-[#ff6b6b] text-white px-4 py-2 rounded-lg hover:bg-[#ff5252] transition-colors"
              >
                <Crown className="h-4 w-4" />
                <span>Upgrade</span>
              </button>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>
      <div className="h-16"></div> {/* Spacer for fixed navbar */}
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
    </>
  );
};