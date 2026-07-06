import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { daysUntil } from '../utils';
import { useSettings } from '../store';
import { ArrowRight, Target, Clock, Calendar, Rocket, BookOpen, Video, ShieldCheck } from 'lucide-react';

export default function Landing() {
  const { prelimsDate } = useSettings();
  const prelimsDays = daysUntil(prelimsDate);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--color-ink-950)', color: 'white', overflow: 'hidden', position: 'relative' }}>
      
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(0,149,255,0.15) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(255,166,0,0.1) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: 'relative', zIndex: 10, padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Target size={24} color="white" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>Mission 2027</span>
        </div>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 24px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            Access Dashboard
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <main style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100dvh - 88px)', padding: '0 24px', textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ maxWidth: 900, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          <motion.div variants={itemVariants} style={{ padding: '6px 16px', borderRadius: 999, background: 'rgba(0,149,255,0.1)', border: '1px solid rgba(0,149,255,0.3)', color: 'var(--color-primary-100)', fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 32, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Rocket size={14} /> The Ultimate Command Center
          </motion.div>

          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(48px, 6vw, 84px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Zero Distractions.<br/>
            <span style={{ background: 'linear-gradient(to right, #0095ff, #33aaff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Absolute Focus.</span>
          </motion.h1>

          <motion.p variants={itemVariants} style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: '#9CA3AF', maxWidth: 600, lineHeight: 1.6, marginBottom: 48 }}>
            The personal operating system for Sai Ranadive. Merging UPSC 2027 preparation, B.Tech Academics, and Content Creation into one unified, real-time schedule.
          </motion.p>

          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 80 }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '16px 36px', borderRadius: 16, background: 'var(--color-primary)', color: 'white', fontSize: 16, fontWeight: 600, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 8px 32px rgba(0,149,255,0.4)', transition: 'transform 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Enter Command Center <ArrowRight size={18} />
              </button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 24, minWidth: 280 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(0,149,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={32} color="var(--color-primary)" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Days to Prelims</div>
                <div style={{ fontSize: 36, fontWeight: 800, color: 'white', lineHeight: 1 }}>{prelimsDays}</div>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: '24px 32px', display: 'flex', alignItems: 'center', gap: 24, minWidth: 280 }}>
              <div style={{ width: 64, height: 64, borderRadius: 20, background: 'rgba(255,166,0,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={32} color="var(--color-accent-500)" />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 14, color: '#9CA3AF', fontWeight: 500, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>System Status</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: 'white', lineHeight: 1.2 }}>Operational</div>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
