import api from '../api';
    // All blog-related API calls with language parameter
const getLang = () => localStorage.getItem('lang') || 'ar';
export const getHeroSection = () => api.get('/heroSection', { params: { lang: getLang() } });
export const getProducts = () => api.get('/products', { params: { lang: getLang() } });
export const getCounters = () => api.get('/counters', { params: { lang: getLang() } });
export const getOrganizations = () => api.get('/organizations', { params: { lang: getLang() } });
export const getLatestCourses = () => api.get('/latestCourses', { params: { lang: getLang() } });
export const getLatestBlogs = () => api.get('/latestBlogs', { params: { lang: getLang() } });
// export const getTestimonials = () => api.get('/testimonials', { params: { lang: getLang() } });
export const getTestimonials = () => api.get('/testimonials', { params: { lang: getLang() } });
export const getAllTestimonials = () => api.get('/alltestimonials', { params: { lang: getLang() } });
export const getAllProducts = () => api.get('/allproducts', { params: { lang: getLang() } });
export const getSetting = () => api.get('/setting', { params: { lang: getLang() } });
