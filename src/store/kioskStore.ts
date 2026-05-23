import { create } from 'zustand'
import type { KioskState, KioskActions, Language, ScreenId } from '../types'
import { classifyRisk } from '../utils/riskLevel'
import { generateOrderId } from '../utils/formatters'

type Store = KioskState & KioskActions

const initialState: KioskState = {
  screen: 'welcome',
  language: 'sr',
  promille: 0,
  riskLevel: null,
  selectedDriverId: null,
  selectedPackageId: null,
  bookingConfirmed: false,
  devMode: false,
  simPromille: 0.45,
  sessionId: generateOrderId(),
}

export const useKioskStore = create<Store>((set) => ({
  ...initialState,

  setLanguage: (lang: Language) => set({ language: lang }),

  navigateTo: (screen: ScreenId) => set({ screen }),

  setSensorReading: (promille: number) =>
    set({ promille, riskLevel: classifyRisk(promille) }),

  selectDriver: (id: string) => set({ selectedDriverId: id }),

  selectPackage: (id: string) => set({ selectedPackageId: id }),

  confirmPayment: () => set({ bookingConfirmed: true }),

  resetSession: () =>
    set({
      ...initialState,
      sessionId: generateOrderId(),
      devMode: useKioskStore.getState().devMode,
      simPromille: useKioskStore.getState().simPromille,
    }),

  setDevMode: (on: boolean) => set({ devMode: on }),

  setSimPromille: (value: number) => set({ simPromille: value }),
}))
