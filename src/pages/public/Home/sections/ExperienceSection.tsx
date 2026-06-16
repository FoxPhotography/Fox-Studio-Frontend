import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../../components/shared/SectionHeading';
import { fadeInUp, stagger } from '../../../../animations/variants';
import { Camera, Palette, Zap, Film, Gem, Users, LucideIcon } from 'lucide-react';

interface ExperienceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const items: ExperienceItem[] = [
  { icon: Camera, title: '200+ Sessions', desc: 'Weddings, engagements, and special moments captured.' },
  { icon: Palette, title: 'Cinematic Editing', desc: 'Color grading that tells a story, not just edits.' },
  { icon: Zap, title: 'Fast Delivery', desc: 'Your memories, delivered within weeks.' },
  { icon: Film, title: 'Video Coverage', desc: 'Highlight films that relive the emotion.' },
  { icon: Gem, title: 'Premium Quality', desc: 'Every frame is crafted, not just captured.' },
  { icon: Users, title: 'Personal Approach', desc: 'You work directly with the photographer.' },
];

export default function ExperienceSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="The Fox Experience"
          subtitle="Why clients trust us with their most important moments."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group p-8 bg-[#111111] border border-[#232323] rounded-sm hover:border-[#D4AF37]/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/20 transition-colors duration-500">
                <Icon size={22} className="text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-[#F8F8F8] mb-2">{title}</h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
