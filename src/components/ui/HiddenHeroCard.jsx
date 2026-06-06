import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatCard } from './StatCard';
import { WaxSealIcon, CodeBracketsIcon, PeopleGroupIcon, ShieldCheckIcon, StarIcon } from '../icons';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const HiddenHeroCard = ({ contributor }) => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();

  if (!contributor) return null;

  const { id, name, role, tagline, stats } = contributor;
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);

  const handleViewStory = (e) => {
    e.preventDefault();
    playSound('click');
    navigate(`/app/discover?id=${id}`);
  };

  return (
    <div
      className="card-surface"
      style={{
        boxShadow: 'inset 0 0 40px rgba(92,69,196,0.08)',
        padding: 'var(--space-lg)',
        width: '100%'
      }}
    >
      {/* Header */}
      <div className="flex align-center gap-xs" style={{ marginBottom: 'var(--space-md)' }}>
        <WaxSealIcon size={28} />
        <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--gold-bright)' }}>
          Hidden Hero of the Month
        </h4>
      </div>

      {/* Body Grid */}
      <div className="hidden-hero-body">
        <style>{`
          .hidden-hero-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--space-lg);
          }
          .hero-left-section {
            display: flex;
            align-items: center;
            gap: var(--space-md);
            text-align: left;
          }
          .avatar-container {
            position: relative;
            width: 80px;
            height: 80px;
            flex-shrink: 0;
          }
          .avatar-circle {
            width: 72px;
            height: 72px;
            border-radius: 50%;
            background-color: var(--violet-deep);
            color: var(--violet-ghost);
            font-size: 24px;
            font-weight: 600;
            position: absolute;
            top: 4px;
            left: 4px;
            border: 1.5px solid var(--bg-border);
          }
          .botanical-ring {
            position: absolute;
            top: 0;
            left: 0;
            width: 80px;
            height: 80px;
            pointer-events: none;
            color: var(--gold-warm);
            opacity: 0.7;
          }
          .hero-stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-sm);
          }
          @media (max-width: 1100px) {
            .hidden-hero-body {
              grid-template-columns: 1fr;
            }
          }
          @media (max-width: 550px) {
            .hero-left-section {
              flex-direction: column;
              text-align: center;
              align-items: center;
            }
            .hero-stats-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        {/* Left Section: Avatar, Info, Tagline */}
        <div className="hero-left-section">
          <div className="avatar-container">
            {/* Botanical decorative circle ring */}
            <svg className="botanical-ring" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2">
              <circle cx="50" cy="50" r="46" strokeDasharray="3,3" />
              <path d="M 50,2 Q 40,15 50,25 Q 60,15 50,2 Z" fill="currentColor" opacity="0.3" />
              <path d="M 98,50 Q 85,40 75,50 Q 85,60 98,50 Z" fill="currentColor" opacity="0.3" />
              <path d="M 50,98 Q 40,85 50,75 Q 60,85 50,98 Z" fill="currentColor" opacity="0.3" />
              <path d="M 2,50 Q 15,40 25,50 Q 15,60 2,50 Z" fill="currentColor" opacity="0.3" />
            </svg>
            <div className="flex align-center justify-center font-display avatar-circle">
              {initials}
            </div>
          </div>
          
          <div className="flex flex-col">
            <h3 className="font-display" style={{ fontSize: '22px', color: 'var(--text-primary)', marginBottom: '4px' }}>
              {name}
            </h3>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '8px' }}>
              {role}
            </span>
            <p className="font-body" style={{ fontSize: '13px', fontStyle: 'italic', color: '#d4b780', lineHeight: '1.5' }}>
              "{tagline}"
            </p>
          </div>
        </div>

        {/* Right Section: Stats Cards */}
        <div className="hero-stats-grid">
          <StatCard icon={CodeBracketsIcon} value={stats.prReviews} label="PRs reviewed" />
          <StatCard icon={PeopleGroupIcon} value={stats.developersHelped} label="Developers helped" />
          <StatCard icon={ShieldCheckIcon} value={stats.bugsPrevented} label="Bugs prevented" />
          <StatCard icon={StarIcon} value={stats.majorFeaturesImpacted} label="Major features impacted" />
        </div>
      </div>

      {/* Footer Link */}
      <div style={{ marginTop: 'var(--space-md)', borderTop: '1px solid rgba(42, 37, 69, 0.4)', paddingTop: 'var(--space-sm)', textAlign: 'right' }}>
        <a
          href={`/app/discover?id=${id}`}
          onClick={handleViewStory}
          style={{
            fontSize: '12px',
            fontWeight: '600',
            fontFamily: 'var(--font-ui)',
            color: 'var(--violet-glow)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          View full story →
        </a>
      </div>
    </div>
  );
};
export default HiddenHeroCard;
