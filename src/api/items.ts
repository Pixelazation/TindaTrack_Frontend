import type { CreateItemDTO } from '../types/item';
import api from "./axios";

export async function fetchItems() {
  const res = await api.get("/items");
  return res.data;
}

export async function createItem(data: CreateItemDTO) {
  const res = await api.post("/items", data);
  return res.data;
}

export async function editItem(id: number, data: CreateItemDTO) {
  const res = await api.put(`/items/${id}`, data);
  return res.data;
}