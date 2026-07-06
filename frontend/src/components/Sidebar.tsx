import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store';
import { LayoutDashboard, Calendar, BookOpen, GraduationCap, Video, BarChart3, Settings, LogOut, Target, X } from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/timetable', icon: Calendar, label: 'Timetable' },
  { to: '/upsc', icon: BookOpen, label: 'UPSC Tracker' },
  { to: '/academics', icon: GraduationCap, label: 'Academics' },
  { to: '/content', icon: Video, label: 'Extra Activities' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const logout = useAuth(s => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div style={{ padding: '24px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Target size={22} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#111', letterSpacing: '-0.02em' }}>Mission 2027</div>
            <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 500 }}>Command Center</div>
          </div>
        </div>
        <button onClick={onClose} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
          <X size={20} color="#6B7280" />
        </button>
      </div>

      {/* Nav Items */}
      <div style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onClose}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '11px 16px', borderRadius: 12,
              textDecoration: 'none', fontSize: 14, fontWeight: 500,
              color: isActive ? 'var(--color-primary)' : '#374151',
              background: isActive ? 'var(--color-primary-50)' : 'transparent',
              borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
              transition: 'all 0.15s ease',
            })}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* User + Logout */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px', marginBottom: 8 }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: 700, fontSize: 14
          }}>AS</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, color: '#111' }}>Apurva Sanpurkar</div>
            <div style={{ fontSize: 11, color: '#9CA3AF' }}>UPSC CSE 2027</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            width: '100%', padding: '11px 16px', borderRadius: 12,
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 14, fontWeight: 500, color: '#EF4444',
            transition: 'background 0.15s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#FEE2E2')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
