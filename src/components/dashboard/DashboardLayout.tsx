import React, { useState, useEffect } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardNavbar } from './DashboardNavbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useImageStore } from './stores/useImageStore';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const loadImages = useImageStore((state) => state.loadImages);

  useEffect(() => {
    // Load images when dashboard mounts
    loadImages();
  }, [loadImages]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <DashboardNavbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed top-[4rem] inset-x-0 bottom-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className={`
          fixed top-[4rem] bottom-0 left-0 z-50 lg:static lg:z-0
          transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <DashboardSidebar 
            onClose={() => setIsSidebarOpen(false)} 
            onLogoutStart={() => setIsLoggingOut(true)}
          />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-8">
            <AnimatePresence>
              {isLoggingOut ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center h-[80vh]"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4" />
                  <h2 className="text-xl font-medium text-gray-900">Logging you out...</h2>
                  <p className="text-gray-500 mt-2">Thanks for using Autoloom!</p>
                </motion.div>
              ) : (
                children
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};