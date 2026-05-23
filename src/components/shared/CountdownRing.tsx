interface Props {
  seconds: number
  total: number
  color?: string
  size?: number
}

export default function CountdownRing({
  seconds,
  total,
  color = '#38bdf8',
  size = 80,
}: Props) {
  const R = (size - 8) / 2
  const circumference = 2 * Math.PI * R
  const progress = seconds / total
  const dashOffset = circumference * (1 - progress)

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={R}
          fill="none"
          stroke="#1e3a5f"
          strokeWidth={4}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dashoffset 0.9s linear', filter: `drop-shadow(0 0 4px ${color})` }}
        />
      </svg>
      <span
        className="absolute text-xl font-bold"
        style={{ color }}
      >
        {seconds}
      </span>
    </div>
  )
}
