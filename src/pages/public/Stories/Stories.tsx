import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { storiesService, Story } from '../../../services';
import SectionHeading from '../../../components/shared/SectionHeading';
import { fadeInUp, stagger, cardHover, pageTransition } from '../../../animations/variants';
import { Calendar, MapPin, ArrowRight, BookOpen } from 'lucide-react';
import useSEO from '../../../hooks/useSEO';

export default function Stories() {
  useSEO({ title: 'Stories - Featured Sessions & Client Diaries' });
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStories = async () => {
      try {
        const res: any = await storiesService.getPublished();
        setStories(res.data || []);
      } catch (err) {
        console.error('Failed to load stories:', err);
      } finally {
        setLoading(false);
      }
    };
    loadStories();
  }, []);

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
          title="Featured Stories"
          subtitle="Cinematic photo stories documenting real connections, weddings, and couples."
        />

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-[#111111] border border-[#232323] rounded-sm animate-pulse aspect-[3/4]"
              />
            ))}
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-24 border border-[#232323] rounded-sm bg-[#111111]">
            <BookOpen size={48} className="text-[#555555] mx-auto mb-4" />
            <p className="text-[#8A8A8A] text-lg">No photo stories have been published yet.</p>
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {stories.map((story) => (
              <motion.div key={story._id} variants={fadeInUp}>
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={cardHover}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-[#111111] border border-[#232323]/50"
                >
                  <Link to={`/stories/${story.slug}`}>
                    {/* Cover Image */}
                    <img
                      src={story.coverImage}
                      alt={story.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />

                    {/* Content on Card */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
                      <div className="flex gap-4 text-xs text-[#8A8A8A] mb-3">
                        <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
                          {story.category}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-[#F8F8F8] mb-3 group-hover:text-[#D4AF37] transition-colors leading-tight">
                        {story.title}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-[#555555] mb-6">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {story.eventDate
                            ? new Date(story.eventDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                              })
                            : ''}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} />
                          {story.location}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-2 text-[#F8F8F8] text-sm font-semibold tracking-wider group-hover:text-[#D4AF37] transition-colors duration-300">
                        View Story
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
