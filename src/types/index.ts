export type Language = 'sr' | 'en'

export type ScreenId =
  | 'welcome'
  | 'instruction'
  | 'testing'
  | 'result'
  | 'drivers'
  | 'package'
  | 'payment'
  | 'confirmation'

export type RiskLevel = 'safe' | 'caution' | 'danger'

export interface Driver {
  id: string
  name: string
  initials: string
  rating: number
  etaMinutes: number
  distanceKm: number
  available: boolean
}

export interface ServicePackage {
  id: 'standard' | 'safety_plus' | 'priority'
  nameKey: string
  descKey: string
  priceRSD: number
  featureKeys: string[]
  highlighted: boolean
}

export interface KioskState {
  screen: ScreenId
  language: Language
  promille: number
  riskLevel: RiskLevel | null
  selectedDriverId: string | null
  selectedPackageId: string | null
  bookingConfirmed: boolean
  devMode: boolean
  simPromille: number
  sessionId: string
}

export interface KioskActions {
  setLanguage: (lang: Language) => void
  navigateTo: (screen: ScreenId) => void
  setSensorReading: (promille: number) => void
  selectDriver: (id: string) => void
  selectPackage: (id: string) => void
  confirmPayment: () => void
  resetSession: () => void
  setDevMode: (on: boolean) => void
  setSimPromille: (value: number) => void
}
