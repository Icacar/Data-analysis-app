import { useState } from 'react'
import { useKioskStore } from '../../store/kioskStore'
import type { ScreenId } from '../../types'

const SCREENS: { id: ScreenId; label: string }[] = [
  { id: 'welcome', label: '① Welcome' },
  { id: 'instruction', label: '② Instrukcija' },
  { id: 'testing', label: '③ Testiranje' },
  { id: 'result', label: '④ Rezultat' },
  { id: 'drivers', label: '⑤ Vozači' },
  { id: 'package', label: '⑥ Paketi' },
  { id: 'payment', label: '⑦ Plaćanje' },
  { id: 'confirmation', label: '⑧ Potvrda' },
]

const PRESETS = [
  { label: '0.00‰', value: 0.0, color: '#10b981' },
  { label: '0.15‰', value: 0.15, color: '#10b981' },
  { label: '0.25‰', value: 0.25, color: '#f59e0b' },
  { label: '0.45‰', value: 0.45, color: '#f59e0b' },
  { label: '0.80‰', value: 0.8, color: '#ef4444' },
  { label: '1.20‰', value: 1.2, color: '#ef4444' },
]

interface Props {
  onClose: () => void
}

export default function DevPanel({ onClose }: Props) {
  const {
    screen,
    language,
    simPromille,
    navigateTo,
    setLanguage,
    setSimPromille,
    setSensorReading,
  } = useKioskStore()

  const [localValue, setLocalValue] = useState(simPromille)

  function applyPromille(val: number) {
    setLocalValue(val)
    setSimPromille(val)
    setSensorReading(val)
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col"
      style={{ background: 'rgba(6,11,20,0.97)', backdropFilter: 'blur(4px)' }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid #1e3a5f' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-amber-400">⚙</span>
          <span className="font-bold text-amber-400 tracking-widest text-sm">DEV PANEL</span>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 text-xl w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/5"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">
        {/* Promille slider */}
        <section>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
            Simuliraj promile vrednost
          </div>
          <div className="flex items-center gap-3 mb-2">
            <input
              type="range"
              min={0}
              max={2.0}
              step={0.01}
              value={localValue}
              onChange={(e) => applyPromille(Number(e.target.value))}
              className="flex-1 accent-sky-500"
            />
            <div
              className="font-mono font-bold text-lg w-16 text-right"
              style={{
                color:
                  localValue < 0.2 ? '#10b981' : localValue < 0.5 ? '#f59e0b' : '#ef4444',
              }}
            >
              {localValue.toFixed(2)}‰
            </div>
          </div>
          {/* Presets */}
          <div className="grid grid-cols-3 gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.value}
                onClick={() => applyPromille(p.value)}
                className="py-2 rounded-xl text-xs font-semibold transition-all active:scale-95"
                style={{
                  background: localValue === p.value ? `${p.color}20` : 'rgba(14,31,56,0.8)',
                  border: localValue === p.value ? `1px solid ${p.color}60` : '1px solid #1e3a5f',
                  color: p.color,
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </section>

        {/* Language toggle */}
        <section>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">Jezik</div>
          <div className="flex gap-2">
            <button
              onClick={() => setLanguage('sr')}
              className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: language === 'sr' ? 'rgba(56,189,248,0.15)' : 'rgba(14,31,56,0.8)',
                border: language === 'sr' ? '1px solid rgba(56,189,248,0.4)' : '1px solid #1e3a5f',
                color: language === 'sr' ? '#38bdf8' : '#64748b',
              }}
            >
              🇷🇸 Srpski
            </button>
            <button
              onClick={() => setLanguage('en')}
              className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: language === 'en' ? 'rgba(56,189,248,0.15)' : 'rgba(14,31,56,0.8)',
                border: language === 'en' ? '1px solid rgba(56,189,248,0.4)' : '1px solid #1e3a5f',
                color: language === 'en' ? '#38bdf8' : '#64748b',
              }}
            >
              🇬🇧 English
            </button>
          </div>
        </section>

        {/* Screen navigator */}
        <section>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
            Navigacija ekrana
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SCREENS.map((s) => (
              <button
                key={s.id}
                onClick={() => navigateTo(s.id)}
                className="py-2.5 px-3 rounded-xl text-xs font-medium text-left transition-all active:scale-95"
                style={{
                  background: screen === s.id ? 'rgba(56,189,248,0.15)' : 'rgba(14,31,56,0.8)',
                  border: screen === s.id ? '1px solid rgba(56,189,248,0.4)' : '1px solid #1e3a5f',
                  color: screen === s.id ? '#38bdf8' : '#64748b',
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </section>

        {/* Current state info */}
        <section>
          <div className="text-xs text-slate-500 uppercase tracking-widest mb-2">
            Trenutno stanje
          </div>
          <div
            className="rounded-xl p-3 font-mono text-xs text-slate-400"
            style={{ background: 'rgba(14,31,56,0.8)', border: '1px solid #1e3a5f' }}
          >
            <div>screen: <span className="text-sky-400">{screen}</span></div>
            <div>lang: <span className="text-sky-400">{language}</span></div>
            <div>simPromille: <span className="text-amber-400">{localValue.toFixed(2)}</span></div>
          </div>
        </section>
      </div>
    </div>
  )
}
