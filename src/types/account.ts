export type Account = {
  id: number,
  name: string,
  address: string,
  barangayName: string,
  municipalityName: string,
}

export type CreateAccountDTO = {
  name: string,
  address: string,
  barangayId: number,
}