import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { AnimatePresence, motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <DashboardSidebar onLogoutStart={() => setIsLoggingOut(true)} />
      
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <AnimatePresence mode="wait">
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