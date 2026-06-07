import { useState, useEffect, useRef } from 'react';

const QUOTES = [
  { text: 'Words have the power to heal, thank, and remember.', author: '— Violet Evergarden' },
  { text: 'People won\'t know how you feel unless you tell them.', author: '- Frieren' },
  { text: 'The right words can remind someone why their work matters.', },
  { text: 'The quiet ones keep everything running.', author: null },
  { text: 'A thoughtful letter can say what a dashboard cannot.', author: null },
  { text: 'The world remembers the finished work. Few remember the hands that made it possible.', author: null },
  { text: 'Impact like yours often goes unseen.', author: null },
];

const FADE_IN_MS = 3200;   // how long to fade in
const FADE_OUT_MS = 3800;   // how long to fade out (slightly slower out feels more natural)
const GAP_MS_MIN = 1800;   // min pause between cycles per slot
const GAP_MS_MAX = 4200;   // max pause
const STAGGER = 2800;   // initial delay between slots
const SLOT_COUNT = 3;

const REGIONS = [
  () => ({ x: 14 + Math.random() * 10, y: 8 + Math.random() * 18 }),  // top-left
  () => ({ x: 76 + Math.random() * 10, y: 8 + Math.random() * 18 }),  // top-right
  () => ({ x: 12 + Math.random() * 12, y: 32 + Math.random() * 28 }),  // mid-left
  () => ({ x: 76 + Math.random() * 10, y: 32 + Math.random() * 28 }),  // mid-right
  () => ({ x: 14 + Math.random() * 10, y: 66 + Math.random() * 20 }),  // bottom-left
  () => ({ x: 76 + Math.random() * 10, y: 66 + Math.random() * 20 }),  // bottom-right
];

// Track occupied regions across all slots
const occupiedRegions = new Set();

function randomPos() {
  const available = REGIONS
    .map((fn, i) => ({ fn, i }))
    .filter(({ i }) => !occupiedRegions.has(i));

  // If somehow all are taken, just pick any
  const pool = available.length > 0 ? available : REGIONS.map((fn, i) => ({ fn, i }));
  const { fn, i } = pool[Math.floor(Math.random() * pool.length)];
  return { ...fn(), regionIndex: i };
}

// Single animated quote instance
function QuoteInstance({ initialDelay, startIndex }) {
  // opacity drives everything — CSS transition does the work
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.84);
  const [quoteIndex, setQuoteIndex] = useState(startIndex % QUOTES.length);
  const [pos, setPos] = useState(randomPos);
  const t = useRef(null);

  useEffect(() => {
    let idx = startIndex % QUOTES.length;

    function cycle() {
      const { regionIndex, ...position } = randomPos();

      // Mark this region as occupied
      occupiedRegions.add(regionIndex);

      setPos(position);
      setQuoteIndex(idx);
      setOpacity(0);
      setScale(0.84);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Fade IN — transition handles the animation
          setOpacity(1);
          setScale(1);

          // Step 3: once fade-in completes, immediately start fading out
          t.current = setTimeout(() => {
            setOpacity(0);
            setScale(1.1);

            // Step 4: once fade-out completes, wait gap then repeat
            t.current = setTimeout(() => {
              // Free this region when quote disappears
              occupiedRegions.delete(regionIndex);

              idx = (idx + 1) % QUOTES.length;
              const gap = GAP_MS_MIN + Math.random() * (GAP_MS_MAX - GAP_MS_MIN);
              t.current = setTimeout(cycle, gap);
            }, FADE_OUT_MS);

          }, FADE_IN_MS);
        });
      });
    }

    t.current = setTimeout(cycle, initialDelay);
    return () => clearTimeout(t.current);
  }, []);

  const quote = QUOTES[quoteIndex];

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        opacity,
        // Single transition covers both fade-in and fade-out directions
        // Duration updates when opacity changes direction
        transition: opacity === 0
          ? `opacity ${FADE_OUT_MS}ms ease-in, transform ${FADE_OUT_MS}ms ease-in`
          : `opacity ${FADE_IN_MS}ms ease-out, transform ${FADE_IN_MS}ms ease-out`,
        zIndex: 2,
        pointerEvents: 'none',
        textAlign: 'center',
        maxWidth: 260,
        userSelect: 'none',
      }}
    >
      <p style={{
        fontFamily: "'Lora', Georgia, serif",
        fontStyle: 'italic',
        fontSize: 14.5,
        lineHeight: 1.75,
        color: 'rgba(210, 195, 248, 0.52)',
        margin: 0,
        textShadow: `
          0 0 14px rgba(164, 130, 230, 0.35),
          0 0 32px rgba(120, 80, 190, 0.2)
        `,
        letterSpacing: '0.025em',
      }}>
        "{quote.text}"
      </p>
      {quote.author && (
        <span style={{
          display: 'block',
          marginTop: 6,
          fontFamily: "'Lora', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 11.5,
          color: 'rgba(180, 158, 220, 0.35)',
          letterSpacing: '0.04em',
          textShadow: '0 0 10px rgba(120, 80, 190, 0.14)',
        }}>
          {quote.author}
        </span>
      )}
    </div>
  );
}

export default function FloatingQuote() {
  return (
    <>
      {Array.from({ length: SLOT_COUNT }, (_, i) => (
        <QuoteInstance
          key={i}
          initialDelay={1400 + i * STAGGER}
          startIndex={i * 2}
        />
      ))}
    </>
  );
}
