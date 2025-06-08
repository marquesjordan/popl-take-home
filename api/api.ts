import axios from 'axios';
import { Lead } from '../types';

const api = axios.create({
  // baseURL: 'http://localhost:3001',
  baseURL: 'http://192.168.6.94:3001',
});
// Simulate delay for all responses (e.g., 800ms)
api.interceptors.response.use(
  async (response) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return response;
  },
  (error) => Promise.reject(error),
);

const getLeads = () => api.get('/leads');
const getLeadById = (id: string) => api.get(`/leads/${id}`);
const createLead = (data: Lead) => api.post('/leads', data);
const replaceLead = (id: string, data: Lead) => api.put(`/leads/${id}`, data);
const updateLead = (id: string, data: Partial<Lead>) => api.patch(`/leads/${id}`, data);
const deleteLead = (id: string) => api.delete(`/leads/${id}`);

export {
  api,
  getLeads,
  getLeadById,
  createLead,
  replaceLead,
  updateLead,
  deleteLead,
};
