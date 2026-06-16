import React, { useEffect, useState } from 'react';
import { settingsService } from '../../../services';
import ImageUploader from '../../../components/admin/ImageUploader';
import toast from 'react-hot-toast';
import {
  Settings,
  Globe,
  Compass,
  Mail,
  FileText,
  HelpCircle,
  Award,
  Plus,
  Trash2,
  Edit,
  X,
  Save,
  Loader2,
} from 'lucide-react';

export default function SettingsManager() {
  const [activeTab, setActiveTab] = useState<string>('general');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // General States
  const [siteName, setSiteName] = useState<string>('');
  const [logo, setLogo] = useState<string>('');
  const [favicon, setFavicon] = useState<string>('');
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false);

  // Hero States
  const [heroTitle, setHeroTitle] = useState<string>('');
  const [heroSubtitle, setHeroSubtitle] = useState<string>('');
  const [heroImage, setHeroImage] = useState<string>('');

  // About States
  const [aboutTitle, setAboutTitle] = useState<string>('');
  const [aboutStory, setAboutStory] = useState<string>('');
  const [aboutVision, setAboutVision] = useState<string>('');
  const [aboutProfile, setAboutProfile] = useState<string>('');

  // Contact States
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  // SEO States
  const [metaTitle, setMetaTitle] = useState<string>('');
  const [metaDescription, setMetaDescription] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');

  // FAQ & Experience Items (Arrays)
  const [faqs, setFaqs] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);

  // Modals for FAQ/Experience
  const [faqFormOpen, setFaqFormOpen] = useState<boolean>(false);
  const [faqEditingId, setFaqEditingId] = useState<string | null>(null);
  const [faqQuestion, setFaqQuestion] = useState<string>('');
  const [faqAnswer, setFaqAnswer] = useState<string>('');

  const [expFormOpen, setExpFormOpen] = useState<boolean>(false);
  const [expEditingId, setExpEditingId] = useState<string | null>(null);
  const [expTitle, setExpTitle] = useState<string>('');
  const [expDesc, setExpDesc] = useState<string>('');
  const [expIcon, setExpIcon] = useState<string>('Camera');

  const loadAllSettings = async () => {
    setLoading(true);
    try {
      const [
        generalRes,
        heroRes,
        aboutRes,
        contactRes,
        seoRes,
        faqRes,
        expRes,
      ] = await Promise.all([
        settingsService.getGeneral(),
        settingsService.getHero(),
        settingsService.getAbout(),
        settingsService.getContact(),
        settingsService.getSeo(),
        settingsService.getAllFaq(),
        settingsService.getAllExperience(),
      ]);

      // General
      const gen = (generalRes as any).data || generalRes;
      setSiteName(gen?.siteName || '');
      setLogo(gen?.logo || '');
      setFavicon(gen?.favicon || '');
      setMaintenanceMode(!!gen?.maintenanceMode);

      // Hero
      const hr = (heroRes as any).data || heroRes;
      setHeroTitle(hr?.headline || '');
      setHeroSubtitle(hr?.subtitle || '');
      setHeroImage(hr?.backgroundImage || '');

      // About
      const ab = (aboutRes as any).data || aboutRes;
      setAboutTitle(ab?.title || '');
      setAboutStory(ab?.story || '');
      setAboutVision(ab?.vision || '');
      setAboutProfile(ab?.profileImage?.url || '');

      // Contact
      const ct = (contactRes as any).data || contactRes;
      setWhatsapp(ct?.whatsapp || '');
      setInstagram(ct?.instagram || '');
      setFacebook(ct?.facebook || '');
      setEmail(ct?.email || '');
      setLocation(ct?.location || '');

      // SEO
      const se = (seoRes as any).data || seoRes;
      setMetaTitle(se?.metaTitle || '');
      setMetaDescription(se?.metaDescription || '');
      setKeywords(se?.keywords?.join(', ') || '');

      // Lists
      setFaqs((faqRes as any).data || faqRes || []);
      setExperiences((expRes as any).data || expRes || []);
    } catch (err) {
      console.error(err);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllSettings();
  }, []);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.updateGeneral({ siteName, logo, favicon, maintenanceMode });
      toast.success('General settings saved');
    } catch (err) {
      toast.error('Failed to save general settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.updateHero({ headline: heroTitle, subtitle: heroSubtitle, backgroundImage: heroImage });
      toast.success('Hero settings saved');
    } catch (err) {
      toast.error('Failed to save hero settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.updateAbout({ title: aboutTitle, story: aboutStory, vision: aboutVision, profileImageUrl: aboutProfile });
      toast.success('About bio saved');
    } catch (err) {
      toast.error('Failed to save about details');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await settingsService.updateContact({ whatsapp, instagram, facebook, email, location });
      toast.success('Contact info saved');
    } catch (err) {
      toast.error('Failed to save contact info');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSeo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const kw = keywords.split(',').map((k) => k.trim()).filter((k) => k !== '');
    try {
      await settingsService.updateSeo({ metaTitle, metaDescription, keywords: kw });
      toast.success('SEO meta details saved');
    } catch (err) {
      toast.error('Failed to save SEO meta');
    } finally {
      setIsSaving(false);
    }
  };

  // FAQ CRUD
  const handleOpenFaqCreate = () => {
    setFaqEditingId(null);
    setFaqQuestion('');
    setFaqAnswer('');
    setFaqFormOpen(true);
  };

  const handleOpenFaqEdit = (faq: any) => {
    setFaqEditingId(faq._id);
    setFaqQuestion(faq.question);
    setFaqAnswer(faq.answer);
    setFaqFormOpen(true);
  };

  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (faqEditingId) {
        await settingsService.updateFaq(faqEditingId, { question: faqQuestion, answer: faqAnswer });
        toast.success('FAQ updated');
      } else {
        await settingsService.createFaq({ question: faqQuestion, answer: faqAnswer });
        toast.success('FAQ created');
      }
      setFaqFormOpen(false);
      const res: any = await settingsService.getAllFaq();
      setFaqs(res.data || res || []);
    } catch (err) {
      toast.error('Failed to save FAQ');
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!window.confirm('Delete this FAQ item?')) return;
    try {
      await settingsService.deleteFaq(id);
      toast.success('FAQ deleted');
      const res: any = await settingsService.getAllFaq();
      setFaqs(res.data || res || []);
    } catch (err) {
      toast.error('Failed to delete FAQ');
    }
  };

  // Experience CRUD
  const handleOpenExpCreate = () => {
    setExpEditingId(null);
    setExpTitle('');
    setExpDesc('');
    setExpIcon('Camera');
    setExpFormOpen(true);
  };

  const handleOpenExpEdit = (exp: any) => {
    setExpEditingId(exp._id);
    setExpTitle(exp.title);
    setExpDesc(exp.desc);
    setExpIcon(exp.icon || 'Camera');
    setExpFormOpen(true);
  };

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (expEditingId) {
        await settingsService.updateExperience(expEditingId, { title: expTitle, desc: expDesc, icon: expIcon });
        toast.success('Feature card updated');
      } else {
        await settingsService.createExperience({ title: expTitle, desc: expDesc, icon: expIcon });
        toast.success('Feature card created');
      }
      setExpFormOpen(false);
      const res: any = await settingsService.getAllExperience();
      setExperiences(res.data || res || []);
    } catch (err) {
      toast.error('Failed to save experience item');
    }
  };

  const handleDeleteExp = async (id: string) => {
    if (!window.confirm('Delete this experience card?')) return;
    try {
      await settingsService.deleteExperience(id);
      toast.success('Experience card deleted');
      const res: any = await settingsService.getAllExperience();
      setExperiences(res.data || res || []);
    } catch (err) {
      toast.error('Failed to delete experience item');
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 size={36} className="text-[#D4AF37] animate-spin" />
      </div>
    );
  }

  const tabs = [
    { id: 'general', label: 'General & SEO', Icon: Globe },
    { id: 'hero', label: 'Hero Banner', Icon: Compass },
    { id: 'about', label: 'About Bio', Icon: FileText },
    { id: 'contact', label: 'Contact Links', Icon: Mail },
    { id: 'experience', label: 'Experience Cards', Icon: Award },
    { id: 'faq', label: 'FAQ accordion', Icon: HelpCircle },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-[#F8F8F8] flex items-center gap-2">
          <Settings size={28} className="text-[#D4AF37]" />
          Site Settings
        </h1>
        <p className="text-sm text-[#8A8A8A] mt-1">
          Manage landing sections configurations, biography details, social URLs, and page headers.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="flex flex-wrap border-b border-[#232323] gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 border-b-2 text-sm font-semibold transition-colors ${
              activeTab === tab.id
                ? 'border-[#D4AF37] text-[#D4AF37]'
                : 'border-transparent text-[#8A8A8A] hover:text-[#F8F8F8]'
            }`}
          >
            <tab.Icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-[#111111] border border-[#232323] p-8 rounded-sm max-w-3xl">
        {/* PANEL: General & SEO */}
        {activeTab === 'general' && (
          <form onSubmit={async (e) => { e.preventDefault(); await handleSaveGeneral(e); await handleSaveSeo(e); }} className="space-y-6">
            <h3 className="font-display text-lg font-bold text-[#F8F8F8] mb-4">Site branding & SEO</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Site Name</label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">SEO Meta Title</label>
                <input
                  type="text"
                  required
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">SEO Meta Description</label>
                <textarea
                  required
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Keywords (Comma separated)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="photography, wedding, portrait"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={maintenanceMode}
                  onChange={(e) => setMaintenanceMode(e.target.checked)}
                  className="rounded-sm bg-[#0A0A0A] border-[#232323] text-[#D4AF37] focus:ring-0 w-4 h-4"
                />
                <span className="text-sm text-[#8A8A8A] font-medium">Activate Maintenance Mode</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C34B] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-[#0A0A0A] font-bold text-sm tracking-wide uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Branding & SEO
            </button>
          </form>
        )}

        {/* PANEL: Hero Banner */}
        {activeTab === 'hero' && (
          <form onSubmit={handleSaveHero} className="space-y-6">
            <h3 className="font-display text-lg font-bold text-[#F8F8F8] mb-4">Hero Banner Configuration</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Headline</label>
                <input
                  type="text"
                  required
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Sub-Headline</label>
                <input
                  type="text"
                  required
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Background Hero Image</label>
                <ImageUploader
                  value={heroImage}
                  onChange={(img) => setHeroImage(img ? img.url : '')}
                  folder="hero"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C34B] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-[#0A0A0A] font-bold text-sm tracking-wide uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Hero Settings
            </button>
          </form>
        )}

        {/* PANEL: About Bio */}
        {activeTab === 'about' && (
          <form onSubmit={handleSaveAbout} className="space-y-6">
            <h3 className="font-display text-lg font-bold text-[#F8F8F8] mb-4">Photographer Profile & Story</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">About Title</label>
                <input
                  type="text"
                  required
                  value={aboutTitle}
                  onChange={(e) => setAboutTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Profile Picture</label>
                <ImageUploader
                  value={aboutProfile}
                  onChange={(img) => setAboutProfile(img ? img.url : '')}
                  folder="about"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Biography Story</label>
                <textarea
                  required
                  value={aboutStory}
                  onChange={(e) => setAboutStory(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Vision Statement</label>
                <textarea
                  value={aboutVision}
                  onChange={(e) => setAboutVision(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C34B] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-[#0A0A0A] font-bold text-sm tracking-wide uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save About Bio
            </button>
          </form>
        )}

        {/* PANEL: Contact Links */}
        {activeTab === 'contact' && (
          <form onSubmit={handleSaveContact} className="space-y-6">
            <h3 className="font-display text-lg font-bold text-[#F8F8F8] mb-4">Contact Info & Social Handles</h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">WhatsApp Phone (format: 201xxxxxxxxx)</label>
                <input
                  type="text"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Instagram URL</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Facebook URL</label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Studio Base Location</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] focus:border-[#D4AF37] focus:ring-0 text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-3 bg-[#D4AF37] hover:bg-[#E5C34B] disabled:bg-[#D4AF37]/50 disabled:cursor-not-allowed text-[#0A0A0A] font-bold text-sm tracking-wide uppercase rounded-sm transition-all duration-300 flex items-center gap-2"
            >
              {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              Save Contact Info
            </button>
          </form>
        )}

        {/* PANEL: Experience items */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-[#F8F8F8]">Experience Showcase Cards</h3>
              <button
                onClick={handleOpenExpCreate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C34B] text-[#0A0A0A] text-xs font-bold rounded-sm transition-colors"
              >
                <Plus size={12} /> Add Card
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp._id} className="p-4 bg-[#0A0A0A]/50 border border-[#232323]/50 rounded-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-[#F8F8F8]">{exp.title}</h4>
                    <p className="text-xs text-[#555555] mt-1">{exp.desc}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenExpEdit(exp)}
                      className="p-1.5 border border-[#232323] text-[#8A8A8A] hover:text-[#F8F8F8] rounded-sm transition-colors"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteExp(exp._id)}
                      className="p-1.5 border border-[#232323] text-[#8A8A8A] hover:text-[#EF4444] rounded-sm transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PANEL: FAQ items */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold text-[#F8F8F8]">Frequently Asked Questions</h3>
              <button
                onClick={handleOpenFaqCreate}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37] hover:bg-[#E5C34B] text-[#0A0A0A] text-xs font-bold rounded-sm transition-colors"
              >
                <Plus size={12} /> Add FAQ
              </button>
            </div>

            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq._id} className="p-4 bg-[#0A0A0A]/50 border border-[#232323]/50 rounded-sm flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-sm text-[#F8F8F8]">{faq.question}</h4>
                    <p className="text-xs text-[#555555] mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenFaqEdit(faq)}
                      className="p-1.5 border border-[#232323] text-[#8A8A8A] hover:text-[#F8F8F8] rounded-sm transition-colors"
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq._id)}
                      className="p-1.5 border border-[#232323] text-[#8A8A8A] hover:text-[#EF4444] rounded-sm transition-colors"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FAQ MODAL */}
      {faqFormOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#111111] border border-[#232323] w-full max-w-md rounded-sm p-6 relative">
            <button onClick={() => setFaqFormOpen(false)} className="absolute top-4 right-4 text-[#8A8A8A] hover:text-[#F8F8F8]">
              <X size={20} />
            </button>
            <h3 className="font-display text-lg font-bold text-[#F8F8F8] mb-6">{faqEditingId ? 'Edit FAQ Item' : 'Add FAQ Item'}</h3>
            <form onSubmit={handleSaveFaq} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Question</label>
                <input
                  type="text"
                  required
                  value={faqQuestion}
                  onChange={(e) => setFaqQuestion(e.target.value)}
                  placeholder="How long does it take to deliver photos?"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Answer</label>
                <textarea
                  required
                  rows={4}
                  value={faqAnswer}
                  onChange={(e) => setFaqAnswer(e.target.value)}
                  placeholder="Usually between 2 to 3 weeks for complete editing and grading..."
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#232323]/50">
                <button type="button" onClick={() => setFaqFormOpen(false)} className="px-4 py-2 border border-[#232323] text-sm text-[#8A8A8A]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm">Save FAQ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EXPERIENCE CARD MODAL */}
      {expFormOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0A0A]/85 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-[#111111] border border-[#232323] w-full max-w-md rounded-sm p-6 relative">
            <button onClick={() => setExpFormOpen(false)} className="absolute top-4 right-4 text-[#8A8A8A] hover:text-[#F8F8F8]">
              <X size={20} />
            </button>
            <h3 className="font-display text-lg font-bold text-[#F8F8F8] mb-6">{expEditingId ? 'Edit Feature' : 'Add Feature Card'}</h3>
            <form onSubmit={handleSaveExp} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Title</label>
                <input
                  type="text"
                  required
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                  placeholder="200+ Sessions"
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#8A8A8A] uppercase tracking-wider">Description</label>
                <textarea
                  required
                  rows={3}
                  value={expDesc}
                  onChange={(e) => setExpDesc(e.target.value)}
                  placeholder="Captured marriages, outdoor portraitures, and corporate moments."
                  className="w-full px-4 py-2.5 bg-[#0A0A0A] border border-[#232323] text-[#F8F8F8] text-sm rounded-sm outline-none"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-[#232323]/50">
                <button type="button" onClick={() => setExpFormOpen(false)} className="px-4 py-2 border border-[#232323] text-sm text-[#8A8A8A]">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#D4AF37] text-[#0A0A0A] font-bold text-sm">Save Card</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
