import axios from 'axios';
import {getToken} from './auth';

const api = axios.create({
  // baseURL:'https://app-esco.mageda.com.br/api'     // Servidor Teste
  baseURL:'http://localhost:8000/api'     // Local
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers["Access-Control-Allow-Origin"] = "*"

  return config
});

export default api;