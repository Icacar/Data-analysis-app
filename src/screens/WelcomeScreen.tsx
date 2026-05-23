import { useEffect, useState } from 'react'
import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import type { Language } from '../types'

export default function WelcomeScreen() {
  const { setLanguage, navigateTo, devMode, setDevMode } = useKioskStore()
  const [tapCount, setTapCount] = useState(0)
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    if (tapCount >= 7) {
      setDevMode(true)
      setTapCount(0)
    }
  }, [tapCount, setDevMode])

  function handleLanguage(lang: Language) {
    setLanguage(lang)
    navigateTo('instruction')
  }

  const timeStr = now.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('sr-RS', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div className="flex-1 flex flex-col items-center justify-between px-8 py-10">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400/80">
            {t('welcome.sensor_ok', 'sr')}
          </span>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-500">{dateStr}</div>
          <div className="text-sm font-semibold text-slate-300">{timeStr}</div>
        </div>
      </div>

      {/* Logo area */}
      <div className="flex flex-col items-center gap-5 animate-slideUp">
        {/* Icon */}
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center text-5xl"
          style={{
            background: 'linear-gradient(135deg, #0f3460 0%, #0a1628 100%)',
            border: '1px solid #1e3a5f',
            boxShadow: '0 0 40px rgba(56,189,248,0.15)',
          }}
          onClick={() => setTapCount((c) => c + 1)}
        >
          🚗
        </div>

        <div className="text-center">
          <h1
            className="text-4xl font-black tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #38bdf8, #818cf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            SafeRide
          </h1>
          <div className="text-sm font-medium text-slate-400 mt-1 tracking-widest uppercase">
            Kiosk System
          </div>
        </div>

        <p className="text-slate-400 text-center text-sm max-w-xs leading-relaxed">
          {t('welcome.tagline', 'sr')}
        </p>
      </div>

      {/* Language selection */}
      <div className="w-full flex flex-col items-center gap-4">
        <p className="text-slate-500 text-xs tracking-widest uppercase">
          {t('welcome.select', 'sr')}
        </p>

        <div className="w-full flex gap-3">
          <button
            onClick={() => handleLanguage('sr')}
            className="flex-1 py-5 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 flex flex-col items-center gap-1"
            style={{
              background: 'linear-gradient(135deg, #0f3460, #0a2040)',
              border: '1px solid #1e3a5f',
              color: '#e2e8f0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#38bdf8'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(56,189,248,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1e3a5f'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span className="text-3xl">🇷🇸</span>
            <span>Srpski</span>
          </button>

          <button
            onClick={() => handleLanguage('en')}
            className="flex-1 py-5 rounded-2xl font-bold text-lg transition-all duration-200 active:scale-95 flex flex-col items-center gap-1"
            style={{
              background: 'linear-gradient(135deg, #0f3460, #0a2040)',
              border: '1px solid #1e3a5f',
              color: '#e2e8f0',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#38bdf8'
              e.currentTarget.style.boxShadow = '0 0 20px rgba(56,189,248,0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1e3a5f'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span className="text-3xl">🇬🇧</span>
            <span>English</span>
          </button>
        </div>

        {devMode && (
          <div className="text-xs text-amber-400/60 flex items-center gap-1">
            <span>⚙</span> DEV MODE ACTIVE
          </div>
        )}
      </div>
    </div>
  )
}
