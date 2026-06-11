import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PetalCanvas from '../components/ui/PetalCanvas';
import connectBg from '../assets/connect-bg.jpg';
import githubIcon from '../assets/icons/github.svg';
import slackIcon from '../assets/icons/slack.svg';
import jiraIcon from '../assets/icons/jira.svg';
import notionIcon from '../assets/icons/notion.svg';
import { useAuth } from '../hooks/useAuth';
import Firefly from '../components/landing/Firefly';

// ─── Data ────────────────────────────────────────────────────────────────────

const SOURCES = [
  { id: 'github', label: 'GitHub', icon: githubIcon, invertIcon: true },
  { id: 'slack',  label: 'Slack',  icon: slackIcon },
  { id: 'jira',   label: 'Jira',   icon: jiraIcon },
  { id: 'notion', label: 'Notion', icon: notionIcon, invertIcon: true },
];

function statusInfo(state) {
  if (state === 'connected') return { color: '#4caf86', text: 'Live' };
  if (state === 'connecting') return { color: '#e8a84a', text: 'Syncing' };
  return { color: 'rgba(255,255,255,0.2)', text: 'Disconnected' };
}

// ─── SourceCard ──────────────────────────────────────────────────────────────

function SourceCard({ source, state, onConnect }) {
  const [hovered, setHovered] = useState(false);
  const { color, text } = statusInfo(state);
  const isConnected = state === 'connected';
  const isConnecting = state === 'connecting';

  return (
    <div style={{
      width: 200,
      minHeight: 260,
      background: 'rgba(10,8,20,0.75)',
      border: `1px solid ${isConnected
        ? 'rgba(91,69,196,0.6)'
        : 'rgba(42,37,69,0.8)'}`,
      borderRadius: 16,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      boxShadow: isConnected
        ? 'inset 0 0 30px rgba(91,69,196,0.08)'
        : 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '32px 20px 24px',
      transition: 'border 0.3s ease, box-shadow 0.3s ease',
    }}>

      {/* Icon */}
      <img
        src={source.icon}
        alt={source.label}
        width={64}
        height={64}
        style={{
          objectFit: 'contain',
          filter: source.invertIcon ? 'invert(0.85)' : 'none',
        }}
      />

      {/* Name */}
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: 18,
        fontWeight: 500,
        color: '#e8e2fc',
        marginTop: 16,
      }}>
        {source.label}
      </span>

      {/* Status dot + label */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        marginTop: 10,
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: color,
          boxShadow: isConnected ? `0 0 6px ${color}` : 'none',
          transition: 'background 0.4s ease',
        }} />
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 13,
          color: isConnected ? color : '#a89ed4',
        }}>
          {text}
        </span>
      </div>

      {/* Button */}
      <button
        onClick={() => !isConnected && !isConnecting && onConnect(source.id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        disabled={isConnected || isConnecting}
        style={{
          marginTop: 20,
          width: '100%',
          padding: '10px 0',
          background: 'rgba(20,17,38,0.9)',
          border: `1px solid ${hovered && !isConnected
            ? 'rgba(91,69,196,0.6)'
            : 'rgba(42,37,69,0.8)'}`,
          borderRadius: 8,
          color: isConnected ? '#e8e2fc' : '#a89ed4',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 14,
          cursor: isConnected || isConnecting ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          transition: 'border 0.25s ease, color 0.25s ease',
        }}
      >
        {isConnecting && (
          <div style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: '2px solid rgba(164,142,210,0.3)',
            borderTop: '2px solid #a48ee8',
            animation: 'spin 0.8s linear infinite',
          }} />
        )}
        {isConnected ? 'Connected  ✓' : isConnecting ? 'Connecting...' : 'Connect'}
      </button>

    </div>
  );
}

// ─── BarSpark ────────────────────────────────────────────────────────────────

