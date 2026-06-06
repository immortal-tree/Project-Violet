import React, { useEffect, useRef } from 'react';

const PETAL_COUNT = 18;
const PETAL_COLORS = ['#9b7fd4', '#b89ee0', '#7a5cb8', '#c4a8e8', '#6b4fa8'];

export default function PetalCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Resize handler
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize petals with randomized properties
    const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 8 + Math.random() * 14,          // 8–22px
      speedX: -1.5 - Math.random() * 2.0,    // fast right-to-left speed
      speedY: -0.1 + Math.random() * 0.2,    // horizontal float, almost zero vertical speed
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (-0.01 + Math.random() * 0.02), // gentle tumble
      opacity: 0.25 + Math.random() * 0.45,  // 25–70% opacity
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      wobble: Math.random() * Math.PI * 2,   // phase offset for sine wobble
      wobbleSpeed: 0.008 + Math.random() * 0.012,
    }));

    // Initialize sparse firefly sparkles at the bottom of the screen
    const sparkles = Array.from({ length: 14 }, () => ({
      x: Math.random() * window.innerWidth,
      y: window.innerHeight * 0.65 + Math.random() * (window.innerHeight * 0.35),
      size: 1.0 + Math.random() * 1.5,
      opacity: 0.15 + Math.random() * 0.65,
      fadeSpeed: 0.004 + Math.random() * 0.008,
      direction: Math.random() > 0.5 ? 1 : -1,
      speedX: -0.15 + Math.random() * 0.3,
      speedY: -0.05 - Math.random() * 0.12, // float upward slowly
    }));

    // Draw a single stylized petal using canvas path
    function drawPetal(ctx, x, y, size, rotation, opacity, color) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      // Teardrop shape using bezier curves — matches petal.svg
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.7, -size * 0.5, size * 0.8, size * 0.3, 0, size);
      ctx.bezierCurveTo(-size * 0.8, size * 0.3, -size * 0.7, -size * 0.5, 0, -size);
      ctx.fillStyle = color;
      ctx.fill();
      // Center vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(0, size * 0.7);
      ctx.strokeStyle = 'rgba(196, 168, 232, 0.4)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();
    }

    let animId;
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Petals
      petals.forEach(p => {
        p.wobble += p.wobbleSpeed;
        p.x += p.speedX + Math.sin(p.wobble) * 0.4;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.x < -30) {
          p.x = canvas.width + 30;
          p.y = Math.random() * canvas.height;
        }
        if (p.y > canvas.height + 30 || p.y < -30) {
          p.y = Math.random() * canvas.height;
          p.x = canvas.width + 30;
        }

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity, p.color);
      });

      // 2. Draw Golden Sparkles
      sparkles.forEach(s => {
        // Move slowly
        s.x += s.speedX;
        s.y += s.speedY;

        // Pulse opacity
        s.opacity += s.fadeSpeed * s.direction;
        if (s.opacity >= 0.8) {
          s.direction = -1;
        } else if (s.opacity <= 0.05) {
          s.direction = 1;
          // Relocate to a new bottom position
          s.x = Math.random() * canvas.width;
          s.y = canvas.height * 0.65 + Math.random() * (canvas.height * 0.35);
          s.size = 1.0 + Math.random() * 1.5;
          s.speedX = -0.15 + Math.random() * 0.3;
          s.speedY = -0.05 - Math.random() * 0.12;
        }

        // Respawn if floats above the bottom 40% region
        if (s.y < canvas.height * 0.55) {
          s.y = canvas.height + 10;
          s.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.shadowBlur = s.size * 3.5;
        ctx.shadowColor = `rgba(232, 195, 100, ${s.opacity * 0.8})`;
        ctx.fillStyle = `rgba(232, 195, 100, ${s.opacity})`;
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    }

    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    />
  );
}
