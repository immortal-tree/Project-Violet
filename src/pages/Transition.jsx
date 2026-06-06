import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { WaxSealIcon } from '../components/icons';

export const Transition = () => {
  const navigate = useNavigate();
  const [isFadingOut, setIsFadingOut] = useState(false);

  // Generate random properties for 8 floating particles (same as landing)
  const particles = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 80 + 10}%`,
      bottom: `${Math.random() * 20 + 5}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 6}s`,
      duration: `${Math.random() * 6 + 6}s`,
      opacity: Math.random() * 0.25 + 0.15
    }));
  }, []);

  useEffect(() => {
    // 1. Trigger fade-out overlay at 2.2 seconds
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2200);

    // 2. Redirect to dashboard at 2.5 seconds
    const redirectTimer = setTimeout(() => {
      navigate('/app/home');
    }, 2500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div
      data-transition-complete={isFadingOut ? "true" : "false"}
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--bg-void)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'opacity 300ms ease-out',
        opacity: isFadingOut ? 0 : 1
      }}
    >
      {/* Floating Particles Overlay */}
      <div className="particle-container">
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              '--float-duration': p.duration,
              '--float-opacity': p.opacity,
              '--float-x': `${Math.random() * 30 - 15}px`
            }}
          />
        ))}
      </div>

      {/* Cinematic Center Animation Grid */}
      <div className="flex flex-col align-center text-center" style={{ zIndex: 10 }}>
        {/* Wax Seal spring animation */}
        <div className="animate-seal" style={{ marginBottom: 'var(--space-lg)' }}>
          <WaxSealIcon size={80} style={{ filter: 'drop-shadow(0 4px 15px rgba(0,0,0,0.6))' }} />
        </div>

        {/* Dynamic headings fading in */}
        <h3
          className="font-display animate-fade-up stagger-1"
          style={{
            fontSize: '32px',
            color: 'var(--gold-glow)',
            marginBottom: 'var(--space-xs)',
            letterSpacing: '0.05em'
          }}
        >
          Their stories are ready.
        </h3>
        
        <p
          className="font-body animate-fade-up stagger-2"
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            fontStyle: 'italic'
          }}
        >
          Every signal gathered. Every contribution seen.
        </p>
      </div>
    </div>
  );
};

export default Transition;
