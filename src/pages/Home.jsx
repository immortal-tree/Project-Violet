import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContributors } from '../hooks/useContributors';
import { useSoundEffect } from '../hooks/useSoundEffect';
import { Divider } from '../components/ui/Divider';
import { HiddenHeroCard } from '../components/ui/HiddenHeroCard';
import { Badge } from '../components/ui/Badge';
import {
  DocumentTickIcon,
  HeartIcon,
  QuillIcon,
  WaxSealIcon,
  LavenderSprig
} from '../components/icons';
import lineDivider from '../assets/line-divider.png';
import Firefly from '../components/landing/Firefly';

// Hero illustration right element
const HeroImage = () => {
  return (
    <svg
      viewBox="0 0 160 120"
      width="160"
      height="120"
      fill="none"
      style={{ display: 'block', pointerEvents: 'none' }}
      data-hero-image="true"
    >
      <defs>
        <linearGradient id="envelopeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a1f0e" />
          <stop offset="100%" stopColor="#1a1508" />
        </linearGradient>
      </defs>

      {/* Background radial glow */}
      <circle cx="80" cy="60" r="40" fill="var(--violet-deep)" opacity="0.15" />

      {/* Decorative Envelope */}
      <g transform="translate(20, 20) rotate(-10)">
        <rect x="0" y="0" width="80" height="50" rx="4" fill="url(#envelopeGrad)" stroke="var(--gold-warm)" strokeWidth="1" />
        <path d="M 0,0 L 40,25 L 80,0" stroke="var(--gold-warm)" strokeWidth="1" fill="none" />
        <path d="M 0,50 L 30,25 M 80,50 L 50,25" stroke="var(--gold-warm)" strokeWidth="0.8" opacity="0.7" />
        {/* Tiny Wax Seal in the middle */}
        <circle cx="40" cy="25" r="7" fill="#871b1b" stroke="var(--gold-bright)" strokeWidth="0.5" />
      </g>

      {/* Lavender Flower Overlay */}
      <g transform="translate(90, 10) scale(0.45)">
        <LavenderSprig />
      </g>
    </svg>
  );
};

