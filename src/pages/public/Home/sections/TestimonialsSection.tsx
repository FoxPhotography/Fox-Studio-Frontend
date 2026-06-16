import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewsService, Review } from '../../../../services';
import SectionHeading from '../../../../components/shared/SectionHeading';
import { fadeInUp } from '../../../../animations/variants';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res: any = await reviewsService.getPublished();
        setReviews(res.data || []);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      } finally {
        setLoading(false);
      }
    };
    loadReviews();
  }, []);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  if (loading || reviews.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-[#111111] overflow-hidden relative">
      {/* Decorative Quote Icon Background */}
      <div className="absolute right-10 bottom-10 text-[#232323] opacity-20 pointer-events-none">
        <Quote size={200} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="Kind Words"
          subtitle="What our clients say about their premium experience."
        />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative px-6 md:px-12 py-10 rounded-sm bg-[#0A0A0A] border border-[#232323]"
        >
          {/* Quote Icon */}
          <div className="text-[#D4AF37] mb-6 flex justify-center">
            <Quote size={36} className="rotate-180" />
          </div>

          <div className="min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(reviews[current].rating || 5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                <p className="font-display text-lg md:text-xl italic text-[#F8F8F8] leading-relaxed mb-6">
                  "{reviews[current].comment}"
                </p>

                <div>
                  <h4 className="text-[#D4AF37] font-semibold text-sm tracking-wide uppercase">
                    {reviews[current].clientName}
                  </h4>
                  <p className="text-[#555555] text-xs mt-1">
                    {reviews[current].eventDate
                      ? new Date(reviews[current].eventDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })
                      : ''}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {reviews.length > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#232323]/50">
              <button
                onClick={handlePrev}
                className="text-[#8A8A8A] hover:text-[#D4AF37] transition-colors p-2"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-1.5">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      current === idx ? 'bg-[#D4AF37] w-4' : 'bg-[#232323]'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="text-[#8A8A8A] hover:text-[#D4AF37] transition-colors p-2"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
