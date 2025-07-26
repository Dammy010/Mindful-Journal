import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mindful-journal-bhaq.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
