import api from '../api';

export const getHeroSection = () => api.get('/heroSection');
export const getProducts = () => api.get('/products');
export const getCounters = () => api.get('/counters');
export const getOrganizations = () => api.get('/organizations');
export const getLatestCourses = () => api.get('/latestCourses');
export const getLatestBlogs = () => api.get('/latestBlogs');
export const getTestimonials = () => api.get('/testimonials');
export const getAllTestimonials = () => api.get('/alltestimonials');
export const getAllProducts = () => api.get('/allproducts');
// export const getSetting = () => api.get('/setting');