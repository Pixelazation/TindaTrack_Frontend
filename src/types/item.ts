export type Item = {
  id: number;
  itemCode: string;
  name: string;
  description?: string;
  unitPrice: number;
};

export type CreateItemDTO = Omit<Item, "id">;