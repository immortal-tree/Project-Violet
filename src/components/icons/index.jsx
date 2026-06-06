import React from 'react';

// Quill Brand Icon
export const QuillIcon = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <line x1="16" y1="8" x2="2" y2="22" strokeWidth="1" />
    <line x1="17.5" y1="15" x2="9" y2="15" />
  </svg>
);

// Wax Seal Motif SVG
export const WaxSealIcon = ({ size = 32, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={className}
    {...props}
  >
    <defs>
      <radialGradient id="sealGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#871b1b" />
        <stop offset="70%" stopColor="#570f0f" />
        <stop offset="100%" stopColor="#300505" />
      </radialGradient>
      <filter id="sealShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
      </filter>
    </defs>
    <path
      d="M 50,5 C 58,5 62,8 68,11 74,14 80,12 85,18 90,24 88,32 92,39 96,46 95,54 94,62 93,70 88,76 83,82 78,88 70,87 63,91 56,95 48,96 40,93 32,90 26,92 20,87 14,82 15,74 11,67 7,60 6,52 8,44 10,36 8,28 13,22 18,16 26,17 33,13 40,9 42,5 50,5 Z"
      fill="url(#sealGrad)"
      filter="url(#sealShadow)"
      stroke="#c9933a"
      strokeWidth="1.5"
    />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#c9933a" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
    {/* Inner decorative V and Star letterform */}
    <path
      d="M 40,40 L 50,65 L 60,40"
      fill="none"
      stroke="#e8b455"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M 50,32 L 52,37 L 57,37 L 53,40 L 55,45 L 50,42 L 45,45 L 47,40 L 43,37 L 48,37 Z"
      fill="#f5d080"
    />
  </svg>
);

// Lavender Sprig SVG
export const LavenderSprig = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 100 200"
    fill="none"
    className={className}
    {...props}
  >
    <path
      d="M 50,190 Q 48,120 50,20"
      stroke="#6b6094"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Leaves */}
    <path d="M 50,160 Q 40,150 35,135 Q 45,145 50,160 Z" fill="#3d365c" opacity="0.6" />
    <path d="M 50,140 Q 60,130 65,115 Q 55,125 50,140 Z" fill="#3d365c" opacity="0.6" />
    <path d="M 50,110 Q 38,105 32,90 Q 42,100 50,110 Z" fill="#3d365c" opacity="0.6" />
    <path d="M 50,85 Q 62,80 68,65 Q 58,75 50,85 Z" fill="#3d365c" opacity="0.6" />
    
    {/* Lavender Blossoms (Buds) */}
    <g fill="#7c65d6" opacity="0.85">
      <ellipse cx="50" cy="30" rx="4" ry="7" />
      <ellipse cx="44" cy="40" rx="5" ry="8" transform="rotate(-15 44 40)" />
      <ellipse cx="56" cy="40" rx="5" ry="8" transform="rotate(15 56 40)" />
      <ellipse cx="50" cy="48" rx="3" ry="5" />
      
      <ellipse cx="42" cy="60" rx="5" ry="8" transform="rotate(-20 42 60)" />
      <ellipse cx="58" cy="60" rx="5" ry="8" transform="rotate(20 58 60)" />
      <ellipse cx="50" cy="68" rx="3" ry="5" />
      
      <ellipse cx="44" cy="85" rx="5" ry="8" transform="rotate(-15 44 85)" />
      <ellipse cx="56" cy="85" rx="5" ry="8" transform="rotate(15 56 85)" />
      
      <ellipse cx="40" cy="110" rx="5" ry="8" transform="rotate(-25 40 110)" />
      <ellipse cx="60" cy="110" rx="5" ry="8" transform="rotate(25 60 110)" />
      <ellipse cx="50" cy="118" rx="3" ry="5" />

      <ellipse cx="43" cy="135" rx="4" ry="7" transform="rotate(-15 43 135)" />
      <ellipse cx="57" cy="135" rx="4" ry="7" transform="rotate(15 57 135)" />
    </g>
    <g fill="#a48ee8" opacity="0.95">
      <circle cx="50" cy="25" r="2" />
      <circle cx="42" cy="36" r="2.5" />
      <circle cx="58" cy="36" r="2.5" />
      <circle cx="40" cy="55" r="2.5" />
      <circle cx="60" cy="55" r="2.5" />
      <circle cx="42" cy="80" r="2.5" />
      <circle cx="58" cy="80" r="2.5" />
      <circle cx="38" cy="105" r="3" />
      <circle cx="62" cy="105" r="3" />
    </g>
  </svg>
);

