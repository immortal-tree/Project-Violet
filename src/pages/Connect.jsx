import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useConnectionState } from '../hooks/useConnectionState';
import { useSoundEffect } from '../hooks/useSoundEffect';
import {
  QuillIcon,
  SpinnerIcon,
  GitHubBrandIcon,
  SlackBrandIcon,
  JiraBrandIcon,
  NotionBrandIcon
} from '../components/icons';

export const SourceCard = ({ source, onConnect }) => {
  const playSound = useSoundEffect();
  const { id, label, color, status } = source;

  const renderIcon = () => {
    const iconSize = 32;
    switch (id) {
      case 'github':
        return <GitHubBrandIcon size={iconSize} style={{ color }} />;
      case 'slack':
        return <SlackBrandIcon size={iconSize} style={{ color }} />;
      case 'jira':
        return <JiraBrandIcon size={iconSize} style={{ color }} />;
      case 'notion':
        return <NotionBrandIcon size={iconSize} style={{ color }} />;
      default:
        return null;
    }
  };

  const handleConnect = () => {
    playSound('click');
    onConnect(id);
  };

  const getStatusText = () => {
    if (status === 'live') return 'Live';
    if (status === 'connecting') return 'Syncing';
    return 'Disconnected';
  };

  const getStatusColor = () => {
    if (status === 'live') return 'var(--success)';
    if (status === 'connecting') return 'var(--warning)';
    return 'var(--text-muted)';
  };

  return (
    <div
      className="card-surface flex flex-col justify-between"
      style={{
        padding: 'var(--space-md) var(--space-lg)',
        minHeight: '160px',
        backgroundColor: 'var(--bg-surface)',
        border: `1px solid ${status === 'live' ? 'var(--violet-deep)' : 'var(--bg-border)'}`,
        transition: 'border-color var(--transition-normal)'
      }}
    >
      <div className="flex justify-between align-center" style={{ width: '100%' }}>
        {renderIcon()}
        {/* Status indicator dot */}
        <div className="flex align-center gap-xs">
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: getStatusColor(),
              boxShadow: status === 'live' ? '0 0 8px var(--success)' : 'none'
            }}
          />
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: '500' }}>
            {getStatusText()}
          </span>
        </div>
      </div>

      <div style={{ marginTop: 'var(--space-sm)' }}>
        <h4 className="font-display" style={{ fontSize: '16px', color: 'var(--text-primary)' }}>
          {label}
        </h4>
      </div>

      <div style={{ marginTop: 'var(--space-md)' }}>
        {status === 'disconnected' && (
          <button
            onClick={handleConnect}
            className="btn-secondary"
            style={{ width: '100%', fontSize: '12px', padding: '6px 12px' }}
          >
            Connect
          </button>
        )}
        {status === 'connecting' && (
          <button
            disabled
            className="btn-secondary flex align-center justify-center gap-xs"
            style={{ width: '100%', fontSize: '12px', padding: '6px 12px', opacity: 0.8 }}
          >
            <SpinnerIcon size={14} />
            Connecting...
          </button>
        )}
        {status === 'live' && (
          <button
            disabled
            className="btn-primary"
            style={{
              width: '100%',
              fontSize: '12px',
              padding: '6px 12px',
              background: 'rgba(76, 175, 134, 0.15)',
              borderColor: 'var(--success)',
              color: 'var(--success)',
              boxShadow: 'none'
            }}
          >
            Connected ✓
          </button>
        )}
      </div>
    </div>
  );
};

