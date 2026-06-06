import React, { useEffect, useRef } from 'react';

export const CursorOverlay = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });

  useEffect(() => {
    // Only fine pointers (mouse/trackpad) get cursor trails
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e) => {
      const { x, y } = mouseRef.current;
      mouseRef.current.lastX = x;
      mouseRef.current.lastY = y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      // Spawn particles when mouse moves
      const dist = Math.hypot(e.clientX - x, e.clientY - y);
      
      // Interpolate trail points to avoid gaps when mouse moves fast
      const count = Math.min(Math.floor(dist / 3) + 1, 5);

      for (let i = 0; i < count; i++) {
        const ratio = i / count;
        const spawnX = x + (e.clientX - x) * ratio;
        const spawnY = y + (e.clientY - y) * ratio;

        particlesRef.current.push({
          x: spawnX + (Math.random() - 0.5) * 5,
          y: spawnY + (Math.random() - 0.5) * 5,
          vx: (Math.random() - 0.5) * 2.8,
          vy: -0.4 - Math.random() * 0.9, // float upward initially with more speed variation
          size: 1.2 + Math.random() * 1.6,
          opacity: 0.65 + Math.random() * 0.35,
          life: 1.0,
          decay: 0.018 + Math.random() * 0.016, // fade duration
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animId;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        // Update physics
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.005; // gentle downward gravity pull
        p.life -= p.decay;
        p.opacity = Math.max(0, p.opacity * p.life);

        // Draw particle with candlelit firefly glow style
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        ctx.shadowBlur = p.size * 3;
        ctx.shadowColor = `rgba(232, 195, 100, ${p.opacity * 0.95})`;
        ctx.fillStyle = `rgba(232, 195, 100, ${p.opacity})`;
        ctx.fill();
      });

      // Filter dead particles
      particlesRef.current = particlesRef.current.filter(p => p.life > 0.01);

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 999999,
      }}
    />
  );
};

export default CursorOverlay;
