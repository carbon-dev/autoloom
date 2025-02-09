import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { Dashboard } from './pages/Dashboard';
import { BillingPage } from './pages/dashboard/BillingPage';
import { Pricing } from './pages/Pricing';
import { useAuthStore } from './store/useAuthStore';
import { Navbar } from './components/Navbar';
import { supabase } from './lib/supabase';
import { LoadingOverlay } from './components/LoadingOverlay';
import { GlobalToast } from './components/GlobalToast';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { ScrollToTop } from './components/ScrollToTop';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './components/PageTransition';

// Create a wrapper component to handle auth redirects
const AuthRedirect: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [isAuthenticated, location.pathname, navigate]);

  return <>{children}</>;
};

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore(state => state.login);
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          login(session.user.email);
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            login(session.user.email);
          } else {
            logout();
          }
        });

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };

    initAuth();
  }, [login, logout]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthRedirect>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/dashboard/*"
              element={
                isAuthenticated ? (
                  <DashboardLayout>
                    <PageTransition>
                      <Routes>
                        <Route index element={<DashboardOverview />} />
                        <Route path="remove-background" element={<Dashboard />} />
                        <Route path="billing" element={<BillingPage />} />
                      </Routes>
                    </PageTransition>
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
                  <PageTransition>
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                      <Route path="/pricing" element={<Pricing />} />
                      <Route path="/terms" element={<Terms />} />
                      <Route path="/privacy" element={<Privacy />} />
                    </Routes>
                  </PageTransition>
                </>
              }
            />
          </Routes>
        </AnimatePresence>
      </AuthRedirect>
      <GlobalToast />
    </BrowserRouter>
  );
}

export default App;