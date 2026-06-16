import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../animations/variants';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: 'center' | 'left';
}

export default function SectionHeading({
  title,
  subtitle,
  light = false,
  align = 'center',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={`mb-16 ${alignClass}`}
    >
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#F8F8F8] mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg max-w-2xl ${
            align === 'center' ? 'mx-auto' : ''
          } ${light ? 'text-[#8A8A8A]' : 'text-[#555555]'}`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mt-6 h-px w-16 bg-[#D4AF37] ${align === 'center' ? 'mx-auto' : ''}`} />
    </motion.div>
  );
}
