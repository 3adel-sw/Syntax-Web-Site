import api from '../api';

export const registrationEventsService = (data) =>
  api.post('/events/register', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    country:data.country  ,
    experience_level:data.experience_level,
    message: data.message,   
  })