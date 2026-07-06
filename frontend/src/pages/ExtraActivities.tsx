import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useActivities } from '../store';
import { generateId, formatDate } from '../utils';
import type { ActivityStage, ActivityCategory, ExtraActivityItem } from '../store';
import { Plus, X, CheckCircle2, Circle, Clock, Tag, Flame, Sparkles, Trash2, ArrowRight } from 'lucide-react';

const STAGES: ActivityStage[] = ['planned', 'in_progress', 'completed'];
const STAGE_LABELS: Record<ActivityStage, string> = {
  planned: '📋 Planned Goals',
  in_progress: '⚡ In Progress',
  completed: '✨ Completed',
};
const STAGE_COLORS: Record<ActivityStage, { bg: string; text: string; border: string }> = {
  planned: { bg: '#FFF1F2', text: '#BE123C', border: '#FFE4E6' },
  in_progress: { bg: '#FFFBEB', text: '#B45309', border: '#FEF3C7' },
  completed: { bg: '#ECFDF5', text: '#047857', border: '#D1FAE5' },
};

const CATEGORIES: ActivityCategory[] = [
  'Club & College', 'Coding & Tech', 'Fitness & Health', 'Hobbies & Art', 'Personal Growth', 'Outings & Fun'
];

const CATEGORY_COLORS: Record<ActivityCategory, { bg: string; text: string }> = {
  'Club & College': { bg: '#EDE9FE', text: '#6D28D9' },
  'Coding & Tech': { bg: '#E0F2FE', text: '#0369A1' },
  'Fitness & Health': { bg: '#DCFCE7', text: '#15803D' },
  'Hobbies & Art': { bg: '#FCE7F3', text: '#BE185D' },
  'Personal Growth': { bg: '#FEF3C7', text: '#B45309' },
  'Outings & Fun': { bg: '#FFEDD5', text: '#C2410C' },
};