export const Home = () => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();
  const {
    getRankedContributors,
    getLetterByRecipientId,
    getUpcomingTasks,
    getLetters
  } = useContributors();

  const rankedContributors = getRankedContributors();
  const topContributor = rankedContributors[0];
  const upcomingTasks = getUpcomingTasks();



  // Resolve upcoming letter draft
  const draftLetters = getLetters().filter(l => l.status === 'draft');
  const upcomingLetter = draftLetters[0] || null;
  const letterRecipient = upcomingLetter ? rankedContributors.find(c => c.id === upcomingLetter.recipientId) : null;

  const handleLeaderboardClick = (id) => {
    playSound('click');
    navigate(`/app/discover?id=${id}`);
  };

  const handlePreviewLetter = () => {
    playSound('paper_rustle');
    if (upcomingLetter) {
      navigate(`/app/letters?id=${upcomingLetter.id}`);
    } else {
      navigate(`/app/letters`);
    }
  };

  const handleFavoriteClick = (e, name) => {
    e.stopPropagation();
    playSound('click');
    // alert or toggle state
  };

  return (
    <div
      className="flex flex-col animate-fade-up"
      style={{
        width: '100%',
        height: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: '0',
        justifyContent: 'space-between',
        gap: '4px'
      }}
    >
      <style>{`
        /* Responsive dashboard columns */
        .home-grid {
          display: flex;
          gap: 12px;
          margin-top: 4px;
          flex: 1;
          min-height: 0;
        }

        .home-right-column {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex: 1;
          min-height: 0;
        }

        @media (max-width: 1024px) {
          .home-grid {
            flex-direction: column;
            overflow-y: auto;
          }
        }

        .leaderboard-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 4px 6px;
          border-bottom: 1px solid rgba(42, 37, 69, 0.3);
          transition: background var(--transition-fast);
          border-radius: var(--radius-sm);
        }

        .leaderboard-row:hover {
          background: rgba(61, 47, 138, 0.15);
        }

        .rank-accent {
          border-left: 2.5px solid var(--gold-glow);
          padding-left: var(--space-sm);
          background: rgba(201, 147, 58, 0.04);
        }

        .cityscape-footer {
          position: relative;
          width: 100%;
          min-height: 60px;
          margin-top: 4px;
          padding-top: 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          text-align: center;
        }

        .cityscape-bg {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.08;
          pointer-events: none;
          color: var(--violet-glow);
          z-index: 1;
        }
      `}</style>

      <div
        className="flex justify-between align-center"
        style={{
          width: '100%',
          padding: '20px var(--space-sm) 2px var(--space-sm)',
          position: 'relative'
        }}
      >
        <div style={{ flex: 1, paddingRight: 'var(--space-md)' }}>
          <div style={{ position: 'relative', display: 'block', width: 'fit-content' }}>
            <Firefly hovered={false} hw={200} hh={45} idleInterval={140} hoverInterval={140} />
            <Firefly hovered={false} hw={180} hh={35} idleInterval={160} hoverInterval={160} />
            <h2
              className="font-display animate-fade-up"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(30px, 3.8vw, 44px)',
                fontWeight: 600,
                color: '#eedbb2',
                lineHeight: 1.0,
                textAlign: 'left',
                margin: 0,
                letterSpacing: '0.03em'
              }}
            >
              Every hero has a story<br />
              that deserves to be <span style={{
                fontFamily: "'Parisienne', cursive",
                fontWeight: 400,
                fontSize: 'clamp(44px, 5.2vw, 64px)',
                color: '#a48ee8',
                display: 'inline-block',
                letterSpacing: 'normal',
                lineHeight: 1
              }}>written.</span>
            </h2>
          </div>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '16px',
              fontStyle: 'italic',
              color: 'rgba(200,190,210,0.7)',
              fontWeight: 400,
              maxWidth: '480px',
              textAlign: 'left',
              marginTop: '14px',
              lineHeight: 1.7,
              margin: '14px 0 0 0'
            }}
          >
            We find the unsung heroes in your organization and help you say the words that truly matter.
          </p>
          <img
            src={lineDivider}
            alt=""
            aria-hidden="true"
            style={{
              marginTop: '16px',
              height: '12px',
              width: 'auto',
              opacity: 0.7,
              position: 'relative',
              zIndex: 2,
              display: 'block',
            }}
          />
        </div>
        <div style={{ display: 'none', sm: 'block' }}>
          <HeroImage />
        </div>
      </div>

      {/* Main Content Grid (Stacks on mobile) */}
      <div className="home-grid">
        {/* Left Column (flex: 2.2) */}
        <div className="flex flex-col" style={{ gap: '12px', flex: 2.2, minHeight: 0 }}>
          {/* 1. Hidden Hero component */}
          <HiddenHeroCard
            contributor={topContributor}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(22,18,42,0.92) 0%, rgba(14,11,28,0.88) 100%)',
              border: '1px solid rgba(91,69,196,0.2)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)'
            }}
          />

          {/* 4. Top Unsung Heroes leaderboard */}
          <div
            className="card-surface"
            style={{
              padding: '10px 16px',
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              background: 'linear-gradient(135deg, rgba(22,18,42,0.92) 0%, rgba(14,11,28,0.88) 100%)',
              border: '1px solid rgba(91,69,196,0.2)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)'
            }}
          >
            <div className="flex justify-between align-center" style={{ width: '100%', marginBottom: '2px' }}>
              <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--violet-ghost)' }}>
                Top Unsung Heroes
              </h4>
              <a
                href="/app/discover"
                onClick={(e) => { e.preventDefault(); playSound('click'); navigate('/app/discover'); }}
                style={{ fontSize: '11px', fontWeight: '500', color: 'var(--violet-glow)' }}
              >
                View all
              </a>
            </div>

            <div className="flex flex-col gap-xs" style={{ marginTop: '2px' }}>
              {rankedContributors.slice(0, 3).map((contributor, index) => {
                const initials = contributor.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                const isFirst = index === 0;

                return (
                  <div
                    key={contributor.id}
                    className={`leaderboard-row ${isFirst ? 'rank-accent' : ''}`}
                    data-cursor="pointer"
                    onClick={() => handleLeaderboardClick(contributor.id)}
                    style={{ padding: '4px 6px' }}
                  >
                    <div className="flex align-center gap-sm">
                      <span
                        className="font-display"
                        style={{
                          width: '16px',
                          fontSize: '13px',
                          color: isFirst ? 'var(--gold-bright)' : 'var(--text-muted)',
                          fontWeight: '600',
                          textAlign: 'center'
                        }}
                      >
                        {index + 1}
                      </span>

                      {/* Initials Avatar */}
                      <div
                        className="flex align-center justify-center font-display"
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: isFirst ? 'var(--violet-deep)' : 'var(--bg-elevated)',
                          color: isFirst ? 'var(--violet-ghost)' : 'var(--text-secondary)',
                          fontSize: '10px',
                          fontWeight: '600',
                          border: isFirst ? '1px solid var(--gold-warm)' : '1px solid var(--bg-border)'
                        }}
                      >
                        {initials}
                      </div>

                      <div className="flex flex-col">
                        <span style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {contributor.name}
                        </span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                          Impact Score {contributor.impactScore}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleFavoriteClick(e, contributor.name)}
                      style={{ color: 'var(--text-muted)', padding: '4px' }}
                      aria-label="Mark contributor"
                    >
                      <HeartIcon size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (flex: 1) */}
        <div className="flex flex-col" style={{ flex: 1, minHeight: 0, alignSelf: 'flex-start', marginTop: '40px' }}>
          {/* 3. Upcoming Letter card */}
          <div
            className="card-surface flex flex-col justify-between"
            style={{
              padding: '10px 16px',
              paddingTop: '12px',
              marginTop: '20px',
              height: '100%',
              minHeight: 0,
              gap: '4px',
              background: 'linear-gradient(135deg, rgba(22,18,42,0.92) 0%, rgba(14,11,28,0.88) 100%)',
              border: '1px solid rgba(91,69,196,0.2)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
              borderRadius: 16,
              boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)'
            }}
          >
            <div className="flex align-center gap-xs" style={{ marginBottom: '2px' }}>
              <DocumentTickIcon size={18} style={{ color: 'var(--gold-bright)' }} />
              <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--gold-bright)' }}>
                Upcoming Letter
              </h4>
            </div>

            {upcomingLetter ? (
              <>
                <div style={{ marginBottom: '2px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    To be sent on
                  </span>
                  <div className="font-display" style={{ fontSize: '18px', color: 'var(--gold-bright)', fontWeight: '600', marginTop: '1px' }}>
                    {upcomingLetter.scheduledDate}
                  </div>
                </div>

                {/* Styled Parchment Mock preview */}
                <div
                  className="font-body flex flex-col justify-between"
                  style={{
                    height: '75px',
                    width: '100%',
                    background: 'linear-gradient(135deg, rgba(30,24,12,0.9) 0%, rgba(20,16,8,0.85) 100%)',
                    borderRadius: 10,
                    border: '1px solid rgba(180,140,60,0.2)',
                    padding: 'var(--space-sm) var(--space-md)',
                    fontSize: '11px',
                    color: '#c9a86c',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.4)'
                  }}
                >
                  <span style={{ fontStyle: 'italic', color: 'var(--gold-glow)' }}>
                    To {letterRecipient ? letterRecipient.name.split(' ')[0] : 'Isabella'},
                  </span>
                  <span style={{ display: 'block', flex: 1, margin: '2px 0', overflow: 'hidden', opacity: 0.85, fontSize: '10px', lineHeight: '1.3' }}>
                    Over the past six months, you've reviewed 412 pull requests and helped 38...
                  </span>
                  <div className="flex justify-between align-center" style={{ borderTop: '1px dashed rgba(201, 168, 108, 0.15)', paddingTop: '2px' }}>
                    <span style={{ fontSize: '9px', textTransform: 'uppercase' }}>Draft letter</span>
                    <QuillIcon size={14} style={{ opacity: 0.6 }} />
                  </div>
                </div>

                <p className="font-ui" style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                  A letter of gratitude for countless invisible impacts.
                </p>

                <button
                  className="btn-primary"
                  onClick={handlePreviewLetter}
                  style={{ width: '100%', marginTop: '2px', padding: '6px 16px', fontSize: '12px' }}
                >
                  Preview Letter →
                </button>
              </>
            ) : (
              <div className="flex flex-col align-center justify-center" style={{ flex: 1, gap: 'var(--space-md)' }}>
                <span className="font-body" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                  No draft letters queued.
                </span>
                <button
                  className="btn-primary"
                  onClick={() => navigate('/app/letters')}
                  style={{ width: '100%' }}
                >
                  Generate a Letter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer Quote Area */}
      <div className="cityscape-footer">
        <Divider style={{ margin: '4px 0 6px 0' }} />

        {/* Cityscape SVG Outline Outline behind the quote */}
        <svg className="cityscape-bg" viewBox="0 0 800 120" fill="none" stroke="currentColor" strokeWidth="0.8">
          <path d="M 0,110 H 800 M 50,110 V 80 H 70 V 110 M 120,110 V 60 H 150 V 90 H 160 V 110 M 220,110 V 70 H 260 V 110 M 350,110 V 50 H 380 V 75 H 410 V 110 M 500,110 V 90 H 520 V 110 M 580,110 V 40 H 620 V 110 M 700,110 V 70 H 730 V 110" />
          <circle cx="395" cy="40" r="10" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
        </svg>

        <div className="flex flex-col align-center text-center" style={{ zIndex: 2, padding: '0 var(--space-md)' }}>
          <p
            className="font-body"
            style={{
              fontSize: '13px',
              fontStyle: 'italic',
              color: 'var(--text-secondary)',
              lineHeight: '1.4',
              maxWidth: '500px'
            }}
          >
            "I want to know what 'I love you' means. I want you to tell me."
          </p>
          <span
            className="font-body"
            style={{
              fontSize: '11px',
              color: 'var(--text-muted)',
              marginTop: '2px'
            }}
          >
            — Violet Evergarden
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
