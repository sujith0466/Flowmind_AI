import axios from 'axios';

const apiBaseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000').trim();

export const apiClient = axios.create({
  baseURL: apiBaseUrl.replace(/\/$/, ''),
  timeout: 60000,
});

export default apiClient;
