import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fadeInUp } from '../../../../animations/variants';
import { Calendar, ArrowRight } from 'lucide-react';

export default function FinalCTASection() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Light glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-8">
            <Calendar size={22} className="text-[#D4AF37]" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8F8F8] tracking-tight mb-6">
            Let's Write Your Story <br />
            <span className="text-gradient-gold">Together</span>
          </h2>

          <p className="text-[#8A8A8A] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Our calendar fills up quickly, especially during peak season. Get in touch today to check availability and reserve your date.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm tracking-wide rounded-sm hover:bg-[#E5C34B] transition-colors duration-300 flex items-center gap-2"
            >
              Book A Consultation
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/portfolio"
              className="px-8 py-4 border border-[#F8F8F8]/25 text-[#F8F8F8] font-medium text-sm tracking-wide rounded-sm hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300"
            >
              Browse Portfolio
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
