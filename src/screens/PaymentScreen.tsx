import { useState } from 'react'
import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import { MOCK_DRIVERS } from '../data/drivers'
import { SERVICE_PACKAGES } from '../data/packages'
import Button from '../components/shared/Button'
import { formatPrice } from '../utils/formatters'

type PaymentMethod = 'card' | 'cash'

export default function PaymentScreen() {
  const { language, navigateTo, selectedDriverId, selectedPackageId, confirmPayment, sessionId } =
    useKioskStore()
  const [method, setMethod] = useState<PaymentMethod>('card')
  const [processing, setProcessing] = useState(false)

  const driver = MOCK_DRIVERS.find((d) => d.id === selectedDriverId)
  const pkg = SERVICE_PACKAGES.find((p) => p.id === selectedPackageId)

  if (!driver || !pkg) {
    navigateTo('drivers')
    return null
  }

  function handlePay() {
    setProcessing(true)
    setTimeout(() => {
      confirmPayment()
      navigateTo('confirmation')
    }, 2800)
  }

  const orderId = sessionId

  return (
    <div className="flex-1 flex flex-col px-7 py-8 gap-5 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigateTo('package')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
          disabled={processing}
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-slate-100">{t('pay.title', language)}</h2>
      </div>

      {/* Order summary */}
      <div
        className="w-full rounded-2xl p-4 flex flex-col gap-3"
        style={{ background: 'rgba(14, 31, 56, 0.8)', border: '1px solid #1e3a5f' }}
      >
        <div className="text-xs text-slate-500 uppercase tracking-widest">
          {t('pay.order', language)} {orderId}
        </div>

        <div className="flex items-center justify-between py-2" style={{ borderBottom: '1px solid #1e3a5f' }}>
          <div className="text-sm text-slate-400">{t('pay.driver', language)}</div>
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ background: '#0f3460', color: '#38bdf8' }}
            >
              {driver.initials}
            </div>
            <span className="text-sm text-slate-200 font-medium">{driver.name}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">{t('pay.package', language)}</div>
          <div className="text-sm text-slate-200 font-medium">{t(pkg.nameKey, language)}</div>
        </div>

        <div
          className="flex items-center justify-between pt-3 mt-1"
          style={{ borderTop: '1px solid #1e3a5f' }}
        >
          <div className="font-bold text-slate-200">{t('pay.total', language)}</div>
          <div className="text-xl font-black text-sky-400">{formatPrice(pkg.priceRSD)}</div>
        </div>
      </div>

      {/* Payment method */}
      <div className="flex flex-col gap-2">
        <div className="text-xs text-slate-500 uppercase tracking-widest px-1">
          {t('pay.method', language)}
        </div>
        <div className="flex gap-3">
          {(['card', 'cash'] as PaymentMethod[]).map((m) => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className="flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200"
              style={{
                background: method === m ? 'rgba(56,189,248,0.12)' : 'rgba(14,31,56,0.8)',
                border: method === m ? '1px solid rgba(56,189,248,0.4)' : '1px solid #1e3a5f',
                color: method === m ? '#38bdf8' : '#64748b',
              }}
            >
              <span>{m === 'card' ? '💳' : '💵'}</span>
              {t(`pay.${m}`, language)}
            </button>
          ))}
        </div>
      </div>

      {/* Secure indicator */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600">
        <span>🔒</span>
        {t('pay.secure', language)}
      </div>

      {/* Pay button */}
      <div className="mt-auto">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handlePay}
          loading={processing}
          disabled={processing}
        >
          {processing ? t('pay.processing', language) : `${t('pay.pay', language)} ${formatPrice(pkg.priceRSD)}`}
        </Button>
      </div>
    </div>
  )
}
