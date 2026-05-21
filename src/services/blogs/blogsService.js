import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';
  // All blog-related API calls with language parameter

export const getAllBlogs = async () => {
  let allBlogs = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await api.get('/blogs', { params: { lang: getLang(), page } });
      const blogsData = response.data?.blogs || response.data?.data || response.data || [];
      
      if (Array.isArray(blogsData) && blogsData.length > 0) {
        allBlogs = [...allBlogs, ...blogsData];
        if (blogsData.length < 10) {
          hasMore = false;
        } else {
          page += 1;
        }
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error(`Failed to fetch page ${page} of blogs:`, err);
      hasMore = false;
      if (page === 1) throw err;
    }
  }

  return {
    data: {
      status: true,
      blogs: allBlogs
    }
  };
};









export const getBlogById = (id) =>  api.get(`/blogs/${id}`, { params: { lang: getLang() } });



export const searchBlogs = (query) => 
  api.get('/blogs', { params: { lang: getLang(), search: query, per_page: 100, limit: 100 } });

export const getBlogCategories = () => 
  api.get('/blogs/get-categories', { params: { lang: getLang() } });
export const getBlogAbout = () => 
  api.get('/blogs/about', { params: { lang: getLang() } });