import type { CreateItemDTO } from '../types/item';
import api from "./axios";

export async function fetchItems() {
  const res = await api.get("/Items");
  return res.data;
}

export async function createItem(data: CreateItemDTO) {
  const res = await api.post("/Items", data);
  return res.data;
}