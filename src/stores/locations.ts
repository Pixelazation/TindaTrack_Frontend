import {create} from 'zustand'
import { fetchBarangays, fetchMunicipalities } from '../api/locations'
import type { Barangay, Municipality } from '../types/location'

type LocationDropdownStore = {
  municipalityOptions: Municipality[],
  barangayOptions: Barangay[],
  setMunicipalities: () => void,
  setBarangays: (id: number) => void
}

export const useLocationDropdown = create<LocationDropdownStore>((set) => ({
  municipalityOptions: [],
  barangayOptions: [],
  setMunicipalities: async () => set({ municipalityOptions: await fetchMunicipalities() }),
  setBarangays: async (id: number) => set({ barangayOptions: await fetchBarangays(id) })
}))