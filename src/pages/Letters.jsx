import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useContributors } from '../hooks/useContributors';
import { useSoundEffect } from '../hooks/useSoundEffect';
import { WaxSealIcon, QuillIcon, SpinnerIcon, LettersIcon } from '../components/icons';

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
      className="flex flex-col animate-fade-up"
      style={{
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        paddingBottom: 'var(--space-2xl)'
      }}
    >
      <style>{`
        .letters-workspace {
          display: grid;
          grid-template-columns: 4.5fr 7.5fr;
          gap: var(--space-xl);
          margin-top: var(--space-md);
        }

        .signal-category {
          margin-bottom: var(--space-md);
        }

        .signal-title {
          font-family: var(--font-ui);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--violet-glow);
          margin-bottom: var(--space-xs);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .signal-item {
          font-family: var(--font-body);
          font-size: 13px;
          color: var(--text-primary);
          padding: var(--space-xs) 0;
          border-bottom: 1px solid rgba(42, 37, 69, 0.2);
        }

        @media (max-width: 900px) {
          .letters-workspace {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Header */}
      <div>
        <h2 className="font-display" style={{ fontSize: '28px', color: 'var(--violet-ghost)', marginBottom: 'var(--space-xs)' }}>
          The Letter Room
        </h2>
        <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          Generate, review, and deliver personalized letters of recognition. Every claim is traceable to a real data point.
        </p>
      </div>

      <div className="letters-workspace">
        {/* Left Panel: The Signals */}
        <div className="card-surface" data-signals-panel="true" style={{ padding: 'var(--space-lg)', height: 'fit-content' }}>
          <h4 className="font-display" style={{ fontSize: '16px', color: 'var(--violet-ghost)', marginBottom: 'var(--space-lg)', borderBottom: '1px solid var(--bg-border)', paddingBottom: 'var(--space-sm)' }}>
            The Evidence Signals
          </h4>

          {recipient ? (
            <div className="flex flex-col">
              <div style={{ marginBottom: 'var(--space-md)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recipient</span>
                <h4 style={{ fontSize: '18px', color: 'var(--gold-bright)' }}>{recipient.name}</h4>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{recipient.role} • {recipient.team}</span>
              </div>

              {/* Signals feed */}
              <div className="flex flex-col gap-md">
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
                          backgroundColor: src === 'github' ? '#6e40c9' : src === 'slack' ? '#4a154b' : '#0052cc'
                        }} />
                        {src.toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        {items.map((it, idx) => (
                          <div key={idx} className="signal-item">
                            {it}
                          </div>
                        ))}
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
        <div className="flex flex-col gap-md" data-letter-panel="true">
          <div
            className="parchment-surface flex flex-col justify-between"
            style={{
              padding: 'var(--space-xl)',
              minHeight: '420px',
              border: `1px solid ${currentLetter.status === 'delivered' ? 'var(--gold-bright)' : 'var(--gold-warm)'}`
            }}
          >
            {isRegenerating ? (
              <div className="flex flex-col align-center justify-center" style={{ height: '300px', width: '100%', color: 'var(--gold-glow)' }}>
                <SpinnerIcon size={40} />
                <p className="font-body" style={{ fontStyle: 'italic', marginTop: 'var(--space-md)' }}>
                  Rewriting with quill in ink...
                </p>
              </div>
            ) : (
              <>
                <div>
                  {/* Cursive To: */}
                  <div
                    className="font-body"
                    style={{
                      fontSize: '22px',
                      fontStyle: 'italic',
                      color: 'var(--gold-glow)',
                      marginBottom: 'var(--space-md)'
                    }}
                  >
                    To {recipient ? recipient.name : 'Unsung Hero'},
                  </div>

                  {/* Body Text */}
                  <p
                    className="font-body animate-fade-up"
                    style={{
                      fontSize: '15px',
                      lineHeight: '1.8',
                      color: '#c9a86c',
                      whiteSpace: 'pre-line',
                      textAlign: 'left',
                      minHeight: '220px'
                    }}
                  >
                    {currentLetter.body}
                  </p>
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

          {/* Action CTAs and Input */}
          {currentLetter.status === 'draft' && (
            <div className="flex flex-col gap-sm" style={{ width: '100%' }}>
              {/* Manual guidance */}
              <div className="flex align-center gap-sm">
                <input
                  type="text"
                  placeholder="Add custom direction for Gemini (e.g. 'mention the database optimization in April')"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  style={{
                    flex: 1,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--bg-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '10px 16px',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-md" style={{ width: '100%' }}>
                <button
                  className="btn-secondary"
                  onClick={handleRegenerate}
                  style={{ flex: '1 1 auto', padding: '12px' }}
                  disabled={isRegenerating || isDelivering}
                >
                  <QuillIcon size={16} />
                  Regenerate Letter
                </button>
                <button
                  className="btn-primary"
                  onClick={handleDeliver}
                  style={{ flex: '1.5 1 auto', padding: '12px' }}
                  disabled={isRegenerating || isDelivering}
                >
                  <WaxSealIcon size={20} />
                  Approve & Deliver
                </button>
              </div>
            </div>
          )}

          {currentLetter.status === 'delivered' && (
            <div className="card-surface text-center" style={{ border: '1px solid var(--success)', backgroundColor: 'rgba(76, 175, 134, 0.05)', padding: '12px' }}>
              <span style={{ color: 'var(--success)', fontSize: '13px', fontWeight: '500' }}>
                This letter of recognition has been stamped and delivered to the recipient.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Letters;
