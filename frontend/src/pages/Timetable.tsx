import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { templateBlocks, collegeTimetable } from '../data/seedData';
import { getDayType, getActiveTemplate, categoryColor, categoryBg, minutesDiff, getCurrentDate, formatTime12h } from '../utils';
import { ChevronLeft, ChevronRight, Clock, GraduationCap } from 'lucide-react';
import type { DayType } from '../types';

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function Timetable() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(getCurrentDate().getDay() === 0 ? 6 : getCurrentDate().getDay() - 1);
  const [showCollege, setShowCollege] = useState(true);

  const weekStart = addDays(startOfWeek(getCurrentDate(), { weekStartsOn: 1 }), weekOffset * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const selectedDate = days[selectedDay];
  const dayType: DayType = getDayType(selectedDate);
  const template = getActiveTemplate(selectedDate);
  const dayName = DAY_NAMES[selectedDay];

  const blocks = useMemo(() =>
    templateBlocks
      .filter(b => b.dayType === dayType && b.templateName === template)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    [dayType, template]
  );

  const collegeSlots = useMemo(() =>
    collegeTimetable.filter(s => s.dayOfWeek === dayName),
    [dayName]
  );

  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Timetable</h1>
          <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>
            {template === 'exam_sprint' ? '🔴 Exam Sprint Template' : '🟢 Default Template'} · {format(selectedDate, 'EEEE, dd MMM yyyy')}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowCollege(!showCollege)} style={{ padding: '8px 16px', borderRadius: 10, border: '1px solid #E5E7EB', background: showCollege ? '#DBEAFE' : 'white', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: showCollege ? '#1E40AF' : '#6B7280', display: 'flex', alignItems: 'center', gap: 6 }}>
            <GraduationCap size={16} /> College
          </button>
        </div>
      </div>

      {/* Week Nav */}
      <div className="card" style={{ padding: 16, marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setWeekOffset(w => w - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8 }}>
            <ChevronLeft size={20} color="#6B7280" />
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setSelectedDay(i)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '10px 14px', borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: selectedDay === i ? 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' : 'transparent',
                  color: selectedDay === i ? 'white' : '#374151',
                  transition: 'all 0.15s', minWidth: 48,
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.8 }}>{format(d, 'EEE')}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{format(d, 'd')}</span>
              </button>
            ))}
          </div>
          <button onClick={() => setWeekOffset(w => w + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, borderRadius: 8 }}>
            <ChevronRight size={20} color="#6B7280" />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: showCollege && dayName !== 'Sun' ? '1fr 340px' : '1fr', gap: 20 }}>
        {/* Daily Schedule */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Clock size={18} color="var(--color-primary)" /> Full Day Schedule
          </h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Time</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Duration</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Task</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Category</th>
                </tr>
              </thead>
              <tbody>
                {blocks.map((block, i) => (
                  <tr key={block.id} style={{ 
                    borderBottom: i === blocks.length - 1 ? 'none' : '1px solid #F3F4F6',
                    background: categoryBg(block.category)
                  }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: '#111', whiteSpace: 'nowrap' }}>
                      {formatTime12h(block.startTime)} – {formatTime12h(block.endTime)}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#6B7280' }}>
                      {minutesDiff(block.startTime, block.endTime)} min
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111' }}>
                      {block.label}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div className={`pill pill-${block.category === 'upsc' ? 'green' : block.category === 'academic' ? 'amber' : block.category === 'content' ? 'purple' : 'blue'}`} style={{ fontSize: 10, display: 'inline-flex' }}>
                        {block.category}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* College Timetable */}
        {showCollege && dayName !== 'Sun' && (
          <div className="card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <GraduationCap size={18} color="#3B82F6" /> College Periods
            </h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Time</th>
                  <th style={{ padding: '12px 16px', fontWeight: 600 }}>Class</th>
                </tr>
              </thead>
              <tbody>
                {collegeSlots.map((slot, i) => (
                  <tr key={slot.id} style={{
                    borderBottom: i === collegeSlots.length - 1 ? 'none' : '1px solid #F3F4F6',
                    background: slot.slotType === 'class' ? '#DBEAFE' : slot.slotType === 'lunch' ? '#FEF3C7' : '#F9FAFB'
                  }}>
                    <td style={{ padding: '10px 14px', whiteSpace: 'nowrap' }}>
                      <div style={{ fontWeight: 600, color: '#374151' }}>{formatTime12h(slot.startTime)}</div>
                      <div style={{ fontSize: 10, color: '#9CA3AF' }}>to {formatTime12h(slot.endTime)}</div>
                    </td>
                    <td style={{ padding: '10px 14px', fontWeight: slot.slotType === 'class' ? 700 : 500, color: slot.slotType === 'class' ? '#1E40AF' : '#6B7280' }}>
                      {slot.label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}
