import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WaxSealIcon } from '../icons';
import { useContributors } from '../../hooks/useContributors';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const LetterCard = ({ letter, contributor: propContributor, className = '', ...props }) => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();
  const { getContributorById } = useContributors();

  if (!letter) return null;

  // Resolve contributor if not passed in directly
  const contributor = propContributor || getContributorById(letter.recipientId);
  const recipientName = contributor ? contributor.name : 'Unsung Hero';

  // Format date
  const displayDate = letter.deliveredAt || letter.scheduledDate || 'Draft';

  const handleClick = () => {
    playSound('paper_rustle');
    navigate(`/app/letters?id=${letter.id}`);
  };

  return (
    <div
      className={`parchment-surface ${className}`}
      data-cursor="pointer"
      data-sound="paper_hover"
      onClick={handleClick}
      style={{
        width: '100%',
        minHeight: '180px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-md) var(--space-lg)',
        border: '1px solid var(--gold-warm)',
        position: 'relative'
      }}
      {...props}
    >
      {/* Decorative Ribbon Element at top-right */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          right: '20px',
          width: '16px',
          height: '24px',
          backgroundColor: '#871b1b',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 50% 80%, 0% 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
          borderLeft: '1px solid var(--gold-warm)',
          borderRight: '1px solid var(--gold-warm)',
          zIndex: 2
        }}
      />

      <div className="flex flex-col gap-xs">
        {/* Header */}
        <div
          className="font-body"
          style={{
            fontSize: '18px',
            fontStyle: 'italic',
            color: 'var(--gold-glow)',
            fontWeight: '500'
          }}
        >
          To {recipientName},
        </div>

        {/* Body Fragment */}
        <p
          className="font-body"
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#c9a86c',
            textAlign: 'left',
            maxHeight: '75px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {letter.body ? letter.body.substring(0, 120) : 'Generating content...'}...
        </p>
      </div>

      {/* Footer */}
      <div
        className="flex align-center justify-between"
        style={{
          marginTop: 'var(--space-md)',
          borderTop: '1px dashed rgba(201, 168, 108, 0.2)',
          paddingTop: 'var(--space-sm)'
        }}
      >
        <span
          className="font-ui"
          style={{
            fontSize: '11px',
            color: 'var(--gold-warm)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          {letter.status === 'draft' ? `Draft • Send: ${displayDate}` : `Delivered: ${displayDate}`}
        </span>
        <WaxSealIcon size={24} style={{ opacity: 0.85 }} />
      </div>
    </div>
  );
};
