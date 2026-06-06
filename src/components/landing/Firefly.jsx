import { useState, useEffect, useRef } from 'react';

export default function Firefly({ hovered, hw = 110, hh = 42, idleInterval = 260, hoverInterval = 90 }) {
  const [beads, setBeads] = useState([]);
  const frameRef = useRef(null);
  const beadId = useRef(0);

  useEffect(() => {
    const iv = setInterval(() => spawnBead(), hovered ? hoverInterval : idleInterval);
    return () => clearInterval(iv);
  }, [hovered]);

  function spawnBead() {
    const id = beadId.current++;

    // Spawn from the 4 actual edges of the text rectangle, not from center
    // hw = half-width, hh = half-height — so edges are at ±hw and ±hh
    const edge = Math.floor(Math.random() * 4);
    let sx, sy, angle;

    if (edge === 0) {
      // Top edge — strong sideways bias, reaches left/right screen edges
      sx = -hw + Math.random() * hw * 2;
      sy = -hh;
      angle = (Math.random() > 0.5 ? 1 : -1) * (Math.PI * 0.3 + Math.random() * Math.PI * 0.35);
    } else if (edge === 1) {
      // Right edge — shoots hard right toward right screen edge
      sx = hw;
      sy = -hh + Math.random() * hh * 2;
      angle = (Math.random() * Math.PI * 0.5) - Math.PI * 0.25; // tight rightward cone
    } else if (edge === 2) {
      // Bottom edge — wide sideways fan, reaches both screen edges
      sx = -hw + Math.random() * hw * 2;
      sy = hh;
      angle = (Math.random() > 0.5 ? 1 : -1) * (Math.PI * 0.25 + Math.random() * Math.PI * 0.45);
    } else {
      // Left edge — shoots hard left toward left screen edge
      sx = -hw;
      sy = -hh + Math.random() * hh * 2;
      angle = Math.PI + (Math.random() * Math.PI * 0.5 - Math.PI * 0.25); // tight leftward cone
    }

    const speed = 0.08 + Math.random() * 0.12;

    setBeads(prev => [...prev, {
      id,
      x: sx, y: sy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      size:    1.2 + Math.random() * 1.8,
      opacity: 0.28 + Math.random() * 0.22,
      life:    1.0,
      decay:   0.0004 + Math.random() * 0.0005,
    }]);
  }

  useEffect(() => {
    function tick() {
      setBeads(prev =>
        prev
          .map(b => ({
            ...b,
            x: b.x + b.vx,
            y: b.y + b.vy,
            vy: b.vy + 0.006, // gravity accelerates downward
            life: b.life - b.decay,
            opacity: b.opacity * (b.life - b.decay),
          }))
          .filter(b => b.life > 0.02)
      );
      frameRef.current = requestAnimationFrame(tick);
    }
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <>
      {beads.map(b => (
        <div key={b.id} style={{
          position:     'absolute',
          left:         '50%',
          top:          '50%',
          width:        b.size,
          height:       b.size,
          borderRadius: '50%',
          background:   `rgba(232, 195, 100, ${b.opacity})`,
          boxShadow:    `0 0 ${b.size * 2}px rgba(232, 195, 100, ${b.opacity * 0.8})`,
          transform:    `translate(calc(-50% + ${b.x}px), calc(-50% + ${b.y}px))`,
          pointerEvents: 'none',
          zIndex:        4,
        }} />
      ))}
    </>
  );
}
