import api from '../api';

export const subscribeEmail = (data) =>
  api.post('/contact/subscribe', {
    email: data.email
  });
