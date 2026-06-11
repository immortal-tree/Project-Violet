import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContributors } from '../hooks/useContributors';
import { useSoundEffect } from '../hooks/useSoundEffect';
import { WaxSealIcon, QuillIcon, SpinnerIcon, LettersIcon } from '../components/icons';
import lettersBg from '../assets/letters-bg.jpg';
import parchmentPaper from '../assets/parchment-paper.jpg';

export const Letters = () => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();
  const { getLetters, getContributorById } = useContributors();
  const [searchParams] = useSearchParams();
  const letterId = searchParams.get('id') || 'l001';

  const [currentLetter, setCurrentLetter] = useState(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);

  const letters = getLetters();

  // Find letter
  useEffect(() => {
    const matched = letters.find(l => l.id === letterId);
    if (matched) {
      setCurrentLetter({ ...matched });
    } else if (letters.length > 0) {
      setCurrentLetter({ ...letters[0] });
    }
  }, [letterId, letters]);

  const recipient = currentLetter ? getContributorById(currentLetter.recipientId) : null;

  const parseSignalItem = (it) => {
    const match = it.match(/(.+?)\s*[\u2014\u2013-]\s*([A-Za-z]{3}\s+\d{1,2})$/);
    if (match) {
      return { text: match[1], date: match[2] };
    }
    return { text: it, date: null };
  };

  const handleRegenerate = () => {
    playSound('click');
    setIsRegenerating(true);
    setTimeout(() => {
      setIsRegenerating(false);
      setCurrentLetter(prev => ({
        ...prev,
        body: `Dear ${recipient ? recipient.name.split(' ')[0] : 'Hero'},\n\nThank you for your incredible support on the team. By reviewing ${recipient ? recipient.stats.prReviews : 'countless'} pull requests and unblocking colleagues, you've established a highly productive workplace.\n\nSpecifically, your efforts ${customPrompt ? `to help with "${customPrompt}"` : 'in unblocking the platform builds'} saved our schedule.\n\nWe recognize the value you bring to the team. Truly, thank you.\n\n— The Team`
      }));
      setCustomPrompt('');
    }, 2000);
  };

  const handleDeliver = () => {
    playSound('seal_clink');
    setIsDelivering(true);
    setTimeout(() => {
      setIsDelivering(false);
      setCurrentLetter(prev => ({
        ...prev,
        status: 'delivered',
        deliveredAt: '2026-06-06'
      }));
      playSound('paper_rustle');
    }, 1500);
  };

  if (!currentLetter) {
    return (
      <div className="card-surface flex flex-col align-center justify-center" style={{ minHeight: '300px' }}>
        <SpinnerIcon size={32} />
        <p className="font-body" style={{ fontStyle: 'italic', marginTop: 'var(--space-sm)' }}>
          Retrieving the letter roll...
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundImage: `url(${lettersBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          background: 'rgba(5,4,14,0.75)',
          width: '100%',
          height: '100%',
          boxSizing: 'border-box',
          padding: '76px 24px 24px 24px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div
          className="flex flex-col animate-fade-up"
          style={{
            width: '100%',
            maxWidth: '1200px',
            height: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxSizing: 'border-box'
          }}
        >
          <style>{`
            .letters-workspace {
              display: grid;
              grid-template-columns: 4.5fr 7.5fr;
              gap: var(--space-xl);
              flex: 1;
              min-height: 0;
              height: 100%;
            }

            .signal-category {
              margin-bottom: var(--space-md);
            }

            .signal-title {
              font-family: var(--font-ui);
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              color: #6b6094;
              margin-bottom: var(--space-xs);
              display: flex;
              align-items: center;
              gap: 6px;
            }

            .signal-item {
              font-family: var(--font-body);
              font-size: 13px;
              color: #a89ed4;
              padding: var(--space-xs) 0;
              border-bottom: 1px solid rgba(42, 37, 69, 0.2);
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .letters-workspace input::placeholder {
              color: rgba(140, 100, 60, 0.5) !important;
              opacity: 1;
            }

            @media (max-width: 900px) {
              .letters-workspace {
                grid-template-columns: 1fr;
              }
            }
          `}</style>

          <div className="letters-workspace">
            {/* Left Panel: The Signals */}
            <div
              className="card-surface"
              data-signals-panel="true"
              style={{
                padding: 'var(--space-lg)',
                background: 'rgba(8,7,18,0.92)',
                border: 'none',
                borderRight: '1px solid rgba(91,69,196,0.2)',
                borderRadius: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                minHeight: 0
              }}
            >
              <h4 className="font-display" style={{ fontSize: '16px', color: 'var(--violet-ghost)', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--bg-border)', paddingBottom: 'var(--space-sm)', flexShrink: 0 }}>
                The Evidence Signals
              </h4>

              {recipient ? (
                <div className="flex flex-col" style={{ flex: 1, minHeight: 0 }}>
                  <div style={{ marginBottom: 'var(--space-md)', flexShrink: 0 }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recipient</span>
                    <h4 style={{ fontSize: '18px', color: 'var(--gold-bright)' }}>{recipient.name}</h4>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{recipient.role} • {recipient.team}</span>
                  </div>

                  {/* Signals feed */}
                  <div className="flex flex-col gap-md" style={{ flex: 1, minHeight: 0, overflowY: 'auto', paddingRight: '8px' }}>
                    {currentLetter.signals && Object.keys(currentLetter.signals).map((src) => {
                      const items = currentLetter.signals[src];
                      if (!items || items.length === 0) return null;
                      return (
                        <div key={src} className="signal-category">
                          <div className="signal-title">
                            <span style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: src === 'github' ? '#6e40c9' : src === 'slack' ? '#e01e5a' : src === 'jira' ? '#0052cc' : src === 'notion' ? '#ffffff' : '#6e40c9'
                            }} />
                            {src.toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            {items.map((it, idx) => {
                              const parsed = parseSignalItem(it);
                              return (
                                <div key={idx} className="signal-item">
                                  <span>{parsed.text}</span>
                                  {parsed.date && (
                                    <span style={{ color: '#6b6094', marginLeft: '8px', flexShrink: 0 }}>
                                      {parsed.date}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <p className="font-body" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                  No recipient data loaded.
                </p>
              )}
            </div>

            {/* Right Panel: The Letter Scroll */}
            <div className="flex flex-col" data-letter-panel="true" style={{ height: '100%', minHeight: 0, gap: '12px' }}>
              {/* Letter Selector Row */}
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: '14px',
                  color: '#a89ed4',
                  cursor: 'pointer',
                  marginBottom: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  flexShrink: 0
                }}
              >
                <span>{recipient ? recipient.name : 'Recipient'}</span>
                <span style={{ marginLeft: '4px' }}>&gt;</span>
              </div>

              {/* Scrollable Container wrapping the whole Parchment Card */}
              <div
                style={{
                  flex: 1,
                  overflowY: 'auto',
                  minHeight: 0,
                  padding: '12px 16px 24px 4px'
                }}
              >
                <div
                  className="parchment-surface"
                  style={{
                    backgroundImage: `url(${parchmentPaper})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '4px',
                    boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
                    border: 'none',
                    padding: '48px 52px',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(210,185,145,0.12)',
                      pointerEvents: 'none',
                      zIndex: 0
                    }}
                  />

                  {/* Wrapped content */}
                  <div
                    style={{
                      position: 'relative',
                      zIndex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {isRegenerating ? (
                      <div className="flex flex-col align-center justify-center" style={{ minHeight: '300px', width: '100%', color: '#8a6a40' }}>
                        <SpinnerIcon size={40} />
                        <p className="font-body" style={{ fontStyle: 'italic', marginTop: 'var(--space-md)' }}>
                          Rewriting with quill in ink...
                        </p>
                      </div>
                    ) : (
                      <>
                        <div>
                          {/* Letter Header Row */}
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'flex-end',
                              borderBottom: '1px solid rgba(140, 100, 60, 0.25)',
                              paddingBottom: '12px',
                              marginBottom: '20px'
                            }}
                          >
                            <span
                              style={{
                                fontFamily: 'Cinzel, serif',
                                fontSize: '20px',
                                fontWeight: '700',
                                color: '#2a1a08',
                                lineHeight: 1
                              }}
                            >
                              The Letter
                            </span>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textAlign: 'right' }}>
                              <span
                                style={{
                                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                                  fontSize: '11px',
                                  color: '#8a6a40',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.05em',
                                  lineHeight: 1,
                                  marginBottom: '4px'
                                }}
                              >
                                To be delivered to
                              </span>
                              <span
                                style={{
                                  fontFamily: 'Cinzel, serif',
                                  fontSize: '16px',
                                  fontWeight: '600',
                                  color: '#2a1a08',
                                  lineHeight: 1
                                }}
                              >
                                {recipient ? recipient.name : 'Unsung Hero'}
                              </span>
                            </div>
                          </div>

                          {/* Cursive To: */}
                          <div
                            style={{
                              fontFamily: "'Cormorant Garamond', Georgia, serif",
                              fontStyle: 'italic',
                              fontSize: '20px',
                              color: '#2a1a08',
                              marginBottom: 'var(--space-md)'
                            }}
                          >
                            To {recipient ? recipient.name : 'Unsung Hero'},
                          </div>

                          {/* Body Text Split by Paragraphs */}
                          <div
                            className="animate-fade-up"
                            style={{
                              textAlign: 'left'
                            }}
                          >
                            {currentLetter.body.split('\n').filter(para => para.trim() !== '').map((para, pIdx) => (
                              <div
                                key={pIdx}
                                style={{
                                  borderBottom: '1px solid rgba(140,100,60,0.18)',
                                  paddingBottom: '14px',
                                  marginBottom: '14px',
                                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                                  fontSize: '15px',
                                  color: '#1a0e05',
                                  lineHeight: 1.85
                                }}
                              >
                                {para}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Footer Ribbon or Seal info */}
                        <div
                          className="flex align-center justify-between"
                          style={{
                            borderTop: '1px dashed rgba(201, 168, 108, 0.2)',
                            paddingTop: 'var(--space-md)',
                            marginTop: 'var(--space-lg)'
                          }}
                        >
                          <div className="flex flex-col text-left">
                            <span style={{ fontSize: '10px', color: 'var(--gold-warm)', textTransform: 'uppercase' }}>Status</span>
                            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--gold-glow)' }}>
                              {currentLetter.status === 'delivered' ? `Delivered ✓ (${currentLetter.deliveredAt})` : 'Draft Mode'}
                            </span>
                          </div>

                          {isDelivering ? (
                            <SpinnerIcon size={24} style={{ color: 'var(--gold-bright)' }} />
                          ) : (
                            <div className={currentLetter.status === 'delivered' ? 'animate-seal' : ''}>
                              <WaxSealIcon size={48} />
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Action CTAs and Input */}
              {currentLetter.status === 'draft' && (
                <div className="flex flex-col gap-sm" style={{ width: '100%', flexShrink: 0 }}>
                  {/* Manual guidance */}
                  <div className="flex align-center gap-sm">
                    <input
                      type="text"
                      placeholder="Add custom direction for Gemini (e.g. 'mention the database optimization in April')"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      style={{
                        flex: 1,
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(140,100,60,0.2)',
                        borderRadius: 'var(--radius-md)',
                        padding: '10px 16px',
                        color: '#8a6a40',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between gap-md" style={{ width: '100%' }}>
                    <button
                      className="btn-secondary"
                      onClick={handleRegenerate}
                      style={{
                        flex: '1 1 auto',
                        background: 'rgba(20,17,38,0.9)',
                        border: '1px solid rgba(91,69,196,0.4)',
                        borderRadius: '10px',
                        padding: '13px 28px',
                        color: '#e8e2fc',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '16px'
                      }}
                      disabled={isRegenerating || isDelivering}
                    >
                      <QuillIcon size={16} />
                      Regenerate Letter
                    </button>
                    <button
                      className="btn-primary"
                      onClick={handleDeliver}
                      style={{
                        flex: '1.5 1 auto',
                        background: 'linear-gradient(135deg, rgba(61,47,138,0.9), rgba(40,28,100,0.9))',
                        border: '1px solid rgba(91,69,196,0.6)',
                        borderRadius: '10px',
                        padding: '13px 28px',
                        color: '#e8c97a',
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '16px'
                      }}
                      disabled={isRegenerating || isDelivering}
                    >
                      <WaxSealIcon size={20} />
                      Approve & Deliver
                    </button>
                  </div>
                </div>
              )}

              {currentLetter.status === 'delivered' && (
                <div className="card-surface text-center" style={{ border: '1px solid var(--success)', backgroundColor: 'rgba(76, 175, 134, 0.05)', padding: '12px', flexShrink: 0 }}>
                  <span style={{ color: 'var(--success)', fontSize: '13px', fontWeight: '500' }}>
                    This letter of recognition has been stamped and delivered to the recipient.
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Letters;
