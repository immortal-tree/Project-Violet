import React from 'react';
import { useContributors } from '../hooks/useContributors';
import { PageHeader } from '../components/ui/PageHeader';
import { LetterCard } from '../components/ui/LetterCard';

export const Archive = () => {
  const { getLetters } = useContributors();
  
  // Filter for delivered letters
  const deliveredLetters = getLetters().filter(l => l.status === 'delivered');

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
      <PageHeader
        title="Delivered Scrolls"
        subtitle="Letters Delivered. Impact Remembered. Read through the history of gratitude shared across the organization."
      />

      <div
        className="flex flex-col gap-md"
        data-archive-list="true"
        style={{
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        <style>{`
          .archive-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: var(--space-lg);
          }
        `}</style>
        
        {deliveredLetters.length > 0 ? (
          <div className="archive-grid">
            {deliveredLetters.map((letter) => (
              <LetterCard key={letter.id} letter={letter} />
            ))}
          </div>
        ) : (
          <div className="card-surface text-center" style={{ padding: 'var(--space-2xl)' }}>
            <span className="font-body" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
              The scroll rolls are empty. For now.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Archive;
