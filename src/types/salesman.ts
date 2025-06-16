export type Salesman = {
  id: number;
  firstName: string;
  lastName: string;
};

export type CreateSalesmanDTO = Omit<Salesman, "id">;