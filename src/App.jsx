import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { SpinnerIcon } from './components/icons';
import { CursorOverlay } from './components/ui/CursorOverlay';

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const Connect = lazy(() => import('./pages/Connect'));
const Transition = lazy(() => import('./pages/Transition'));
const AppShell = lazy(() => import('./components/layout/AppShell'));
const Home = lazy(() => import('./pages/Home'));
const Discover = lazy(() => import('./pages/Discover'));
const Letters = lazy(() => import('./pages/Letters'));
const Settings = lazy(() => import('./pages/Settings'));

// Loading Fallback Component
const LoadingFallback = () => (
  <div
    style={{
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-void)',
      color: 'var(--gold-glow)'
    }}
  >
    <SpinnerIcon size={40} />
    <span className="font-body" style={{ fontStyle: 'italic', marginTop: 'var(--space-md)', fontSize: '15px' }}>
      Retrieving the scrolls...
    </span>
  </div>
);

// Route Guard for Authenticated Routes
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Route Guard for Unauthenticated Routes
const PublicRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/app/home" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <AuthProvider>
      {/* Custom Mouse Cursor overlay */}
      <CursorOverlay />
      
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <PublicRoute>
                  <Landing />
                </PublicRoute>
              }
            />
            <Route
              path="/connect"
              element={
                <PublicRoute>
                  <Connect />
                </PublicRoute>
              }
            />
            
            {/* Onboarding Transition (Plays once after connect completes) */}
            <Route path="/transition" element={<Transition />} />

            {/* Authenticated Dashboard Core */}
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppShell />
                </ProtectedRoute>
              }
            >
              <Route path="home" element={<Home />} />
              <Route path="discover" element={<Discover />} />
              <Route path="letters" element={<Letters />} />
              <Route path="settings" element={<Settings />} />
              {/* Fallback route under /app */}
              <Route path="*" element={<Navigate to="home" replace />} />
            </Route>

            {/* Global fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