export const Connect = () => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();
  const { login } = useAuth();
  const { sources, connectSource, getConnectedCount } = useConnectionState();
  const [progress, setProgress] = useState(0);
  const [progressComplete, setProgressComplete] = useState(false);

  const connectedCount = getConnectedCount();

  // Trigger progress animation when at least 2 sources connected
  useEffect(() => {
    if (connectedCount >= 2) {
      setProgress(0);
      setProgressComplete(false);
      
      const duration = 4000; // 4 seconds progress bar
      const intervalTime = 40; // update every 40ms
      const increment = (100 / duration) * intervalTime;

      const timer = setInterval(() => {
        setProgress((prev) => {
          const next = prev + increment;
          if (next >= 100) {
            clearInterval(timer);
            setProgressComplete(true);
            return 100;
          }
          return next;
        });
      }, intervalTime);

      return () => clearInterval(timer);
    } else {
      setProgress(0);
      setProgressComplete(false);
    }
  }, [connectedCount]);

  const handleContinue = () => {
    playSound('click');
    login();
    navigate('/transition');
  };

  return (
    <div
      className="flex"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--bg-void)',
        overflow: 'hidden'
      }}
    >
      {styleTag}
      {/* Left Panel (40%) */}
      <div
        className="flex flex-col justify-between parchment-left-panel"
        style={{
          width: '40%',
          height: '100%',
          padding: 'var(--space-2xl) var(--space-xl)',
          borderRight: '1px solid var(--gold-warm)',
          position: 'relative'
        }}
      >
        {/* Parchment background overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, #1f170b 0%, #0c0a06 100%)',
            opacity: 0.9,
            zIndex: -1
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            opacity: 0.7,
            zIndex: -1
          }}
        />

        {/* Top Logo */}
        <div className="flex align-center gap-xs" style={{ color: 'var(--gold-bright)' }}>
          <QuillIcon size={32} />
          <span className="font-display" style={{ fontSize: '20px', fontWeight: '600', letterSpacing: '0.05em' }}>
            Auto Memory
          </span>
        </div>

        {/* Inspirational Quote */}
        <div className="flex flex-col gap-md">
          <p
            className="font-body"
            style={{
              fontSize: '20px',
              fontStyle: 'italic',
              lineHeight: '1.7',
              color: '#d4b780',
              textAlign: 'left'
            }}
          >
            "We will gather every quiet contribution. Every reviewed line, every answered thread, every closed ticket... until the story of their work is complete."
          </p>
          <span className="font-ui" style={{ fontSize: '12px', color: 'var(--gold-warm)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            — Scriptorium Core Engine
          </span>
        </div>

        {/* Page indicator or subtle note */}
        <div style={{ color: 'var(--text-muted)', fontSize: '11px' }}>
          Onboarding Process • Step 1 of 2
        </div>
      </div>

      {/* Right Panel (60%) */}
      <div
        className="flex flex-col justify-center align-center"
        style={{
          width: '60%',
          height: '100%',
          padding: 'var(--space-2xl) var(--space-xl)',
          overflowY: 'auto'
        }}
      >
        <div className="flex flex-col" style={{ width: '100%', maxWidth: '540px' }}>
          {/* Header */}
          <div style={{ marginBottom: 'var(--space-xl)' }}>
            <h2
              className="font-display"
              style={{
                fontSize: '32px',
                color: 'var(--violet-ghost)',
                marginBottom: 'var(--space-xs)',
                letterSpacing: '0.02em'
              }}
            >
              Connect your workspace
            </h2>
            <p className="font-body" style={{ color: 'var(--text-secondary)', fontSize: '15px', fontStyle: 'italic' }}>
              We'll gather the signals to surface invisible impact. Connect at least 2 sources to begin.
            </p>
          </div>

          {/* Cards Grid */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--space-md)',
              marginBottom: 'var(--space-xl)'
            }}
          >
            {sources.map((src) => (
              <SourceCard key={src.id} source={src} onConnect={connectSource} />
            ))}
          </div>

          {/* Progress Section */}
          {connectedCount >= 2 && (
            <div className="flex flex-col gap-sm animate-fade-up" style={{ width: '100%' }}>
              <div className="flex justify-between align-center" style={{ width: '100%' }}>
                <span
                  className="font-body"
                  style={{
                    fontSize: '13px',
                    fontStyle: 'italic',
                    color: progressComplete ? 'var(--success)' : 'var(--text-secondary)'
                  }}
                >
                  {progressComplete ? 'Signals gathered successfully ✓' : "We're reading the signals. This takes a few moments."}
                </span>
                <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--gold-bright)' }}>
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Progress Bar Track */}
              <div
                style={{
                  height: '6px',
                  width: '100%',
                  backgroundColor: 'var(--bg-elevated)',
                  borderRadius: 'var(--radius-pill)',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${progress}%`,
                    backgroundColor: progressComplete ? 'var(--success)' : 'var(--violet-mid)',
                    boxShadow: progressComplete ? '0 0 10px rgba(76, 175, 134, 0.4)' : '0 0 10px rgba(91, 69, 196, 0.4)',
                    borderRadius: 'var(--radius-pill)',
                    transition: 'width 0.1s linear'
                  }}
                />
              </div>

              {/* Continue Button */}
              {progressComplete && (
                <button
                  onClick={handleContinue}
                  className="btn-primary animate-fade-up"
                  style={{
                    marginTop: 'var(--space-md)',
                    padding: '12px',
                    width: '100%',
                    boxShadow: '0 4px 15px rgba(91, 69, 196, 0.3)'
                  }}
                >
                  Continue →
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styleTag = (
  <style>{`
    @media (max-width: 900px) {
      .parchment-left-panel {
        display: none !important;
      }
      main, .flex > div {
        width: 100% !important;
      }
    }
  `}</style>
);

export default Connect;
