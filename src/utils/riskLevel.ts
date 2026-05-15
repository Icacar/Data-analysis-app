import type { RiskLevel } from '../types'

export function classifyRisk(promille: number): RiskLevel {
  if (promille < 0.2) return 'safe'
  if (promille < 0.5) return 'caution'
  return 'danger'
}

export const RISK_COLORS: Record<RiskLevel, string> = {
  safe: '#10b981',
  caution: '#f59e0b',
  danger: '#ef4444',
}

export const RISK_BG: Record<RiskLevel, string> = {
  safe: 'rgba(16, 185, 129, 0.12)',
  caution: 'rgba(245, 158, 11, 0.12)',
  danger: 'rgba(239, 68, 68, 0.12)',
}

export const RISK_BORDER: Record<RiskLevel, string> = {
  safe: 'rgba(16, 185, 129, 0.4)',
  caution: 'rgba(245, 158, 11, 0.4)',
  danger: 'rgba(239, 68, 68, 0.4)',
}
