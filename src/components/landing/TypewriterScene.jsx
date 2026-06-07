import { useState, useEffect, useRef } from 'react';
import typewriterImg from '../../assets/typewriter.png';
import {
  playKeyClick,
  playCarriageReturn,
  startAmbientWind,
} from '../../hooks/useSoundEffect';

const LINES = [
  'Invisible work',
  'deserves to be seen.',
];

const FONT_SIZE = 14;   // slightly smaller font size for the paper text
const LINE_HEIGHT = FONT_SIZE * 1.7;

// Typing speed config for realistic vintage mechanical rhythm
const BASE_MS = 110;     // base keystroke delay
const JITTER = 70;      // random timing variance (+/- 70ms)
const PAUSE_SPACE = 260; // hesitation between words
const PAUSE_PUNCT = 680; // realistic carriage strike pause on punctuation

function nextDelay(ch) {
  // 7% chance of a minor mechanical hesitation or typist thinking delay (220-450ms)
  const hesitation = Math.random() < 0.07 ? 220 + Math.random() * 230 : 0;
  
  if (ch === ' ') {
    return PAUSE_SPACE + (Math.random() * 60 - 30) + hesitation;
  }
  if (ch === '.' || ch === ',' || ch === '!') {
    return PAUSE_PUNCT + (Math.random() * 120 - 60);
  }
  return BASE_MS + (Math.random() * JITTER * 2 - JITTER) + hesitation;
}

