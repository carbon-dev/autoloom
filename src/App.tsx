import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { Dashboard } from './pages/Dashboard';
import { BillingPage } from './pages/dashboard/BillingPage';
import { Pricing } from './pages/Pricing';
import { useAuthStore } from './store/useAuthStore';
import { Navbar } from './components/Navbar';

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <DashboardLayout>
                <Routes>
                  <Route index element={<DashboardOverview />} />
                  <Route path="remove-background" element={<Dashboard />} />
                  <Route path="billing" element={<BillingPage />} />
                </Routes>
              </DashboardLayout>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/pricing" element={<Pricing />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;