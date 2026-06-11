import React from 'react';

export const StatCard = ({ icon: Icon, value = '', label = '', className = '', ...props }) => {
  return (
    <div
      className={`card-surface flex align-center gap-md ${className}`}
      style={{
        padding: '8px 12px',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(91, 69, 196, 0.15)',
        borderRadius: '10px',
        minWidth: '150px'
      }}
      {...props}
    >
      {Icon && (
        <div style={{ color: 'var(--violet-glow)', display: 'flex', alignSelf: 'flex-start', marginTop: '2px' }}>
          <Icon size={18} />
        </div>
      )}
      <div className="flex flex-col">
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '20px',
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
