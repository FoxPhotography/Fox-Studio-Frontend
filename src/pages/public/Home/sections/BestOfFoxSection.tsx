import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../../components/shared/SectionHeading';
import { fadeInUp, stagger } from '../../../../animations/variants';

const demoImages: string[] = [
  'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&q=80',
  'https://images.unsplash.com/photo-1620735692151-26a7e0748571?w=600&q=80',
  'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=600&q=80',
];

export default function BestOfFoxSection() {
  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Best of Fox"
          subtitle="The finest from our portfolio — curated, not collected."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
        >
          {demoImages.map((url, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm"
            >
              <img
                src={url}
                alt={`Best of Fox ${i + 1}`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                style={{ height: i % 3 === 0 ? '400px' : i % 2 === 0 ? '300px' : '350px' }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
