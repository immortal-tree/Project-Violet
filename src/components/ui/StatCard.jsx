import React from 'react';

export const StatCard = ({ icon: Icon, value = '', label = '', className = '', ...props }) => {
  return (
    <div
      className={`card-surface flex align-center gap-md ${className}`}
      style={{
        padding: '12px var(--space-md)',
        background: 'rgba(22, 19, 42, 0.4)',
        minWidth: '150px'
      }}
      {...props}
    >
      {Icon && (
        <div style={{ color: 'var(--violet-glow)', display: 'flex', alignSelf: 'flex-start', marginTop: '4px' }}>
          <Icon size={20} />
        </div>
      )}
      <div className="flex flex-col">
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '24px',
            fontWeight: '600',
            color: 'var(--text-primary)',
            lineHeight: '1.2'
          }}
        >
          {value}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            lineHeight: '1.3',
            marginTop: '2px'
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};
