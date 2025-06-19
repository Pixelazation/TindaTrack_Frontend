import type { CreateAccountDTO, Account } from '../types/account';
import api from "./axios";

export async function fetchAccounts(
  page: number = 1,
    pageSize: number = 10,
    searchQuery?: string,
    filter?: string,
): Promise<Account[]> {
  const params = new URLSearchParams;

  params.append("page", String(page));
  params.append("pageSize", String(pageSize));

  if (searchQuery) params.append("searchQuery", searchQuery);
  if (filter) params.append("filter", filter);

  const res = await api.get(`/accounts?${params.toString()}`);
  return res.data;
}

export async function fetchAccount(id: number): Promise<Account> {
  const res = await api.get(`/accounts/${id}`);
  return res.data;
}

export async function createAccount(data: CreateAccountDTO) {
  const res = await api.post("/accounts", data);
  return res.data;
}

export async function editAccount(id: number, data: CreateAccountDTO) {
  const res = await api.put(`/accounts/${id}`, data);
  return res.data;
}

export async function deleteAccount(id: number) {
  const res = await api.delete(`/accounts/${id}`);
  return res.data;
}