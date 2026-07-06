interface Props {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
  sublabel?: string;
}

export default function ProgressRing({ percentage, size = 100, strokeWidth = 8, color = '#16A34A', label, sublabel }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle className="progress-ring-bg" cx={size/2} cy={size/2} r={radius} strokeWidth={strokeWidth} />
          <circle
            className="progress-ring-fill"
            cx={size/2} cy={size/2} r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: size * 0.22, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>
            {Math.round(percentage)}%
          </span>
        </div>
      </div>
      {label && <div style={{ fontSize: 13, fontWeight: 600, color: '#111', textAlign: 'center' }}>{label}</div>}
      {sublabel && <div style={{ fontSize: 11, color: '#9CA3AF', textAlign: 'center' }}>{sublabel}</div>}
    </div>
  );
}
