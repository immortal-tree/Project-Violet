import React from 'react';

export const Divider = ({ className = '', style = {}, ...props }) => {
  return (
    <div
      className={`flex align-center justify-center ${className}`}
      style={{
        width: '100%',
        margin: 'var(--space-md) 0',
        color: 'var(--bg-border)',
        ...style
      }}
      {...props}
    >
      <svg
        width="100%"
        height="20"
        viewBox="0 0 800 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        style={{ display: 'block', maxWidth: '100%' }}
      >
        <line x1="0" y1="10" x2="385" y2="10" strokeLinecap="round" />
        {/* Fleur-de-lis / Diamond Motif */}
        <path
          d="M 400,2 L 405,10 L 400,18 L 395,10 Z"
          fill="currentColor"
        />
        <circle cx="390" cy="10" r="2" fill="currentColor" />
        <circle cx="410" cy="10" r="2" fill="currentColor" />
        <line x1="415" y1="10" x2="800" y2="10" strokeLinecap="round" />
      </svg>
    </div>
  );
};