export default function ExtraActivities() {
  const { activities, habits, addActivity, updateActivityStage, removeActivity, addHabit, toggleHabit, removeHabit } = useActivities();

  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCat, setNewCat] = useState<ActivityCategory>('Personal Growth');
  const [newPrio, setNewPrio] = useState<'low' | 'medium' | 'high'>('medium');
  const [newDeadline, setNewDeadline] = useState('');

  const [newHabitTitle, setNewHabitTitle] = useState('');
  const [showAddHabit, setShowAddHabit] = useState(false);

  const handleAddActivity = () => {
    if (!newTitle.trim()) return;
    addActivity({
      id: generateId(),
      title: newTitle.trim(),
      category: newCat,
      priority: newPrio,
      stage: 'planned',
      deadline: newDeadline || undefined,
      createdAt: new Date().toISOString().slice(0, 10),
    });
    setNewTitle('');
    setNewDeadline('');
    setShowAdd(false);
  };

  const handleAddHabit = () => {
    if (!newHabitTitle.trim()) return;
    addHabit(newHabitTitle.trim());
    setNewHabitTitle('');
    setShowAddHabit(false);
  };

  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Extra Activities & Growth</h1>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Manage hobbies, VIT clubs, fitness, and productive bus travel habits</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="btn-primary" style={{ padding: '10px 20px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> New Activity / Goal
        </button>
      </div>

      {/* Add Activity Modal / Form */}
      <AnimatePresence>
        {showAdd && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', marginBottom: 24 }}>
            <div className="card" style={{ padding: 22, border: '1px solid var(--color-primary-100)', background: '#FFF1F2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#991B1B', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Sparkles size={18} /> Create New Activity or Goal
                </h3>
                <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#991B1B" /></button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Activity Title (e.g., Prepare AI Club presentation)..." style={{ width: '100%', padding: '10px 14px', border: '1px solid #FDA4AF', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
                
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#881337', display: 'block', marginBottom: 4 }}>Category</label>
                    <select value={newCat} onChange={e => setNewCat(e.target.value as any)} style={{ width: '100%', padding: '8px 12px', border: '1px solid #FDA4AF', borderRadius: 8, fontSize: 13, background: 'white', outline: 'none', fontFamily: 'inherit' }}>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#881337', display: 'block', marginBottom: 4 }}>Priority</label>
                    <div style={{ display: 'flex', gap: 6 }}>
                      {(['low', 'medium', 'high'] as const).map(p => (
                        <button key={p} type="button" onClick={() => setNewPrio(p)} style={{ padding: '6px 12px', borderRadius: 8, border: `1px solid ${newPrio === p ? '#E11D48' : '#FDA4AF'}`, background: newPrio === p ? '#E11D48' : 'white', color: newPrio === p ? 'white' : '#881337', fontSize: 12, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize' }}>
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#881337', display: 'block', marginBottom: 4 }}>Deadline (Optional)</label>
                    <input type="date" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} style={{ padding: '7px 12px', border: '1px solid #FDA4AF', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit', background: 'white', color: '#374151' }} />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
                  <button onClick={handleAddActivity} className="btn-primary" style={{ padding: '10px 24px', fontSize: 13 }}>Add to Goals</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Section: Daily Habits & Commute Checklist + Motivation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        {/* Daily Habits & Commute Tracker */}
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Flame size={18} color="#E11D48" /> Daily Growth & Bus Commute Habits
            </h2>
            <button onClick={() => setShowAddHabit(!showAddHabit)} style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)', border: 'none', padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              <Plus size={14} /> Add Habit
            </button>
          </div>

          <AnimatePresence>
            {showAddHabit && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', marginBottom: 12 }}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input value={newHabitTitle} onChange={e => setNewHabitTitle(e.target.value)} placeholder="Habit (e.g. Listen to UPSC podcast on bus)..." style={{ flex: 1, padding: '8px 12px', border: '1px solid #E5E7EB', borderRadius: 8, fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
                  <button onClick={handleAddHabit} className="btn-primary" style={{ padding: '8px 14px', fontSize: 12 }}>Add</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {habits.map(h => (
              <div
                key={h.id}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 14px', borderRadius: 10,
                  background: h.completedToday ? '#FDF2F8' : '#F9FAFB',
                  border: `1px solid ${h.completedToday ? '#FBCFE8' : '#F3F4F6'}`,
                  transition: 'all 0.15s',
                }}
              >
                <div onClick={() => toggleHabit(h.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, cursor: 'pointer' }}>
                  {h.completedToday ? <CheckCircle2 size={18} color="var(--color-primary)" /> : <Circle size={18} color="#D1D5DB" />}
                  <span style={{ fontSize: 13, fontWeight: 600, color: h.completedToday ? '#9CA3AF' : '#111', textDecoration: h.completedToday ? 'line-through' : 'none' }}>
                    {h.title}
                  </span>
                </div>
                <button onClick={() => removeHabit(h.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', opacity: 0.4, padding: 4 }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation / Bus Travel Tip */}
        <div className="card-hero" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.05em', marginBottom: 12 }}>
              🚌 4-HOUR COMMUTE HACK
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: 'white', lineHeight: 1.3, marginBottom: 8 }}>
              Turn Transit Time Into Power Study
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, marginBottom: 16 }}>
              You spend 2 hours to college & 2 hours back. Use audiobooks, revision lectures, or relaxing podcasts so you stay refreshed and ahead of your classes!
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, background: 'white', color: 'var(--color-primary-dark)', padding: '5px 12px', borderRadius: 8, fontWeight: 700 }}>
                🎧 Audiobooks on Bus
              </span>
              <span style={{ fontSize: 11, background: 'rgba(0,0,0,0.2)', color: 'white', padding: '5px 12px', borderRadius: 8, fontWeight: 600 }}>
                💡 Zero Wasted Hours
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board / Activity Pipeline */}
      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 16 }}>Activity & Goal Board</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {STAGES.map(stage => {
          const stageItems = activities.filter(i => i.stage === stage);
          const sc = STAGE_COLORS[stage];

          return (
            <motion.div key={stage} variants={containerVariants} style={{ background: '#F8FAFC', padding: 16, borderRadius: 16, border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 14px', borderRadius: 10, background: sc.bg, border: `1px solid ${sc.border}` }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: sc.text }}>{STAGE_LABELS[stage]}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: sc.text, background: 'white', padding: '2px 8px', borderRadius: 999 }}>{stageItems.length}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 150 }}>
                {stageItems.length === 0 ? (
                  <div style={{ padding: 24, textAlign: 'center', color: '#94A3B8', fontSize: 13, border: '1px dashed #CBD5E1', borderRadius: 12 }}>
                    No activities here yet
                  </div>
                ) : (
                  stageItems.map(item => {
                    const catCol = CATEGORY_COLORS[item.category] || { bg: '#F3F4F6', text: '#374151' };
                    const nextStage: ActivityStage | null = stage === 'planned' ? 'in_progress' : stage === 'in_progress' ? 'completed' : null;

                    return (
                      <div key={item.id} className="card" style={{ padding: 16, borderRadius: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.03)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                          <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 6, background: catCol.bg, color: catCol.text }}>
                            {item.category}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: item.priority === 'high' ? '#FEE2E2' : item.priority === 'medium' ? '#FEF3C7' : '#E0F2FE', color: item.priority === 'high' ? '#991B1B' : item.priority === 'medium' ? '#92400E' : '#0369A1', textTransform: 'uppercase' }}>
                              {item.priority}
                            </span>
                            <button onClick={() => removeActivity(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', opacity: 0.5, padding: 2 }}>
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>

                        <div style={{ fontSize: 14, fontWeight: 700, color: '#111', marginBottom: 10, lineHeight: 1.4 }}>
                          {item.title}
                        </div>

                        {item.deadline && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#64748B', marginBottom: 12, background: '#F1F5F9', padding: '4px 8px', borderRadius: 6, width: 'fit-content' }}>
                            <Clock size={12} color="#E11D48" /> Due: {formatDate(item.deadline)}
                          </div>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 6, borderTop: '1px solid #F1F5F9', paddingTop: 10, marginTop: 4 }}>
                          {stage !== 'planned' && (
                            <button onClick={() => updateActivityStage(item.id, 'planned')} style={{ fontSize: 11, padding: '5px 10px', borderRadius: 6, border: '1px solid #E2E8F0', background: 'white', cursor: 'pointer', fontWeight: 600, color: '#64748B' }}>
                              ← Planned
                            </button>
                          )}
                          {nextStage && (
                            <button onClick={() => updateActivityStage(item.id, nextStage)} style={{ fontSize: 11, padding: '5px 12px', borderRadius: 6, border: 'none', background: 'var(--color-primary-50)', cursor: 'pointer', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: 4 }}>
                              Move to {STAGE_LABELS[nextStage].replace(/^[^\s]+\s/, '')} <ArrowRight size={12} />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
