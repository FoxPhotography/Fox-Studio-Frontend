import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { packagesService, Package } from '../../../../services';
import SectionHeading from '../../../../components/shared/SectionHeading';
import { fadeInUp, stagger } from '../../../../animations/variants';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

export default function PackagesPreviewSection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const res: any = await packagesService.getVisible();
        const visible: Package[] = res.data || [];
        const featured = visible.filter((p) => p.isPopular).slice(0, 3);
        setPackages(featured.length > 0 ? featured : visible.slice(0, 3));
      } catch (err) {
        console.error('Failed to load packages:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  if (loading || packages.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-[#0A0A0A] border-t border-[#232323]/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          title="Investment"
          subtitle="Transparent pricing for premium photography. Select the perfect package for your story."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid md:grid-cols-3 gap-8 items-stretch"
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
                className={`w-full py-3 text-center font-medium text-sm tracking-wide rounded-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                  pkg.isPopular
                    ? 'bg-[#D4AF37] text-[#0A0A0A] hover:bg-[#E5C34B]'
                    : 'border border-[#F8F8F8]/20 text-[#F8F8F8] hover:border-[#D4AF37] hover:text-[#D4AF37]'
                }`}
              >
                Inquire Now
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link
            to="/packages"
            className="inline-flex items-center gap-2 text-[#D4AF37] text-sm tracking-wide hover:text-[#E5C34B] transition-colors border-b border-[#D4AF37]/30 pb-1"
          >
            View All Packages & Details
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
