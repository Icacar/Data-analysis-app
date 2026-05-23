import { useEffect, useState } from 'react'
import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import { MOCK_DRIVERS } from '../data/drivers'
import Button from '../components/shared/Button'

export default function ConfirmationScreen() {
  const { language, selectedDriverId, sessionId, resetSession } = useKioskStore()
  const driver = MOCK_DRIVERS.find((d) => d.id === selectedDriverId) ?? MOCK_DRIVERS[0]
  const [eta, setEta] = useState(driver.etaMinutes)
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    setTimeout(() => setShowCheck(true), 300)

    if (eta <= 0) return
    const id = setInterval(() => {
      setEta((e) => {
        if (e <= 1) {
          clearInterval(id)
          return 0
        }
        return e - 1
      })
    }, 60000)
    return () => clearInterval(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center px-7 py-8 gap-6 animate-slideUp">
      {/* Success icon */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <div
          className="w-28 h-28 rounded-full flex items-center justify-center text-6xl"
          style={{
            background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, rgba(16,185,129,0.04) 70%)',
            border: '2px solid rgba(16,185,129,0.5)',
            boxShadow: '0 0 30px rgba(16,185,129,0.2)',
            transform: showCheck ? 'scale(1)' : 'scale(0.5)',
            opacity: showCheck ? 1 : 0,
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          ✅
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-black text-emerald-400">
            {t('conf.title', language)}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {t('conf.message', language)}
          </p>
        </div>
      </div>

      {/* Driver info card */}
      <div
        className="w-full rounded-2xl p-4 flex flex-col gap-3"
        style={{ background: 'rgba(14, 31, 56, 0.8)', border: '1px solid #1e3a5f' }}
      >
        <div className="text-xs text-slate-500 uppercase tracking-widest">
          {t('conf.driver', language)}
        </div>

        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-lg"
            style={{ background: 'linear-gradient(135deg, #0f3460, #0a2040)', color: '#38bdf8', border: '1px solid #1e3a5f' }}
          >
            {driver.initials}
          </div>
          <div>
            <div className="font-bold text-slate-100 text-lg">{driver.name}</div>
            <div className="flex items-center gap-1 text-sm">
              <span className="text-amber-400">★</span>
              <span className="text-slate-300">{driver.rating.toFixed(1)}</span>
              <span className="text-slate-600 mx-1">·</span>
              <span className="text-emerald-400">🚲 Na putu</span>
            </div>
          </div>
        </div>

        {/* ETA */}
        <div
          className="flex items-center justify-between rounded-xl p-3"
          style={{ background: 'rgba(56,189,248,0.06)', border: '1px solid rgba(56,189,248,0.15)' }}
        >
          <div>
            <div className="text-xs text-slate-500">{t('conf.eta', language)}</div>
            <div className="text-sky-400 font-bold text-lg">
              {eta} {t('conf.minutes', language)}
            </div>
          </div>
          <div className="text-3xl" style={{ animation: 'breath 2s ease-in-out infinite' }}>
            🚲
          </div>
        </div>

        {/* Order number */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500">{t('conf.order', language)}</span>
          <span className="font-mono text-slate-300">{sessionId}</span>
        </div>

        <div className="text-center text-xs text-slate-600">
          📍 {t('conf.tracking', language)}
        </div>
      </div>

      {/* Thank you */}
      <p className="text-center text-slate-400 text-sm leading-relaxed">
        {t('conf.thanks', language)}
      </p>

      {/* New session button */}
      <div className="mt-auto w-full">
        <Button variant="ghost" size="md" fullWidth onClick={resetSession}>
          {t('conf.new_session', language)}
        </Button>
      </div>
    </div>
  )
}
