import api from '../api';

export const subscribeEmail = (data) =>
  api.post('/contact/subscribe', {
    email: data.email
  });
export const InboxAboutService = (data) =>
  api.post('/contact/inbox', {
    name: data.name,
    email: data.email,
    phone: data.phone,
    subject: data.subject,
    message: data.message,
  });
