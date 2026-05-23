import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import Button from '../components/shared/Button'
import PromilleGauge from '../components/shared/PromilleGauge'
import { RISK_COLORS, RISK_BG, RISK_BORDER } from '../utils/riskLevel'
import type { RiskLevel } from '../types'

const RISK_ICON: Record<RiskLevel, string> = {
  safe: '✅',
  caution: '⚠️',
  danger: '🚫',
}

const RISK_TITLE_KEY: Record<RiskLevel, string> = {
  safe: 'result.safe_title',
  caution: 'result.caution_title',
  danger: 'result.danger_title',
}

const RISK_MSG_KEY: Record<RiskLevel, string> = {
  safe: 'result.safe_msg',
  caution: 'result.caution_msg',
  danger: 'result.danger_msg',
}

export default function ResultScreen() {
  const { language, promille, riskLevel, navigateTo } = useKioskStore()

  if (!riskLevel) {
    navigateTo('welcome')
    return null
  }

  const color = RISK_COLORS[riskLevel]
  const bg = RISK_BG[riskLevel]
  const border = RISK_BORDER[riskLevel]

  return (
    <div className="flex-1 flex flex-col items-center px-7 py-8 gap-5 animate-slideUp">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-slate-300">
          {t('result.your_value', language)}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {t('result.legal_limit', language)}
        </p>
      </div>

      {/* Gauge */}
      <PromilleGauge value={promille} riskLevel={riskLevel} animated />

      {/* Risk card */}
      <div
        className="w-full rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <div className="text-3xl">{RISK_ICON[riskLevel]}</div>
        <div className="font-bold text-sm tracking-wider" style={{ color }}>
          {t(RISK_TITLE_KEY[riskLevel], language)}
        </div>
        <div className="text-slate-400 text-xs leading-relaxed">
          {t(RISK_MSG_KEY[riskLevel], language)}
        </div>
        {riskLevel === 'safe' && (
          <div className="text-slate-500 text-xs italic mt-1">
            {t('result.safe_advice', language)}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="w-full flex flex-col gap-3 mt-auto">
        {(riskLevel === 'caution' || riskLevel === 'danger') && (
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => navigateTo('drivers')}
          >
            🚲 {t('result.book_driver', language)}
          </Button>
        )}

        {riskLevel === 'safe' && (
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => navigateTo('drivers')}
          >
            🚲 {t('result.optional_service', language)}
          </Button>
        )}

        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={() => navigateTo('instruction')}
          >
            {t('result.new_test', language)}
          </Button>
          <Button
            variant="ghost"
            size="md"
            fullWidth
            onClick={() => navigateTo('welcome')}
          >
            {t('result.home', language)}
          </Button>
        </div>
      </div>
    </div>
  )
}
