// services/coursesService.js
import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';

export const getAboutCourses = () => api.get('/courses/about', { params: { lang: getLang() } });

export const getCoursesByCategory = (category) => 
  api.get('/courses/get-categories', { params: { lang: getLang(), category } });

export const getAllCourses = () => api.get('/courses', { params: { lang: getLang() } });
export const getCourseById = (id) => 
  api.get(`/courses/${id}`, { params: { lang: getLang() } });
export const searchCourses = (query) => 
  api.get('/courses', { params: { lang: getLang(), search: query } });
export const getCourseCategories = () => 
  api.get('/courseCategories', { params: { lang: getLang() } });