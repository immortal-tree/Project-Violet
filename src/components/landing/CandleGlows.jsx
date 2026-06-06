import React from 'react';
import bgImg from '../../assets/landing-bg.jpg';

// Coordinates of the 5 candle flames as percentages of the 1536x1024 image
const CANDLES = [
  { id: 1, left: '4.95%', top: '36.15%', delay: '0s', scale: 0.9 },   // far left wall
  { id: 2, left: '20.31%', top: '27.94%', delay: '-0.4s', scale: 0.95 },  // upper-mid left
  { id: 3, left: '20.51%', top: '43.57%', delay: '-0.8s', scale: 0.9 },   // lower-mid left
  { id: 4, left: '39.58%', top: '42.59%', delay: '-1.2s', scale: 0.85 },  // center-left niche
  { id: 5, left: '62.24%', top: '50.60%', delay: '-1.5s', scale: 0.8 },   // center-right niche
];

export default function CandleGlows() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      {/* Aspect-ratio locked container that matches image proportions (1.5) and scales like cover */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        aspectRatio: '1.5',
        minWidth: '100%',
        minHeight: '100%',
      }}>
        {/* Background Image */}
        <img
          src={bgImg}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Volumetric Sun Rays (God Rays) from the gothic window */}
        <svg
          viewBox="0 0 1536 1024"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            mixBlendMode: 'screen',
            zIndex: 1,
          }}
        >
          <defs>
            {/* Soft linear gradient diagonal from top-right to bottom-left */}
            <linearGradient id="ray-grad" x1="1" y1="0.1" x2="0" y2="0.9">
              <stop offset="0%" stopColor="rgba(255, 175, 75, 0.45)" />
              <stop offset="25%" stopColor="rgba(255, 155, 60, 0.28)" />
              <stop offset="65%" stopColor="rgba(240, 115, 30, 0.08)" />
              <stop offset="100%" stopColor="rgba(240, 115, 30, 0)" />
            </linearGradient>
            
            {/* Blur filter to soften ray edges for a volumetric atmospheric look */}
            <filter id="ray-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="22" />
            </filter>
          </defs>

          {/* Beam 1: Main central sunbeam */}
          <polygon
            points="1260,80 1370,110 1150,750 990,700"
            fill="url(#ray-grad)"
            filter="url(#ray-blur)"
            style={{
              transformOrigin: '1315px 95px',
              animation: 'ray-shimmer-1 18s ease-in-out infinite',
            }}
          />

          {/* Beam 2: Upper secondary sunbeam */}
          <polygon
            points="1340,50 1420,70 1250,600 1130,560"
            fill="url(#ray-grad)"
            filter="url(#ray-blur)"
            style={{
              transformOrigin: '1380px 60px',
              animation: 'ray-shimmer-2 24s ease-in-out infinite',
            }}
          />

          {/* Beam 3: Lower broad sunbeam */}
          <polygon
            points="1190,130 1280,180 1020,830 890,760"
            fill="url(#ray-grad)"
            filter="url(#ray-blur)"
            style={{
              transformOrigin: '1235px 155px',
              animation: 'ray-shimmer-3 20s ease-in-out infinite',
            }}
          />
        </svg>

        {/* CSS Keyframes for thin flickering candle flame and shimmering sun rays */}
        <style>{`
          @keyframes flame-burn {
            0%, 100% {
              transform: translate(-50%, -75%) scale(1, 1) skewX(0deg);
              opacity: 0.82;
            }
            15% {
              transform: translate(-49%, -77%) scale(0.92, 1.12) skewX(1.5deg);
              opacity: 0.95;
            }
            30% {
              transform: translate(-51%, -73%) scale(1.05, 0.88) skewX(-1.5deg);
              opacity: 0.68;
            }
            45% {
              transform: translate(-48%, -76%) scale(0.96, 1.06) skewX(1deg);
              opacity: 0.86;
            }
            60% {
              transform: translate(-52%, -78%) scale(0.9, 1.18) skewX(-2deg);
              opacity: 0.92;
            }
            75% {
              transform: translate(-50%, -74%) scale(1.03, 0.95) skewX(2.5deg);
              opacity: 0.76;
            }
            90% {
              transform: translate(-49%, -76%) scale(0.95, 1.05) skewX(-1deg);
              opacity: 0.88;
            }
          }

          @keyframes glow-pulse {
            0%, 100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 0.5;
            }
            33% {
              transform: translate(-50%, -50%) scale(1.06);
              opacity: 0.6;
            }
            66% {
              transform: translate(-50%, -50%) scale(0.94);
              opacity: 0.4;
            }
          }

          /* Sun Rays Shimmering Animations: sunset-like long phases of strong light and slow dimming */
          @keyframes ray-shimmer-1 {
            0% {
              opacity: 0.85;
              transform: scale(1) rotate(0deg);
            }
            8% {
              opacity: 0.90;
              transform: scale(1.01) rotate(0.05deg);
            }
            10% {
              opacity: 0.72;
              transform: scale(1.002) rotate(0.02deg); /* subtle flicker drop */
            }
            12% {
              opacity: 0.88;
              transform: scale(1.008) rotate(0.04deg);
            }
            20% {
              opacity: 0.95;
              transform: scale(1.015) rotate(0.1deg);
            }
            25% {
              opacity: 0.90;
              transform: scale(1.01) rotate(0.08deg);
            }
            35% {
              opacity: 0.70;
              transform: scale(0.995) rotate(0.02deg);
            }
            37% {
              opacity: 0.62;
              transform: scale(0.99) rotate(0.01deg); /* subtle flicker drop */
            }
            48% {
              opacity: 0.45;
              transform: scale(0.98) rotate(-0.05deg);
            }
            50% {
              opacity: 0.52;
              transform: scale(0.985) rotate(-0.03deg); /* subtle flicker pop */
            }
            60% {
              opacity: 0.22;
              transform: scale(0.97) rotate(-0.1deg); /* fully dimmed */
            }
            65% {
              opacity: 0.25;
              transform: scale(0.972) rotate(-0.09deg);
            }
            67% {
              opacity: 0.18;
              transform: scale(0.968) rotate(-0.11deg); /* subtle flicker drop */
            }
            70% {
              opacity: 0.28;
              transform: scale(0.975) rotate(-0.07deg);
            }
            75% {
              opacity: 0.22;
              transform: scale(0.97) rotate(-0.1deg);
            }
            85% {
              opacity: 0.50;
              transform: scale(0.985) rotate(-0.04deg);
            }
            87% {
              opacity: 0.42;
              transform: scale(0.98) rotate(-0.06deg); /* subtle flicker drop */
            }
            95% {
              opacity: 0.78;
              transform: scale(0.995) rotate(-0.01deg);
            }
            100% {
              opacity: 0.85;
              transform: scale(1) rotate(0deg);
            }
          }

          @keyframes ray-shimmer-2 {
            0% {
              opacity: 0.25;
              transform: scale(0.98) rotate(-0.05deg);
            }
            10% {
              opacity: 0.52;
              transform: scale(0.99) rotate(0deg);
            }
            12% {
              opacity: 0.42;
              transform: scale(0.985) rotate(-0.02deg); /* subtle flicker drop */
            }
            22% {
              opacity: 0.88;
              transform: scale(1.02) rotate(0.15deg); /* strong phase starts */
            }
            30% {
              opacity: 0.92;
              transform: scale(1.025) rotate(0.18deg);
            }
            35% {
              opacity: 0.78;
              transform: scale(1.01) rotate(0.1deg); /* subtle flicker drop */
            }
            37% {
              opacity: 0.85;
              transform: scale(1.015) rotate(0.12deg);
            }
            48% {
              opacity: 0.90;
              transform: scale(1.02) rotate(0.15deg);
            }
            55% {
              opacity: 0.82;
              transform: scale(1.01) rotate(0.08deg);
            }
            65% {
              opacity: 0.50;
              transform: scale(0.99) rotate(0deg);
            }
            68% {
              opacity: 0.58;
              transform: scale(0.995) rotate(0.02deg); /* subtle flicker pop */
            }
            75% {
              opacity: 0.30;
              transform: scale(0.98) rotate(-0.05deg);
            }
            80% {
              opacity: 0.20;
              transform: scale(0.975) rotate(-0.08deg); /* fully dimmed */
            }
            90% {
              opacity: 0.24;
              transform: scale(0.978) rotate(-0.07deg);
            }
            92% {
              opacity: 0.18;
              transform: scale(0.972) rotate(-0.09deg); /* subtle flicker drop */
            }
            100% {
              opacity: 0.25;
              transform: scale(0.98) rotate(-0.05deg);
            }
          }

          @keyframes ray-shimmer-3 {
            0% {
              opacity: 0.78;
              transform: scale(1.01) rotate(0.05deg);
            }
            5% {
              opacity: 0.82;
              transform: scale(1.015) rotate(0.08deg);
            }
            8% {
              opacity: 0.68;
              transform: scale(1.005) rotate(0.03deg); /* subtle flicker drop */
            }
            20% {
              opacity: 0.45;
              transform: scale(0.985) rotate(-0.05deg);
            }
            30% {
              opacity: 0.24;
              transform: scale(0.975) rotate(-0.1deg);
            }
            32% {
              opacity: 0.32;
              transform: scale(0.98) rotate(-0.08deg); /* subtle flicker pop */
            }
            45% {
              opacity: 0.22;
              transform: scale(0.972) rotate(-0.12deg); /* fully dimmed */
            }
            55% {
              opacity: 0.55;
              transform: scale(0.99) rotate(-0.02deg);
            }
            58% {
              opacity: 0.48;
              transform: scale(0.985) rotate(-0.05deg); /* subtle flicker drop */
            }
            70% {
              opacity: 0.85;
              transform: scale(1.02) rotate(0.1deg);
            }
            75% {
              opacity: 0.92;
              transform: scale(1.03) rotate(0.15deg); /* fully strong */
            }
            82% {
              opacity: 0.75;
              transform: scale(1.015) rotate(0.08deg); /* subtle flicker drop */
            }
            85% {
              opacity: 0.88;
              transform: scale(1.022) rotate(0.12deg);
            }
            95% {
              opacity: 0.82;
              transform: scale(1.018) rotate(0.09deg);
            }
            100% {
              opacity: 0.78;
              transform: scale(1.01) rotate(0.05deg);
            }
          }
        `}</style>

        {CANDLES.map(c => (
          <div
            key={c.id}
            style={{
              position: 'absolute',
              left: c.left,
              top: c.top,
              width: 24,
              height: 24,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          >
            {/* 1. Large Ambient Glow (behind the flame, soft radial amber light) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 140 * c.scale,
              height: 140 * c.scale,
              background: 'radial-gradient(circle, rgba(253,184,39,0.2) 0%, rgba(212,147,58,0.05) 50%, transparent 70%)',
              animation: `glow-pulse 3s ease-in-out infinite`,
              animationDelay: c.delay,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }} />

            {/* 2. Medium Halo Light (warmer orange core glow) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 50 * c.scale,
              height: 50 * c.scale,
              background: 'radial-gradient(circle, rgba(255,140,0,0.35) 0%, rgba(255,69,0,0.06) 55%, transparent 75%)',
              animation: `glow-pulse 2.2s ease-in-out infinite`,
              animationDelay: c.delay,
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }} />

            {/* 3. The Animated Burning Flame Core (thin teardrop overlay) */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 3.8 * c.scale,
              height: 16 * c.scale,
              background: 'linear-gradient(to top, rgba(255,75,0,0.2) 0%, #ff8000 30%, #ffe266 70%, #ffffff 100%)',
              borderRadius: '50% 50% 20% 20% / 80% 80% 20% 20%',
              boxShadow: `
                0 -3px 8px #ff8000,
                0 -5px 14px rgba(255,226,102,0.9),
                0 1px 3px rgba(255,75,0,0.5)
              `,
              filter: 'blur(0.3px)',
              animation: `flame-burn 1.3s ease-in-out infinite`,
              animationDelay: c.delay,
              transform: 'translate(-50%, -75%)',
              transformOrigin: '50% 90%', // anchor rotation/scale changes to wick area
              pointerEvents: 'none',
            }} />

            {/* 4. Little Blue Base Flame (combustion detail at the bottom of the flame) */}
            <div style={{
              position: 'absolute',
              top: '52%',
              left: '50%',
              width: 3.2 * c.scale,
              height: 3 * c.scale,
              background: 'radial-gradient(circle, rgba(80,180,240,0.85) 0%, rgba(0,0,255,0.05) 70%, transparent 100%)',
              borderRadius: '50%',
              transform: 'translate(-50%, 0)',
              opacity: 0.7,
              filter: 'blur(0.15px)',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
