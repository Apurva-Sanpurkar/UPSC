import { motion } from 'framer-motion';
import { useState } from 'react';
import { upscPhases, upscSubjects, sampleMicroTopics } from '../data/seedData';
import { useTopics, useSettings } from '../store';
import { daysUntil } from '../utils';
import ProgressRing from '../components/ProgressRing';
import { BookOpen, ChevronDown, ChevronRight, CheckCircle2, Circle, ExternalLink } from 'lucide-react';

export default function UPSCTracker() {
  const { prelimsDate, mainsDate } = useSettings();
  const { topicStatuses, setTopicStatus } = useTopics();
  const [expandedSubject, setExpandedSubject] = useState<string | null>('polity');
  const [expandedPhase, setExpandedPhase] = useState<number | null>(1);

  const totalTopics = sampleMicroTopics.length;
  const doneTopics = sampleMicroTopics.filter(t => (topicStatuses[t.id] || t.status) === 'done').length;
  const overallPct = totalTopics > 0 ? Math.round((doneTopics / totalTopics) * 100) : 0;

  const subjectGroups = upscSubjects.reduce((acc, subj) => {
    const topics = sampleMicroTopics.filter(t => t.subjectId === subj.id);
    const done = topics.filter(t => (topicStatuses[t.id] || t.status) === 'done').length;
    acc[subj.id] = { subject: subj, topics, done, total: topics.length };
    return acc;
  }, {} as Record<string, { subject: typeof upscSubjects[0]; topics: typeof sampleMicroTopics; done: number; total: number }>);

  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>UPSC Tracker</h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
          CSE 2027 · {daysUntil(prelimsDate)} days to Prelims · {daysUntil(mainsDate)} days to Mains
        </p>
      </div>

      {/* Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="card-hero" style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
          <ProgressRing percentage={overallPct} size={80} color="var(--color-primary-light)" />
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.6)' }}>Overall Progress</div>
            <div style={{ fontSize: 32, fontWeight: 800, marginTop: 4 }}>{doneTopics}/{totalTopics}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>topics completed</div>
          </div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Optional Subject</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#111', marginTop: 8 }}>Public Administration</div>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>Paper I + Paper II</div>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Answer Writing</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#111', marginTop: 8 }}>0 / day</div>
          <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>Target: 3 (Phase 1–6) → 15+ (Phase 9)</div>
        </div>
      </div>

      {/* Phase Roadmap */}
      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 16 }}>Macro Roadmap</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {upscPhases.map(phase => {
            const isActive = new Date() >= new Date(phase.startDate) && new Date() <= new Date(phase.endDate);
            const isPast = new Date() > new Date(phase.endDate);
            const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} key={phase.phase}>
                <div
                  onClick={() => setExpandedPhase(expandedPhase === phase.phase ? null : phase.phase)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 12, cursor: 'pointer',
                    background: isActive ? 'var(--color-primary-50)' : isPast ? '#F9FAFB' : 'transparent',
                    border: isActive ? '1px solid var(--color-primary-100)' : '1px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: isActive ? 'var(--color-primary)' : isPast ? '#D1D5DB' : '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 13, fontWeight: 700 }}>
                    {phase.phase}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{phase.calendarWindow}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>
                      {phase.morningSubject}{phase.eveningSubject !== '—' ? ` + ${phase.eveningSubject}` : ''}
                    </div>
                  </div>
                  <div className={`pill ${isActive ? 'pill-green' : isPast ? 'pill-blue' : 'pill-amber'}`}>
                    {isActive ? 'Active' : isPast ? 'Done' : 'Upcoming'}
                  </div>
                  {expandedPhase === phase.phase ? <ChevronDown size={16} color="#9CA3AF" /> : <ChevronRight size={16} color="#9CA3AF" />}
                </div>
                {expandedPhase === phase.phase && (
                  <div style={{ padding: '8px 16px 8px 60px', fontSize: 13, color: '#6B7280', lineHeight: 1.6 }}>
                    <p><strong>Morning:</strong> {phase.morningSubject}</p>
                    <p><strong>Evening:</strong> {phase.eveningSubject}</p>
                    <p><strong>Days:</strong> {phase.microPlannerDays}</p>
                    {phase.notes && <p><strong>Note:</strong> {phase.notes}</p>}
                  </div>
                )}
              </motion.div>
  );
})}
        </div>
      </div>

      {/* Subject-wise Topics */}
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 16 }}>Subject-wise Micro Topics</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {Object.values(subjectGroups).filter(g => g.total > 0).map(({ subject, topics, done, total }) => (
            <div key={subject.id}>
              <div
                onClick={() => setExpandedSubject(expandedSubject === subject.id ? null : subject.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderRadius: 12, cursor: 'pointer', background: '#F9FAFB', transition: 'all 0.15s' }}
              >
                <BookOpen size={18} color="var(--color-primary)" />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#111' }}>{subject.name}</div>
                  <div style={{ fontSize: 12, color: '#9CA3AF' }}>{done}/{total} days completed</div>
                </div>
                <div style={{ width: 60, height: 6, background: '#E5E7EB', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${total > 0 ? (done / total) * 100 : 0}%`, background: 'var(--color-primary)', borderRadius: 999 }} />
                </div>
                {expandedSubject === subject.id ? <ChevronDown size={16} color="#9CA3AF" /> : <ChevronRight size={16} color="#9CA3AF" />}
              </div>
              {expandedSubject === subject.id && (
                <div style={{ padding: '8px 0 8px 48px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {topics.map(topic => {
                    const status = topicStatuses[topic.id] || topic.status;
                    const isDone = status === 'done';
                    const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} key={topic.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', borderRadius: 10, background: isDone ? 'var(--color-primary-50)' : 'white', border: '1px solid #F3F4F6' }}>
                        <button onClick={() => setTopicStatus(topic.id, isDone ? 'pending' : 'done')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginTop: 1 }}>
                          {isDone ? <CheckCircle2 size={18} color="var(--color-primary)" /> : <Circle size={18} color="#D1D5DB" />}
                        </button>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: isDone ? '#9CA3AF' : '#111', textDecoration: isDone ? 'line-through' : 'none' }}>
                            Day {topic.dayNumber}: {topic.title}
                          </div>
                          <div style={{ fontSize: 11, color: '#9CA3AF', marginTop: 4 }}>
                            {topic.subtopics.slice(0, 4).join(' · ')}{topic.subtopics.length > 4 ? ` +${topic.subtopics.length - 4} more` : ''}
                          </div>
                          {topic.resources.length > 0 && (
                            <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                              {topic.resources.map(r => (
                                <span key={r} style={{ fontSize: 10, padding: '2px 8px', borderRadius: 6, background: '#F3F4F6', color: '#6B7280', display: 'flex', alignItems: 'center', gap: 3 }}>
                                  <ExternalLink size={10} /> {r}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
  );
})}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
