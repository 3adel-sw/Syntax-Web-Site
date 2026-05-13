import api from '../api'; 

const getLang = () => localStorage.getItem('lang') || 'ar';
  // All blog-related API calls with language parameter
export const getHeroB2b = () => api.get('/b2b/hero', { params: { lang: getLang() } });
export const getB2bWhyUs = () => api.get('/b2b/why-us', { params: { lang: getLang() } });
export const getB2bPrograms = () => api.get('/b2b/programs', { params: { lang: getLang() } });
export const getWhyChooseB2B = () => api.get('/b2b/whyChooseB2B', { params: { lang: getLang() } });
