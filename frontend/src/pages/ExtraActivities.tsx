import { motion } from 'framer-motion';
import { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { useContent } from '../store';
import { generateId, getCurrentDate } from '../utils';
import type { ContentItem, ContentStage } from '../types';
import { Video, Smartphone, MonitorPlay, Plus, GripVertical, Calendar, X } from 'lucide-react';

const STAGES: ContentStage[] = ['idea', 'scripted', 'shot', 'edited', 'published'];
const STAGE_COLORS: Record<ContentStage, { bg: string; text: string }> = {
  idea: { bg: '#FEE2E2', text: '#991B1B' },
  scripted: { bg: '#FEF3C7', text: '#92400E' },
  shot: { bg: '#DBEAFE', text: '#1E40AF' },
  edited: { bg: '#EDE9FE', text: '#5B21B6' },
  published: { bg: '#DCFCE7', text: 'var(--color-primary-dark)' },
};

const SAMPLE_CONTENT: ContentItem[] = [
  { id: 'c1', date: '2026-07-07', contentType: 'reel', title: 'Vidhan Sabha Budget Session Highlights', stage: 'idea', platform: 'Instagram', publishAt: null },
  { id: 'c2', date: '2026-07-08', contentType: 'reel', title: 'Maharashtra Politics Quick Take', stage: 'idea', platform: 'Instagram', publishAt: null },
  { id: 'c3', date: '2026-07-09', contentType: 'reel', title: 'Opposition Response Analysis', stage: 'idea', platform: 'YouTube Shorts', publishAt: null },
  { id: 'c4', date: '2026-07-13', contentType: 'long_video', title: 'Weekly Maharashtra Vidhan Sabha Recap', stage: 'idea', platform: 'YouTube', publishAt: null },
];

export default function ExtraActivities() {
  const { items, addItem, updateItem } = useContent();
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'reel' | 'long_video'>('reel');

  const allItems = items.length > 0 ? items : SAMPLE_CONTENT;
  const weekStart = startOfWeek(getCurrentDate(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    addItem({
      id: generateId(), date: format(getCurrentDate(), 'yyyy-MM-dd'),
      contentType: newType, title: newTitle.trim(), stage: 'idea',
      platform: newType === 'long_video' ? 'YouTube' : 'Instagram', publishAt: null,
    });
    setNewTitle(''); setShowAdd(false);
  };

  const handleStageChange = (id: string, stage: ContentStage) => {
    updateItem(id, { stage });
  };

  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Extra Activities</h1>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Manage your non-academic extra activities</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>
          <Plus size={16} /> New Activity
        </button>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <div className="card" style={{ padding: 20, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Add Activity</h3>
            <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#9CA3AF" /></button>
          </div>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Activity title..." style={{ width: '100%', padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, marginBottom: 10, outline: 'none', fontFamily: 'inherit' }} />
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            {(['reel', 'long_video'] as const).map(t => (
              <button key={t} onClick={() => setNewType(t)} style={{ padding: '8px 16px', borderRadius: 8, border: `1px solid ${newType === t ? 'var(--color-primary)' : '#E5E7EB'}`, background: newType === t ? 'var(--color-primary-50)' : 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: newType === t ? 'var(--color-primary)' : '#6B7280' }}>
                {t === 'reel' ? '📱 Reel/Short' : '🎬 Long Video'}
              </button>
            ))}
          </div>
          <button onClick={handleAdd} className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>Add to Pipeline</button>
        </div>
      )}

      {/* Weekly Calendar */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={18} color="#8B5CF6" /> Weekly Calendar
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
          {weekDays.map(day => {
            const dayStr = format(day, 'yyyy-MM-dd');
            const dayItems = allItems.filter(i => i.date === dayStr);
            const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} key={dayStr} style={{ padding: 12, borderRadius: 12, background: '#F9FAFB', minHeight: 100, border: '1px solid #F3F4F6' }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 8 }}>{format(day, 'EEE d')}</div>
                {dayItems.map(item => (
                  <div key={item.id} style={{ fontSize: 11, padding: '4px 8px', borderRadius: 6, background: item.contentType === 'long_video' ? '#EDE9FE' : '#DBEAFE', color: item.contentType === 'long_video' ? '#5B21B6' : '#1E40AF', marginBottom: 4, fontWeight: 500 }}>
                    {item.contentType === 'long_video' ? '🎬' : '📱'} {item.title.slice(0, 20)}
                  </div>
                ))}
              </motion.div>
  );
})}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16 }}>Pipeline</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, overflowX: 'auto' }}>
          {STAGES.map(stage => {
            const stageItems = allItems.filter(i => i.stage === stage);
            const sc = STAGE_COLORS[stage];
            const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} key={stage} style={{ minWidth: 180 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12, padding: '6px 12px', borderRadius: 8, background: sc.bg }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: sc.text, textTransform: 'capitalize' }}>{stage}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: sc.text, opacity: 0.6 }}>({stageItems.length})</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {stageItems.map(item => (
                    <div key={item.id} className="card" style={{ padding: 14, borderRadius: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                        {item.contentType === 'long_video' ? <MonitorPlay size={14} color="#DC2626" /> : <Smartphone size={14} color="#E1306C" />}
                        <span style={{ fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>{item.platform}</span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#111', marginBottom: 8, lineHeight: 1.4 }}>{item.title}</div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        {STAGES.filter(s => STAGES.indexOf(s) === STAGES.indexOf(item.stage) + 1).map(nextStage => (
                          <button key={nextStage} onClick={() => handleStageChange(item.id, nextStage)} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 6, border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#6B7280' }}>
                            → {nextStage}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
  );
})}
        </div>
      </div>
    </motion.div>
  );
}
