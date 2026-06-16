import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Loader2 } from 'lucide-react';
import PageLoader from '../shared/PageLoader';

export default function AdminLayout() {
  const { user, isAuthenticated, isLoading, checkAuth, logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/fox-admin/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/fox-admin/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center gap-4">
        <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
        <span className="text-[#8A8A8A] text-sm tracking-wider">Securing Console Session...</span>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F8F8F8] flex">
      {/* Sidebar navigation */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onLogout={handleLogout}
      />

      {/* Main panel */}
      <div className="flex-grow lg:pl-64 flex flex-col min-h-screen">
        <AdminHeader user={user} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-grow p-6 lg:p-8 overflow-y-auto">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
