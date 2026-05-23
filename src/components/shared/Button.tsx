import type { ReactNode, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  children: ReactNode
  loading?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-sky-500 hover:bg-sky-400 text-white border border-sky-400/30 shadow-lg shadow-sky-500/20',
  secondary:
    'bg-transparent hover:bg-slate-700/50 text-slate-200 border border-slate-600/50',
  danger:
    'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/40',
  success:
    'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40',
  ghost:
    'bg-transparent hover:bg-white/5 text-slate-400 border border-transparent',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-xl',
  md: 'px-6 py-3 text-base rounded-2xl',
  lg: 'px-8 py-4 text-lg rounded-2xl font-semibold',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  loading = false,
  disabled,
  className = '',
  ...props
}: Props) {
  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-medium transition-all duration-200
        active:scale-95 select-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}
