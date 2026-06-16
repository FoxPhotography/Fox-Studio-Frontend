import React, { useEffect, useState } from 'react';
import { reviewsService, Review } from '../../../services';
import toast from 'react-hot-toast';
import {
  MessageSquare,
  Plus,
  Trash2,
  Star,
  Eye,
  EyeOff,
  Loader2,
  X,
} from 'lucide-react';

export default function ReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  // Form states
  const [clientName, setClientName] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res: any = await reviewsService.getAll();
      setReviews(res.data || res || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleOpenCreate = () => {
    setClientName('');
    setRating(5);
    setComment('');
    setEventDate('');
    setFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await reviewsService.create({
        clientName,
        rating,
        comment,
        eventDate,
      });
      toast.success('Review created successfully');
      setFormOpen(false);
      loadReviews();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to create review');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewsService.delete(id);
      toast.success('Review deleted');
      loadReviews();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete review');
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await reviewsService.togglePublish(id);
      toast.success('Review visibility updated');
      loadReviews();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle review visibility');
    }
  };

  return (
    <div className="space-y-8">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
            <MessageSquare size={28} className="text-[#D4AF37]" />
            Reviews Manager
          </h1>
          <p className="text-sm text-[#8A8A8A] mt-1">
            Display kind client statements, toggle approval/visibility, or add reviews manually.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C34B] text-[#0A0A0A] text-sm font-semibold rounded-sm transition-colors duration-300"
        >
          <Plus size={16} />
          Create Review
        </button>
      </div>

      {/* Review List */}
      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] border border-[#232323] rounded-sm">
          <MessageSquare size={40} className="text-[#555555] mx-auto mb-4" />
          <p className="text-[#8A8A8A]">No reviews found. Input client testimonials to display on homepage!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="p-6 bg-[#111111] border border-[#232323] rounded-sm flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 text-[#D4AF37]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#D4AF37]" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </div>

                <p className="text-sm text-[#8A8A8A] italic leading-relaxed mb-6">
                  "{review.comment}"
                </p>
              </div>

              <div>
                <div className="border-t border-[#232323]/50 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-[#F8F8F8]">{review.clientName}</h4>
                    <p className="text-xs text-[#555555]">
                      {review.eventDate ? new Date(review.eventDate).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {/* Toggle publish status */}
                    <button
                      onClick={() => handleTogglePublish(review._id)}
                      className={`p-2 rounded-sm border transition-colors ${
                        review.isPublished
                          ? 'border-green-500/20 bg-green-500/5 text-green-500 hover:bg-green-500/10'
                          : 'border-[#232323] text-[#555555] hover:text-[#8A8A8A]'
                      }`}
                      title={review.isPublished ? 'Unpublish review' : 'Publish review'}
                    >
                      {review.isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="p-2 border border-[#232323] text-[#8A8A8A] hover:text-[#EF4444] rounded-sm transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
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
          <div className="bg-[#111111] border border-[#232323] w-full max-w-md rounded-sm p-6 relative">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-4 right-4 text-[#8A8A8A] hover:text-[#F8F8F8]"
            >
              <X size={20} />
            </button>

            <h2 className="font-display text-xl font-bold text-[#F8F8F8] mb-6">
              Create Client Review
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Client Name */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Client Name
                </label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Hassan & Fatma"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider block">
                  Client Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-[#D4AF37] p-1`}
                    >
                      <Star size={24} className={star <= rating ? 'fill-[#D4AF37]' : ''} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Event Date */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Event Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              {/* Comment */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Review Comment
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Absolute masterpiece. The photographer is extremely patient, artistic, and delivered ahead of schedule..."
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
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
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
