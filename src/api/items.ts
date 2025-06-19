import type { CreateItemDTO, Item } from '../types/item';
import api from "./axios";

export async function fetchItems(
  page: number = 1,
  pageSize: number = 10,
  searchQuery?: string,
  filter?: string,
): Promise<Item[]> {
  const params = new URLSearchParams;

  params.append("page", String(page));
  params.append("pageSize", String(pageSize));

  if (searchQuery) params.append("searchQuery", searchQuery);
  if (filter) params.append("filter", filter);

  const res = await api.get(`items?${params.toString()}`);
  return res.data;
}

export async function fetchItem(id: number): Promise<Item> {
  const res = await api.get(`/items/${id}`);
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

export async function deleteItem(id: number) {
  const res = await api.delete(`/items/${id}`);
  return res.data;
}