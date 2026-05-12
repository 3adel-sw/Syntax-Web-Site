import api from '../api'; 

const getLang = () => localStorage.getItem('lang') || 'ar';
  // All blog-related API calls with language parameter
export const getHeroSection = () => api.get('/about/hero', { params: { lang: getLang() } });
export const getAboutUs = () => api.get('/about', { params: { lang: getLang() } });
export const getCoreValues = () => api.get('/about/core-values', { params: { lang: getLang() } });
export const getOurNumbers = () => api.get('/about/our-numbers', { params: { lang: getLang() } });
export const getTeams = () => api.get('/about/teams', { params: { lang: getLang() } });
export const getHistories = () => api.get('/about/histories', { params: { lang: getLang() } });
export const getFaqs = () => api.get('/about/faqs', { params: { lang: getLang() } });