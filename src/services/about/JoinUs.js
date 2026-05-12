import api from '../api';

export const JoinUs = (data) =>
  api.post('/about/join-us', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    job:data.job,
    country:data.country  ,
    experience_level:data.experience_level,
    message: data.message, 
    file: data.file,
   
  })