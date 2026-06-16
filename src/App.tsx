import React, { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import PageLoader from './components/shared/PageLoader';

// Core Public Layout remains eager
import PublicLayout from './components/layout/PublicLayout';

// Lazy load public pages
const Home = lazy(() => import('./pages/public/Home/Home'));
const Portfolio = lazy(() => import('./pages/public/Portfolio/Portfolio'));
const Stories = lazy(() => import('./pages/public/Stories/Stories'));
const StoryDetail = lazy(() => import('./pages/public/Stories/StoryDetail'));
const Packages = lazy(() => import('./pages/public/Packages/Packages'));
const About = lazy(() => import('./pages/public/About/About'));
const Contact = lazy(() => import('./pages/public/Contact/Contact'));
const NotFound = lazy(() => import('./pages/public/NotFound/NotFound'));

// Lazy load secure admin pages
const AdminLayout = lazy(() => import('./components/layout/AdminLayout'));
const Login = lazy(() => import('./pages/admin/Login/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard/Dashboard'));
const StoriesManager = lazy(() => import('./pages/admin/Stories/StoriesManager'));
const PortfolioManager = lazy(() => import('./pages/admin/Portfolio/PortfolioManager'));
const PackagesManager = lazy(() => import('./pages/admin/Packages/PackagesManager'));
const ReviewsManager = lazy(() => import('./pages/admin/Reviews/ReviewsManager'));
const BeforeAfterManager = lazy(() => import('./pages/admin/BeforeAfter/BeforeAfterManager'));
const SettingsManager = lazy(() => import('./pages/admin/Settings/SettingsManager'));
const ChangePassword = lazy(() => import('./pages/admin/Security/ChangePassword'));

import useSettingsStore from './store/settingsStore';

export default function App() {
  const location = useLocation();
  const fetchPublicData = useSettingsStore((state) => state.fetchPublicData);

  useEffect(() => {
    // Fetch global configuration (SEO, general settings, etc.) at app start
    fetchPublicData();
  }, [fetchPublicData]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111111',
            color: '#F8F8F8',
            border: '1px solid #232323',
            fontSize: '14px',
            borderRadius: '2px',
          },
          success: {
            iconTheme: {
              primary: '#D4AF37',
              secondary: '#111111',
            },
          },
        }}
      />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="stories" element={<Stories />} />
            <Route path="stories/:slug" element={<StoryDetail />} />
            <Route path="packages" element={<Packages />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin Authentication Entry */}
          <Route
            path="/fox-admin/login"
            element={
              <Suspense fallback={<PageLoader />}>
                <Login />
              </Suspense>
            }
          />

          {/* Secure Admin Dashboard Routes */}
          <Route path="/fox-admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="stories" element={<StoriesManager />} />
            <Route path="portfolio" element={<PortfolioManager />} />
            <Route path="packages" element={<PackagesManager />} />
            <Route path="reviews" element={<ReviewsManager />} />
            <Route path="before-after" element={<BeforeAfterManager />} />
            <Route path="settings" element={<SettingsManager />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* Fallback Not Found */}
          <Route
            path="*"
            element={
              <Suspense fallback={<PageLoader />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
