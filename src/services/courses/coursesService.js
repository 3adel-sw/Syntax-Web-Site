// services/coursesService.js
import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';

export const getAllCourses = () => api.get('/courses', { params: { lang: getLang() } });



export const getCourseById = (id) => 
  api.get(`/courses/${id}`, { params: { lang: getLang() } });
// export const getCourseById = (id) => api.get(`/courses/${id}`, { params: { lang: getLang() } });
// export const getCourseById = (id) => api.get(`/courses/${id}`);

export const getCoursesByCategory = (category) => 
  api.get('/courses', { params: { lang: getLang(), category } });

export const getLatestCourses = () => 
  api.get('/latestCourses', { params: { lang: getLang() } });

export const searchCourses = (query) => 
  api.get('/courses', { params: { lang: getLang(), search: query } });

export const getCourseCategories = () => 
  api.get('/courseCategories', { params: { lang: getLang() } });