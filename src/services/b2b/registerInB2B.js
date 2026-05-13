import api from '../api';

export const registerInB2B = (data) =>
  api.post('/b2b/register', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    company_name: data.company_name,
    job_title: data.job_title,
    number_employess: data.number_employess,
    training_location: data.training_location,
    additional_request: data.additional_request,
  });