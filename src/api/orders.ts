import type { CreateOrderDTO, Order } from '../types/order';
import api from "./axios";

export async function fetchOrders(
  page: number = 1,
  pageSize: number = 10,
  searchQuery?: string,
  filter?: string,
): Promise<Order[]> {
  const params = new URLSearchParams;

  params.append("page", String(page));
  params.append("pageSize", String(pageSize));

  if (searchQuery) params.append("searchQuery", searchQuery);
  if (filter) params.append("filter", filter);

  const res = await api.get(`orders?${params.toString()}`);
  return res.data;
}

export async function fetchOrder(id: number): Promise<Order> {
  const res = await api.get(`/orders/${id}`);
  return res.data;
}

export async function createOrder(data: CreateOrderDTO) {
  const res = await api.post("/orders", data);
  return res.data;
}

export async function editOrder(id: number, data: CreateOrderDTO) {
  const res = await api.put(`/orders/${id}`, data);
  return res.data;
}

export async function deleteOrder(id: number) {
  const res = await api.delete(`/orders/${id}`);
  return res.data;
}