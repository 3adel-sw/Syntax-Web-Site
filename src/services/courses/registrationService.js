import api from '../api';

export const registerInCourse = (data) =>
  api.post('/courses/register', {
    name: data.name,
    phone: data.phone,
    subject: data.subject,  
    message: data.message,   
  })