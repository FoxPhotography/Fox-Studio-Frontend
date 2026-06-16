import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { settingsService } from '../../../services';
import SectionHeading from '../../../components/shared/SectionHeading';
import { fadeInUp, stagger, pageTransition } from '../../../animations/variants';
import { Shield, Sparkles, Award, Camera } from 'lucide-react';
import useSEO from '../../../hooks/useSEO';

interface AboutData {
  profileImage?: { url: string; publicId: string };
  title?: string;
  story?: string;
  vision?: string;
  equipment?: { type: string; name: string }[];
  stats?: { number: string; label: string }[];
}

export default function About() {
  useSEO({ title: 'About the Studio & Photographer Bio' });
  const [data, setData] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadAbout = async () => {
      try {
        const res = await settingsService.getAbout();
        setData((res as any).data || res);
      } catch (err) {
        console.error('Failed to load about details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadAbout();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const defaultProfile = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80';
  const profileUrl = data?.profileImage?.url || defaultProfile;

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title={data?.title || 'About FOX Studio'}
          subtitle="Behind the lens: our story, vision, and the values that drive our photography."
        />

        <div className="grid lg:grid-cols-12 gap-12 items-center mb-24">
          {/* Photographer Image */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 relative aspect-[4/5] rounded-sm overflow-hidden bg-[#111111] border border-[#232323]"
          >
            <img
              src={profileUrl}
              alt="Photographer profile"
              className="w-full h-full object-cover"
            />
            {/* Subtle glow border */}
            <div className="absolute inset-0 border border-[#D4AF37]/10 pointer-events-none" />
          </motion.div>

          {/* Biography and Story */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-6"
          >
            <h3 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
              <Sparkles size={20} className="text-[#D4AF37]" />
              Our Story
            </h3>
            <p className="text-[#8A8A8A] text-lg leading-relaxed whitespace-pre-line">
              {data?.story ||
                'Fox Studio was founded with a single mission: to provide high-end, cinematic, and timeless photography that captures the raw emotion and unique story of every subject.\n\nWe specialize in wedding, engagement, and casual outdoor portraiture, bringing a cinematic look and clean storytelling aesthetic to life.'}
            </p>

            {data?.vision && (
              <>
                <h3 className="font-display text-2xl font-bold text-[#F8F8F8] pt-4 flex items-center gap-2">
                  <Award size={20} className="text-[#D4AF37]" />
                  Our Vision
                </h3>
                <p className="text-[#8A8A8A] text-base leading-relaxed">
                  {data.vision}
                </p>
              </>
            )}
          </motion.div>
        </div>

        {/* Stats Grid */}
        {data?.stats && data.stats.length > 0 && (
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 py-12 border-y border-[#232323]/50"
          >
            {data.stats.map((stat, i) => (
              <motion.div key={i} variants={fadeInUp} className="text-center">
                <h4 className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                  {stat.number}
                </h4>
                <p className="text-[#8A8A8A] text-xs uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Equipment/Gear Details */}
        {data?.equipment && data.equipment.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-3xl font-bold text-[#F8F8F8] text-center mb-12 flex items-center justify-center gap-2">
              <Camera size={24} className="text-[#D4AF37]" />
              The Gear we Use
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.equipment.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#111111] border border-[#232323] rounded-sm hover:border-[#D4AF37]/20 transition-all duration-300 flex gap-4 items-start"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <Shield size={16} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <span className="text-[#555555] text-xs font-semibold uppercase tracking-wider block">
                      {item.type}
                    </span>
                    <h4 className="font-semibold text-[#F8F8F8] mt-1 text-sm md:text-base">
                      {item.name}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
