import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiClient = axios.create({
  baseURL: apiBaseUrl.replace(/\/$/, ''),
  timeout: 45000,
});

export default apiClient;
