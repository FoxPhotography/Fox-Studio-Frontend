import { create } from 'zustand';
import { settingsService } from '../services';

interface SettingsState {
  general: any | null;
  hero: any | null;
  about: any | null;
  contact: any | null;
  experience: any[];
  faqs: any[];
  isLoading: boolean;
  fetchGeneral: () => Promise<void>;
  fetchHero: () => Promise<void>;
  fetchAbout: () => Promise<void>;
  fetchContact: () => Promise<void>;
  fetchExperience: () => Promise<void>;
  fetchFaqs: () => Promise<void>;
  fetchPublicData: () => Promise<void>;
}

const useSettingsStore = create<SettingsState>((set, get) => ({
  general: null,
  hero: null,
  about: null,
  contact: null,
  experience: [],
  faqs: [],
  isLoading: false,

  fetchGeneral: async () => {
    try {
      const res = await settingsService.getGeneral();
      set({ general: (res as any).data || res });
    } catch (err) {
      console.error('Failed to fetch general settings:', err);
    }
  },

  fetchHero: async () => {
    try {
      const res = await settingsService.getHero();
      set({ hero: (res as any).data || res });
    } catch (err) {
      console.error('Failed to fetch hero settings:', err);
    }
  },

  fetchAbout: async () => {
    try {
      const res = await settingsService.getAbout();
      set({ about: (res as any).data || res });
    } catch (err) {
      console.error('Failed to fetch about settings:', err);
    }
  },

  fetchContact: async () => {
    try {
      const res = await settingsService.getContact();
      set({ contact: (res as any).data || res });
    } catch (err) {
      console.error('Failed to fetch contact settings:', err);
    }
  },

  fetchExperience: async () => {
    try {
      const res = await settingsService.getExperience();
      set({ experience: (res as any).data || res || [] });
    } catch (err) {
      console.error('Failed to fetch experience settings:', err);
    }
  },

  fetchFaqs: async () => {
    try {
      const res = await settingsService.getFaq();
      set({ faqs: (res as any).data || res || [] });
    } catch (err) {
      console.error('Failed to fetch FAQ settings:', err);
    }
  },

  fetchPublicData: async () => {
    set({ isLoading: true });
    try {
      await Promise.all([
        get().fetchGeneral(),
        get().fetchHero(),
        get().fetchAbout(),
        get().fetchContact(),
        get().fetchExperience(),
        get().fetchFaqs(),
      ]);
    } catch (err) {
      console.error('Failed to fetch public configurations:', err);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useSettingsStore;
