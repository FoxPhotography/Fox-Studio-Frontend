import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { heroReveal, staggerSlow } from '../../../../animations/variants';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/30 via-[#0A0A0A]/50 to-[#0A0A0A] z-10" />
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')`,
          filter: 'brightness(0.5)',
        }}
      />

      {/* Content */}
      <motion.div
        variants={staggerSlow}
        initial="hidden"
        animate="visible"
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          variants={heroReveal}
          className="text-[#D4AF37] tracking-[0.3em] uppercase text-sm mb-6 font-medium"
        >
          Fox Studio
        </motion.p>

        <motion.h1
          variants={heroReveal}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F8F8F8] leading-tight mb-6"
        >
          We don't capture moments.
          <br />
          <span className="text-gradient-gold">We preserve memories.</span>
        </motion.h1>

        <motion.p
          variants={heroReveal}
          className="text-[#8A8A8A] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-pulse-slow"
        >
          Premium photography for life's most meaningful moments.
        </motion.p>

        <motion.div
          variants={heroReveal}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/portfolio"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm tracking-wide rounded-sm hover:bg-[#E5C34B] transition-colors duration-300 text-center"
          >
            View Our Work
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-3.5 border border-[#F8F8F8]/30 text-[#F8F8F8] font-medium text-sm tracking-wide rounded-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 text-center"
          >
            Get In Touch
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ArrowDown size={20} className="text-[#8A8A8A]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
