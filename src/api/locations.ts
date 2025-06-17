import type { Barangay, Municipality } from '../types/location';
import api from './axios';

export async function fetchMunicipalities(): Promise<Municipality[]> {
  const res = await api.get("/municipalities");
  return res.data;
}

export async function fetchBarangays(municipalityId?: number): Promise<Barangay[]> {
  if (municipalityId) {
    const res = await api.get(`/municipalities/${municipalityId}/barangays`);
    return res.data;
  }
    
  const res = await api.get("/barangays");
  return res.data;
}