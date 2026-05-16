import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';
  // All blog-related API calls with language parameter
export const getAllEvents = () => api.get('/events', { params: { lang: getLang() } });
//  Details endpoint might be /blogs/:id or /blog/:id based on your backend, adjust accordingly
export const getEventById = (id) =>  api.get(`/events/${id}`, { params: { lang: getLang() } });

export const getLatestEvents = () => api.get('/latestEvents', { params: { lang: getLang() } });

export const searchEvents = (query) => 
  api.get('/events/search', { params: { lang: getLang(), search: query } });

export const getEventCategories = () => 
  api.get('/events/getCategory', { params: { lang: getLang() } });

export const getEventAbout = () => 
  api.get('/events/about', { params: { lang: getLang() } });