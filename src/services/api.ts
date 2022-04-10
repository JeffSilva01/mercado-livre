import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mercado-livre-mgsla2gao-jeffsilva01.vercel.app',
});

export default api;
