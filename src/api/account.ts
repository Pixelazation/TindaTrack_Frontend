import type { CreateAccountDTO, Account } from '../types/account';
import api from "./axios";

export async function fetchAccounts(): Promise<Account[]> {
  const res = await api.get("/accounts");
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