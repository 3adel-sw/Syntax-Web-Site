import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';
  // All blog-related API calls with language parameter
export const getAllBlogs = () => api.get('/blogs', { params: { lang: getLang() } });
//  Details endpoint might be /blogs/:id or /blog/:id based on your backend, adjust accordingly
export const getBlogById = (id) =>  api.get(`/blogs/${id}`, { params: { lang: getLang() } });

// export const getLatestBlogs = () => api.get('/latestBlogs', { params: { lang: getLang() } });

export const searchBlogs = (query) => 
  api.get('/blogs', { params: { lang: getLang(), search: query } });

export const getBlogCategories = () => 
  api.get('/blogs/get-categories', { params: { lang: getLang() } });
export const getBlogAbout = () => 
  api.get('/blogs/about', { params: { lang: getLang() } });