function BarSpark() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width  = 60;
    canvas.height = 60;

    const sparks = Array.from({ length: 10 }, () => spawnSpark());

    function spawnSpark() {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.6;
      return {
        x:       30,
        y:       30,
        vx:      Math.cos(angle) * speed,
        vy:      Math.sin(angle) * speed,
        size:    1.5 + Math.random() * 2.5,
        life:    1.0,
        decay:   0.018 + Math.random() * 0.022,
      };
    }

    function drawSparkle(ctx, x, y, size, opacity) {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.translate(x, y);
      ctx.shadowBlur  = size * 3;
      ctx.shadowColor = `rgba(220, 190, 255, ${opacity})`;
      // 4-point star: two thin crosses overlaid
      [0, Math.PI / 4].forEach(angle => {
        ctx.save();
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -size * 2.2);
        ctx.lineTo(size * 0.18, 0);
        ctx.lineTo(0, size * 2.2);
        ctx.lineTo(-size * 0.18, 0);
        ctx.closePath();
        ctx.fillStyle = `rgba(255, 245, 210, ${opacity})`;
        ctx.fill();
        ctx.restore();
      });
      // Bright center dot
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fill();
      ctx.restore();
    }

    let animId;
    function animate() {
      ctx.clearRect(0, 0, 60, 60);

      sparks.forEach((s, i) => {
        s.x        += s.vx;
        s.y        += s.vy;
        s.life     -= s.decay;

        if (s.life <= 0) sparks[i] = spawnSpark();

        drawSparkle(ctx, s.x, s.y, s.size, s.life * 0.85);
      });

      animId = requestAnimationFrame(animate);
    }

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      'absolute',
        right:         -30,
        top:           '50%',
        transform:     'translateY(-50%)',
        width:         60,
        height:        60,
        pointerEvents: 'none',
      }}
    />
  );
}

// ─── ProgressSection ─────────────────────────────────────────────────────────