// Typewriter SVG (cinematic hero element)
export const TypewriterIllustration = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 400 300"
    fill="none"
    className={className}
    {...props}
  >
    <defs>
      <radialGradient id="candleGlowGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#e8b455" stopOpacity="0.4" />
        <stop offset="40%" stopColor="#c9933a" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#0a0911" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* Candle glow backdrop */}
    <circle cx="200" cy="120" r="150" fill="url(#candleGlowGrad)" />
    
    {/* Desk Surface line */}
    <line x1="40" y1="230" x2="360" y2="230" stroke="#2a2545" strokeWidth="3" strokeLinecap="round" />
    
    {/* Typewriter Body */}
    <rect x="110" y="160" width="180" height="60" rx="8" fill="#16132a" stroke="#2a2545" strokeWidth="2.5" />
    <rect x="100" y="195" width="200" height="30" rx="6" fill="#0f0d1a" stroke="#2a2545" strokeWidth="2" />
    
    {/* Scriptorium Paper in Carriage */}
    <path
      d="M 140,80 L 260,80 L 260,170 L 140,170 Z"
      fill="#f5d080"
      fillOpacity="0.08"
      stroke="#c9933a"
      strokeWidth="1.5"
    />
    <path
      d="M 150,95 H 250 M 150,110 H 230 M 150,125 H 245 M 150,140 H 200"
      stroke="#c9933a"
      strokeWidth="1.2"
      strokeLinecap="round"
      opacity="0.6"
    />
    
    {/* Carriage Roller */}
    <rect x="120" y="153" width="160" height="10" rx="3" fill="#1e1b35" stroke="#2a2545" strokeWidth="1.5" />
    <circle cx="115" cy="158" r="7" fill="#c9933a" stroke="#1e1b35" strokeWidth="1.5" />
    <circle cx="285" cy="158" r="7" fill="#c9933a" stroke="#1e1b35" strokeWidth="1.5" />
    
    {/* Keys Grid */}
    <g fill="#1e1b35" stroke="#2a2545" strokeWidth="1">
      <circle cx="130" cy="205" r="5" />
      <circle cx="150" cy="205" r="5" />
      <circle cx="170" cy="205" r="5" />
      <circle cx="190" cy="205" r="5" />
      <circle cx="210" cy="205" r="5" />
      <circle cx="230" cy="205" r="5" />
      <circle cx="250" cy="205" r="5" />
      <circle cx="270" cy="205" r="5" />
      
      <circle cx="140" cy="215" r="5" />
      <circle cx="160" cy="215" r="5" />
      <circle cx="180" cy="215" r="5" />
      <circle cx="200" cy="215" r="5" />
      <circle cx="220" cy="215" r="5" />
      <circle cx="240" cy="215" r="5" />
      <circle cx="260" cy="215" r="5" />
      
      {/* Spacebar */}
      <rect x="160" y="222" width="80" height="4" rx="2" fill="#c9933a" />
    </g>
    
    {/* Candleholder & Candle on the side */}
    <g className="animate-glow" style={{ transformOrigin: '310px 180px' }}>
      {/* Base */}
      <path d="M 290,230 C 290,225 330,225 330,230 Z" fill="#2a1f0e" stroke="#c9933a" strokeWidth="1.5" />
      <rect x="307" y="195" width="6" height="32" fill="#2a1f0e" stroke="#c9933a" strokeWidth="1" />
      {/* Candle */}
      <rect x="303" y="130" width="14" height="65" rx="2" fill="#e8e2fc" stroke="#6b6094" strokeWidth="1" />
      {/* Melted Wax detail */}
      <path d="M 303,140 Q 306,145 308,143 T 312,148 Q 315,142 317,144" stroke="#e8e2fc" strokeWidth="2" fill="none" />
      {/* Flame */}
      <path d="M 310,126 C 306,120 310,105 310,105 C 310,105 314,120 310,126 Z" fill="#e8b455" opacity="0.9" />
      <path d="M 310,124 C 308,120 310,112 310,112 C 310,112 312,120 310,124 Z" fill="#f5d080" />
    </g>
  </svg>
);

