import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../../../../components/shared/SectionHeading';
import { fadeInUp } from '../../../../animations/variants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterPair {
  before: string;
  after: string;
  title: string;
}

const pairs: BeforeAfterPair[] = [
  {
    before: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=60&sat=-100',
    after: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=800&q=80',
    title: 'Wedding Color Grading',
  },
  {
    before: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=60&sat=-100',
    after: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&q=80',
    title: 'Portrait Enhancement',
  },
];

export default function BeforeAfterSection() {
  const [current, setCurrent] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(50);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    setSliderPos(Math.max(5, Math.min(95, x)));
  };

  return (
    <section className="py-24 md:py-32 bg-[#111111]">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="The Art of Editing"
          subtitle="See the magic behind the lens — drag to reveal."
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Slider */}
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-sm cursor-col-resize select-none touch-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (full background) */}
            <img
              src={pairs[current].after}
              alt="After"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={pairs[current].before}
                alt="Before"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#D4AF37] z-10"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg">
                <div className="flex gap-0.5">
                  <ChevronLeft size={12} className="text-[#0A0A0A]" />
                  <ChevronRight size={12} className="text-[#0A0A0A]" />
                </div>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-[#0A0A0A]/70 text-[#F8F8F8] text-xs tracking-wide rounded-sm">
              BEFORE
            </div>
            <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#0A0A0A]/70 text-[#F8F8F8] text-xs tracking-wide rounded-sm">
              AFTER
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={() => setCurrent(Math.max(0, current - 1))}
              disabled={current === 0}
              className="text-[#8A8A8A] hover:text-[#D4AF37] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-[#555555] text-sm">
              {current + 1} / {pairs.length}
            </span>
            <button
              onClick={() => setCurrent(Math.min(pairs.length - 1, current + 1))}
              disabled={current === pairs.length - 1}
              className="text-[#8A8A8A] hover:text-[#D4AF37] disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
