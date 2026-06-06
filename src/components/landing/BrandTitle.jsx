import React from 'react';
import Firefly from './Firefly';

export default function BrandTitle() {
  return (
    <div
      className="title-enter"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0,
        marginTop: 0,         // no gap — sits right at typewriter base
        paddingTop: 8,
        position: 'relative',  // needed for Firefly absolute positioning
        overflow: 'visible',
      }}
    >
      {/* Firefly beads emanating from the title area */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
        <Firefly hovered={false} hw={220} hh={40} idleInterval={120} hoverInterval={120} />
        <Firefly hovered={false} hw={200} hh={32} idleInterval={140} hoverInterval={140} />
      </div>

      {/* Small "PROJECT" label */}
      <span style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 18,
        fontWeight: 600,
        letterSpacing: '0.4em',
        color: '#dfa347',
        textTransform: 'uppercase',
        opacity: 0.9,
        marginBottom: 1,
        position: 'relative',
        zIndex: 2,
        animation: 'project-text-glow 18s ease-in-out infinite',
      }}>
        Project
      </span>

      {/* Main title */}
      <h1 style={{
        fontFamily: "'Cinzel', serif",
        fontSize: 'clamp(36px, 5vw, 56px)',
        fontWeight: 700,
        color: '#e8bc74',
        letterSpacing: '0.12em',
        lineHeight: 1,
        margin: 0,
        position: 'relative',
        zIndex: 2,
        animation: 'brand-text-glow 18s ease-in-out infinite',
      }}>
        AUTO MEMORY
      </h1>

      {/* Ornamental divider — tight, small */}
      <svg width="240" height="16" viewBox="0 0 240 16" style={{ marginTop: 6, opacity: 0.65, position: 'relative', zIndex: 2 }} aria-hidden="true">
        <line x1="0" y1="8" x2="100" y2="8" stroke="#9b7fd4" strokeWidth="0.8" />
        <path d="M110 8 C112 5,115 3,120 3 C125 3,128 5,130 8 C128 11,125 13,120 13 C115 13,112 11,110 8 Z"
          fill="#9b7fd4" opacity="0.85" />
        <path d="M103 8 L107 5.5 L111 8 L107 10.5 Z" fill="#9b7fd4" opacity="0.55" />
        <path d="M129 8 L133 5.5 L137 8 L133 10.5 Z" fill="#9b7fd4" opacity="0.55" />
        <line x1="140" y1="8" x2="240" y2="8" stroke="#9b7fd4" strokeWidth="0.8" />
      </svg>

      {/* Embedded CSS Keyframes for synced text glow animations */}
      <style>{`
        @keyframes brand-text-glow {
          0%, 100% {
            text-shadow: 0 0 15px rgba(223, 163, 71, 0.55), 0 0 30px rgba(223, 163, 71, 0.3), 0 0 60px rgba(223, 163, 71, 0.12);
          }
          8% {
            text-shadow: 0 0 18px rgba(223, 163, 71, 0.6), 0 0 35px rgba(223, 163, 71, 0.35), 0 0 70px rgba(223, 163, 71, 0.15);
          }
          10% {
            text-shadow: 0 0 12px rgba(223, 163, 71, 0.45), 0 0 25px rgba(223, 163, 71, 0.22), 0 0 50px rgba(223, 163, 71, 0.1);
          }
          12% {
            text-shadow: 0 0 16px rgba(223, 163, 71, 0.58), 0 0 32px rgba(223, 163, 71, 0.32), 0 0 65px rgba(223, 163, 71, 0.14);
          }
          20% {
            text-shadow: 0 0 24px rgba(223, 163, 71, 0.75), 0 0 45px rgba(223, 163, 71, 0.45), 0 0 90px rgba(223, 163, 71, 0.25);
          }
          25% {
            text-shadow: 0 0 18px rgba(223, 163, 71, 0.6), 0 0 35px rgba(223, 163, 71, 0.35), 0 0 70px rgba(223, 163, 71, 0.15);
          }
          35% {
            text-shadow: 0 0 12px rgba(223, 163, 71, 0.45), 0 0 25px rgba(223, 163, 71, 0.22), 0 0 50px rgba(223, 163, 71, 0.1);
          }
          37% {
            text-shadow: 0 0 10px rgba(223, 163, 71, 0.4), 0 0 20px rgba(223, 163, 71, 0.2), 0 0 40px rgba(223, 163, 71, 0.08);
          }
          48% {
            text-shadow: 0 0 8px rgba(223, 163, 71, 0.3), 0 0 15px rgba(223, 163, 71, 0.15), 0 0 30px rgba(223, 163, 71, 0.05);
          }
          50% {
            text-shadow: 0 0 9px rgba(223, 163, 71, 0.35), 0 0 18px rgba(223, 163, 71, 0.18), 0 0 35px rgba(223, 163, 71, 0.06);
          }
          60% {
            text-shadow: 0 0 4px rgba(223, 163, 71, 0.2), 0 0 8px rgba(223, 163, 71, 0.08);
          }
          65% {
            text-shadow: 0 0 5px rgba(223, 163, 71, 0.22), 0 0 10px rgba(223, 163, 71, 0.1);
          }
          67% {
            text-shadow: 0 0 3px rgba(223, 163, 71, 0.15), 0 0 6px rgba(223, 163, 71, 0.05);
          }
          70% {
            text-shadow: 0 0 6px rgba(223, 163, 71, 0.25), 0 0 12px rgba(223, 163, 71, 0.12);
          }
          75% {
            text-shadow: 0 0 4px rgba(223, 163, 71, 0.2), 0 0 8px rgba(223, 163, 71, 0.08);
          }
          85% {
            text-shadow: 0 0 9px rgba(223, 163, 71, 0.35), 0 0 18px rgba(223, 163, 71, 0.18), 0 0 35px rgba(223, 163, 71, 0.06);
          }
          87% {
            text-shadow: 0 0 8px rgba(223, 163, 71, 0.3), 0 0 15px rgba(223, 163, 71, 0.15), 0 0 30px rgba(223, 163, 71, 0.05);
          }
          95% {
            text-shadow: 0 0 14px rgba(223, 163, 71, 0.55), 0 0 28px rgba(223, 163, 71, 0.28), 0 0 55px rgba(223, 163, 71, 0.12);
          }
        }

        @keyframes project-text-glow {
          0%, 100% {
            text-shadow: 0 0 15px rgba(223, 163, 71, 0.35), 0 0 30px rgba(223, 163, 71, 0.1);
          }
          8% {
            text-shadow: 0 0 18px rgba(223, 163, 71, 0.4), 0 0 35px rgba(223, 163, 71, 0.15);
          }
          10% {
            text-shadow: 0 0 12px rgba(223, 163, 71, 0.3), 0 0 25px rgba(223, 163, 71, 0.08);
          }
          12% {
            text-shadow: 0 0 16px rgba(223, 163, 71, 0.38), 0 0 32px rgba(223, 163, 71, 0.12);
          }
          20% {
            text-shadow: 0 0 24px rgba(223, 163, 71, 0.55), 0 0 45px rgba(223, 163, 71, 0.22);
          }
          25% {
            text-shadow: 0 0 18px rgba(223, 163, 71, 0.4), 0 0 35px rgba(223, 163, 71, 0.15);
          }
          35% {
            text-shadow: 0 0 12px rgba(223, 163, 71, 0.3), 0 0 25px rgba(223, 163, 71, 0.08);
          }
          37% {
            text-shadow: 0 0 10px rgba(223, 163, 71, 0.25), 0 0 20px rgba(223, 163, 71, 0.06);
          }
          48% {
            text-shadow: 0 0 6px rgba(223, 163, 71, 0.15);
          }
          50% {
            text-shadow: 0 0 8px rgba(223, 163, 71, 0.2);
          }
          60% {
            text-shadow: none;
          }
          65% {
            text-shadow: 0 0 4px rgba(223, 163, 71, 0.1);
          }
          67% {
            text-shadow: none;
          }
          70% {
            text-shadow: 0 0 5px rgba(223, 163, 71, 0.12);
          }
          75% {
            text-shadow: none;
          }
          85% {
            text-shadow: 0 0 8px rgba(223, 163, 71, 0.2);
          }
          87% {
            text-shadow: 0 0 6px rgba(223, 163, 71, 0.15);
          }
          95% {
            text-shadow: 0 0 12px rgba(223, 163, 71, 0.32);
          }
        }
      `}</style>
    </div>
  );
}
