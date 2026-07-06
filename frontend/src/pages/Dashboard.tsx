import { useState, useMemo } from 'react';
import { format, addDays, isToday } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useSettings, useStreaks, useSessions, useTasks, useNotes } from '../store';
import { daysUntil, getDayType, getActiveTemplate, categoryColor, categoryBg, minutesDiff, todayStr, generateId, getCurrentDate, formatTime12h } from '../utils';
import { templateBlocks, academicSubjects } from '../data/seedData';
import CountdownCard from '../components/CountdownCard';
import { Flame, TrendingUp, CheckCircle2, Circle, Plus, X, Zap, BookOpen, GraduationCap, Video, Clock, Target, Trash2, StickyNote } from 'lucide-react';

export default function Dashboard() {
  const { prelimsDate, mainsDate } = useSettings();
  const streaks = useStreaks(s => s.streaks);
  const sessions = useSessions(s => s.sessions);
  const updateSession = useSessions(s => s.updateSession);
  const tasks = useTasks(s => s.tasks);
  const addTask = useTasks(s => s.addTask);
  const toggleTask = useTasks(s => s.toggleTask);
  const removeTask = useTasks(s => s.removeTask);
  const { note, setNote } = useNotes();
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newDeadline, setNewDeadline] = useState('');

  const today = getCurrentDate();
  const dayType = getDayType(today);
  const activeTemplate = getActiveTemplate(today);

  const todayBlocks = useMemo(() =>
    templateBlocks
      .filter(b => b.dayType === dayType && b.templateName === activeTemplate)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    [dayType, activeTemplate]
  );

  const nextExam = academicSubjects
    .filter(s => s.examDate && daysUntil(s.examDate) > 0)
    .sort((a, b) => daysUntil(a.examDate!) - daysUntil(b.examDate!))[0];

  const todaySessions = useMemo(() => {
    const existing = sessions.filter(s => s.date === todayStr());
    if (existing.length > 0) return existing;
    return todayBlocks.map(b => ({
      id: `session-${b.id}`,
      date: todayStr(),
      blockLabel: b.label,
      subjectId: null,
      category: b.category,
      plannedMinutes: minutesDiff(b.startTime, b.endTime),
      actualMinutes: 0,
      status: 'pending' as const,
      notes: '',
      startTime: b.startTime,
      endTime: b.endTime,
    }));
  }, [sessions, todayBlocks]);

  const completedCount = todaySessions.filter(s => s.status === 'done').length;
  const completionPct = todaySessions.length > 0 ? Math.round((completedCount / todaySessions.length) * 100) : 0;

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(today, i - today.getDay());
    return { day: format(d, 'EEE')[0], date: d, pct: isToday(d) ? completionPct : Math.floor(Math.random() * 40 + 30), isToday: isToday(d) };
  });

  const todayTasks = tasks.filter(t => t.date === todayStr());

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    addTask({ id: generateId(), date: todayStr(), title: newTask.trim(), category: 'general', status: 'pending', priority: 'medium', deadline: newDeadline || undefined });
    setNewTask('');
    setNewDeadline('');
    setShowAddTask(false);
  };

  const handleToggleSession = (id: string, currentStatus: string) => {
    updateSession(id, { status: currentStatus === 'done' ? 'pending' : 'done', actualMinutes: currentStatus === 'done' ? 0 : undefined });
  };

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      {/* Page Header */}
      <motion.div variants={itemVariants} style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>
          Good {today.getHours() < 12 ? 'Morning' : today.getHours() < 17 ? 'Afternoon' : 'Evening'}, Apurva 👋
        </h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
          {format(today, 'EEEE, dd MMMM yyyy')} · {activeTemplate === 'exam_sprint' ? '🔴 Exam Sprint Mode' : '🔵 Default Mode'}
        </p>
      </motion.div>

      {/* Countdown Row */}
      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 24 }}>
        <CountdownCard targetDate={prelimsDate} label="Days to Prelims" sublabel="UPSC CSE 2027 — Placeholder: 23 May" variant="hero" />
        <CountdownCard targetDate={mainsDate} label="Days to Mains" sublabel="Placeholder: 20 August 2027" />
        {nextExam && (
          <CountdownCard targetDate={nextExam.examDate!} label={`Next: ${nextExam.name}`} sublabel={`Exam on ${format(new Date(nextExam.examDate!), 'dd MMM yyyy')}`} />
        )}
      </motion.div>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Today's Schedule */}
          <motion.div variants={itemVariants} className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Today's Schedule</h2>
                <p style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>{completedCount}/{todaySessions.length} blocks completed</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-primary)' }}>{completionPct}%</div>
              </div>
            </div>
            
            <div style={{ height: 6, background: '#E5E7EB', borderRadius: 999, marginBottom: 20, overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${completionPct}%` }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ height: '100%', background: 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))', borderRadius: 999 }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {todaySessions.filter(s => !['sleep'].includes(s.category)).map((session, i) => (
                <motion.div
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                  onClick={() => handleToggleSession(session.id, session.status)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                    borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s ease',
                    background: session.status === 'done' ? 'var(--color-primary-50)' : categoryBg(session.category),
                    border: `1px solid ${session.status === 'done' ? 'var(--color-primary-100)' : 'transparent'}`,
                    opacity: session.status === 'done' ? 0.7 : 1,
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {session.status === 'done'
                    ? <CheckCircle2 size={20} color="var(--color-primary)" />
                    : <Circle size={20} color={categoryColor(session.category)} />
                  }
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111', textDecoration: session.status === 'done' ? 'line-through' : 'none', transition: 'color 0.2s' }}>
                      {session.blockLabel}
                    </div>
                    <div style={{ fontSize: 11, color: '#9CA3AF' }}>
                      {formatTime12h(session.startTime!)} – {formatTime12h(session.endTime!)} · {session.plannedMinutes} min
                    </div>
                  </div>
                  <div className={`pill pill-${session.category === 'upsc' ? 'green' : session.category === 'academic' ? 'amber' : session.category === 'content' ? 'purple' : 'blue'}`} style={{ fontSize: 10 }}>
                    {session.category}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          
          {/* Quick Tasks */}
          <motion.div variants={itemVariants} className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>Task Manager</h2>
              <button onClick={() => setShowAddTask(!showAddTask)} style={{ background: showAddTask ? '#FEE2E2' : 'var(--color-primary-50)', border: 'none', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: showAddTask ? '#EF4444' : 'var(--color-primary)' }}>
                {showAddTask ? <><X size={14} /> Cancel</> : <><Plus size={14} /> Add Task</>}
              </button>
            </div>
            
            <AnimatePresence>
              {showAddTask && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                    <input autoFocus value={newTask} onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddTask()} placeholder="What needs to be done?" style={{ flex: 1, padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit' }} />
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input type="datetime-local" value={newDeadline} onChange={e => setNewDeadline(e.target.value)} style={{ flex: 1, padding: '10px 14px', border: '1px solid #E5E7EB', borderRadius: 10, fontSize: 14, outline: 'none', fontFamily: 'inherit', color: '#6B7280' }} />
                      <button onClick={handleAddTask} className="btn-primary" style={{ padding: '10px 18px', fontSize: 13 }}>Add</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {todayTasks.length === 0 && !showAddTask && (
              <p style={{ fontSize: 13, color: '#9CA3AF', textAlign: 'center', padding: 20 }}>No tasks pending today!</p>
            )}
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AnimatePresence>
                {todayTasks.map(task => (
                  <motion.div key={task.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0', borderBottom: '1px solid #F3F4F6' }}>
                    <div onClick={() => toggleTask(task.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', flex: 1, gap: 10 }}>
                      {task.status === 'done' ? <CheckCircle2 size={18} color="var(--color-primary)" /> : <Circle size={18} color="#D1D5DB" />}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: 14, color: task.status === 'done' ? '#9CA3AF' : '#374151', textDecoration: task.status === 'done' ? 'line-through' : 'none', transition: 'all 0.2s' }}>{task.title}</span>
                        {task.deadline && (
                          <span style={{ fontSize: 11, color: task.status === 'done' ? '#D1D5DB' : '#EF4444', fontWeight: 600 }}>
                            Due: {format(new Date(task.deadline), 'MMM d, h:mm a')}
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => removeTask(task.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444', opacity: 0.6, display: 'flex', padding: 4 }}>
                      <Trash2 size={16} />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick Notes */}
          <motion.div variants={itemVariants} className="card" style={{ padding: 24, background: '#fffbeb', borderColor: '#fde68a' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#b45309', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <StickyNote size={16} /> Scratchpad
            </h3>
            <textarea 
              value={note} 
              onChange={(e) => setNote(e.target.value)}
              placeholder="Jot down quick thoughts, ideas, or references here..."
              style={{ width: '100%', minHeight: 120, background: 'transparent', border: 'none', resize: 'none', outline: 'none', fontSize: 14, color: '#92400e', fontFamily: 'inherit', lineHeight: 1.5 }}
            />
          </motion.div>

          {/* Pace Status */}
          <motion.div variants={itemVariants} className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 12 }}>Pace Status</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={24} color="var(--color-primary)" />
              </div>
              <div>
                <div className="pill" style={{ background: 'var(--color-primary-100)', color: 'var(--color-primary-dark)' }}>On Pace</div>
                <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>No backlog detected</div>
              </div>
            </div>
          </motion.div>

          {/* Streaks */}
          <motion.div variants={itemVariants} className="card" style={{ padding: 24 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#111', marginBottom: 16 }}>Streaks</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { key: 'upsc', label: 'UPSC Study', icon: BookOpen, color: 'var(--color-primary)' },
                { key: 'academic', label: 'Academics', icon: GraduationCap, color: '#F97316' },
                { key: 'content', label: 'Content', icon: Video, color: '#8B5CF6' },
              ].map(({ key, label, icon: Icon, color }) => {
                const streak = streaks[key];
                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 12, background: '#F9FAFB' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={18} color={color} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{label}</div>
                      <div style={{ fontSize: 11, color: '#9CA3AF' }}>Best: {streak?.longestStreak || 0} days</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Flame size={16} color={color} />
                      <span style={{ fontSize: 18, fontWeight: 800, color }}>{streak?.currentStreak || 0}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
