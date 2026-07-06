import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { sprintWeeks } from '../data/seedData';
import { useAcademics } from '../store';
import { daysUntil, formatDate, generateId } from '../utils';
import ProgressRing from '../components/ProgressRing';
import CountdownCard from '../components/CountdownCard';
import { GraduationCap, Calendar, CheckCircle2, Circle, Plus, Trash2, X, BookOpen } from 'lucide-react';

export default function AcademicTracker() {
  const { subjects, units, unitProgress, toggleUnit, addSubject, removeSubject, addUnit, removeUnit } = useAcademics();

  const [showAddSubj, setShowAddSubj] = useState(false);
  const [newSubjName, setNewSubjName] = useState('');
  const [newSubjDate, setNewSubjDate] = useState('');

  const [activeAddUnitSubj, setActiveAddUnitSubj] = useState<string | null>(null);
  const [newUnitTitle, setNewUnitTitle] = useState('');
  const [newUnitTopics, setNewUnitTopics] = useState('');

  const handleAddSubject = () => {
    if (!newSubjName.trim()) return;
    addSubject({
      id: generateId(),
      type: 'academic',
      name: newSubjName.trim(),
      examDate: newSubjDate || '2026-11-30',
      totalUnits: 5,
    });
    setNewSubjName('');
    setNewSubjDate('');
    setShowAddSubj(false);
  };

  const handleAddUnit = (subjectId: string) => {
    if (!newUnitTitle.trim()) return;
    const topicsList = newUnitTopics
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);
    addUnit(subjectId, newUnitTitle.trim(), topicsList.length > 0 ? topicsList : ['General Study']);
    setNewUnitTitle('');
    setNewUnitTopics('');
    setActiveAddUnitSubj(null);
  };

  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Academic Tracker</h1>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>VIT Kondhwa Campus · B.Tech AI & DS 3rd Year · Editable Syllabus</p>
        </div>
        <button onClick={() => setShowAddSubj(true)} className="btn-primary" style={{ padding: '10px 18px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={16} /> Add Course
        </button>
      </div>

      {/* Add Subject Modal / Form */}
      <AnimatePresence>
        {showAddSubj && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', marginBottom: 20 }}>
            <div className="card" style={{ padding: 20, border: '1px solid var(--color-primary-100)', background: '#FFF1F2' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#991B1B' }}>Add New College Course</h3>
                <button onClick={() => setShowAddSubj(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} color="#991B1B" /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 200px auto', gap: 10, alignItems: 'center' }}>
                <input value={newSubjName} onChange={e => setNewSubjName(e.target.value)} placeholder="Course Name (e.g., Deep Learning)..." style={{ padding: '10px 14px', border: '1px solid #FDA4AF', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
                <input type="date" value={newSubjDate} onChange={e => setNewSubjDate(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #FDA4AF', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: '#374151' }} />
                <button onClick={handleAddSubject} className="btn-primary" style={{ padding: '10px 20px', fontSize: 13 }}>Save Course</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exam Countdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {subjects.map(subj => (
          <CountdownCard key={subj.id} targetDate={subj.examDate!} label={subj.name} sublabel={`Exam: ${formatDate(subj.examDate!)}`} />
        ))}
      </div>

      {/* Subject Cards with Progress */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 20, marginBottom: 24 }}>
        {subjects.map(subj => {
          const progress = unitProgress[subj.id] || {};
          const subjUnits = units[subj.id] || [];
          const totalUnitsCount = subjUnits.length || 1;
          const done = subjUnits.filter(u => progress[u.unitNumber]).length;
          const pct = Math.round((done / totalUnitsCount) * 100);

          return (
            <motion.div key={subj.id} variants={containerVariants} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <ProgressRing percentage={pct} size={72} strokeWidth={7} color={pct === 100 ? 'var(--color-primary)' : '#F97316'} />
                    <div>
                      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#111' }}>{subj.name}</h3>
                      <div style={{ fontSize: 13, color: '#6B7280', marginTop: 2 }}>
                        {done}/{totalUnitsCount} units · {daysUntil(subj.examDate!)} days left
                      </div>
                    </div>
                  </div>
                  <button onClick={() => removeSubject(subj.id)} title="Delete Course" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', opacity: 0.6, padding: 6 }}>
                    <Trash2 size={18} />
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {subjUnits.map(u => {
                    const isDone = progress[u.unitNumber] || false;
                    return (
                      <div
                        key={u.unitNumber}
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 14px', borderRadius: 12,
                          background: isDone ? 'var(--color-primary-50)' : '#F9FAFB',
                          border: `1px solid ${isDone ? 'var(--color-primary-100)' : '#F3F4F6'}`,
                          transition: 'all 0.15s',
                        }}
                      >
                        <div onClick={() => toggleUnit(subj.id, u.unitNumber)} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, cursor: 'pointer' }}>
                          {isDone ? <CheckCircle2 size={18} color="var(--color-primary)" /> : <Circle size={18} color="#D1D5DB" />}
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: isDone ? '#9CA3AF' : '#111', textDecoration: isDone ? 'line-through' : 'none' }}>
                              Unit {u.unitNumber}: {u.title}
                            </div>
                            <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 3 }}>
                              {u.topics.join(' · ')}
                            </div>
                          </div>
                        </div>
                        <button onClick={() => removeUnit(subj.id, u.unitNumber)} title="Delete Unit" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', opacity: 0.4, padding: 4 }}>
                          <X size={15} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add Unit Section */}
              {activeAddUnitSubj === subj.id ? (
                <div style={{ padding: 14, borderRadius: 12, background: '#F8FAFC', border: '1px dashed #CBD5E1', marginTop: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>Add Syllabus Unit / Topic</span>
                    <button onClick={() => setActiveAddUnitSubj(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={14} color="#64748B" /></button>
                  </div>
                  <input value={newUnitTitle} onChange={e => setNewUnitTitle(e.target.value)} placeholder="Unit Title (e.g., Deep Learning Basics)..." style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 13, marginBottom: 8, outline: 'none', fontFamily: 'inherit' }} />
                  <input value={newUnitTopics} onChange={e => setNewUnitTopics(e.target.value)} placeholder="Topics (comma separated: CNNs, RNNs, Backprop)..." style={{ width: '100%', padding: '8px 12px', border: '1px solid #CBD5E1', borderRadius: 8, fontSize: 12, marginBottom: 10, outline: 'none', fontFamily: 'inherit' }} />
                  <button onClick={() => handleAddUnit(subj.id)} className="btn-primary" style={{ width: '100%', padding: '8px', fontSize: 12 }}>Add Unit</button>
                </div>
              ) : (
                <button
                  onClick={() => { setActiveAddUnitSubj(subj.id); setNewUnitTitle(''); setNewUnitTopics(''); }}
                  style={{ width: '100%', padding: '10px', borderRadius: 10, border: '1px dashed #CBD5E1', background: 'white', color: '#64748B', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#64748B'; }}
                >
                  <Plus size={15} /> Add Unit / Syllabus Topic
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Sprint Calendar */}
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={20} color="#F97316" /> Exam Sprint Plan (Oct 15 – Nov 28)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sprintWeeks.map(week => {
            const isActive = new Date() >= new Date(week.startDate) && new Date() <= new Date(week.endDate);
            return (
              <motion.div key={week.week} variants={containerVariants} style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12,
                background: isActive ? '#FFF7ED' : '#F9FAFB', border: isActive ? '1px solid #FDBA74' : '1px solid transparent',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: isActive ? '#F97316' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>
                  W{week.week}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{week.focus}</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>{week.dates}</div>
                </div>
                {isActive && <div className="pill pill-amber">Active</div>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
