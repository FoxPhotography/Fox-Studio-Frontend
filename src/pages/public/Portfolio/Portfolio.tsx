import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioService, PortfolioItem } from '../../../services';
import SectionHeading from '../../../components/shared/SectionHeading';
import ImageLightbox from '../../../components/shared/ImageLightbox';
import { fadeInUp, stagger, pageTransition } from '../../../animations/variants';
import { Heart, ImageIcon } from 'lucide-react';
import useSEO from '../../../hooks/useSEO';

export default function Portfolio() {
  useSEO({ title: 'Portfolio - Cinematic Moments Captured' });
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>(['All', 'Best of Fox']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res: any = await portfolioService.getPublished();
        const data: PortfolioItem[] = res.data || [];
        setItems(data);

        // Derive unique categories from items
        const cats = new Set<string>(['All', 'Best of Fox']);
        data.forEach((item) => {
          if (item.category) {
            cats.add(item.category);
          }
        });
        setCategories(Array.from(cats));
      } catch (err) {
        console.error('Failed to load portfolio:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);

  const filteredItems = items.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Best of Fox') return item.isBestOfFox;
    return item.category === activeCategory;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = filteredItems.map((item) => item.imageUrl);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen bg-[#0A0A0A]"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Portfolio"
          subtitle="A curated collection of captured moments, cinematic love stories, and memories preserved in time."
        />

        {/* Categories Filter Bar */}
        {categories.length > 2 && (
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-[#0A0A0A]'
                    : 'bg-[#111111] text-[#8A8A8A] hover:bg-[#232323] hover:text-[#F8F8F8] border border-[#232323]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Loading / Empty State */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-[#111111] border border-[#232323] rounded-sm animate-pulse"
                style={{ height: i % 2 === 0 ? '350px' : '280px' }}
              />
            ))}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-24 border border-[#232323] rounded-sm bg-[#111111]">
            <ImageIcon size={48} className="text-[#555555] mx-auto mb-4" />
            <p className="text-[#8A8A8A] text-lg">No photos found in this category.</p>
          </div>
        ) : (
          /* Masonry Gallery Grid */
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openLightbox(idx)}
                  className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm relative bg-[#111111] border border-[#232323]/30"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Portfolio photo'}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    style={{ height: idx % 3 === 0 ? '420px' : idx % 2 === 0 ? '300px' : '360px' }}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg font-bold text-[#F8F8F8]">
                      {item.title}
                    </h3>
                    {item.isBestOfFox && (
                      <div className="absolute top-4 right-4 text-[#D4AF37]">
                        <Heart size={16} className="fill-[#D4AF37]" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      <ImageLightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </motion.div>
  );
}
