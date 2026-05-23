import type { Driver } from '../types'

export const MOCK_DRIVERS: Driver[] = [
  {
    id: 'D001',
    name: 'Marko Nikolić',
    initials: 'MN',
    rating: 4.9,
    etaMinutes: 4,
    distanceKm: 0.8,
    available: true,
  },
  {
    id: 'D002',
    name: 'Stefan Petrović',
    initials: 'SP',
    rating: 4.7,
    etaMinutes: 9,
    distanceKm: 1.6,
    available: true,
  },
  {
    id: 'D003',
    name: 'Nikola Jović',
    initials: 'NJ',
    rating: 4.8,
    etaMinutes: 14,
    distanceKm: 2.3,
    available: true,
  },
]
