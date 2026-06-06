import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const ContributorCard = ({ contributor, className = '', ...props }) => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();
  
  if (!contributor) return null;

  const { id, name, role, team, impactScore } = contributor;

  // Generate initials
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .substring(0, 2);

  // Generate mock sparkline points (representing dynamic upward impact score over time)
  // Let's create an SVG line path with a nice glow.
  const sparklineData = [10, 15, 8, 22, 18, 30, 25, 42];
  const width = 140;
  const height = 30;
  const maxVal = Math.max(...sparklineData);
  const minVal = Math.min(...sparklineData);
  const range = maxVal - minVal;
  
  const points = sparklineData.map((val, idx) => {
    const x = (idx / (sparklineData.length - 1)) * width;
    const y = height - ((val - minVal) / range) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(' ');

  const handleCardClick = () => {
    playSound('card_click');
    navigate(`/app/discover?id=${id}`);
  };

  const handleGenerate = (e) => {
    e.stopPropagation();
    playSound('click');
    navigate(`/app/letters?id=${id}&action=generate`);
  };

  const handleViewSignals = (e) => {
    e.stopPropagation();
    playSound('click');
    navigate(`/app/discover?id=${id}`);
  };

  return (
    <div
      className={`card-surface flex flex-col align-center ${className}`}
      data-cursor="pointer"
      data-sound="card_hover"
      onClick={handleCardClick}
      style={{
        width: '200px',
        minHeight: '270px',
        padding: 'var(--space-md)',
        textAlign: 'center',
        justifyContent: 'space-between'
      }}
      {...props}
    >
      <div className="flex flex-col align-center" style={{ width: '100%' }}>
        {/* Avatar with Initials */}
        <div
          className="flex align-center justify-center"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--violet-deep)',
            color: 'var(--violet-ghost)',
            fontFamily: 'var(--font-display)',
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: 'var(--space-xs)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
            border: '1.5px solid var(--bg-border)'
          }}
        >
          {initials}
        </div>

        {/* Contributor Metadata */}
        <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', marginBottom: '2px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', width: '100%' }}>
          {name}
        </h4>
        <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
          {role}
        </span>
        <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '8px' }}>
          {team} Team
        </span>

        {/* Impact Badge */}
        <div
          style={{
            background: 'rgba(201, 147, 58, 0.12)',
            color: 'var(--gold-bright)',
            border: '1px solid rgba(201, 147, 58, 0.3)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-pill)',
            fontSize: '10px',
            fontFamily: 'var(--font-ui)',
            fontWeight: '600',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-sm)'
          }}
        >
          IMPACT: {impactScore}
        </div>
      </div>

      {/* Sparkline Visual */}
      <div style={{ width: '100%', height: '30px', margin: '4px 0 12px 0' }} title="Activity Sparkline">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
          <polyline
            fill="none"
            stroke="var(--violet-glow)"
            strokeWidth="1.5"
            points={points}
            style={{ filter: 'drop-shadow(0 0 2px rgba(164, 142, 232, 0.5))' }}
          />
          {/* Subtle gradient fill below sparkline */}
          <path
            d={`M 0,${height} L ${points} L ${width},${height} Z`}
            fill="url(#sparklineGrad)"
            opacity="0.1"
          />
          <defs>
            <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--violet-glow)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Action CTA Grid */}
      <div className="flex flex-col gap-xs" style={{ width: '100%' }}>
        <button
          className="btn-primary"
          onClick={handleGenerate}
          style={{
            fontSize: '10px',
            padding: '6px var(--space-sm)',
            width: '100%',
            borderRadius: 'var(--radius-sm)'
          }}
          data-sound="click"
        >
          Generate Letter
        </button>
        <button
          className="btn-secondary"
          onClick={handleViewSignals}
          style={{
            fontSize: '10px',
            padding: '5px var(--space-sm)',
            width: '100%',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          View Signals
        </button>
      </div>
    </div>
  );
};
