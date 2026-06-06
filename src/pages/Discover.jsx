import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useContributors } from '../hooks/useContributors';
import { useSoundEffect } from '../hooks/useSoundEffect';
import { ContributorCard } from '../components/ui/ContributorCard';
import { DiscoverIcon } from '../components/icons';

export const Discover = () => {
  const playSound = useSoundEffect();
  const { getRankedContributors } = useContributors();
  const [searchParams] = useSearchParams();
  const focusId = searchParams.get('id');

  const [teamFilter, setTeamFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('6m');

  const contributors = getRankedContributors();

  // Filter items
  const filteredContributors = useMemo(() => {
    return contributors.filter(c => {
      // Team Filter
      if (teamFilter !== 'All' && c.team.toLowerCase() !== teamFilter.toLowerCase()) {
        return false;
      }
      // Source Filter
      if (sourceFilter !== 'All') {
        const key = sourceFilter.toLowerCase();
        if (!c.sources[key]) return false;
      }
      return true;
    });
  }, [contributors, teamFilter, sourceFilter]);

  const handleTeamChange = (e) => {
    playSound('click');
    setTeamFilter(e.target.value);
  };

  const handleSourceChange = (e) => {
    playSound('click');
    setSourceFilter(e.target.value);
  };

  const handleTimeChange = (e) => {
    playSound('click');
    setTimeFilter(e.target.value);
  };

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
      {/* Header Info */}
      <div style={{ marginBottom: 'var(--space-md)' }}>
        <h2 className="font-display" style={{ fontSize: '28px', color: 'var(--violet-ghost)', marginBottom: 'var(--space-xs)' }}>
          The Hall of Heroes
        </h2>
        <p className="font-body" style={{ fontSize: '14px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
          Surface unsung contributors across your engineering organization. Filter by team, time period, and data source to find the people who kept things moving.
        </p>
      </div>

      {/* Filter Bar */}
      <div
        className="card-surface flex justify-between align-center"
        data-discover-filters="true"
        style={{
          padding: '12px var(--space-md)',
          backgroundColor: 'var(--bg-surface)',
          marginBottom: 'var(--space-lg)',
          gap: 'var(--space-md)',
          flexWrap: 'wrap'
        }}
      >
        <style>{`
          .filter-group {
            display: flex;
            align-items: center;
            gap: var(--space-sm);
          }
          .filter-select {
            background: var(--bg-elevated);
            border: 1px solid var(--bg-border);
            color: var(--text-primary);
            font-size: 13px;
            font-family: var(--font-ui);
            padding: 6px 12px;
            border-radius: var(--radius-sm);
            cursor: pointer;
            outline: none;
            transition: border-color var(--transition-fast);
          }
          .filter-select:hover {
            border-color: var(--violet-glow);
          }
          .grid-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: var(--space-lg);
            width: 100%;
          }
        `}</style>
        
        <div className="flex align-center gap-md" style={{ flexWrap: 'wrap' }}>
          <div className="filter-group">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Team</span>
            <select className="filter-select" value={teamFilter} onChange={handleTeamChange}>
              <option value="All">All Teams</option>
              <option value="Platform">Platform</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Quality">Quality</option>
              <option value="Design">Design</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div className="filter-group">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Source</span>
            <select className="filter-select" value={sourceFilter} onChange={handleSourceChange}>
              <option value="All">All Sources</option>
              <option value="github">GitHub</option>
              <option value="slack">Slack</option>
              <option value="jira">Jira</option>
            </select>
          </div>

          <div className="filter-group">
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Timeframe</span>
            <select className="filter-select" value={timeFilter} onChange={handleTimeChange}>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
              <option value="12m">Last 12 Months</option>
            </select>
          </div>
        </div>

        {/* Counter */}
        <div style={{ fontSize: '13px', color: 'var(--violet-glow)', fontWeight: '500' }}>
          Found {filteredContributors.length} Unsung Heroes
        </div>
      </div>

      {/* Focused Contributor alert */}
      {focusId && (
        <div
          className="card-surface"
          style={{
            border: '1px solid var(--gold-warm)',
            backgroundColor: 'rgba(201, 147, 58, 0.05)',
            marginBottom: 'var(--space-md)',
            padding: '10px 16px',
            fontSize: '13px',
            color: 'var(--gold-bright)'
          }}
        >
          Viewing focused contributor details. Filter to reset.
        </div>
      )}

      {/* Grid List */}
      {filteredContributors.length > 0 ? (
        <div className="grid-container animate-fade-up">
          {filteredContributors.map((c) => {
            const isFocused = c.id === focusId;
            return (
              <ContributorCard
                key={c.id}
                contributor={c}
                style={isFocused ? {
                  borderColor: 'var(--gold-bright)',
                  boxShadow: '0 0 15px rgba(232, 180, 85, 0.25)'
                } : {}}
              />
            );
          })}
        </div>
      ) : (
        <div
          className="card-surface flex flex-col align-center justify-center text-center"
          style={{ padding: 'var(--space-2xl)', minHeight: '240px' }}
        >
          <DiscoverIcon size={48} style={{ color: 'var(--text-faint)', marginBottom: 'var(--space-sm)' }} />
          <p className="font-body" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
            The signals are quiet here. For now.
          </p>
          <span style={{ fontSize: '12px', color: 'var(--text-faint)', marginTop: '2px' }}>
            No contributors matched your filter query.
          </span>
        </div>
      )}
    </div>
  );
};

export default Discover;
