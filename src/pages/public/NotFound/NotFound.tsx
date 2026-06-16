import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { pageTransition } from '../../../animations/variants';
import { Compass, ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-8">
        <Compass size={32} className="animate-spin-slow" />
      </div>

      <h1 className="font-display text-7xl md:text-8xl font-bold text-[#F8F8F8] tracking-tight mb-4">
        404
      </h1>

      <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F8F8] mb-6">
        Page Not Found
      </h2>

      <p className="text-[#8A8A8A] text-base md:text-lg max-w-md mx-auto mb-10 leading-relaxed">
        The story you are trying to read or the page you are trying to visit has wandered off the map.
      </p>

      <Link
        to="/"
        className="px-8 py-3.5 bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm tracking-wide rounded-sm hover:bg-[#E5C34B] transition-colors flex items-center gap-2"
      >
        Return Home
        <ArrowRight size={14} />
      </Link>
    </motion.div>
  );
}
