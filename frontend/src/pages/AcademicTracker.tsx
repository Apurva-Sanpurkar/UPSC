import { motion } from 'framer-motion';
import { academicSubjects, sprintWeeks } from '../data/seedData';
import { useAcademics } from '../store';
import { daysUntil, formatDate } from '../utils';
import ProgressRing from '../components/ProgressRing';
import CountdownCard from '../components/CountdownCard';
import { GraduationCap, Calendar, CheckCircle2, Circle } from 'lucide-react';

const UNIT_TOPICS: Record<string, string[][]> = {
  toc: [
    ['Finite Automata & Regular Languages', 'DFA, NFA, ε-NFA', 'Regular Expressions', 'Pumping Lemma', 'Myhill-Nerode Theorem'],
    ['Context-Free Grammars', 'Pushdown Automata', 'Chomsky Normal Form', 'CYK Algorithm', 'Ambiguity'],
    ['Turing Machines', 'Variants of TM', 'Church-Turing Thesis', 'Universal TM', 'Multi-tape TM'],
    ['Undecidability', 'Halting Problem', 'Rice\'s Theorem', 'Post Correspondence', 'Reductions'],
    ['Complexity Theory', 'P vs NP', 'NP-Completeness', 'Cook\'s Theorem', 'Approximation Algorithms'],
  ],
  cn: [
    ['Network Models', 'OSI Model', 'TCP/IP Model', 'Network Topologies', 'Transmission Media'],
    ['Data Link Layer', 'Error Detection', 'Flow Control', 'MAC Protocols', 'Ethernet & IEEE 802'],
    ['Network Layer', 'IP Addressing', 'Subnetting', 'Routing Algorithms', 'OSPF, BGP, RIP'],
    ['Transport Layer', 'TCP', 'UDP', 'Congestion Control', 'Flow Control Mechanisms'],
    ['Application Layer', 'DNS', 'HTTP/HTTPS', 'FTP', 'Network Security Basics'],
  ],
  daa: [
    ['Algorithm Analysis', 'Asymptotic Notations', 'Recurrence Relations', 'Master Theorem', 'Amortised Analysis'],
    ['Divide & Conquer', 'Merge Sort', 'Quick Sort', 'Binary Search', 'Strassen\'s Matrix'],
    ['Greedy Algorithms', 'Activity Selection', 'Huffman Coding', 'Kruskal & Prim', 'Dijkstra'],
    ['Dynamic Programming', 'LCS', 'Knapsack', 'Matrix Chain', 'Floyd-Warshall'],
    ['Backtracking & Branch-Bound', 'N-Queens', 'Graph Coloring', 'Hamiltonian Cycle', 'TSP'],
  ],
  fm: [
    ['Time Value of Money', 'Simple & Compound Interest', 'Annuities', 'Present & Future Value', 'Effective Rate'],
    ['Bonds & Fixed Income', 'Bond Pricing', 'Yield to Maturity', 'Duration & Convexity', 'Credit Risk'],
    ['Portfolio Theory', 'Mean-Variance', 'CAPM', 'Efficient Frontier', 'Diversification'],
    ['Derivatives', 'Options Pricing', 'Black-Scholes', 'Futures & Forwards', 'Risk Management'],
    ['Financial Mathematics Applications', 'Stochastic Models', 'Monte Carlo', 'Risk Measures', 'VaR'],
  ],
};

export default function AcademicTracker() {
  const { unitProgress, toggleUnit } = useAcademics();

  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Academic Tracker</h1>
        <p style={{ fontSize: 14, color: '#6B7280', marginTop: 4 }}>B.Tech CSE Sem-V · 4 Subjects · 5 Units Each</p>
      </div>

      {/* Exam Countdowns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {academicSubjects.map(subj => (
          <CountdownCard key={subj.id} targetDate={subj.examDate!} label={subj.name} sublabel={`Exam: ${formatDate(subj.examDate!)}`} />
        ))}
      </div>

      {/* Subject Cards with Progress */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20, marginBottom: 24 }}>
        {academicSubjects.map(subj => {
          const progress = unitProgress[subj.id] || {};
          const done = Object.values(progress).filter(Boolean).length;
          const pct = (done / 5) * 100;
          const topics = UNIT_TOPICS[subj.id] || [];

          const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} key={subj.id} className="card" style={{ padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                <ProgressRing percentage={pct} size={72} strokeWidth={7} color={pct === 100 ? 'var(--color-primary)' : '#F97316'} />
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#111' }}>{subj.name}</h3>
                  <div style={{ fontSize: 13, color: '#6B7280' }}>{done}/5 units · {daysUntil(subj.examDate!)} days left</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(unit => {
                  const isDone = progress[unit] || false;
                  const unitTopics = topics[unit - 1] || [];
                  const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}
                      key={unit}
                      onClick={() => toggleUnit(subj.id, unit)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                        background: isDone ? 'var(--color-primary-50)' : '#F9FAFB', border: `1px solid ${isDone ? 'var(--color-primary-100)' : '#F3F4F6'}`,
                        transition: 'all 0.15s',
                      }}
                    >
                      {isDone ? <CheckCircle2 size={18} color="var(--color-primary)" /> : <Circle size={18} color="#D1D5DB" />}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: isDone ? '#9CA3AF' : '#111', textDecoration: isDone ? 'line-through' : 'none' }}>
                          Unit {unit}
                        </div>
                        <div style={{ fontSize: 11, color: '#9CA3AF' }}>{unitTopics.join(' · ')}</div>
                      </div>
                    </motion.div>
  );
})}
              </div>
            </motion.div>
  );
})}
      </div>

      {/* Sprint Calendar */}
      <div className="card" style={{ padding: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, color: '#111', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Calendar size={20} color="#F97316" /> Exam Sprint Plan (Oct 15 – Nov 26)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {sprintWeeks.map(week => {
            const isActive = new Date() >= new Date(week.startDate) && new Date() <= new Date(week.endDate);
            const containerVariants: any = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} key={week.week} style={{
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
