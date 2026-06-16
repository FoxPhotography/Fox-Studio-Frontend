import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SectionHeading from '../../../../components/shared/SectionHeading';
import { fadeInUp, stagger, cardHover } from '../../../../animations/variants';
import { ArrowUpRight, ArrowRight } from 'lucide-react';

interface DemoStory {
  title: string;
  category: string;
  location: string;
  date: string;
  image: string;
}

const demoStories: DemoStory[] = [
  { title: 'Ahmed & Sara', category: 'Wedding', location: 'Cairo', date: 'Dec 2025', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
  { title: 'Mohamed & Aya', category: 'Engagement', location: 'Alexandria', date: 'Oct 2025', image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80' },
  { title: 'Nour & Mariam', category: 'Casual', location: 'Hurghada', date: 'Aug 2025', image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80' },
];

export default function FeaturedStoriesSection() {
  return (
    <section className="py-24 md:py-32 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Our Stories"
          subtitle="Every session has a story. Here are some of our favorites."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-3 gap-6"
        >
          {demoStories.map((story, i) => (
            <motion.div key={i} variants={fadeInUp}>
              <motion.div
                initial="rest"
                whileHover="hover"
                variants={cardHover}
                className="group cursor-pointer"
              >
                <Link to="/stories">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm mb-4">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-[#D4AF37] text-xs tracking-widest uppercase">
                        {story.category}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-[#F8F8F8] mt-1">
                        {story.title}
                      </h3>
                      <p className="text-[#8A8A8A] text-sm mt-1">
                        {story.location} · {story.date}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F8F8F8]/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowUpRight size={14} className="text-[#F8F8F8]" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/stories"
            className="inline-flex items-center gap-1.5 text-[#D4AF37] text-sm tracking-wide hover:text-[#E5C34B] transition-colors border-b border-[#D4AF37]/30 pb-1"
          >
            See All Stories
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
