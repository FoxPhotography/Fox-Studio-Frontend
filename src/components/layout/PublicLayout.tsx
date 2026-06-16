import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFab from './WhatsAppFab';
import PageLoader from '../shared/PageLoader';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
