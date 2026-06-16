import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { storiesService, Story } from '../../../services';
import ImageLightbox from '../../../components/shared/ImageLightbox';
import { pageTransition, fadeInUp, stagger } from '../../../animations/variants';
import { Calendar, MapPin, ArrowLeft, Sparkles } from 'lucide-react';
import useSEO from '../../../hooks/useSEO';

export default function StoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [story, setStory] = useState<Story | null>(null);

  useSEO({
    title: story ? `${story.title} (${story.category})` : 'Loading Story...',
    description: story ? story.description.replace(/<[^>]*>/g, '').substring(0, 155) : '',
    ogImage: story ? story.coverImage : undefined,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  useEffect(() => {
    const loadStory = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res: any = await storiesService.getBySlug(slug);
        setStory(res.data);
      } catch (err) {
        console.error('Failed to load story detail:', err);
        setError('Story not found');
      } finally {
        setLoading(false);
      }
    };
    loadStory();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !story) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-display text-3xl font-bold text-[#F8F8F8] mb-4">Story Not Found</h2>
        <p className="text-[#8A8A8A] mb-8">The story you are looking for does not exist or has been removed.</p>
        <Link
          to="/stories"
          className="px-6 py-3 bg-[#D4AF37] text-[#0A0A0A] font-semibold text-sm tracking-wide rounded-sm hover:bg-[#E5C34B] transition-colors"
        >
          Back to Stories
        </Link>
      </div>
    );
  }

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const slides = story.gallery ? story.gallery.map((img) => img.url) : [];

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="bg-[#0A0A0A] min-h-screen pb-24"
    >
      {/* Back Button */}
      <div className="absolute top-28 left-6 md:left-12 z-30">
        <Link
          to="/stories"
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A8A8A] hover:text-[#D4AF37] bg-[#0A0A0A]/50 backdrop-blur-md border border-[#232323] px-4 py-2 rounded-full transition-all duration-300"
        >
          <ArrowLeft size={14} />
          All Stories
        </Link>
      </div>

      {/* Hero Banner Header */}
      <section className="relative h-[70vh] flex items-end justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-[#0A0A0A]/20 z-10" />
        <img
          src={story.coverImage}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center pb-16">
          <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase mb-4 block">
            {story.category}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#F8F8F8] mb-6 leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center justify-center gap-6 text-sm text-[#8A8A8A]">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#D4AF37]" />
              {story.eventDate ? new Date(story.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : ''}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#D4AF37]" />
              {story.location}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="prose prose-invert max-w-none text-[#8A8A8A] text-lg leading-relaxed space-y-6"
        >
          <div
            dangerouslySetInnerHTML={{ __html: story.description }}
            className="rich-text-content"
          />
        </motion.div>
      </section>

      {/* Story Gallery Grid */}
      {story.gallery && story.gallery.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 border-t border-[#232323]/50 pt-16">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl font-bold text-[#F8F8F8]">Story Gallery</h2>
              <p className="text-[#555555] text-sm mt-2">Every memory, beautifully captured and preserved.</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <Sparkles size={16} />
            </div>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="columns-2 md:columns-3 gap-4 space-y-4"
          >
            {story.gallery.map((img, idx) => (
              <motion.div
                key={img._id || idx}
                variants={fadeInUp}
                onClick={() => openLightbox(idx)}
                className="break-inside-avoid group cursor-pointer overflow-hidden rounded-sm relative bg-[#111111] border border-[#232323]/30"
              >
                <img
                  src={img.url}
                  alt={img.title || story.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  style={{ height: idx % 3 === 0 ? '400px' : idx % 2 === 0 ? '300px' : '350px' }}
                />
                {img.title && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="font-display text-sm font-semibold text-[#F8F8F8]">{img.title}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      <ImageLightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
      />
    </motion.div>
  );
}
