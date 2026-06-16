import React from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../../../animations/variants';
import HeroSection from './sections/HeroSection';
import BestOfFoxSection from './sections/BestOfFoxSection';
import FeaturedStoriesSection from './sections/FeaturedStoriesSection';
import ExperienceSection from './sections/ExperienceSection';
import BeforeAfterSection from './sections/BeforeAfterSection';
import PackagesPreviewSection from './sections/PackagesPreviewSection';
import TestimonialsSection from './sections/TestimonialsSection';
import FinalCTASection from './sections/FinalCTASection';
import useSEO from '../../../hooks/useSEO';

export default function Home() {
  useSEO({ title: 'Premium Cinematic Photography Showcase' });
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="overflow-x-hidden"
    >
      <HeroSection />
      <BestOfFoxSection />
      <FeaturedStoriesSection />
      <ExperienceSection />
      <BeforeAfterSection />
      <PackagesPreviewSection />
      <TestimonialsSection />
      <FinalCTASection />
    </motion.div>
  );
}
