import type { CreatePurchaseDTO } from './purchase'

export type Order = {
  id: number,
  accountId: number,
  accountName: string,
  salesmanId: number,
  salesmanName: string,
  date: Date,
  totalSales: number,
}

export type CreateOrderDTO = {
  accountId: number,
  salesmanId: number,
  date: Date,
  purchases: CreatePurchaseDTO[]
}