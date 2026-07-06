import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { BarChart3, TrendingUp, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSessions } from '../store';
import { format, subDays, startOfWeek, isAfter, parseISO } from 'date-fns';
import { getCurrentDate } from '../utils';

const START_DATE = new Date('2026-07-07T00:00:00');

export default function Analytics() {
  const sessions = useSessions(s => s.sessions);
  const today = getCurrentDate();
  
  // Only count sessions from start date onwards, and that are marked 'done'
  const validSessions = useMemo(() => {
    return sessions.filter(s => 
      s.status === 'done' && 
      (isAfter(parseISO(s.date), START_DATE) || s.date === '2026-07-07')
    );
  }, [sessions]);

  // Compute Weekly Data (Last 7 days)
  const weeklyData = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = subDays(today, i);
      const dateStr = format(d, 'yyyy-MM-dd');
      const daySessions = validSessions.filter(s => s.date === dateStr);
      
      const upscMins = daySessions.filter(s => s.category === 'upsc').reduce((acc, s) => acc + (s.actualMinutes || s.plannedMinutes || 0), 0);
      const acadMins = daySessions.filter(s => s.category === 'academic').reduce((acc, s) => acc + (s.actualMinutes || s.plannedMinutes || 0), 0);
      const contMins = daySessions.filter(s => s.category === 'content').reduce((acc, s) => acc + (s.actualMinutes || s.plannedMinutes || 0), 0);
      
      data.push({
        day: format(d, 'EEE'),
        upsc: Number((upscMins / 60).toFixed(1)),
        academic: Number((acadMins / 60).toFixed(1)),
        content: Number((contMins / 60).toFixed(1))
      });
    }
    return data;
  }, [validSessions, today]);

  // Compute Category Split
  const categoryData = useMemo(() => {
    const categories: Record<string, number> = {
      'UPSC Study': 0, 'Academics': 0, 'Content': 0, 'College': 0, 'Other': 0
    };
    
    validSessions.forEach(s => {
      const hrs = (s.actualMinutes || s.plannedMinutes || 0) / 60;
      if (s.category === 'upsc') categories['UPSC Study'] += hrs;
      else if (s.category === 'academic') categories['Academics'] += hrs;
      else if (s.category === 'content') categories['Content'] += hrs;
      else if (s.category === 'college') categories['College'] += hrs;
      else categories['Other'] += hrs;
    });

    return [
      { name: 'UPSC Study', value: Number(categories['UPSC Study'].toFixed(1)), color: 'var(--color-primary)' },
      { name: 'Academics', value: Number(categories['Academics'].toFixed(1)), color: '#F97316' },
      { name: 'Content', value: Number(categories['Content'].toFixed(1)), color: '#8B5CF6' },
      { name: 'College', value: Number(categories['College'].toFixed(1)), color: '#3B82F6' },
      { name: 'Other', value: Number(categories['Other'].toFixed(1)), color: '#9CA3AF' },
    ].filter(d => d.value > 0);
  }, [validSessions]);

  // Compute Total Hours This Week
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const thisWeekSessions = validSessions.filter(s => isAfter(parseISO(s.date), subDays(weekStart, 1)));
  const thisWeekHours = thisWeekSessions.reduce((acc, s) => acc + (s.actualMinutes || s.plannedMinutes || 0), 0) / 60;
  
  const dailyAvg = thisWeekHours / (today.getDay() === 0 ? 7 : today.getDay());

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
      <motion.div variants={itemVariants} style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Analytics</h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>Track your study patterns and progress (Starting 07-07-2026)</p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
        {[
          { icon: Clock, label: 'This Week', value: `${thisWeekHours.toFixed(1)} hrs`, change: 'Total tracked', color: 'var(--color-primary)' },
          { icon: Target, label: 'Daily Average', value: `${dailyAvg.toFixed(1)} hrs`, change: 'Target: 8 hrs', color: '#3B82F6' },
          { icon: TrendingUp, label: 'Best Week', value: `${thisWeekHours.toFixed(1)} hrs`, change: 'Current Week', color: '#8B5CF6' },
          { icon: BarChart3, label: 'Completion Rate', value: validSessions.length > 0 ? '100%' : '0%', change: 'Based on marked done', color: '#F97316' },
        ].map(({ icon: Icon, label, value, change, color }) => (
          <div key={label} className="card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: label === 'This Week' ? 'var(--color-primary-50)' : `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>{value}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 4 }}>{change}</div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Weekly Breakdown */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 20 }}>Weekly Study Breakdown (Hours)</h2>
          {thisWeekHours === 0 ? (
            <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>No data recorded yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="day" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend />
                <Bar dataKey="upsc" name="UPSC" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="academic" name="Academic" fill="#F97316" radius={[4, 4, 0, 0]} />
                <Bar dataKey="content" name="Content" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Category Split */}
        <div className="card" style={{ padding: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111', marginBottom: 20 }}>All-Time Split</h2>
          {categoryData.length === 0 ? (
            <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>No data recorded yet.</div>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
