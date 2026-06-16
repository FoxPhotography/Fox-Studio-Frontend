import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Mail, LucideIcon } from 'lucide-react';

import useSettingsStore from '../../store/settingsStore';

export default function Footer() {
  const contact = useSettingsStore((state) => state.contact);

  const socials = [
    { Icon: Instagram, href: contact?.instagram },
    { Icon: Facebook, href: contact?.facebook },
    { Icon: Youtube, href: contact?.youtube },
    { Icon: Mail, href: contact?.email ? `mailto:${contact.email}` : undefined },
  ].filter((s): s is { Icon: LucideIcon; href: string } => !!s.href);

  return (
    <footer className="bg-[#0A0A0A] border-t border-[#232323]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <Link to="/" className="font-display text-2xl font-bold text-[#F8F8F8] tracking-wide">
              FOX<span className="text-[#D4AF37]">.</span>STUDIO
            </Link>
            <p className="text-[#555555] text-sm mt-2">
              Premium Photography Experience
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex gap-8 text-sm text-[#8A8A8A]">
            <Link to="/portfolio" className="hover:text-[#F8F8F8] transition-colors">Portfolio</Link>
            <Link to="/stories" className="hover:text-[#F8F8F8] transition-colors">Stories</Link>
            <Link to="/packages" className="hover:text-[#F8F8F8] transition-colors">Packages</Link>
            <Link to="/about" className="hover:text-[#F8F8F8] transition-colors">About</Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socials.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#232323] flex items-center justify-center text-[#8A8A8A] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-all duration-300"
                aria-label="Social Link"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#232323]/50 text-center">
          <p className="text-[#555555] text-xs">
            © {new Date().getFullYear()} FOX Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