function ProgressSection({ onComplete, isAdditional }) {
  const [pct, setPct] = useState(0);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef(null);

  // Fade-in entry via double rAF
  useEffect(() => {
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setMounted(true))
    );
  }, []);

  // Count up 0→100 over ~6000ms with organic jitter
  useEffect(() => {
    const step = 100 / (6000 / 80);
    intervalRef.current = setInterval(() => {
      setPct(p => {
        const next = Math.min(100, p + step + (Math.random() * step * 0.4));
        if (next >= 100) {
          clearInterval(intervalRef.current);
          onComplete();
        }
        return next;
      });
    }, 80);
    return () => clearInterval(intervalRef.current);
  }, [onComplete]);

  const displayPct = Math.floor(pct);

  return (
    <div style={{
      width: '100%',
      maxWidth: 860,
      background: 'rgba(10,8,20,0.75)',
      border: '1px solid rgba(42,37,69,0.8)',
      borderRadius: 16,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      padding: '32px 40px',
      opacity: mounted ? 1 : 0,
      transform: mounted ? 'translateY(0)' : 'translateY(16px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>

      {/* Label */}
      <p style={{
        fontFamily: "'Lora', Georgia, serif",
        fontStyle: 'italic',
        fontSize: 20,
        color: '#e8c97a',
        textAlign: 'center',
        margin: '0 0 24px 0',
      }}>
        {pct >= 100
          ? (isAdditional ? "Additional signals integrated." : "Signals read. The record is complete.")
          : (isAdditional ? "Reading additional signals..." : "We're reading the signals.")
        }
      </p>

      {/* Bar row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

        {/* Track */}
        <div style={{
          flex: 1,
          height: 6,
          background: 'rgba(42,37,69,0.8)',
          borderRadius: 999,
          position: 'relative',
          overflow: 'visible',
        }}>
          {/* Fill */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #3d2f8a, #7c65d6)',
            borderRadius: 999,
            transition: 'width 0.08s linear',
            overflow: 'visible',
          }}>
            {/* Diamond firefly spark at leading edge */}
            <BarSpark />
          </div>
        </div>

        {/* Percentage */}
        <span style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 14,
          color: '#a89ed4',
          minWidth: 38,
          textAlign: 'right',
        }}>
          {displayPct}%
        </span>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Connect() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [states, setStates] = useState({
    github: 'disconnected',
    slack: 'disconnected',
    jira: 'disconnected',
    notion: 'disconnected',
  });

  const connectedCount = Object.values(states).filter(s => s === 'connected').length;
  const showProgress = connectedCount >= 2;
  const [ready, setReady] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  // Reset ready state to hide the continue button and force a reload when new sources connect
  useEffect(() => {
    setReady(false);
  }, [connectedCount]);

  const isConnecting = Object.values(states).some(s => s === 'connecting');

  function handleConnect(id) {
    setStates(s => ({ ...s, [id]: 'connecting' }));
    setTimeout(() => {
      setStates(s => ({ ...s, [id]: 'connected' }));
    }, 1800);
  }

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#05040e',
    }}>

      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${connectBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />

      {/* Dark overlay — stronger than landing */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(5,4,14,0.55) 0%, rgba(5,4,14,0.82) 100%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Petals */}
      <PetalCanvas page="connect" />

      {/* Content */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 48,
        paddingTop: '0',
        paddingBottom: '8vh',
        paddingLeft: '40px',
        paddingRight: '40px',
        overflowY: 'auto',
      }}>

        {/* Header */}
        <div style={{
          textAlign: 'center',
          position: 'relative',
          padding: '8px 24px',
          overflow: 'visible',
        }}>
          {/* Firefly beads emanating from the header title area */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 3 }}>
            <Firefly hovered={false} hw={220} hh={30} idleInterval={120} hoverInterval={120} />
            <Firefly hovered={false} hw={200} hh={24} idleInterval={140} hoverInterval={140} />
          </div>

          <h1 style={{
            fontFamily: "'Cinzel', serif",
            fontSize: 'clamp(28px, 4vw, 46px)',
            fontWeight: 600,
            color: '#e8c97a',
            margin: '0 0 12px 0',
            letterSpacing: '0.04em',
            position: 'relative',
            zIndex: 2,
            animation: 'brand-text-glow 18s ease-in-out infinite',
          }}>
            Connect your workspace
          </h1>
          <p style={{
            fontFamily: "'Lora', Georgia, serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: '#a89ed4',
            margin: 0,
            position: 'relative',
            zIndex: 2,
          }}>
            We'll gather the signals to surface invisible impact.
          </p>

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
          `}</style>
        </div>

        {/* Source cards */}
        <div style={{
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {SOURCES.map(source => (
            <SourceCard
              key={source.id}
              source={source}
              state={states[source.id]}
              onConnect={handleConnect}
            />
          ))}
        </div>

        {/* Progress — fades in when ≥2 connected */}
        {showProgress && (
          <ProgressSection
            key={connectedCount}
            onComplete={() => setReady(true)}
            isAdditional={connectedCount > 2}
          />
        )}

        {ready && !isConnecting && (
          <div
            style={{
              position: 'fixed',
              bottom: 36,
              right: 48,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'visible',
              zIndex: 10,
            }}
          >
            {/* Dynamic ambient glow wrapper */}
            <div style={{
              position: 'absolute',
              inset: '-30px -50px',
              pointerEvents: 'none',
              zIndex: 1,
              animation: 'button-glow-opacity 18s ease-in-out infinite',
            }}>
              {/* Outer glow layer */}
              <div style={{
                position: 'absolute',
                inset: '8px 5px',
                clipPath: 'ellipse(50% 50% at 50% 50%)',
                background: btnHovered
                  ? 'radial-gradient(ellipse at center, rgba(61,35,160,0.45) 0%, rgba(40,20,110,0.22) 50%, transparent 72%)'
                  : 'radial-gradient(ellipse at center, rgba(40,22,120,0.35) 0%, rgba(28,14,85,0.15) 50%, transparent 70%)',
                transition: 'background 0.5s ease',
              }} />

              {/* Core diamond background */}
              <div style={{
                position: 'absolute',
                inset: '22px 20px',
                clipPath: 'ellipse(50% 50% at 50% 50%)',
                background: btnHovered
                  ? 'radial-gradient(ellipse at center, rgba(70,42,180,0.4) 0%, rgba(45,25,130,0.22) 45%, transparent 68%)'
                  : 'radial-gradient(ellipse at center, rgba(50,28,150,0.35) 0%, rgba(32,16,100,0.18) 45%, transparent 65%)',
                transition: 'background 0.4s ease',
              }} />
            </div>

            {/* The actual button */}
            <button
              onClick={() => { login(); navigate('/transition'); }}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              style={{
                position: 'relative',
                zIndex: 5,
                padding: '14px 44px',
                background: 'transparent',
                border: 'none',
                color: '#e8c97a',
                fontFamily: "'Cinzel', serif",
                fontSize: 16,
                letterSpacing: '0.1em',
                cursor: 'pointer',
                outline: 'none',
                transition: 'color 0.3s ease',
                textShadow: btnHovered
                  ? '0 0 20px rgba(164, 130, 230, 0.6)'
                  : '0 0 12px rgba(130, 100, 200, 0.3)',
              }}
            >
              Continue →
            </button>

            {/* Embedded CSS Keyframes for synced button glow opacity */}
            <style>{`
              @keyframes button-glow-opacity {
                0%, 100% { opacity: 0.85; }
                8% { opacity: 0.90; }
                10% { opacity: 0.75; }
                12% { opacity: 0.88; }
                20% { opacity: 1.0; }
                25% { opacity: 0.90; }
                35% { opacity: 0.75; }
                37% { opacity: 0.70; }
                48% { opacity: 0.55; }
                50% { opacity: 0.60; }
                60% { opacity: 0.35; }
                65% { opacity: 0.38; }
                67% { opacity: 0.32; }
                70% { opacity: 0.42; }
                75% { opacity: 0.35; }
                85% { opacity: 0.60; }
                87% { opacity: 0.55; }
                95% { opacity: 0.80; }
              }
            `}</style>
          </div>
        )}

      </div>

      {/* Spinner keyframe */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}
