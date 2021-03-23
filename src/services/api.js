import axios from 'axios';
import {getToken} from './auth';

const api = axios.create({
  baseURL:'http://34.95.138.149/api'     // Servidor
  // baseURL:'http://localhost/esco-app-back/public/api'     // Local
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
});

export default api;