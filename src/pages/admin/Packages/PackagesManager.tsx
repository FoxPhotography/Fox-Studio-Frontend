import React, { useEffect, useState } from 'react';
import { packagesService, Package } from '../../../services';
import toast from 'react-hot-toast';
import {
  DollarSign,
  Plus,
  Trash2,
  Edit,
  X,
  Check,
  Sparkles,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';

export default function PackagesManager() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [featuresInput, setFeaturesInput] = useState<string>('');
  const [isPopular, setIsPopular] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadPackages = async () => {
    setLoading(true);
    try {
      const res: any = await packagesService.getAll();
      setPackages(res.data || res || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load packages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setPrice('');
    setFeaturesInput('');
    setIsPopular(false);
    setFormOpen(true);
  };

  const handleOpenEdit = (pkg: Package) => {
    setEditingId(pkg._id);
    setTitle(pkg.title);
    setDescription(pkg.description);
    setPrice(pkg.price);
    setFeaturesInput(pkg.features.join('\n'));
    setIsPopular(pkg.isPopular);
    setFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const features = featuresInput
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f !== '');

    const packageData = {
      title,
      description,
      price,
      features,
      isPopular,
    };

    try {
      if (editingId) {
        await packagesService.update(editingId, packageData);
        toast.success('Package updated successfully');
      } else {
        await packagesService.create(packageData);
        toast.success('Package created successfully');
      }
      setFormOpen(false);
      loadPackages();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to save package');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    try {
      await packagesService.delete(id);
      toast.success('Package deleted');
      loadPackages();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete package');
    }
  };

  const handleToggleVisibility = async (id: string) => {
    try {
      await packagesService.toggleVisibility(id);
      toast.success('Package status toggled');
      loadPackages();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle package visibility');
    }
  };

  const handleTogglePopular = async (id: string) => {
    try {
      await packagesService.togglePopular(id);
      toast.success('Popular status toggled');
      loadPackages();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle popular flag');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
            <DollarSign size={28} className="text-[#D4AF37]" />
            Packages Manager
          </h1>
          <p className="text-sm text-[#8A8A8A] mt-1">
            Build photographer investments plans, descriptions, pricing, and visibility.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C34B] text-[#0A0A0A] text-sm font-semibold rounded-sm transition-colors duration-300"
        >
          <Plus size={16} />
          Create Package
        </button>
      </div>

      {/* Package list */}
      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : packages.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] border border-[#232323] rounded-sm">
          <DollarSign size={40} className="text-[#555555] mx-auto mb-4" />
          <p className="text-[#8A8A8A]">No pricing packages found. Setup your first package plan!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className={`relative flex flex-col p-8 rounded-sm bg-[#111111] border ${
                pkg.isPopular ? 'border-[#D4AF37] shadow-lg shadow-[#D4AF37]/5' : 'border-[#232323]'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-6 bg-[#D4AF37] text-[#0A0A0A] text-xs font-semibold px-4 py-1 uppercase tracking-wider rounded-full flex items-center gap-1">
                  <Sparkles size={12} />
                  Popular Showcase
                </div>
              )}

              <div className="mb-6 mt-2">
                <h3 className="font-display text-2xl font-bold text-[#F8F8F8]">{pkg.title}</h3>
                <p className="text-[#8A8A8A] text-sm mt-2 min-h-[40px] leading-relaxed">{pkg.description}</p>
                <div className="mt-4 flex items-baseline">
                  <span className="text-[#D4AF37] text-3xl font-semibold">$</span>
                  <span className="text-4xl md:text-5xl font-display font-bold text-[#F8F8F8]">
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

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#232323]/50 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggleVisibility(pkg._id)}
                    className={`p-2 rounded-sm border transition-colors ${
                      pkg.isVisible
                        ? 'border-green-500/20 bg-green-500/5 text-green-500 hover:bg-green-500/10'
                        : 'border-[#232323] text-[#555555] hover:text-[#8A8A8A]'
                    }`}
                    title={pkg.isVisible ? 'Hide from public site' : 'Show on public site'}
                  >
                    {pkg.isVisible ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>

                  <button
                    onClick={() => handleTogglePopular(pkg._id)}
                    className={`p-2 rounded-sm border transition-colors ${
                      pkg.isPopular
                        ? 'border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] hover:bg-[#D4AF37]/10'
                        : 'border-[#232323] text-[#555555] hover:text-[#D4AF37]'
                    }`}
                    title={pkg.isPopular ? 'Remove popular tag' : 'Set as popular'}
                  >
                    <Sparkles size={14} className={pkg.isPopular ? 'fill-[#D4AF37]' : ''} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(pkg)}
                    className="p-2 border border-[#232323] text-[#8A8A8A] hover:text-[#F8F8F8] rounded-sm transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="p-2 border border-[#232323] text-[#8A8A8A] hover:text-[#EF4444] rounded-sm transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#111111] border border-[#232323] w-full max-w-md rounded-sm p-6 relative">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-4 right-4 text-[#8A8A8A] hover:text-[#F8F8F8]"
            >
              <X size={20} />
            </button>

            <h2 className="font-display text-xl font-bold text-[#F8F8F8] mb-6">
              {editingId ? 'Edit Package Info' : 'Create Package'}
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Package Name
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Royal Wedding Package"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              {/* Price */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Price ($ value string)
                </label>
                <input
                  type="text"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="1200"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Short Description
                </label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Premium complete coverage for large scale wedding celebrations..."
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                  rows={2}
                />
              </div>

              {/* Features */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider block">
                  Package Features (One per line)
                </label>
                <textarea
                  required
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="8 Hours Coverage&#10;Unlimited edited shots&#10;Cinematic highlight film&#10;Private web gallery"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                  rows={4}
                />
              </div>

              {/* Popular Checkbox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPopular}
                  onChange={(e) => setIsPopular(e.target.checked)}
                  className="rounded-sm bg-[#0A0A0A] border-[#232323] text-[#D4AF37] focus:ring-0 w-4 h-4"
                />
                <span className="text-sm text-[#8A8A8A] font-medium">Highlight as Most Popular package</span>
              </label>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-[#232323]/50">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-2.5 border border-[#232323] hover:bg-[#161616] text-[#8A8A8A] text-sm font-semibold rounded-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C34B] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-[#0A0A0A] text-sm font-semibold rounded-sm transition-colors flex items-center gap-2"
                >
                  {isSubmitting && <Loader2 size={14} className="animate-spin" />}
                  {editingId ? 'Save Package' : 'Create Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
