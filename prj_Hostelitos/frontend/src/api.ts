import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default api;