import React, { useEffect, useState } from 'react';
import { storiesService, Story } from '../../../services';
import ImageUploader from '../../../components/admin/ImageUploader';
import toast from 'react-hot-toast';
import {
  BookOpen,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Star,
  Edit,
  X,
  Loader2,
  Calendar,
  MapPin,
  Image as ImageIcon,
} from 'lucide-react';

export default function StoriesManager() {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('Wedding');
  const [location, setLocation] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [coverImage, setCoverImage] = useState<string>('');
  const [coverImagePublicId, setCoverImagePublicId] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const loadStories = async () => {
    setLoading(true);
    try {
      const res: any = await storiesService.getAll();
      setStories(res.data || res || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStories();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Wedding');
    setLocation('');
    setEventDate('');
    setDescription('');
    setCoverImage('');
    setCoverImagePublicId('');
    setFormOpen(true);
  };

  const handleOpenEdit = (story: Story) => {
    setEditingId(story._id);
    setTitle(story.title);
    setCategory(story.category);
    setLocation(story.location);
    setEventDate(story.eventDate ? story.eventDate.substring(0, 10) : '');
    setDescription(story.description);
    setCoverImage(story.coverImage);
    setCoverImagePublicId(''); // Optional for updates
    setFormOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverImage) {
      toast.error('Cover image is required');
      return;
    }

    setIsSubmitting(true);
    const storyData = {
      title,
      category,
      location,
      eventDate,
      description,
      coverImage,
    };

    try {
      if (editingId) {
        await storiesService.update(editingId, storyData);
        toast.success('Story updated successfully');
      } else {
        await storiesService.create(storyData);
        toast.success('Story created successfully');
      }
      setFormOpen(false);
      loadStories();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Failed to save story');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this story?')) return;
    try {
      await storiesService.delete(id);
      toast.success('Story deleted');
      loadStories();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete story');
    }
  };

  const handleTogglePublish = async (id: string) => {
    try {
      await storiesService.togglePublish(id);
      toast.success('Status toggled successfully');
      loadStories();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle publish status');
    }
  };

  const handleToggleFeature = async (id: string) => {
    try {
      await storiesService.toggleFeature(id);
      toast.success('Featured status toggled');
      loadStories();
    } catch (err) {
      console.error(err);
      toast.error('Failed to toggle feature status');
    }
  };

  return (
    <div className="space-y-8">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
            <BookOpen size={28} className="text-[#D4AF37]" />
            Story Manager
          </h1>
          <p className="text-sm text-[#8A8A8A] mt-1">
            Write, publish, and order stories for your photographer digital diary.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#E5C34B] text-[#0A0A0A] text-sm font-semibold rounded-sm transition-colors duration-300"
        >
          <Plus size={16} />
          Create Story
        </button>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="h-[40vh] flex items-center justify-center">
          <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-20 bg-[#111111] border border-[#232323] rounded-sm">
          <BookOpen size={40} className="text-[#555555] mx-auto mb-4" />
          <p className="text-[#8A8A8A]">No stories found. Create your first session story!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-[#111111] border border-[#232323] rounded-sm overflow-hidden flex flex-col justify-between"
            >
              {/* Cover */}
              <div className="relative aspect-video bg-[#161616]">
                <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0A0A0A]/85 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-sm">
                  {story.category}
                </span>
              </div>

              {/* Meta */}
              <div className="p-5 flex-grow space-y-3">
                <h3 className="font-display text-lg font-bold text-[#F8F8F8] truncate">{story.title}</h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#555555]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {story.eventDate ? new Date(story.eventDate).toLocaleDateString() : 'N/A'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {story.location}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="px-5 py-4 border-t border-[#232323]/50 flex items-center justify-between bg-[#161616]/20">
                <div className="flex gap-2">
                  {/* Publish toggle */}
                  <button
                    onClick={() => handleTogglePublish(story._id)}
                    className={`p-2 rounded-sm border transition-colors ${
                      story.isPublished
                        ? 'border-green-500/20 bg-green-500/5 text-green-500 hover:bg-green-500/10'
                        : 'border-[#232323] text-[#555555] hover:text-[#8A8A8A]'
                    }`}
                    title={story.isPublished ? 'Unpublish story' : 'Publish story'}
                  >
                    {story.isPublished ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>

                  {/* Feature toggle */}
                  <button
                    onClick={() => handleToggleFeature(story._id)}
                    className={`p-2 rounded-sm border transition-colors ${
                      story.isFeatured
                        ? 'border-[#D4AF37]/20 bg-[#D4AF37]/5 text-[#D4AF37] hover:bg-[#D4AF37]/10'
                        : 'border-[#232323] text-[#555555] hover:text-[#D4AF37]'
                    }`}
                    title={story.isFeatured ? 'Unfeature story' : 'Feature story'}
                  >
                    <Star size={14} className={story.isFeatured ? 'fill-[#D4AF37]' : ''} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEdit(story)}
                    className="p-2 border border-[#232323] text-[#8A8A8A] hover:text-[#F8F8F8] rounded-sm transition-colors"
                  >
                    <Edit size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(story._id)}
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
          <div className="bg-[#111111] border border-[#232323] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm p-6 relative">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-4 right-4 text-[#8A8A8A] hover:text-[#F8F8F8]"
            >
              <X size={20} />
            </button>

            <h2 className="font-display text-xl font-bold text-[#F8F8F8] mb-6">
              {editingId ? 'Edit Story' : 'Create Story'}
            </h2>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                    Story Title
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ahmed & Sara's Wedding"
                    className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                    Category
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

                {/* Location */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Cairo, Egypt"
                    className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                  />
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                    Event Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                  />
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Cover Image
                </label>
                <ImageUploader
                  value={coverImage}
                  onChange={(img) => {
                    setCoverImage(img ? img.url : '');
                    setCoverImagePublicId(img ? img.publicId : '');
                  }}
                  folder="stories"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">
                  Story Content / description (HTML support)
                </label>
                <textarea
                  required
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell the cinematic details of the couple's special day..."
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
                  {editingId ? 'Update Story' : 'Create Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
