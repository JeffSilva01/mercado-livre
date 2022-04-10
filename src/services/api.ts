import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mercado-livre-ngk73w5em-jeffsilva01.vercel.app',
});

export default api;
