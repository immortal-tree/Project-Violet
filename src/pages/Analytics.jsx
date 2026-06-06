import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';
import { AnalyticsIcon, GitHubBrandIcon, SlackBrandIcon, JiraBrandIcon, NotionBrandIcon } from '../components/icons';

export const Analytics = () => {
  // Mock data for charts
  const sourceContributions = [
    { label: 'GitHub Reviews', value: 45, count: '683 reviews', color: '#6e40c9' },
    { label: 'Slack Unblocks', value: 30, count: '812 threads', color: '#4a154b' },
    { label: 'Jira Resolves', value: 18, count: '298 tickets', color: '#0052cc' },
    { label: 'Notion Documentation', value: 7, count: '106 updates', color: '#f5d080' }
  ];

  const teamImpactData = [
    { name: 'Infrastructure', score: 1420, percentage: 85 },
    { name: 'Platform Core', score: 1280, percentage: 76 },
    { name: 'Quality Engineering', score: 920, percentage: 55 },
    { name: 'Product Design', score: 780, percentage: 46 }
  ];

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
        title="Signals & Insights"
        subtitle="Understand the patterns of invisible work. See which teams, roles, and time periods produce the most unsung contribution."
      />

      <style>{`
        .analytics-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: var(--space-lg);
        }
        .analytics-full {
          grid-column: 1 / -1;
        }
        .chart-box {
          min-height: 240px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .bar-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: var(--space-md);
        }
        .progress-bar-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13px;
        }
        .bar-track {
          height: 8px;
          width: 100%;
          background-color: var(--bg-elevated);
          border-radius: var(--radius-pill);
          overflow: hidden;
          margin-top: 4px;
        }
        .bar-fill {
          height: 100%;
          border-radius: var(--radius-pill);
        }
        @media (max-width: 900px) {
          .analytics-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="analytics-grid">
        {/* Chart 1: Accumulated Impact Line Chart */}
        <div className="card-surface chart-box analytics-full" data-impact-chart="true">
          <div>
            <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--violet-ghost)' }}>
              Invisible Impact Accumulated Over Time
            </h4>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Computed monthly index of quiet contributions (PR reviews, mentoring sessions, resolved incidents)
            </span>
          </div>

          <div style={{ width: '100%', height: '180px', marginTop: 'var(--space-md)' }}>
            {/* SVG line chart represent */}
            <svg width="100%" height="100%" viewBox="0 0 800 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--violet-glow)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--bg-surface)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Horizontal Grid lines */}
              <line x1="0" y1="40" x2="800" y2="40" stroke="rgba(232, 226, 252, 0.05)" strokeWidth="1" />
              <line x1="0" y1="80" x2="800" y2="80" stroke="rgba(232, 226, 252, 0.05)" strokeWidth="1" />
              <line x1="0" y1="120" x2="800" y2="120" stroke="rgba(232, 226, 252, 0.05)" strokeWidth="1" />
              
              {/* Line Area */}
              <path
                d="M 0,160 L 0,130 Q 100,140 200,90 T 400,110 T 600,40 Q 700,50 800,10 L 800,160 Z"
                fill="url(#areaGrad)"
              />
              {/* Line path */}
              <path
                d="M 0,130 Q 100,140 200,90 T 400,110 T 600,40 Q 700,50 800,10"
                fill="none"
                stroke="var(--violet-glow)"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(164,142,232,0.4))' }}
              />
              
              {/* Dots */}
              <circle cx="200" cy="90" r="4" fill="var(--gold-bright)" />
              <circle cx="400" cy="110" r="4" fill="var(--gold-bright)" />
              <circle cx="600" cy="40" r="4" fill="var(--gold-bright)" />
              <circle cx="800" cy="10" r="4" fill="var(--gold-bright)" />
            </svg>
            <div className="flex justify-between" style={{ padding: '4px 8px 0 8px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun (Current)</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Contribution breakdown */}
        <div className="card-surface chart-box" data-contribution-breakdown="true">
          <div>
            <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--violet-ghost)' }}>
              Signal Source Distribution
            </h4>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Percentage breakdown of active integrations
            </span>
          </div>

          <div className="bar-container">
            {sourceContributions.map((source) => (
              <div key={source.label} className="flex flex-col">
                <div className="progress-bar-row">
                  <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{source.label}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{source.count} ({source.value}%)</span>
                </div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${source.value}%`,
                      backgroundColor: source.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Team leaderboard */}
        <div className="card-surface chart-box" data-team-leaderboard="true">
          <div>
            <h4 className="font-display" style={{ fontSize: '15px', color: 'var(--violet-ghost)' }}>
              Team Impact Indexes
            </h4>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Aggregated unblocking metrics per engineering squad
            </span>
          </div>

          <div className="bar-container" style={{ gap: '16px' }}>
            {teamImpactData.map((team) => (
              <div key={team.name} className="flex flex-col">
                <div className="progress-bar-row">
                  <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{team.name}</span>
                  <span style={{ color: 'var(--gold-bright)', fontWeight: '600', fontFamily: 'var(--font-display)' }}>
                    {team.score} pts
                  </span>
                </div>
                <div className="bar-track" style={{ height: '6px' }}>
                  <div
                    className="bar-fill"
                    style={{
                      width: `${team.percentage}%`,
                      backgroundColor: 'rgba(201, 147, 58, 0.45)',
                      borderRight: '2px solid var(--gold-bright)'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
