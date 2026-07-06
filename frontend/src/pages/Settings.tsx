import { motion } from 'framer-motion';
import { useSettings } from '../store';
import { Settings as SettingsIcon, Calendar, Clock, User, Bell, BookOpen } from 'lucide-react';

export default function SettingsPage() {
  const { settings, updateSettings, prelimsDate, mainsDate, setPrelimsDate, setMainsDate } = useSettings();

  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Manage your preferences and configuration</p>
      </div>

      <div style={{ maxWidth: 700, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Exam Dates */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Calendar size={18} color="var(--color-primary)" /> Exam Dates
          </h2>
          <p style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 16 }}>
            UPSC dates are placeholders. Update when official notification is released — all countdowns will auto-recalculate.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Prelims Date</label>
              <input type="date" value={prelimsDate} onChange={e => setPrelimsDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Mains Date</label>
              <input type="date" value={mainsDate} onChange={e => setMainsDate(e.target.value)} style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>
          </div>
        </div>

        {/* Optional Subject */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <BookOpen size={18} color="#8B5CF6" /> Optional Subject
          </h2>
          <input
            type="text" value={settings.optionalSubjectName}
            onChange={e => updateSettings({ optionalSubjectName: e.target.value })}
            style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }}
          />
        </div>

        {/* Time Settings */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} color="#F97316" /> Time Settings
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Wake Time</label>
              <input type="time" value={settings.wakeTime} onChange={e => updateSettings({ wakeTime: e.target.value })} style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Sleep Time</label>
              <input type="time" value={settings.sleepTime} onChange={e => updateSettings({ sleepTime: e.target.value })} style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Travel (min, each way)</label>
              <input type="number" value={settings.travelMinutesEachWay} onChange={e => updateSettings({ travelMinutesEachWay: Number(e.target.value) })} style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
            </div>
          </div>
        </div>

        {/* Profile */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <User size={18} color="#3B82F6" /> Profile
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Name</label>
              <input type="text" value="Sai Ranadive" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, background: '#F9FAFB', color: '#6B7280', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>UPSC Attempt</label>
              <input type="text" value="CSE 2027 (First Attempt)" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, background: '#F9FAFB', color: '#6B7280', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>College</label>
              <input type="text" value="SIT Pune — B.Tech CSE, Sem V, Div B" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, background: '#F9FAFB', color: '#6B7280', fontFamily: 'inherit' }} />
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>Date of Birth</label>
              <input type="text" value="24 April 2005" readOnly style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, background: '#F9FAFB', color: '#6B7280', fontFamily: 'inherit' }} />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Bell size={18} color="#EF4444" /> Notifications
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#374151' }}>Email Notifications</div>
              <div style={{ fontSize: 12, color: '#9CA3AF' }}>Get daily summary emails</div>
            </div>
            <button
              onClick={() => updateSettings({ notifEmail: !settings.notifEmail })}
              style={{
                width: 48, height: 28, borderRadius: 14, border: 'none', cursor: 'pointer',
                background: settings.notifEmail ? 'var(--color-primary)' : '#D1D5DB',
                position: 'relative', transition: 'background 0.2s',
              }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: '50%', background: 'white',
                position: 'absolute', top: 3,
                left: settings.notifEmail ? 23 : 3,
                transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
              }} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
