import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Crown } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { UpgradeModal } from './UpgradeModal';
import { Logo } from '../Logo';
import { LoadingOverlay } from '../LoadingOverlay';

export const DashboardNavbar: React.FC = () => {
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
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Logo />

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
        </div>
      </nav>
      <div className="h-16"></div> {/* Spacer for fixed navbar */}
      <UpgradeModal isOpen={isUpgradeModalOpen} onClose={() => setIsUpgradeModalOpen(false)} />
    </>
  );
};