import type { RiskLevel } from '../../types'
import { RISK_COLORS } from '../../utils/riskLevel'
import { formatPromille } from '../../utils/formatters'

interface Props {
  value: number
  riskLevel: RiskLevel
  animated?: boolean
}

export default function PromilleGauge({ value, riskLevel, animated = true }: Props) {
  const MAX = 2.0
  const clamped = Math.min(value, MAX)
  const pct = clamped / MAX

  const W = 220
  const CX = W / 2
  const CY = W / 2
  const R = 88
  const STROKE = 14
  const GAP = Math.PI * 0.28

  const startAngle = Math.PI + GAP / 2
  const endAngle = 2 * Math.PI + Math.PI - GAP / 2
  const totalArc = endAngle - startAngle

  const arcX = (angle: number, r: number) => CX + r * Math.cos(angle)
  const arcY = (angle: number, r: number) => CY + r * Math.sin(angle)

  const describeArc = (from: number, to: number, r: number) => {
    const large = to - from > Math.PI ? 1 : 0
    return [
      `M ${arcX(from, r)} ${arcY(from, r)}`,
      `A ${r} ${r} 0 ${large} 1 ${arcX(to, r)} ${arcY(to, r)}`,
    ].join(' ')
  }

  // Zone boundaries on arc
  const safeEnd = startAngle + totalArc * (0.2 / MAX)
  const cautionEnd = startAngle + totalArc * (0.5 / MAX)
  const valueAngle = startAngle + totalArc * pct

  const color = RISK_COLORS[riskLevel]

  // Needle
  const needleLength = R - STROKE / 2 - 4
  const needleX = arcX(valueAngle, needleLength)
  const needleY = arcY(valueAngle, needleLength)

  return (
    <div className="flex flex-col items-center">
      <svg
        width={W}
        height={W * 0.75}
        viewBox={`0 0 ${W} ${W}`}
        style={{ overflow: 'visible' }}
      >
        {/* Track */}
        <path
          d={describeArc(startAngle, endAngle, R)}
          fill="none"
          stroke="#1e3a5f"
          strokeWidth={STROKE}
          strokeLinecap="round"
        />

        {/* Safe zone */}
        <path
          d={describeArc(startAngle, safeEnd, R)}
          fill="none"
          stroke="#10b981"
          strokeWidth={STROKE}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* Caution zone */}
        <path
          d={describeArc(safeEnd, cautionEnd, R)}
          fill="none"
          stroke="#f59e0b"
          strokeWidth={STROKE}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* Danger zone */}
        <path
          d={describeArc(cautionEnd, endAngle, R)}
          fill="none"
          stroke="#ef4444"
          strokeWidth={STROKE}
          strokeLinecap="round"
          opacity={0.5}
        />

        {/* Value arc (filled up to current value) */}
        {pct > 0.01 && (
          <path
            d={describeArc(startAngle, Math.min(valueAngle, endAngle - 0.01), R)}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            style={{
              filter: `drop-shadow(0 0 6px ${color})`,
              transition: animated ? 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }}
          />
        )}

        {/* Legal limit tick at 0.2‰ */}
        {(() => {
          const limitAngle = startAngle + totalArc * (0.2 / MAX)
          return (
            <>
              <line
                x1={arcX(limitAngle, R - STROKE / 2 - 8)}
                y1={arcY(limitAngle, R - STROKE / 2 - 8)}
                x2={arcX(limitAngle, R + STROKE / 2 + 8)}
                y2={arcY(limitAngle, R + STROKE / 2 + 8)}
                stroke="#ffffff"
                strokeWidth={2}
                opacity={0.5}
              />
              <text
                x={arcX(limitAngle, R + 26)}
                y={arcY(limitAngle, R + 26)}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                fontFamily="Inter, sans-serif"
              >
                0.2‰
              </text>
            </>
          )
        })()}

        {/* Needle */}
        <line
          x1={CX}
          y1={CY}
          x2={needleX}
          y2={needleY}
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
            transition: animated ? 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
          }}
        />
        <circle cx={CX} cy={CY} r={6} fill={color} />

        {/* Center value display */}
        <text
          x={CX}
          y={CY + 28}
          textAnchor="middle"
          fill={color}
          fontSize="32"
          fontWeight="800"
          fontFamily="Inter, sans-serif"
          style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
        >
          {formatPromille(value)}
        </text>
        <text
          x={CX}
          y={CY + 44}
          textAnchor="middle"
          fill="#64748b"
          fontSize="12"
          fontFamily="Inter, sans-serif"
        >
          ‰ promile
        </text>

        {/* Min / Max labels */}
        <text
          x={arcX(startAngle, R + 18)}
          y={arcY(startAngle, R + 18)}
          textAnchor="middle"
          fill="#334155"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          0.0
        </text>
        <text
          x={arcX(endAngle, R + 18)}
          y={arcY(endAngle, R + 18)}
          textAnchor="middle"
          fill="#334155"
          fontSize="10"
          fontFamily="Inter, sans-serif"
        >
          2.0
        </text>
      </svg>
    </div>
  )
}
