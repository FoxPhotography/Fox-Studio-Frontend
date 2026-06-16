import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { settingsService } from '../../../services';
import SectionHeading from '../../../components/shared/SectionHeading';
import { fadeInUp, pageTransition } from '../../../animations/variants';
import { Mail, MapPin, MessageCircle, Instagram, Facebook, Youtube, Sparkles } from 'lucide-react';
import useSEO from '../../../hooks/useSEO';

interface ContactData {
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  youtube?: string;
  email?: string;
  location?: string;
}

export default function Contact() {
  useSEO({ title: 'Book a Consultation - Reserve Your Session Date' });
  const [contact, setContact] = useState<ContactData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const res = await settingsService.getContact();
        setContact((res as any).data || res);
      } catch (err) {
        console.error('Failed to load contact settings:', err);
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const defaultMsg = encodeURIComponent('Hello FOX Studio! I would like to inquire about booking a photo session.');
  const waUrl = contact?.whatsapp
    ? `https://wa.me/${contact.whatsapp}?text=${defaultMsg}`
    : '#';

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen bg-[#0A0A0A]"
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Get in Touch"
          subtitle="Ready to capture your special moments? Send us a message on WhatsApp or connect through our social channels."
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-[#111111] border border-[#232323] rounded-sm p-8 md:p-12 relative overflow-hidden"
        >
          {/* Decorative subtle gradient glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[80px] pointer-events-none" />

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            {/* Contact Details */}
            <div className="space-y-8">
              <h3 className="font-display text-2xl font-bold text-[#F8F8F8] flex items-center gap-2">
                <Sparkles size={20} className="text-[#D4AF37]" />
                Inquiries & Booking
              </h3>

              <div className="space-y-6">
                {contact?.email && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#232323] flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Mail size={16} />
                    </div>
                    <div>
                      <span className="text-[#555555] text-xs font-semibold uppercase tracking-wider block">
                        Email Address
                      </span>
                      <a href={`mailto:${contact.email}`} className="text-[#8A8A8A] hover:text-[#F8F8F8] transition-colors mt-1 block">
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact?.location && (
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-[#232323] flex items-center justify-center text-[#D4AF37] shrink-0">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-[#555555] text-xs font-semibold uppercase tracking-wider block">
                        Location / Studio Base
                      </span>
                      <span className="text-[#8A8A8A] mt-1 block">
                        {contact.location}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp Booking CTA */}
            <div className="flex flex-col justify-center bg-[#0A0A0A]/50 p-6 rounded-sm border border-[#232323]/50">
              <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mb-4">
                <MessageCircle size={24} />
              </div>
              <h4 className="font-display text-xl font-bold text-[#F8F8F8] mb-2">
                Chat Directly on WhatsApp
              </h4>
              <p className="text-[#8A8A8A] text-sm mb-6 leading-relaxed">
                The fastest way to reach us. Check date availability, ask questions, or schedule a free consultation.
              </p>

              {contact?.whatsapp ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-center text-sm tracking-wide rounded-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/10"
                >
                  <MessageCircle size={16} />
                  Start WhatsApp Chat
                </a>
              ) : (
                <p className="text-[#555555] text-xs italic">WhatsApp details not configured.</p>
              )}
            </div>
          </div>

          {/* Social Networks Link section */}
          <div className="mt-12 pt-8 border-t border-[#232323]/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <span className="text-sm text-[#8A8A8A] font-medium">Follow our work on social media:</span>
            <div className="flex flex-wrap gap-3">
              {contact?.instagram && (
                <a
                  href={contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-[#232323] hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-sm text-xs font-semibold tracking-wider uppercase text-[#8A8A8A] transition-all duration-300"
                >
                  <Instagram size={14} />
                  Instagram
                </a>
              )}
              {contact?.facebook && (
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-[#232323] hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-sm text-xs font-semibold tracking-wider uppercase text-[#8A8A8A] transition-all duration-300"
                >
                  <Facebook size={14} />
                  Facebook
                </a>
              )}
              {contact?.youtube && (
                <a
                  href={contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-[#232323] hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-sm text-xs font-semibold tracking-wider uppercase text-[#8A8A8A] transition-all duration-300"
                >
                  <Youtube size={14} />
                  Youtube
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
