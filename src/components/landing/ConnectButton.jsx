import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Firefly from './Firefly';

// Small lavender sprig icon
const LavenderSprig = () => (
  <svg width="16" height="20" viewBox="0 0 18 22" fill="none" aria-hidden="true" style={{ opacity: 0.75 }}>
    <line x1="9" y1="22" x2="9" y2="8" stroke="#c4a8e8" strokeWidth="1.2" strokeLinecap="round"/>
    <ellipse cx="9" cy="6" rx="3" ry="4" fill="#9b7fd4" opacity="0.9" transform="rotate(-15 9 6)"/>
    <ellipse cx="5" cy="12" rx="2.5" ry="3.5" fill="#8b6dc8" opacity="0.8" transform="rotate(-35 5 12)"/>
    <ellipse cx="13" cy="11" rx="2.5" ry="3.5" fill="#8b6dc8" opacity="0.8" transform="rotate(35 13 11)"/>
  </svg>
);

export default function ConnectButton() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        position:   'relative',
        display:    'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:  14,
        // Firefly beads overflow the button, need overflow visible
        overflow:   'visible',
      }}
    >
      {/* Dynamic ambient glow wrapper that dims/brightens with the sunrays */}
      <div style={{
        position: 'absolute',
        inset: '-30px -50px',
        pointerEvents: 'none',
        zIndex: 1,
        animation: 'button-glow-opacity 18s ease-in-out infinite',
      }}>
        {/* Outer glow layer — expands on hover */}
        <div style={{
          position:   'absolute',
          inset:      '8px 5px',
          clipPath:   'ellipse(50% 50% at 50% 50%)',
          background: hovered
            ? 'radial-gradient(ellipse at center, rgba(61,35,160,0.45) 0%, rgba(40,20,110,0.22) 50%, transparent 72%)'
            : 'radial-gradient(ellipse at center, rgba(40,22,120,0.35) 0%, rgba(28,14,85,0.15) 50%, transparent 70%)',
          transition: 'background 0.5s ease',
          pointerEvents: 'none',
        }} />

        {/* Core diamond background */}
        <div style={{
          position:   'absolute',
          inset:      '22px 20px',
          clipPath:   'ellipse(50% 50% at 50% 50%)',
          background: hovered
            ? 'radial-gradient(ellipse at center, rgba(70,42,180,0.4) 0%, rgba(45,25,130,0.22) 45%, transparent 68%)'
            : 'radial-gradient(ellipse at center, rgba(50,28,150,0.35) 0%, rgba(32,16,100,0.18) 45%, transparent 65%)',
          transition: 'background 0.4s ease',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Firefly beads */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none' }}>
        <Firefly hovered={hovered} hw={145} hh={52} idleInterval={260} hoverInterval={90} />
      </div>

      {/* Button text — no border, no background on the element itself */}
      <button
        onClick={() => navigate('/connect')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-cursor="pointer"
        data-sound="cta-click"
        style={{
          position:        'relative',
          zIndex:          5,
          display:         'flex',
          alignItems:      'center',
          gap:             12,
          padding:         '17px 52px',
          background:      'transparent',
          border:          'none',
          color:           hovered ? '#f0eaff' : '#d4ccf0',
          fontFamily:      "'Cinzel', serif",
          fontSize:        19,
          fontWeight:      400,
          letterSpacing:   '0.08em',
          cursor:          'pointer',
          outline:         'none',
          transition:      'color 0.3s ease',
          textShadow:      hovered
            ? '0 0 20px rgba(164, 130, 230, 0.6)'
            : '0 0 12px rgba(130, 100, 200, 0.3)',
        }}
        aria-label="Connect your workspace to get started"
      >
        <span>Connect your workspace</span>
        <LavenderSprig />
      </button>

      {/* Embedded CSS Keyframes for synced button glow opacity */}
      <style>{`
        @keyframes button-glow-opacity {
          0%, 100% {
            opacity: 0.85;
          }
          8% {
            opacity: 0.90;
          }
          10% {
            opacity: 0.75;
          }
          12% {
            opacity: 0.88;
          }
          20% {
            opacity: 1.0;
          }
          25% {
            opacity: 0.90;
          }
          35% {
            opacity: 0.75;
          }
          37% {
            opacity: 0.70;
          }
          48% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.60;
          }
          60% {
            opacity: 0.35;
          }
          65% {
            opacity: 0.38;
          }
          67% {
            opacity: 0.32;
          }
          70% {
            opacity: 0.42;
          }
          75% {
            opacity: 0.35;
          }
          85% {
            opacity: 0.60;
          }
          87% {
            opacity: 0.55;
          }
          95% {
            opacity: 0.80;
          }
        }
      `}</style>
    </div>
  );
}
