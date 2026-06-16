import React from 'react';
import { Menu, User } from 'lucide-react';

interface HeaderProps {
  user: any;
  onMenuClick: () => void;
}

export default function AdminHeader({ user, onMenuClick }: HeaderProps) {
  const userEmail = user?.email || 'owner@foxstudio.com';

  return (
    <header className="h-20 bg-[#111111]/80 backdrop-blur-md border-b border-[#232323] sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8">
      {/* Sidebar toggle for mobile */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-[#8A8A8A] hover:text-[#F8F8F8] bg-[#161616] border border-[#232323] rounded-sm transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <span className="text-sm font-medium text-[#8A8A8A] hidden sm:inline">
          Studio Management Console
        </span>
      </div>

      {/* User Info dropdown / trigger */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-[#F8F8F8]">Studio Owner</p>
          <p className="text-xs text-[#555555]">{userEmail}</p>
        </div>
        <div className="w-10 h-10 rounded-full border border-[#232323] bg-[#161616] flex items-center justify-center text-[#D4AF37]">
          <User size={18} />
        </div>
      </div>
    </header>
  );
}
