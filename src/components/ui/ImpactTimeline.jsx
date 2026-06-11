import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleIcon, CodeBracketsIcon, ShieldCheckIcon, PeopleGroupIcon } from '../icons';
import { useSoundEffect } from '../../hooks/useSoundEffect';

export const ImpactTimeline = ({ items = [], className = '', ...props }) => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();

  if (!items || items.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: 'var(--space-md)' }}>
        The signals are quiet here. For now.
      </div>
    );
  }

  const renderIcon = (type) => {
    switch (type) {
      case 'answer':
        return <ChatBubbleIcon size={16} />;
      case 'code':
        return <CodeBracketsIcon size={16} />;
      case 'shield':
        return <ShieldCheckIcon size={16} />;
      case 'mentor':
        return <PeopleGroupIcon size={16} />;
      default:
        return null;
    }
  };

  const handleNodeClick = (id) => {
    playSound('timeline_click');
    navigate('/app/discover');
  };

  return (
    <div className={`timeline-container ${className}`} {...props}>
      <style>{`
        .timeline-container {
          position: relative;
          width: 100%;
          padding: var(--space-md) 0;
          overflow-x: auto;
        }

        .timeline-track {
          display: flex;
          justify-content: space-between;
          position: relative;
          min-width: 600px;
          padding: 20px 10px;
        }

        /* Connecting Line */
        .timeline-track::before {
          content: "";
          position: absolute;
          top: 42px;
          left: 5%;
          right: 5%;
          height: 2px;
          border-top: 2px dashed var(--bg-border);
          z-index: 1;
        }

        .timeline-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 120px;
          position: relative;
          z-index: 2;
          text-align: center;
        }

        /* Hexagonal Container */
        .hex-wrapper {
          position: relative;
          width: 44px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--violet-glow);
          transition: transform var(--transition-fast), color var(--transition-fast);
          margin-bottom: var(--space-sm);
        }

        .timeline-node[data-cursor="pointer"]:hover .hex-wrapper {
          transform: scale(1.1);
          color: var(--gold-bright);
        }

        .hex-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          fill: var(--bg-surface);
          stroke: currentColor;
          stroke-width: 1.5;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
          transition: stroke var(--transition-fast);
        }

        .timeline-label {
          font-family: var(--font-ui);
          font-size: 11px;
          color: var(--text-primary);
          line-height: 1.4;
          margin-top: 4px;
          max-height: 40px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .timeline-date {
          font-family: var(--font-ui);
          font-size: 10px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        /* Mobile Layout */
        @media (max-width: 768px) {
          .timeline-track {
            flex-direction: column;
            min-width: unset;
            gap: var(--space-lg);
            padding-left: 40px;
          }

          .timeline-track::before {
            top: 0;
            bottom: 0;
            left: 31px;
            right: unset;
            width: 2px;
            height: 100%;
            border-top: none;
            border-left: 2px dashed var(--bg-border);
          }

          .timeline-node {
            flex-direction: row;
            width: 100%;
            text-align: left;
            gap: var(--space-md);
            align-items: flex-start;
          }

          .hex-wrapper {
            margin-bottom: 0;
            flex-shrink: 0;
          }

          .node-details {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>

      <div className="timeline-track">
        {items.map((item) => (
          <div
            key={item.id}
            className="timeline-node"
            data-cursor="pointer"
            onClick={() => handleNodeClick(item.id)}
          >
            <div className="hex-wrapper">
              <svg className="hex-bg" viewBox="0 0 44 48">
                <path d="M 22,2 L 40,12 L 40,36 L 22,46 L 4,36 L 4,12 Z" />
              </svg>
              {renderIcon(item.type)}
            </div>
            
            <div className="node-details">
              <div className="timeline-label">{item.label}</div>
              <div className="timeline-date">{item.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
