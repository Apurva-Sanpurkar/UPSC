import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { daysUntil } from '../utils';
import { useSettings } from '../store';
import { ArrowRight, Sparkles, Clock, GraduationCap, Flame, Compass, Heart, ShieldCheck } from 'lucide-react';

export default function Landing() {
  const { prelimsDate } = useSettings();
  const prelimsDays = daysUntil(prelimsDate);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 15 } }
  };

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: '#130910', color: 'white', overflow: 'hidden', position: 'relative', fontFamily: 'inherit' }}>
      
      {/* Ambient Petal-Rouge & Peach Glowing Orbs */}
      <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(244, 63, 94, 0.22) 0%, transparent 70%)', filter: 'blur(90px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', right: '-15%', width: '65vw', height: '65vw', background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, transparent 70%)', filter: 'blur(100px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', zIndex: 0 }} />

      {/* Navigation Bar */}
      <nav style={{ position: 'relative', zIndex: 10, padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1300, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 42, height: 42, borderRadius: 14, background: 'linear-gradient(135deg, #F43F5E, #FB7185)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(244, 63, 94, 0.4)' }}>
            <Sparkles size={22} color="white" />
          </div>
          <div>
            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(to right, #FFF, #FECDD3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Mission 2027</span>
            <div style={{ fontSize: 11, color: '#FDA4AF', fontWeight: 600, letterSpacing: '0.05em' }}>APURVA SANPURKAR · VIT KONDHWA</div>
          </div>
        </div>
        <Link to="/login" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '10px 24px', borderRadius: 999, background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(255, 255, 255, 0.18)', color: 'white', fontWeight: 600, fontSize: 14, cursor: 'pointer', backdropFilter: 'blur(12px)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(244, 63, 94, 0.25)'; e.currentTarget.style.borderColor = '#F43F5E'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)'; }}
          >
            Access Dashboard <ArrowRight size={16} />
          </button>
        </Link>
      </nav>

      {/* Hero Section */}
      <main style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100dvh - 90px)', padding: '20px 24px 60px', textAlign: 'center', maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial="hidden" animate="visible" variants={containerVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {/* Top Badge */}
          <motion.div variants={itemVariants} style={{ padding: '8px 20px', borderRadius: 999, background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.35)', color: '#FDA4AF', fontSize: 13, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 28, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 20px rgba(244, 63, 94, 0.15)' }}>
            🌸 B.TECH AI & DS 3RD YEAR · PERSONALIZED ECOSYSTEM
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={itemVariants} style={{ fontSize: 'clamp(44px, 5.5vw, 76px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 24, maxWidth: 900 }}>
            Empowered Focus.<br/>
            <span style={{ background: 'linear-gradient(135deg, #FF80B5 0%, #FF99C8 40%, #F43F5E 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Unstoppable Ambition.</span>
          </motion.h1>

          {/* Description */}
          <motion.p variants={itemVariants} style={{ fontSize: 'clamp(17px, 1.8vw, 20px)', color: '#D1D5DB', maxWidth: 680, lineHeight: 1.65, marginBottom: 44, fontWeight: 400 }}>
            The bespoke digital sanctuary designed for <strong style={{ color: '#FFF', fontWeight: 600 }}>Apurva Sanpurkar</strong>. Master your B.Tech AI & DS curriculum at VIT Kondhwa, transform your 4-hour bus commute into high-impact study windows, and track your personal aspirations with grace and precision.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} style={{ marginBottom: 64 }}>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '18px 42px', borderRadius: 999, background: 'linear-gradient(135deg, #F43F5E, #E11D48)', color: 'white', fontSize: 17, fontWeight: 700, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12, boxShadow: '0 10px 35px rgba(244, 63, 94, 0.45)', transition: 'all 0.25s' }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 15px 40px rgba(244, 63, 94, 0.6)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 35px rgba(244, 63, 94, 0.45)'; }}
              >
                Open Apurva's Command Center <ArrowRight size={20} />
              </button>
            </Link>
          </motion.div>

          {/* Feature Highlights Cards */}
          <motion.div variants={itemVariants} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, width: '100%', marginBottom: 50 }}>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: '28px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FB7185' }}>
                <GraduationCap size={26} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>AI & DS Academic Tracker</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.5 }}>
                Dynamic syllabus management for AI, ML, IoT, SP, and DT. Track unit-wise completion, exam countdowns, and college labs seamlessly.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: '28px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(251, 146, 60, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FDBA74' }}>
                <Compass size={26} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>4-Hour Commute Optimizer</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.5 }}>
                Turn your daily 4-hour bus transit into effortless progress with curated audiobook windows, revision podcasts, and relaxing routines.
              </p>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.08)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: '28px 24px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(236, 72, 153, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F472B6' }}>
                <Heart size={26} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'white' }}>Personal Growth & Goals</h3>
              <p style={{ fontSize: 14, color: '#9CA3AF', lineHeight: 1.5 }}>
                An interactive goal board and daily habit checklist for hobbies, VIT clubs, fitness, and self-care. Balance ambition with well-being.
              </p>
            </div>

          </motion.div>

          {/* Bottom Stats Banner */}
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', padding: '20px 40px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: 20, border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Clock size={20} color="#FB7185" />
              <span style={{ fontSize: 14, color: '#D1D5DB' }}>UPSC 2027 Prelims: <strong style={{ color: 'white' }}>{prelimsDays} Days</strong></span>
            </div>
            <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)', display: 'none' }} className="stat-divider" />
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <ShieldCheck size={20} color="#34D399" />
              <span style={{ fontSize: 14, color: '#D1D5DB' }}>VIT Kondhwa Status: <strong style={{ color: '#34D399' }}>Active Sem-V</strong></span>
            </div>
          </motion.div>

        </motion.div>
      </main>
    </div>
  );
}
