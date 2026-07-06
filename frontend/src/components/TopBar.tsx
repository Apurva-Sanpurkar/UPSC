import { Menu, Bell, Search } from 'lucide-react';
import { format } from 'date-fns';
import { getCurrentDate } from '../utils';

export default function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const today = getCurrentDate();

  return (
    <div className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button
          onClick={onMenuClick}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, display: 'none' }}
          className="mobile-menu-btn"
        >
          <Menu size={24} color="#374151" />
        </button>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#F3F4F6', borderRadius: 12, padding: '8px 16px', minWidth: 280
        }}>
          <Search size={18} color="#9CA3AF" />
          <input
            placeholder="Search topics, subjects..."
            style={{
              border: 'none', background: 'none', outline: 'none',
              fontSize: 14, color: '#374151', width: '100%',
              fontFamily: 'inherit'
            }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <div style={{ fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
          {format(today, 'EEEE, dd MMMM yyyy')}
        </div>
        <button style={{
          position: 'relative', background: 'none', border: 'none', cursor: 'pointer', padding: 8,
          borderRadius: 10, transition: 'background 0.15s'
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#F3F4F6')}
        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <Bell size={20} color="#6B7280" />
          <div style={{
            position: 'absolute', top: 6, right: 6,
            width: 8, height: 8, borderRadius: '50%',
            background: '#EF4444', border: '2px solid white'
          }} />
        </button>
        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #16A34A, #22C55E)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer'
        }}>SR</div>
      </div>
    </div>
  );
}
