import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  ImageIcon,
  DollarSign,
  MessageSquare,
  Columns,
  Settings,
  KeyRound,
  LogOut,
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

interface NavItem {
  to: string;
  label: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function AdminSidebar({ isOpen, onClose, onLogout }: SidebarProps) {
  const menuItems: NavItem[] = [
    { to: '/fox-admin/dashboard', label: 'Overview', Icon: LayoutDashboard },
    { to: '/fox-admin/stories', label: 'Stories', Icon: BookOpen },
    { to: '/fox-admin/portfolio', label: 'Portfolio', Icon: ImageIcon },
    { to: '/fox-admin/packages', label: 'Packages', Icon: DollarSign },
    { to: '/fox-admin/reviews', label: 'Reviews', Icon: MessageSquare },
    { to: '/fox-admin/before-after', label: 'Before/After', Icon: Columns },
    { to: '/fox-admin/settings', label: 'Site Settings', Icon: Settings },
    { to: '/fox-admin/change-password', label: 'Security', Icon: KeyRound },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#111111] border-r border-[#232323] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="h-20 px-6 border-b border-[#232323] flex items-center justify-between">
          <span className="font-display text-lg font-bold text-[#F8F8F8] tracking-wider">
            FOX<span className="text-[#D4AF37]">.</span>ADMIN
          </span>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-[#8A8A8A] hover:text-[#F8F8F8]"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-l-2 border-[#D4AF37]'
                    : 'text-[#8A8A8A] hover:bg-[#161616] hover:text-[#F8F8F8]'
                }`
              }
            >
              <item.Icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#232323]">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-[#EF4444] hover:bg-[#EF4444]/5 rounded-sm transition-colors duration-200"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
