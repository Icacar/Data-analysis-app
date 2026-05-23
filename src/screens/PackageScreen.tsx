import { useKioskStore } from '../store/kioskStore'
import { t } from '../i18n'
import { SERVICE_PACKAGES } from '../data/packages'
import Button from '../components/shared/Button'
import { formatPrice } from '../utils/formatters'
import type { ServicePackage, Language } from '../types'

function PackageCard({
  pkg,
  onSelect,
  lang,
}: {
  pkg: ServicePackage
  onSelect: () => void
  lang: Language
}) {
  return (
    <div
      className="relative w-full p-4 rounded-2xl flex flex-col gap-3 transition-all duration-200"
      style={{
        background: pkg.highlighted
          ? 'linear-gradient(135deg, rgba(56,189,248,0.08), rgba(14,31,56,0.9))'
          : 'rgba(14, 31, 56, 0.8)',
        border: pkg.highlighted ? '1px solid rgba(56,189,248,0.4)' : '1px solid #1e3a5f',
        boxShadow: pkg.highlighted ? '0 0 20px rgba(56,189,248,0.1)' : 'none',
      }}
    >
      {/* Recommended badge */}
      {pkg.highlighted && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold"
          style={{ background: '#38bdf8', color: '#060b14' }}
        >
          {t('pkg.recommended', lang)}
        </div>
      )}

      {/* Package name & price */}
      <div className="flex items-start justify-between">
        <div>
          <div className="font-bold text-slate-100 text-base">{t(pkg.nameKey, lang)}</div>
          <div className="text-xs text-slate-500 mt-0.5">{t(pkg.descKey, lang)}</div>
        </div>
        <div className="text-right">
          <div
            className="font-black text-xl"
            style={{ color: pkg.highlighted ? '#38bdf8' : '#e2e8f0' }}
          >
            {formatPrice(pkg.priceRSD)}
          </div>
        </div>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-1">
        {pkg.featureKeys.map((key) => (
          <li key={key} className="flex items-center gap-2 text-xs text-slate-400">
            <span style={{ color: '#10b981' }}>✓</span>
            {t(key, lang)}
          </li>
        ))}
      </ul>

      {/* Select button */}
      <Button
        variant={pkg.highlighted ? 'primary' : 'secondary'}
        size="md"
        fullWidth
        onClick={onSelect}
      >
        {t('pkg.select', lang)}
      </Button>
    </div>
  )
}

export default function PackageScreen() {
  const { language, navigateTo, selectPackage } = useKioskStore()

  function handleSelect(pkgId: string) {
    selectPackage(pkgId)
    navigateTo('payment')
  }

  return (
    <div className="flex-1 flex flex-col px-7 py-8 gap-5 animate-slideUp">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigateTo('drivers')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all"
        >
          ←
        </button>
        <h2 className="text-xl font-bold text-slate-100">{t('pkg.title', language)}</h2>
      </div>

      {/* Packages */}
      <div className="flex-1 flex flex-col gap-4 pt-2">
        {SERVICE_PACKAGES.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onSelect={() => handleSelect(pkg.id)}
            lang={language}
          />
        ))}
      </div>
    </div>
  )
}
