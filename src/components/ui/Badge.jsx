import React from 'react';
import { WaxSealIcon, GitHubBrandIcon, SlackBrandIcon, JiraBrandIcon, NotionBrandIcon } from '../icons';

export const Badge = ({ type = 'source', label = '', value = '', className = '', ...props }) => {
  if (type === 'hero') {
    return (
      <div className={`flex align-center gap-xs ${className}`} style={{ color: 'var(--gold-bright)' }} {...props}>
        <WaxSealIcon size={24} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} />
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          {label}
        </span>
      </div>
    );
  }

  if (type === 'rank') {
    const isFirst = value === 1;
    return (
      <div
        className={`flex align-center justify-center ${className}`}
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: `1px solid ${isFirst ? 'var(--gold-warm)' : 'var(--bg-border)'}`,
          background: isFirst ? 'rgba(201, 147, 58, 0.15)' : 'var(--bg-elevated)',
          color: isFirst ? 'var(--gold-bright)' : 'var(--text-secondary)',
          fontFamily: 'var(--font-display)',
          fontSize: '14px',
          fontWeight: '600',
          ...props.style
        }}
        {...props}
      >
        {value}
      </div>
    );
  }

  // Source Type
  const renderSourceIcon = () => {
    switch (label.toLowerCase()) {
      case 'github':
        return <GitHubBrandIcon size={12} />;
      case 'slack':
        return <SlackBrandIcon size={12} />;
      case 'jira':
        return <JiraBrandIcon size={12} />;
      case 'notion':
        return <NotionBrandIcon size={12} />;
      default:
        return null;
    }
  };

  const getSourceColor = () => {
    switch (label.toLowerCase()) {
      case 'github':
        return 'rgba(110, 64, 201, 0.15)';
      case 'slack':
        return 'rgba(74, 21, 75, 0.15)';
      case 'jira':
        return 'rgba(0, 82, 204, 0.15)';
      case 'notion':
        return 'rgba(255, 255, 255, 0.1)';
      default:
        return 'var(--bg-elevated)';
    }
  };

  const getSourceTextColor = () => {
    switch (label.toLowerCase()) {
      case 'github':
        return '#a48ee8';
      case 'slack':
        return '#e8a2eb';
      case 'jira':
        return '#5ba3e3';
      case 'notion':
        return 'var(--text-primary)';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div
      className={`flex align-center ${className}`}
      style={{
        background: getSourceColor(),
        color: getSourceTextColor(),
        border: `1px solid rgba(42, 37, 69, 0.5)`,
        padding: '3px 8px',
        borderRadius: 'var(--radius-pill)',
        fontSize: '11px',
        fontFamily: 'var(--font-ui)',
        fontWeight: '500',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        gap: '4px',
        display: 'inline-flex',
        width: 'fit-content'
      }}
      {...props}
    >
      {renderSourceIcon()}
      <span>{label}</span>
    </div>
  );
};
