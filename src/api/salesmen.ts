import type { CreateSalesmanDTO, Salesman } from '../types/salesman';
import api from "./axios";

export async function fetchSalesmen(): Promise<Salesman[]> {
  const res = await api.get("/salesmen");
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