import { useEffect, useState } from 'react';
import { liveCountdown } from '../utils';

interface Props {
  targetDate: string;
  label: string;
  sublabel?: string;
  variant?: 'hero' | 'card';
}

export default function CountdownCard({ targetDate, label, sublabel, variant = 'card' }: Props) {
  const [countdown, setCountdown] = useState(liveCountdown(targetDate));

  useEffect(() => {
    const timer = setInterval(() => setCountdown(liveCountdown(targetDate)), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const isHero = variant === 'hero';

  return (
    <div className={isHero ? 'card-hero' : 'card'} style={{ padding: isHero ? '28px 24px' : '20px 24px' }}>
      <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: isHero ? 'rgba(255,255,255,0.7)' : '#6B7280', marginBottom: 12 }}>
        {label}
      </div>
      <div style={{ display: 'flex', gap: isHero ? 16 : 12, alignItems: 'flex-end' }}>
        {[
          { val: countdown.days, unit: 'Days' },
          { val: countdown.hours, unit: 'Hrs' },
          { val: countdown.minutes, unit: 'Min' },
          { val: countdown.seconds, unit: 'Sec' },
        ].map(({ val, unit }) => (
          <div key={unit} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: isHero ? 36 : 28, fontWeight: 800, lineHeight: 1,
              color: isHero ? '#fff' : '#111', letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums'
            }}>
              {String(val).padStart(2, '0')}
            </div>
            <div style={{ fontSize: 11, fontWeight: 500, color: isHero ? 'rgba(255,255,255,0.6)' : '#9CA3AF', marginTop: 4 }}>
              {unit}
            </div>
          </div>
        ))}
      </div>
      {sublabel && (
        <div style={{ marginTop: 12, fontSize: 12, color: isHero ? 'rgba(255,255,255,0.6)' : '#9CA3AF', fontWeight: 500 }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}
