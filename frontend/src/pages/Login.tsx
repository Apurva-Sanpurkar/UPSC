import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store';
import { Target, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [pin, setPin] = useState(['', '', '', '']);
  const [error, setError] = useState(false);
  const login = useAuth((s) => s.login);
  const navigate = useNavigate();

  // Removed auto-login effect for 4 digit PIN

  const handleLogin = () => {
    const enteredPin = pin.join('');
    if (login(enteredPin)) {
      navigate('/dashboard');
    } else {
      setError(true);
      setTimeout(() => {
        setPin(['', '', '', '']);
        setError(false);
        document.getElementById('pin-0')?.focus();
      }, 800);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    setError(false);
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    if (value && index < 3) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      document.getElementById(`pin-${index - 1}`)?.focus();
    }
  };

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--color-ink-950)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative', overflow: 'hidden' }}>
      
      {/* Background elements */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(0,149,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(255,166,0,0.1) 0%, transparent 70%)', filter: 'blur(60px)', zIndex: 0 }} />

      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        style={{ width: '100%', maxWidth: 420, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', borderRadius: 24, padding: '40px 32px', textAlign: 'center', position: 'relative', zIndex: 10, boxShadow: '0 24px 64px rgba(0,0,0,0.4)' }}
      >
        <div style={{ width: 64, height: 64, borderRadius: 16, background: 'linear-gradient(135deg, var(--color-primary-dark), var(--color-primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 8px 32px rgba(0,149,255,0.3)' }}>
          <Target size={32} color="white" />
        </div>
        
        <h1 style={{ fontSize: 24, fontWeight: 800, color: 'white', marginBottom: 8, letterSpacing: '-0.02em' }}>Mission 2027 Command</h1>
        <p style={{ color: '#9CA3AF', fontSize: 14, marginBottom: 32 }}>Enter your password to access the terminal.</p>
        
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
          <motion.input
            id="password"
            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
            type="password" 
            placeholder="Enter password..."
            value={pin[0]} // Using pin[0] as a string to hold the password temporarily instead of an array
            onChange={(e) => {
                setError(false);
                setPin([e.target.value, '', '', '']);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLogin();
            }}
            style={{
              width: '100%', height: 56, textAlign: 'center', fontSize: 18, fontWeight: 600, borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: `2px solid ${error ? '#EF4444' : pin[0] ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'}`,
              color: error ? '#EF4444' : 'white', outline: 'none', transition: 'all 0.2s', fontFamily: 'inherit'
            }}
            onFocus={e => { if (!error) e.target.style.borderColor = 'var(--color-primary)'; e.target.style.boxShadow = '0 0 0 3px rgba(234,82,111,0.2)'; }}
            onBlur={e => { e.target.style.borderColor = pin[0] ? 'var(--color-primary)' : 'rgba(255,255,255,0.1)'; e.target.style.boxShadow = 'none'; }}
          />
        </div>
        
        {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#EF4444', fontSize: 13, marginTop: -16, marginBottom: 24, fontWeight: 600 }}>Access Denied. Invalid Password.</motion.p>}
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, color: '#6B7280', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Lock size={12} /> Encrypted Session
        </div>
      </motion.div>
    </div>
  );
}
