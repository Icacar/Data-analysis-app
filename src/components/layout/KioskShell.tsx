import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function KioskShell({ children }: Props) {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ background: '#060b14' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Kiosk frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: '480px',
          minHeight: '700px',
          maxHeight: '820px',
          background: 'linear-gradient(160deg, #0d1b2e 0%, #0a1628 100%)',
          border: '1px solid #1e3a5f',
          borderRadius: '20px',
          boxShadow: '0 0 60px rgba(56, 189, 248, 0.08), 0 0 120px rgba(0,0,0,0.6)',
        }}
      >
        {/* Top scan line decoration */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-40"
          style={{ background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)' }}
        />

        {/* Content */}
        <div className="flex-1 flex flex-col animate-fadeIn">
          {children}
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between px-5 py-2 text-xs"
          style={{ borderTop: '1px solid #1e3a5f', color: '#334155' }}
        >
          <span>SafeRide Kiosk v1.0</span>
          <span>Safety Driver Engine</span>
        </div>
      </div>
    </div>
  )
}
