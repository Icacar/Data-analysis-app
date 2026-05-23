import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import Button from '../components/shared/Button'

const STEPS = [
  { icon: '👄', titleKey: 'instr.step1_title', descKey: 'instr.step1_desc' },
  { icon: '🫁', titleKey: 'instr.step2_title', descKey: 'instr.step2_desc' },
  { icon: '💨', titleKey: 'instr.step3_title', descKey: 'instr.step3_desc' },
]

export default function InstructionScreen() {
  const { language, navigateTo } = useKioskStore()

  return (
    <div className="flex-1 flex flex-col px-7 py-8 gap-6 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigateTo('welcome')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-slate-100">
          {t('instr.title', language)}
        </h2>
      </div>

      {/* Sensor illustration */}
      <div className="flex justify-center">
        <div
          className="w-32 h-32 rounded-full flex items-center justify-center text-5xl"
          style={{
            background: 'radial-gradient(circle, #0f3460 0%, #0a1628 100%)',
            border: '2px solid #1e3a5f',
            boxShadow: '0 0 30px rgba(56,189,248,0.12)',
          }}
        >
          🫧
        </div>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-3">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 rounded-2xl"
            style={{
              background: 'rgba(14, 31, 56, 0.8)',
              border: '1px solid #1e3a5f',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ background: 'rgba(56,189,248,0.1)', border: '1px solid rgba(56,189,248,0.2)' }}
            >
              {step.icon}
            </div>
            <div>
              <div className="font-semibold text-slate-200 text-sm">
                {i + 1}. {t(step.titleKey, language)}
              </div>
              <div className="text-slate-500 text-xs mt-0.5">
                {t(step.descKey, language)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start button */}
      <div className="mt-auto flex flex-col gap-3">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => navigateTo('testing')}
        >
          <span className="text-xl">💨</span>
          {t('instr.start', language)}
        </Button>

        <p className="text-center text-xs text-slate-600 leading-relaxed">
          {t('instr.disclaimer', language)}
        </p>
      </div>
    </div>
  )
}
