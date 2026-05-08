import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';

export const getAllBlogs = () => 
  api.get('/blogs', { params: { lang: getLang() } });

export const getBlogById = (id) => 
  api.get(`/blogs/${id}`, { params: { lang: getLang() } });

export const getLatestBlogs = () => 
  api.get('/latestBlogs', { params: { lang: getLang() } });

export const searchBlogs = (query) => 
  api.get('/blogs', { params: { lang: getLang(), search: query } });

export const getBlogCategories = () => 
  api.get('/blogCategories', { params: { lang: getLang() } });