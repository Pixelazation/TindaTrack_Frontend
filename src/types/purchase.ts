export type Purchase = {
  id: number,
  orderId: number,
  itemName: string,
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