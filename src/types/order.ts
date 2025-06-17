import type { CreatePurchaseDTO, Purchase } from './purchase'

export type Order = {
  id: number,
  accountName: string,
  salesmanName: string,
  date: Date,
  totalSales: number,
  purchases: Purchase[],
}

export type CreateOrderDTO = {
  accountId: number,
  salesmanId: number,
  date: Date,
  purchases: CreatePurchaseDTO[]
}