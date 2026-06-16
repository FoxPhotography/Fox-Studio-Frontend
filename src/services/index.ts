import api from './api';

export interface ImageData {
  url: string;
  publicId: string;
  _id?: string;
  title?: string;
}

export interface Story {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  coverImage: string;
  location: string;
  eventDate?: string;
  gallery?: ImageData[];
  isPublished: boolean;
  isFeatured: boolean;
  order: number;
}

export interface PortfolioItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  publicId: string;
  isBestOfFox: boolean;
  order: number;
}

export interface Package {
  _id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular: boolean;
  isVisible: boolean;
  order: number;
}

export interface Review {
  _id: string;
  clientName: string;
  comment: string;
  rating: number;
  eventDate?: string;
  isPublished: boolean;
  order: number;
}

export interface BeforeAfterPair {
  _id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  order: number;
}

export const authService = {
  login: (data: any) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  changePassword: (data: any) => api.put('/auth/change-password', data),
};

export const storiesService = {
  getPublished: () => api.get<{ data: Story[] }>('/stories/public'),
  getFeatured: () => api.get<{ data: Story[] }>('/stories/public/featured'),
  getBySlug: (slug: string) => api.get<{ data: Story }>(`/stories/public/${slug}`),
  getAll: () => api.get<{ data: Story[] }>('/stories'),
  getById: (id: string) => api.get<{ data: Story }>(`/stories/${id}`),
  create: (data: any) => api.post('/stories', data),
  update: (id: string, data: any) => api.put(`/stories/${id}`, data),
  delete: (id: string) => api.delete(`/stories/${id}`),
  togglePublish: (id: string) => api.patch(`/stories/${id}/publish`),
  toggleFeature: (id: string) => api.patch(`/stories/${id}/feature`),
  reorder: (updates: { id: string; order: number }[]) => api.patch('/stories/reorder', { updates }),
  addGalleryImage: (id: string, data: any) => api.post(`/stories/${id}/gallery`, data),
  removeGalleryImage: (id: string, imageId: string) => api.delete(`/stories/${id}/gallery/${imageId}`),
};

export const portfolioService = {
  getPublished: () => api.get<{ data: PortfolioItem[] }>('/portfolio/public'),
  getCategories: () => api.get<{ data: string[] }>('/portfolio/public/categories'),
  getBestOfFox: () => api.get<{ data: PortfolioItem[] }>('/portfolio/public/best-of-fox'),
  getByCategory: (cat: string) => api.get<{ data: PortfolioItem[] }>(`/portfolio/public/${cat}`),
  getAll: () => api.get<{ data: PortfolioItem[] }>('/portfolio'),
  create: (data: any) => api.post('/portfolio', data),
  createMany: (items: any[]) => api.post('/portfolio/bulk', { items }),
  update: (id: string, data: any) => api.put(`/portfolio/${id}`, data),
  delete: (id: string) => api.delete(`/portfolio/${id}`),
  toggleBestOfFox: (id: string) => api.patch(`/portfolio/${id}/best-of-fox`),
  reorder: (updates: { id: string; order: number }[]) => api.patch('/portfolio/reorder', { updates }),
};

export const packagesService = {
  getVisible: () => api.get<{ data: Package[] }>('/packages/public'),
  getAll: () => api.get<{ data: Package[] }>('/packages'),
  create: (data: any) => api.post('/packages', data),
  update: (id: string, data: any) => api.put(`/packages/${id}`, data),
  delete: (id: string) => api.delete(`/packages/${id}`),
  toggleVisibility: (id: string) => api.patch(`/packages/${id}/visibility`),
  togglePopular: (id: string) => api.patch(`/packages/${id}/popular`),
  reorder: (updates: { id: string; order: number }[]) => api.patch('/packages/reorder', { updates }),
};

export const reviewsService = {
  getPublished: () => api.get<{ data: Review[] }>('/reviews/public'),
  getAll: () => api.get<{ data: Review[] }>('/reviews'),
  create: (data: any) => api.post('/reviews', data),
  update: (id: string, data: any) => api.put(`/reviews/${id}`, data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
  togglePublish: (id: string) => api.patch(`/reviews/${id}/publish`),
  reorder: (updates: { id: string; order: number }[]) => api.patch('/reviews/reorder', { updates }),
};

export const beforeAfterService = {
  getPublished: () => api.get<{ data: BeforeAfterPair[] }>('/before-after/public'),
  getAll: () => api.get<{ data: BeforeAfterPair[] }>('/before-after'),
  create: (data: any) => api.post('/before-after', data),
  update: (id: string, data: any) => api.put(`/before-after/${id}`, data),
  delete: (id: string) => api.delete(`/before-after/${id}`),
  reorder: (updates: { id: string; order: number }[]) => api.patch('/before-after/reorder', { updates }),
};

export const settingsService = {
  getHero: () => api.get('/settings/hero'),
  updateHero: (data: any) => api.put('/settings/hero', data),
  getAbout: () => api.get('/settings/about'),
  updateAbout: (data: any) => api.put('/settings/about', data),
  getContact: () => api.get('/settings/contact'),
  updateContact: (data: any) => api.put('/settings/contact', data),
  getSeo: () => api.get('/settings/seo'),
  updateSeo: (data: any) => api.put('/settings/seo', data),
  getGeneral: () => api.get('/settings/general'),
  updateGeneral: (data: any) => api.put('/settings/general', data),
  getExperience: () => api.get('/settings/experience'),
  getAllExperience: () => api.get('/settings/experience/all'),
  createExperience: (data: any) => api.post('/settings/experience', data),
  updateExperience: (id: string, data: any) => api.put(`/settings/experience/${id}`, data),
  deleteExperience: (id: string) => api.delete(`/settings/experience/${id}`),
  getFaq: () => api.get('/settings/faq'),
  getAllFaq: () => api.get('/settings/faq/all'),
  createFaq: (data: any) => api.post('/settings/faq', data),
  updateFaq: (id: string, data: any) => api.put(`/settings/faq/${id}`, data),
  deleteFaq: (id: string) => api.delete(`/settings/faq/${id}`),
};

export const uploadService = {
  uploadImage: (file: File, folder: string) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', folder);
    return api.post('/admin/upload/image', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  uploadImages: (files: File[], folder: string) => {
    const formData = new FormData();
    files.forEach((f) => formData.append('images', f));
    formData.append('folder', folder);
    return api.post('/admin/upload/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
  deleteMedia: (publicId: string, type = 'image') => api.delete(`/admin/upload/${publicId}?type=${type}`),
  getSignature: (folder: string) => api.get(`/admin/upload/signature?folder=${folder}`),
};

export const dashboardService = {
  getStats: () => api.get('/admin/dashboard/stats'),
  getActivity: (limit = 10) => api.get(`/admin/dashboard/activity?limit=${limit}`),
};
