import { useEffect, useState } from 'react'
import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import { MOCK_DRIVERS } from '../data/drivers'
import Button from '../components/shared/Button'
import type { Driver, Language } from '../types'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-xs" style={{ color: star <= Math.round(rating) ? '#f59e0b' : '#334155' }}>
          ★
        </span>
      ))}
      <span className="text-xs text-slate-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

function DriverCard({
  driver,
  onSelect,
  lang,
}: {
  driver: Driver
  onSelect: () => void
  lang: Language
}) {
  return (
    <div
      className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200"
      style={{
        background: 'rgba(14, 31, 56, 0.8)',
        border: '1px solid #1e3a5f',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#38bdf8'
        e.currentTarget.style.boxShadow = '0 0 16px rgba(56,189,248,0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#1e3a5f'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Avatar */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #0f3460, #0a2040)',
          border: '1px solid #1e3a5f',
          color: '#38bdf8',
        }}
      >
        {driver.initials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-slate-200 text-sm truncate">{driver.name}</div>
        <StarRating rating={driver.rating} />
        <div className="text-xs text-slate-500 mt-0.5">
          🚲 {driver.distanceKm} {t('drivers.km', lang)} · {driver.etaMinutes} {t('drivers.eta', lang)}
        </div>
      </div>

      {/* ETA badge + select */}
      <div className="flex flex-col items-end gap-2 flex-shrink-0">
        <div
          className="text-xs font-semibold px-2 py-1 rounded-lg"
          style={{ background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)' }}
        >
          {driver.etaMinutes} min
        </div>
        <Button variant="primary" size="sm" onClick={onSelect}>
          {t('drivers.select', lang)}
        </Button>
      </div>
    </div>
  )
}

export default function DriversScreen() {
  const { language, navigateTo, selectDriver } = useKioskStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(id)
  }, [])

  function handleSelect(driverId: string) {
    selectDriver(driverId)
    navigateTo('package')
  }

  return (
    <div className="flex-1 flex flex-col px-7 py-8 gap-5 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigateTo('result')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
        >
          ←
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-100">{t('drivers.title', language)}</h2>
          {!loading && (
            <p className="text-xs text-slate-500">{MOCK_DRIVERS.length} vozača dostupno</p>
          )}
        </div>
      </div>

      {/* Drivers list or loading */}
      <div className="flex-1 flex flex-col gap-3">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <div className="relative w-16 h-16">
              <div
                className="w-16 h-16 rounded-full border-2 border-sky-500/20 border-t-sky-500 animate-spin"
              />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                🚲
              </div>
            </div>
            <p className="text-slate-400 text-sm">{t('drivers.loading', language)}</p>
          </div>
        ) : (
          MOCK_DRIVERS.map((driver) => (
            <DriverCard
              key={driver.id}
              driver={driver}
              onSelect={() => handleSelect(driver.id)}
              lang={language}
            />
          ))
        )}
      </div>

      {/* Map placeholder */}
      {!loading && (
        <div
          className="w-full h-16 rounded-xl flex items-center justify-center gap-2 text-sm text-slate-500"
          style={{ background: 'rgba(14, 31, 56, 0.6)', border: '1px solid #1e3a5f' }}
        >
          <span>📍</span>
          <span>Live GPS tracking — integrisano u produkciji</span>
        </div>
      )}
    </div>
  )
}
