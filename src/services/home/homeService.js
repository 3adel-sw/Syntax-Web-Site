import api from '../api';
    // All blog-related API calls with language parameter
const getLang = () => localStorage.getItem('lang') || 'ar';
export const getHeroSection = () => api.get('/heroSection', { params: { lang: getLang() } });
export const getProducts = () => api.get('/products', { params: { lang: getLang() } });
export const getCounters = () => api.get('/counters');
export const getOrganizations = () => api.get('/organizations');
export const getLatestCourses = () => api.get('/latestCourses');
export const getLatestBlogs = () => api.get('/latestBlogs');
export const getTestimonials = () => api.get('/testimonials');
export const getAllTestimonials = () => api.get('/alltestimonials');
export const getAllProducts = () => api.get('/allproducts');
export const getSetting = () => api.get('/setting');