// Standard SVGs for Dashboard Pages

export const HomeIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

export const DiscoverIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const LettersIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const StoriesIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5z" />
    <path d="M6 6h10M6 10h10M6 14h10" strokeWidth="1.5" />
  </svg>
);

export const ArchiveIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="5" x="2" y="3" rx="1" />
    <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
    <path d="M10 12h4" />
  </svg>
);

export const AnalyticsIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export const SettingsIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const BellIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export const CompassIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

export const ChatBubbleIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const CodeBracketsIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

export const ShieldCheckIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const PeopleGroupIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const StarIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const HeartIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

export const DocumentTickIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <polyline points="9 15 11 17 15 13" />
  </svg>
);

export const ChevronDownIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const ChevronRightIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export const ChevronLeftIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export const SpinnerIcon = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`animate-spin ${className}`} {...props} style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const PlusIcon = ({ size = 20, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

// Source Brand Icons
export const GitHubBrandIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export const SlackBrandIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523 2.528 2.528 0 0 1-2.522-2.523 2.528 2.528 0 0 1 2.522-2.52h2.52v2.52zm1.261 0a2.528 2.528 0 0 1 2.52-2.52h5.043a2.528 2.528 0 0 1 2.522 2.52v5.042a2.528 2.528 0 0 1-2.522 2.52H8.823a2.528 2.528 0 0 1-2.52-2.52v-5.042zM8.823 5.043a2.528 2.528 0 0 1 2.52-2.52 2.528 2.528 0 0 1 2.522 2.52v2.52h-2.522a2.528 2.528 0 0 1-2.52-2.52zm0 1.261a2.528 2.528 0 0 1 2.52 2.52v5.043a2.528 2.528 0 0 1-2.52 2.522H3.78a2.528 2.528 0 0 1-2.52-2.522V8.824a2.528 2.528 0 0 1 2.52-2.52h5.043zm10.135 3.782a2.528 2.528 0 0 1 2.522-2.52 2.528 2.528 0 0 1 2.52 2.52 2.528 2.528 0 0 1-2.52 2.522h-2.522V10.086zm-1.262 0a2.528 2.528 0 0 1-2.52 2.52h-5.043a2.528 2.528 0 0 1-2.522-2.52V5.043a2.528 2.528 0 0 1 2.522-2.52h5.043a2.528 2.528 0 0 1 2.52 2.52v5.043zm-3.78 10.131a2.528 2.528 0 0 1-2.52 2.522 2.528 2.528 0 0 1-2.522-2.522v-2.52h2.522a2.528 2.528 0 0 1 2.52 2.52zm0-1.262a2.528 2.528 0 0 1-2.52-2.52v-5.043a2.528 2.528 0 0 1 2.52-2.522h5.043a2.528 2.528 0 0 1 2.52 2.522v5.043a2.528 2.528 0 0 1-2.52 2.52h-5.043z" />
  </svg>
);

export const JiraBrandIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11.565 8.784L8.748 11.6l-5.74-5.74A2.012 2.012 0 013 4.435a2.01 2.01 0 012.01-2.01c.54 0 1.05.21 1.42.59l5.135 5.769zm5.74 5.74L14.48 17.34l-5.74-5.74 2.817-2.816 5.74 5.74a2.013 2.013 0 01.59 1.42 2.01 2.01 0 01-2.01 2.01 2.012 2.012 0 01-1.572-.59zm.013-5.727l-2.817 2.816 5.74 5.74c.38.38.89.59 1.43.59a2.01 2.01 0 002.01-2.01 2.012 2.012 0 00-.59-1.42l-5.773-5.716z" />
  </svg>
);

export const NotionBrandIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.458 2.4h15.084C20.627 2.4 21.6 3.393 21.6 4.615v14.77C21.6 20.607 20.627 21.6 19.542 21.6H4.458C3.373 21.6 2.4 20.607 2.4 19.385V4.615C2.4 3.393 3.373 2.4 4.458 2.4zm1.536 2.77v13.66h12.012V5.17H5.994zm1.758 1.488h1.968l4.492 6.559v-6.559h2.008v9.914h-1.92l-4.54-6.623v6.623H7.752V6.658z" />
  </svg>
);
