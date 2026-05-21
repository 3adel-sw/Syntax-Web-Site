import api from '../api';

const getLang = () => localStorage.getItem('lang') || 'ar';
  // All blog-related API calls with language parameter
export const getAllEvents = async () => {
  let allEvents = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await api.get('/events', { params: { lang: getLang(), page } });
      const eventsData = response.data?.events || response.data?.data || response.data || [];
      
      if (Array.isArray(eventsData) && eventsData.length > 0) {
        allEvents = [...allEvents, ...eventsData];
        if (eventsData.length < 10) {
          hasMore = false;
        } else {
          page += 1;
        }
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error(`Failed to fetch page ${page} of events:`, err);
      hasMore = false;
      if (page === 1) throw err;
    }
  }

  return {
    data: {
      status: true,
      events: allEvents
    }
  };
};

//  Details endpoint might be /blogs/:id or /blog/:id based on your backend, adjust accordingly
export const getEventById = (id) =>  api.get(`/events/${id}`, { params: { lang: getLang() } });

export const getLatestEvents = () => api.get('/latestEvents', { params: { lang: getLang() } });

export const searchEvents = async (query) => {
  let allEvents = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    try {
      const response = await api.get('/events/search', { params: { lang: getLang(), search: query, page } });
      const eventsData = response.data?.events || response.data?.data || response.data || [];
      
      if (Array.isArray(eventsData) && eventsData.length > 0) {
        allEvents = [...allEvents, ...eventsData];
        if (eventsData.length < 10) {
          hasMore = false;
        } else {
          page += 1;
        }
      } else {
        hasMore = false;
      }
    } catch (err) {
      console.error(`Failed to search page ${page} of events:`, err);
      hasMore = false;
      if (page === 1) throw err;
    }
  }

  return {
    data: {
      status: true,
      events: allEvents
    }
  };
};

export const getEventCategories = () => 
  api.get('/events/getCategory', { params: { lang: getLang() } });

export const getEventAbout = () => 
  api.get('/events/about', { params: { lang: getLang() } });