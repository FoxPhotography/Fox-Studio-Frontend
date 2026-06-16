import React, { useEffect, useState } from 'react';
import { portfolioService, PortfolioItem } from '../../../services';
import ImageUploader from '../../../components/admin/ImageUploader';
import toast from 'react-hot-toast';
import { ImageIcon, Plus, Trash2, Heart, Loader2, Tag, X } from 'lucide-react';

export default function PortfolioManager() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Wedding');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [publicId, setPublicId] = useState<string>('');
  const [isBestOfFox, setIsBestOfFox] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadPortfolio = async () => {
    setLoading(true);
    try {
      const res: any = await portfolioService.getAll();
      setItems(res.data || res || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load portfolio items');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPortfolio();
  }, []);

  const handleOpenCreate = () => {
    setTitle('');
    setCategory('Wedding');
    setImageUrl('');
    setPublicId('');
    setIsBestOfFox(false);
    setFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error('Image is required');
      return;
    }

    setIsSubmitting(true);
    try {
      await portfolioService.create({
        title,
        category,
        imageUrl,
        publicId,
        isBestOfFox,
      });
      toast.success('Portfolio item added successfully');
      setFormOpen(false);
      loadPortfolio();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to add portfolio item');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this photo from your portfolio?')) return;
    try {
      await portfolioService.delete(id);
      toast.success('Photo deleted');
      loadPortfolio();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete photo');
    }
  };

  const handleToggleBestOfFox = async (id: string) => {
    try {
      await portfolioService.toggleBestOfFox(id);
      toast.success('Showcase status updated');
      loadPortfolio();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle best of fox status');
    }
  };

  return (
    <div className="space-y-8">
      {/* Action header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
            <ImageIcon size={28} className="text-[#D4AF37]" />
            Portfolio Manager
          </h1>
          <p className="text-sm text-[#8A8A8A] mt-1">
            Upload pictures, structure categories, and select items for Best of Fox showcase.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C34B] text-[#0A0A0A] text-sm font-semibold rounded-sm transition-colors duration-300"
        >
          <Plus size={16} />
          Upload Photo
        </button>
      </div>

      {/* Photo List */}
      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] border border-[#232323] rounded-sm">
          <ImageIcon size={40} className="text-[#555555] mx-auto mb-4" />
          <p className="text-[#8A8A8A]">No portfolio items found. Upload your first shot!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#111111] border border-[#232323] rounded-sm overflow-hidden group relative aspect-[4/5]"
            >
              {/* Photo */}
              <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />

              {/* Title & category tag overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/20 to-transparent p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-wider mb-1 block">
                  {item.category}
                </span>
                <h4 className="font-display font-semibold text-sm text-[#F8F8F8] truncate mb-3">
                  {item.title || 'Untitled Work'}
                </h4>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleToggleBestOfFox(item._id)}
                    className={`p-1.5 rounded-sm border transition-colors ${
                      item.isBestOfFox
                        ? 'border-[#D4AF37]/30 bg-[#D4AF37]/5 text-[#D4AF37]'
                        : 'border-[#232323] text-[#555555] hover:text-[#D4AF37]'
                    }`}
                    title={item.isBestOfFox ? 'Remove from Best of Fox' : 'Feature in Best of Fox'}
                  >
                    <Heart size={14} className={item.isBestOfFox ? 'fill-[#D4AF37]' : ''} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 border border-[#232323] text-[#8A8A8A] hover:text-[#EF4444] rounded-sm transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
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
              Upload Photo to Showroom
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Image Uploader */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Select Photo
                </label>
                <ImageUploader
                  value={imageUrl}
                  onChange={(img) => {
                    setImageUrl(img ? img.url : '');
                    setPublicId(img ? img.publicId : '');
                  }}
                  folder="portfolio"
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Photo Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Cinematic Sunset Portrait"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Category Tag
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                >
                  <option value="Wedding">Wedding</option>
                  <option value="Engagement">Engagement</option>
                  <option value="Casual">Casual</option>
                  <option value="Portrait">Portrait</option>
                </select>
              </div>

              {/* Best of Fox */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isBestOfFox}
                  onChange={(e) => setIsBestOfFox(e.target.checked)}
                  className="rounded-sm bg-[#0A0A0A] border-[#232323] text-[#D4AF37] focus:ring-0 w-4 h-4"
                />
                <span className="text-sm text-[#8A8A8A] font-medium">Add to Best of Fox showcase</span>
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
                  Upload Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
