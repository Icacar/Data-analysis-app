import type { ServicePackage } from '../types'

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'standard',
    nameKey: 'standard.name',
    descKey: 'standard.desc',
    priceRSD: 1200,
    featureKeys: ['standard.f1', 'standard.f2', 'standard.f3'],
    highlighted: false,
  },
  {
    id: 'safety_plus',
    nameKey: 'safety_plus.name',
    descKey: 'safety_plus.desc',
    priceRSD: 1800,
    featureKeys: ['safety_plus.f1', 'safety_plus.f2', 'safety_plus.f3'],
    highlighted: true,
  },
  {
    id: 'priority',
    nameKey: 'priority.name',
    descKey: 'priority.desc',
    priceRSD: 2500,
    featureKeys: ['priority.f1', 'priority.f2', 'priority.f3', 'priority.f4'],
    highlighted: false,
  },
]
