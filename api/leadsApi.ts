import { Lead } from '../types';
import { api } from './api';

export const leadsApi = {
  getAll: () => api.get<Lead[]>('/leads').then(res => res.data),
  getById: (id: string) => api.get<Lead>(`/leads/${id}`).then(res => res.data),
  create: (data: Partial<Lead>) => api.post<Lead>('/leads', data).then(res => res.data),

  // Optional methods (not required for this take-home)
  update: (id: string, data: Partial<Lead>) => api.put<Lead>(`/leads/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/leads/${id}`).then(res => res.data),
};
