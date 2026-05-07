import api from '../api';

export const getHeroSection = () => api.get('/heroSection');
export const getLatestCourses = () => api.get('/latestCourses');
export const getLatestBlogs = () => api.get('/latestBlogs');
export const getTestimonials = () => api.get('/testimonials');
export const getCounters = () => api.get('/counters');
export const getOrganizations = () => api.get('/organizations');
export const getProducts = () => api.get('/products');