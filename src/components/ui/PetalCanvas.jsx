import React, { useEffect, useRef } from 'react';
import petal1 from '../../assets/petals/petal1.png';
import petal2 from '../../assets/petals/petal2.png';
import petal3 from '../../assets/petals/petal3.png';
import petal4 from '../../assets/petals/petal4.png';
import petal5 from '../../assets/petals/petal5.png';
import petal6 from '../../assets/petals/petal6.png';
import petal7 from '../../assets/petals/petal7.png';

const PETAL_IMGS = [petal1, petal2, petal3, petal4, petal5, petal6, petal7];

const PETAL_COUNT = 18;
const PETAL_COLORS = ['#9b7fd4', '#b89ee0', '#7a5cb8', '#c4a8e8', '#6b4fa8'];

export default function PetalCanvas({ page }) {
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
    const petalImgs = PETAL_IMGS.map(src => {
      const img = new Image();
      img.src = src;
      return img;
    });

    const isConnect = page === 'connect';

    // Helper to get side-biased X coordinate
    const getXPosition = (width) => {
      if (isConnect) {
        // 90% chance to be in the outer 25% of the screen (left or right), 10% in the center 50%
        if (Math.random() < 0.9) {
          if (Math.random() < 0.5) {
            return Math.random() * (width * 0.25);
          } else {
            return width * 0.75 + Math.random() * (width * 0.25);
          }
        } else {
          return width * 0.25 + Math.random() * (width * 0.5);
        }
      }
      return Math.random() * width;
    };

    const petals = Array.from({ length: PETAL_COUNT }, () => {
      const size = 28 + Math.random() * 32;
      const speedX = isConnect 
        ? -0.4 + Math.random() * 0.8 // slow drift horizontally
        : -1.5 - Math.random() * 2.0; // standard right-to-left
      const speedY = isConnect
        ? 1.2 + Math.random() * 1.8 // move down
        : -0.1 + Math.random() * 0.2; // standard slight vertical drift

      return {
        x: getXPosition(window.innerWidth),
        y: Math.random() * window.innerHeight,
        size,
        speedX,
        speedY,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (-0.01 + Math.random() * 0.02),
        opacity: 0.25 + Math.random() * 0.45,
        img: petalImgs[Math.floor(Math.random() * petalImgs.length)],
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.008 + Math.random() * 0.012,
      };
    });

    // Helper to get sparkle position
    const getSparklePosition = (width, height) => {
      if (isConnect) {
        // Outer 30% on left or right, anywhere vertically (where the flowers are)
        const isLeft = Math.random() < 0.5;
        const x = isLeft ? Math.random() * (width * 0.3) : width * 0.7 + Math.random() * (width * 0.3);
        const y = Math.random() * height;
        return { x, y };
      } else {
        return {
          x: Math.random() * width,
          y: height * 0.65 + Math.random() * (height * 0.35),
        };
      }
    };

    // Initialize sparse firefly sparkles
    const sparkles = Array.from({ length: isConnect ? 35 : 14 }, () => {
      const pos = getSparklePosition(window.innerWidth, window.innerHeight);
      const speedX = isConnect
        ? -0.25 + Math.random() * 0.5
        : -0.15 + Math.random() * 0.3;
      const speedY = isConnect
        ? -0.2 + Math.random() * 0.4
        : -0.05 - Math.random() * 0.12;

      return {
        x: pos.x,
        y: pos.y,
        size: 1.0 + Math.random() * 1.5,
        opacity: 0.15 + Math.random() * 0.65,
        fadeSpeed: 0.004 + Math.random() * 0.008,
        direction: Math.random() > 0.5 ? 1 : -1,
        speedX,
        speedY,
      };
    });

    // Draw a single stylized petal using canvas path
    function drawPetal(ctx, x, y, size, rotation, opacity, img) {
      if (!img.complete || !img.naturalWidth) return;
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
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

        if (isConnect) {
          // Wrap/Respawn behavior for top-to-bottom
          if (p.y > canvas.height + 30) {
            p.y = -30;
            p.x = getXPosition(canvas.width);
          }
          if (p.x < -30 || p.x > canvas.width + 30) {
            p.x = getXPosition(canvas.width);
            p.y = -30;
          }
        } else {
          // Standard right-to-left wrap behavior
          if (p.x < -30) {
            p.x = canvas.width + 30;
            p.y = Math.random() * canvas.height;
          }
          if (p.y > canvas.height + 30 || p.y < -30) {
            p.y = Math.random() * canvas.height;
            p.x = canvas.width + 30;
          }
        }

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity, p.img);
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
          // Relocate to a new position
          const pos = getSparklePosition(canvas.width, canvas.height);
          s.x = pos.x;
          s.y = pos.y;
          s.size = 1.0 + Math.random() * 1.5;
          s.speedX = isConnect
            ? -0.25 + Math.random() * 0.5
            : -0.15 + Math.random() * 0.3;
          s.speedY = isConnect
            ? -0.2 + Math.random() * 0.4
            : -0.05 - Math.random() * 0.12;
        }

        if (isConnect) {
          // Wrap if drifts far off screen
          if (s.x < -20 || s.x > canvas.width + 20 || s.y < -20 || s.y > canvas.height + 20) {
            const pos = getSparklePosition(canvas.width, canvas.height);
            s.x = pos.x;
            s.y = pos.y;
          }
        } else {
          // Respawn if floats above the bottom 40% region
          if (s.y < canvas.height * 0.55) {
            s.y = canvas.height + 10;
            s.x = Math.random() * canvas.width;
          }
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
  }, [page]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 3,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
      aria-hidden="true"
    />
  );
}
