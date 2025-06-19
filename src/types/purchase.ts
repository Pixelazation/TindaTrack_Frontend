import type { Item } from './item'

export type Purchase = {
  id?: number,
  orderId?: number,
  item: Item,
  quantity: number,
  unitPrice: number,
  totalAmount: number,
}

export type CreatePurchaseDTO = {
  orderId?: number,
  itemId: number,
  quantity: number,
  unitPrice: number,
}