export default function TypewriterScene() {
  // Each entry in `lines` is one fully or partially typed string
  // lines[0] is the oldest (top), lines[last] is currently being typed
  const [lines, setLines] = useState(['']);
  const [cursorOn, setCursor] = useState(true);
  const [done, setDone] = useState(false);
  const t = useRef(null);

  // Cursor blink
  useEffect(() => {
    const iv = setInterval(() => setCursor(v => !v), done ? 700 : 420);
    return () => clearInterval(iv);
  }, [done]);

  // Typing engine
  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;

    function tick() {
      const line = LINES[lineIdx];

      if (charIdx < line.length) {
        // Type next character onto current line
        const ch = line[charIdx];
        charIdx++;
        setLines(prev => {
          const next = [...prev];
          next[next.length - 1] = line.slice(0, charIdx);
          return next;
        });
        playKeyClick();
        t.current = setTimeout(tick, nextDelay(ch));

      } else {
        // Line complete
        lineIdx++;
        if (lineIdx < LINES.length) {
          charIdx = 0;
          playCarriageReturn();
          t.current = setTimeout(() => {
            setLines(prev => [...prev, '']);
            t.current = setTimeout(tick, 1200); // 1.2s pause after line moves up
          }, 380);
        } else {
          setDone(true);
        }
      }
    }

    t.current = setTimeout(() => {
      startAmbientWind();
      tick();
    }, 700);
    return () => clearTimeout(t.current);
  }, []);

  // How many completed lines sit above the current one
  const completedCount = lines.length - 1;
  // Shift entire block up by completedCount × lineHeight so new lines
  // always appear at the same vertical position on the paper
  const shiftUp = completedCount * LINE_HEIGHT;

  return (
    <div className="tw-enter" style={{ position: 'relative', width: 820, flexShrink: 0, transform: 'translateY(30px)', marginBottom: '-30px' }}>

      {/* Text overlay — keep your exact tuned top/left/width values */}
      <div
        aria-live="polite"
        style={{
          position: 'absolute',
          top: 225,       // ← SHIFTED 16px LOWER
          left: 320,      // ← YOUR TUNED VALUE — do not change
          width: 196,     // ← YOUR TUNED VALUE — do not change
          overflow: 'hidden',
          height: LINE_HEIGHT * (LINES.length + 0.5),
          pointerEvents: 'none',
          zIndex: 3,
          userSelect: 'none',
        }}
      >
        {/* Inner block: starts pushed to bottom of paper, shifts up as lines complete */}
        {/* startOffset pushes first line to the bottom of the visible paper area */}
        <div style={{
          transform: `translateY(${LINE_HEIGHT * (LINES.length - 0.5) - shiftUp}px)`,
          transition: shiftUp > 0
            ? `transform 260ms cubic-bezier(0.25, 0.1, 0.25, 1)`
            : 'none',
        }}>
          {lines.map((text, i) => {
            const isActive = i === lines.length - 1;
            return (
              <div
                key={i}
                style={{
                  height: LINE_HEIGHT,
                  lineHeight: `${LINE_HEIGHT}px`,
                  fontFamily: '"Courier Prime","Courier New",Courier,monospace',
                  fontSize: FONT_SIZE,
                  color: '#1a0e05',
                  letterSpacing: '0.01em',
                  whiteSpace: 'pre',
                }}
              >
                {text}
                {isActive && !done && (
                  <span style={{
                    display: 'inline-block',
                    width: 1.5,
                    height: `${FONT_SIZE * 0.85}px`,
                    background: '#2a1505',
                    marginLeft: 1,
                    verticalAlign: 'text-bottom',
                    opacity: cursorOn ? 0.9 : 0,
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Realistic table contact shadow */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '74%',
        height: 28,
        background: 'rgba(0, 0, 0, 0.92)',
        borderRadius: '50%',
        filter: 'blur(14px)',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Dynamic cast shadow from the sunbeams coming from the right, projecting to the bottom-left */}
      <div style={{
        position: 'absolute',
        bottom: 6,
        left: '46%',
        transform: 'translateX(-50%) rotate(-2deg)',
        width: '80%',
        height: 32,
        background: 'rgba(0, 0, 0, 0.95)',
        borderRadius: '50%',
        filter: 'blur(18px)',
        zIndex: 1,
        pointerEvents: 'none',
        animation: 'typewriter-cast-shadow 18s ease-in-out infinite',
      }} />

      {/* Typewriter image — completely static, no transform */}
      <img
        src={typewriterImg}
        alt="Antique typewriter with parchment paper"
        width={820}
        style={{
          display: 'block',
          position: 'relative',
          zIndex: 2,
          mixBlendMode: 'screen',
        }}
      />

      {/* Dynamic shadow overlay on the typewriter and paper (darker on the left, shading the ink and paper together) */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 4, // sits above typewriter image and text overlay
        pointerEvents: 'none',
        background: 'linear-gradient(105deg, rgba(7, 5, 15, 0.82) 0%, rgba(7, 5, 15, 0.4) 45%, rgba(7, 5, 15, 0) 75%)',
        mixBlendMode: 'multiply',
        animation: 'typewriter-left-shadow 18s ease-in-out infinite',
      }} />

      {/* Embedded CSS Keyframes for synced typewriter shadow animations */}
      <style>{`
        @keyframes typewriter-cast-shadow {
          0%, 100% {
            opacity: 0.75;
            transform: translateX(-54%) translateY(2px) scale(1.02);
            filter: blur(16px);
          }
          8% {
            opacity: 0.80;
            transform: translateX(-55%) translateY(3px) scale(1.03);
            filter: blur(15px);
          }
          10% {
            opacity: 0.65;
            transform: translateX(-53%) translateY(2px) scale(1.01);
            filter: blur(17px);
          }
          12% {
            opacity: 0.78;
            transform: translateX(-54%) translateY(3px) scale(1.02);
            filter: blur(15px);
          }
          20% {
            opacity: 0.90;
            transform: translateX(-56%) translateY(4px) scale(1.05);
            filter: blur(14px);
          }
          25% {
            opacity: 0.80;
            transform: translateX(-54%) translateY(3px) scale(1.03);
            filter: blur(16px);
          }
          35% {
            opacity: 0.65;
            transform: translateX(-53%) translateY(2px) scale(1.01);
            filter: blur(18px);
          }
          37% {
            opacity: 0.58;
            transform: translateX(-52%) translateY(1px) scale(1.0);
            filter: blur(19px);
          }
          48% {
            opacity: 0.40;
            transform: translateX(-51%) translateY(1px) scale(0.98);
            filter: blur(22px);
          }
          50% {
            opacity: 0.48;
            transform: translateX(-52%) translateY(2px) scale(0.99);
            filter: blur(20px);
          }
          60% {
            opacity: 0.20;
            transform: translateX(-50%) translateY(0px) scale(0.95);
            filter: blur(26px);
          }
          65% {
            opacity: 0.22;
            transform: translateX(-50%) translateY(0px) scale(0.96);
            filter: blur(25px);
          }
          67% {
            opacity: 0.16;
            transform: translateX(-50%) translateY(0px) scale(0.95);
            filter: blur(26px);
          }
          70% {
            opacity: 0.25;
            transform: translateX(-51%) translateY(1px) scale(0.96);
            filter: blur(24px);
          }
          75% {
            opacity: 0.20;
            transform: translateX(-50%) translateY(0px) scale(0.95);
            filter: blur(26px);
          }
          85% {
            opacity: 0.45;
            transform: translateX(-52%) translateY(1px) scale(0.99);
            filter: blur(21px);
          }
          87% {
            opacity: 0.38;
            transform: translateX(-51%) translateY(1px) scale(0.98);
            filter: blur(22px);
          }
          95% {
            opacity: 0.70;
            transform: translateX(-54%) translateY(2px) scale(1.02);
            filter: blur(17px);
          }
        }

        @keyframes typewriter-left-shadow {
          0%, 100% {
            opacity: 0.65;
          }
          8% {
            opacity: 0.70;
          }
          10% {
            opacity: 0.55;
          }
          12% {
            opacity: 0.68;
          }
          20% {
            opacity: 0.82;
          }
          25% {
            opacity: 0.70;
          }
          35% {
            opacity: 0.55;
          }
          37% {
            opacity: 0.50;
          }
          48% {
            opacity: 0.35;
          }
          50% {
            opacity: 0.40;
          }
          60% {
            opacity: 0.18;
          }
          65% {
            opacity: 0.20;
          }
          67% {
            opacity: 0.15;
          }
          70% {
            opacity: 0.22;
          }
          75% {
            opacity: 0.18;
          }
          85% {
            opacity: 0.40;
          }
          87% {
            opacity: 0.35;
          }
          95% {
            opacity: 0.60;
          }
        }
      `}</style>
    </div>
  );
}
