// services/coursesService.js
import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';

export const getAboutCourses = () => api.get('/courses/about', { params: { lang: getLang() } });

export const getCoursesByCategory = (category) => 
  api.get('/courses/get-categories', { params: { lang: getLang(), category } });



export const getAllCourses = async () => {
  let allCourses = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await api.get('/courses', { params: { lang: getLang(), page } });
      const coursesData = response.data?.courses || response.data?.data || response.data || [];
      
      if (Array.isArray(coursesData) && coursesData.length > 0) {
        allCourses = [...allCourses, ...coursesData];
        if (coursesData.length < 10) {
          hasMore = false;
        } else {
          page += 1;
        }
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error(`Failed to fetch page ${page} of courses:`, err);
      hasMore = false;
      if (page === 1) throw err;
    }
  }

  return {
    data: {
      status: true,
      courses: allCourses
    }
  };
};









export const getCourseById = (id) => 
  api.get(`/courses/${id}`, { params: { lang: getLang() } });
export const searchCourses = (query) => 
  api.get('/courses', { params: { lang: getLang(), search: query, per_page: 100, limit: 100 } });
export const getCourseCategories = () => 
  api.get('/courseCategories', { params: { lang: getLang() } });