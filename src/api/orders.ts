import type { CreateOrderDTO, Order } from '../types/order';
import api from "./axios";

export async function fetchOrders(): Promise<Order[]> {
  const res = await api.get("/orders");
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