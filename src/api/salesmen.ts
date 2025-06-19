import type { CreateSalesmanDTO, Salesman } from '../types/salesman';
import api from "./axios";

export async function fetchSalesmen(
  page: number = 1,
  pageSize: number = 10,
  searchQuery?: string,
  filter?: string,
): Promise<Salesman[]> {
  const params = new URLSearchParams;
  
  params.append("page", String(page));
  params.append("pageSize", String(pageSize));

  if (searchQuery) params.append("searchQuery", searchQuery);
  if (filter) params.append("filter", filter);

  const res = await api.get(`salesmen?${params.toString()}`);
  return res.data;
}

export async function fetchAccount(id: number): Promise<Salesman> {
  const res = await api.get(`/salesmen/${id}`);
  return res.data;
}

export async function createSalesman(data: CreateSalesmanDTO) {
  const res = await api.post("/salesmen", data);
  return res.data;
}

export async function editSalesman(id: number, data: CreateSalesmanDTO) {
  const res = await api.put(`/salesmen/${id}`, data);
  return res.data;
}

export async function deleteSalesman(id: number) {
  const res = await api.delete(`/salesmen/${id}`);
  return res.data;
}