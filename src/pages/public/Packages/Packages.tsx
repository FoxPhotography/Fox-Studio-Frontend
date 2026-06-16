import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, stagger, pageTransition } from '../../../animations/variants';
import { packagesService, settingsService, Package } from '../../../services';
import SectionHeading from '../../../components/shared/SectionHeading';
import { Check, ChevronDown, ChevronUp, HelpCircle, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import useSEO from '../../../hooks/useSEO';

interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

export default function Packages() {
  useSEO({ title: 'Investment & Photography Package Prices' });
  const [packages, setPackages] = useState<Package[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    const loadPackagesAndFaqs = async () => {
      try {
        const [pkgRes, faqRes]: [any, any] = await Promise.all([
          packagesService.getVisible(),
          settingsService.getFaq(),
        ]);
        setPackages(pkgRes.data || []);
        setFaqs((faqRes as any).data || faqRes || []);
      } catch (err) {
        console.error('Failed to load packages or FAQs:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPackagesAndFaqs();
  }, []);

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

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
          title="Packages & Pricing"
          subtitle="Transparent, straightforward investments for high-end photography sessions."
        />

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="w-12 h-12 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Packages Grid */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mb-24"
            >
              {packages.map((pkg) => (
                <motion.div
                  key={pkg._id}
                  variants={fadeInUp}
                  className={`relative flex flex-col p-8 rounded-sm bg-[#111111] border ${
                    pkg.isPopular ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5' : 'border-[#232323]'
                  }`}
                >
                  {pkg.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#0A0A0A] text-xs font-semibold px-4 py-1 uppercase tracking-wider rounded-full flex items-center gap-1.5">
                      <Sparkles size={12} />
                      Most Popular
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="font-display text-2xl font-bold text-[#F8F8F8]">{pkg.title}</h3>
                    <p className="text-[#8A8A8A] text-sm mt-2 min-h-[40px]">{pkg.description}</p>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-[#D4AF37] text-3xl font-semibold">$</span>
                      <span className="text-4xl md:text-5xl font-display font-bold text-[#F8F8F8] tracking-tight">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-[#8A8A8A]">
                        <Check size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/contact"
                    className={`w-full py-3.5 text-center font-semibold text-sm tracking-wide rounded-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      pkg.isPopular
                        ? 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E5C34B]'
                        : 'border border-[#F8F8F8]/20 text-[#F8F8F8] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                    }`}
                  >
                    Select Package & Inquire
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* FAQ Accordion Section */}
            {faqs.length > 0 && (
              <div className="max-w-4xl mx-auto mt-24">
                <SectionHeading
                  title="Frequently Asked Questions"
                  subtitle="Everything you need to know about our sessions, booking, and delivery process."
                />

                <div className="space-y-4">
                  {faqs.map((faq) => {
                    const isOpen = openFaq === faq._id;
                    return (
                      <div
                        key={faq._id}
                        className="bg-[#111111] border border-[#232323] rounded-sm overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq._id)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-[#161616] transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <HelpCircle size={20} className="text-[#D4AF37] shrink-0" />
                            <span className="font-semibold text-base md:text-lg text-[#F8F8F8]">
                              {faq.question}
                            </span>
                          </div>
                          {isOpen ? (
                            <ChevronUp size={18} className="text-[#D4AF37] shrink-0" />
                          ) : (
                            <ChevronDown size={18} className="text-[#8A8A8A] shrink-0" />
                          )}
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              exit={{ height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="p-6 pt-0 border-t border-[#232323]/50 text-[#8A8A8A] text-sm md:text-base leading-relaxed pl-14">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
