import { useEffect, useState, useRef } from 'react'
import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import CountdownRing from '../components/shared/CountdownRing'
import { createSimulatedSensor } from '../sensor/sensorAdapter'
import { formatPromille } from '../utils/formatters'

type Phase = 'blow' | 'analyzing' | 'done'

export default function TestingScreen() {
  const { language, setSensorReading, navigateTo, simPromille, devMode } = useKioskStore()
  const [phase, setPhase] = useState<Phase>('blow')
  const [countdown, setCountdown] = useState(3)
  const [liveValue, setLiveValue] = useState(0)
  const sensorRef = useRef(createSimulatedSensor(simPromille))

  useEffect(() => {
    const sensor = sensorRef.current
    let blowTimer: ReturnType<typeof setTimeout>
    let analyzeTimer: ReturnType<typeof setTimeout>

    // Start blow phase countdown
    const tickInterval = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(tickInterval)
          return 0
        }
        return c - 1
      })
    }, 1000)

    blowTimer = setTimeout(() => {
      setPhase('analyzing')
      sensor.start((v) => setLiveValue(v))

      analyzeTimer = setTimeout(() => {
        sensor.stop()
        setSensorReading(simPromille)
        setPhase('done')

        setTimeout(() => navigateTo('result'), 800)
      }, 3000)
    }, 3000)

    return () => {
      clearTimeout(blowTimer)
      clearTimeout(analyzeTimer)
      clearInterval(tickInterval)
      sensor.stop()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-8 py-10 gap-8 animate-fadeIn">
      {/* Phase indicator */}
      <div className="text-slate-400 text-sm tracking-widest uppercase font-medium">
        {phase === 'blow' && t('test.blow', language)}
        {phase === 'analyzing' && t('test.analyzing', language)}
        {phase === 'done' && t('test.complete', language)}
      </div>

      {/* Main animation */}
      <div className="relative flex items-center justify-center">
        {phase === 'blow' && (
          <>
            {/* Breath rings */}
            <div
              className="absolute w-56 h-56 rounded-full animate-ping"
              style={{ background: 'rgba(56,189,248,0.04)', animationDuration: '2s' }}
            />
            <div
              className="absolute w-44 h-44 rounded-full animate-ping"
              style={{ background: 'rgba(56,189,248,0.06)', animationDuration: '2s', animationDelay: '0.3s' }}
            />
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.03) 70%)',
                border: '2px solid rgba(56,189,248,0.3)',
                animation: 'breath 2s ease-in-out infinite',
              }}
            >
              <span className="text-6xl" style={{ animation: 'breath 2s ease-in-out infinite' }}>
                💨
              </span>
            </div>
          </>
        )}

        {phase === 'analyzing' && (
          <div className="flex flex-col items-center gap-4">
            <div
              className="w-36 h-36 rounded-full flex items-center justify-center text-5xl"
              style={{
                background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, transparent 70%)',
                border: '2px solid rgba(56,189,248,0.3)',
              }}
            >
              🔬
            </div>
            {devMode && (
              <div className="text-sky-400 text-lg font-mono">
                {formatPromille(liveValue)} ‰
              </div>
            )}
          </div>
        )}

        {phase === 'done' && (
          <div
            className="w-36 h-36 rounded-full flex items-center justify-center text-5xl"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
              border: '2px solid rgba(16,185,129,0.4)',
            }}
          >
            ✅
          </div>
        )}
      </div>

      {/* Countdown */}
      {phase === 'blow' && countdown > 0 && (
        <CountdownRing seconds={countdown} total={3} color="#38bdf8" size={80} />
      )}

      {/* Analyzing progress bar */}
      {phase === 'analyzing' && (
        <div className="w-full max-w-xs">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e3a5f' }}>
            <div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
                width: `${(liveValue / Math.max(simPromille, 0.01)) * 100}%`,
                transition: 'width 0.1s linear',
                boxShadow: '0 0 8px rgba(56,189,248,0.6)',
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>0.00‰</span>
            <span>Merenje...</span>
            <span>{formatPromille(simPromille)}‰</span>
          </div>
        </div>
      )}

      <p className="text-slate-600 text-xs text-center max-w-xs">
        {phase === 'blow'
          ? t('test.blow', language)
          : phase === 'analyzing'
          ? t('test.analyzing', language)
          : t('test.complete', language)}
      </p>
    </div>
  )
}
