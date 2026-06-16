import React, { useEffect, useState } from 'react';
import { beforeAfterService, BeforeAfterPair } from '../../../services';
import ImageUploader from '../../../components/admin/ImageUploader';
import toast from 'react-hot-toast';
import { Columns, Plus, Trash2, X, Loader2 } from 'lucide-react';

export default function BeforeAfterManager() {
  const [pairs, setPairs] = useState<BeforeAfterPair[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  // Form states
  const [title, setTitle] = useState<string>('');
  const [beforeImage, setBeforeImage] = useState<string>('');
  const [beforeImagePublicId, setBeforeImagePublicId] = useState<string>('');
  const [afterImage, setAfterImage] = useState<string>('');
  const [afterImagePublicId, setAfterImagePublicId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadPairs = async () => {
    setLoading(true);
    try {
      const res: any = await beforeAfterService.getAll();
      setPairs(res.data || res || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load before/after image pairs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPairs();
  }, []);

  const handleOpenCreate = () => {
    setTitle('');
    setBeforeImage('');
    setBeforeImagePublicId('');
    setAfterImage('');
    setAfterImagePublicId('');
    setFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!beforeImage || !afterImage) {
      toast.error('Both Before and After images are required');
      return;
    }

    setIsSubmitting(true);
    try {
      await beforeAfterService.create({
        title,
        beforeImage,
        afterImage,
      });
      toast.success('Before/After pair added successfully');
      setFormOpen(false);
      loadPairs();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to create before/after pair');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this before/after pair?')) return;
    try {
      await beforeAfterService.delete(id);
      toast.success('Pair deleted successfully');
      loadPairs();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete pair');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
            <Columns size={28} className="text-[#D4AF37]" />
            Before / After Slider Manager
          </h1>
          <p className="text-sm text-[#8A8A8A] mt-1">
            Display retouching and color-grading magic. Upload before/after pairs.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C34B] text-[#0A0A0A] text-sm font-semibold rounded-sm transition-colors duration-300"
        >
          <Plus size={16} />
          Create Pair
        </button>
      </div>

      {/* Grid List */}
      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : pairs.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] border border-[#232323] rounded-sm">
          <Columns size={40} className="text-[#555555] mx-auto mb-4" />
          <p className="text-[#8A8A8A]">No before/after pairs found. Setup editing examples!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {pairs.map((pair) => (
            <div
              key={pair._id}
              className="bg-[#111111] border border-[#232323] rounded-sm overflow-hidden p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display font-semibold text-[#F8F8F8]">{pair.title || 'Untitled Edit'}</h3>
                <button
                  onClick={() => handleDelete(pair._id)}
                  className="p-1.5 border border-[#232323] text-[#8A8A8A] hover:text-[#EF4444] rounded-sm transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Side-by-side static thumbnail view */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-[#555555] uppercase tracking-wider font-bold">Before</span>
                  <div className="aspect-[4/3] rounded-sm overflow-hidden bg-[#0A0A0A]">
                    <img src={pair.beforeImage} alt="Before" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-[#555555] uppercase tracking-wider font-bold">After</span>
                  <div className="aspect-[4/3] rounded-sm overflow-hidden bg-[#0A0A0A]">
                    <img src={pair.afterImage} alt="After" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {formOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#111111] border border-[#232323] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm p-6 relative">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-4 right-4 text-[#8A8A8A] hover:text-[#F8F8F8]"
            >
              <X size={20} />
            </button>

            <h2 className="font-display text-xl font-bold text-[#F8F8F8] mb-6">
              Create Before / After Image Pair
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Pair Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Wedding Sunset Grade"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              {/* Uploads row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Before Image */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                    Before Image (Unretouched / RAW export)
                  </label>
                  <ImageUploader
                    value={beforeImage}
                    onChange={(img) => {
                      setBeforeImage(img ? img.url : '');
                      setBeforeImagePublicId(img ? img.publicId : '');
                    }}
                    folder="before-after"
                  />
                </div>

                {/* After Image */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                    After Image (Retouched / Color Graded)
                  </label>
                  <ImageUploader
                    value={afterImage}
                    onChange={(img) => {
                      setAfterImage(img ? img.url : '');
                      setAfterImagePublicId(img ? img.publicId : '');
                    }}
                    folder="before-after"
                  />
                </div>
              </div>

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
                  Save Pair
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
