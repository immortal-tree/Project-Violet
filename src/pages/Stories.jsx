import React from 'react';
import { useContributors } from '../hooks/useContributors';
import { PageHeader } from '../components/ui/PageHeader';
import { StoriesIcon, CodeBracketsIcon, ChatBubbleIcon, ShieldCheckIcon } from '../components/icons';

export const Stories = () => {
  const { getRankedContributors } = useContributors();
  const contributors = getRankedContributors().slice(0, 3);

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
        title="Chronicles of Impact"
        subtitle="The full story behind each hero. Where they were, what they did, and how it changed things."
      />

      {/* Grid container */}
      <div
        className="flex flex-col gap-lg"
        data-stories-grid="true"
        style={{ width: '100%' }}
      >
        <style>{`
          .story-card {
            display: grid;
            grid-template-columns: 1fr 3fr;
            gap: var(--space-lg);
            background: var(--bg-surface);
            border: 1px solid var(--bg-border);
            padding: var(--space-lg);
            border-radius: var(--radius-md);
            position: relative;
          }
          .story-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            border-right: 1px solid var(--bg-border);
            padding-right: var(--space-md);
          }
          .story-right {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .story-bullet {
            display: flex;
            gap: var(--space-sm);
            font-family: var(--font-body);
            font-size: 13.5px;
            color: var(--text-primary);
            line-height: 1.6;
            margin-bottom: var(--space-sm);
          }
          @media (max-width: 768px) {
            .story-card {
              grid-template-columns: 1fr;
            }
            .story-left {
              border-right: none;
              border-bottom: 1px solid var(--bg-border);
              padding-right: 0;
              padding-bottom: var(--space-md);
            }
          }
        `}</style>

        {contributors.map((c, index) => {
          const initials = c.name.split(' ').map(n => n[0]).join('').substring(0, 2);
          return (
            <div key={c.id} className="story-card card-surface">
              {/* Left sidebar info */}
              <div className="story-left">
                <div
                  className="flex align-center justify-center font-display"
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--violet-deep)',
                    color: 'var(--violet-ghost)',
                    fontSize: '20px',
                    fontWeight: '600',
                    border: '1.5px solid var(--gold-warm)',
                    marginBottom: 'var(--space-sm)',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                  }}
                >
                  {initials}
                </div>
                <h3 className="font-display" style={{ fontSize: '18px', color: 'var(--gold-bright)', marginBottom: '2px' }}>
                  {c.name}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{c.role}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '4px' }}>
                  {c.team} Team
                </span>
                
                {/* Score */}
                <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)', marginTop: 'var(--space-md)' }}>
                  {c.impactScore}
                  <span style={{ fontSize: '10px', color: 'var(--violet-glow)', display: 'block', fontWeight: '500' }}>Impact Score</span>
                </div>
              </div>

              {/* Right narrative section */}
              <div className="story-right">
                <div>
                  <h4 className="font-display" style={{ fontSize: '14px', color: 'var(--violet-glow)', marginBottom: 'var(--space-md)', textTransform: 'uppercase' }}>
                    Key Contributions & Narrative
                  </h4>

                  <div className="story-bullet">
                    <span style={{ color: 'var(--gold-bright)' }}>✦</span>
                    <div>
                      <strong>Unblocking Platform Projects:</strong> Assisted {c.stats.developersHelped} teammates individually in Slack discussions, solving deep technical challenges in architecture pipelines.
                    </div>
                  </div>

                  <div className="story-bullet">
                    <span style={{ color: 'var(--gold-bright)' }}>✦</span>
                    <div>
                      <strong>Silent Safeguards:</strong> Identified {c.stats.bugsPrevented} potential regressions in code reviews that avoided production incidents before code was committed.
                    </div>
                  </div>

                  <div className="story-bullet">
                    <span style={{ color: 'var(--gold-bright)' }}>✦</span>
                    <div>
                      <strong>Documentation Steward:</strong> Updated {c.stats.documentationUpdated} files on standard workflows, reducing onboarding fatigue for new developers.
                    </div>
                  </div>
                </div>

                <div
                  className="font-body"
                  style={{
                    fontSize: '12.5px',
                    fontStyle: 'italic',
                    color: 'var(--text-muted)',
                    borderTop: '1px dashed rgba(232, 226, 252, 0.15)',
                    paddingTop: 'var(--space-sm)',
                    marginTop: 'var(--space-md)'
                  }}
                >
                  "Not all work is marked in PR commits. Isabella represents the glue that binds the entire team's engineering velocity."
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
