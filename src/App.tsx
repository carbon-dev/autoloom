import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { Dashboard } from './pages/Dashboard';
import { BillingPage } from './pages/dashboard/BillingPage';
import { Pricing } from './pages/Pricing';
import { useAuthStore } from './store/useAuthStore';
import { Navbar } from './components/Navbar';
import { LoadingOverlay } from './components/LoadingOverlay';
import { GlobalToast } from './components/GlobalToast';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { ScrollToTop } from './components/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/PageTransition';
import { Contact } from './pages/Contact';
import { ToastContainer } from './components/dashboard/shared/Toast';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <PageTransition>
        <Outlet />
      </PageTransition>
    </>
  );
}

function ProtectedLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <DashboardLayout>
      <PageTransition>
        <Outlet />
      </PageTransition>
    </DashboardLayout>
  );
}

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);
  const initializeSession = useAuthStore(state => state.initializeSession);

  useEffect(() => {
    initializeSession();
  }, []);

  if (isAuthLoading) {
    return <LoadingOverlay />;
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <GlobalToast />
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route 
              path="/" 
              element={!isAuthenticated ? <LandingPage /> : <Navigate to="/dashboard" replace />} 
            />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="remove-background" element={<Dashboard />} />
            <Route path="billing" element={<BillingPage />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;