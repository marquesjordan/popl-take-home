import axios from 'axios';
import { Lead } from '../types';

const api = axios.create({
  baseURL: `http://${process.env.IP_ADDRESS || 'localhost'}:3001`,
});

console.log('api', process.env.IP_ADDRESS);
// Simulate delay for all responses (e.g., 800ms)
api.interceptors.response.use(
  async (response) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return response;
  },
  (error) => Promise.reject(error),
);

export {
  api
};

