import React from 'react';
import { Divider } from './Divider';

export const PageHeader = ({ title = '', subtitle = '', heroImage: HeroImage, className = '', ...props }) => {
  return (
    <div className={`flex flex-col ${className}`} style={{ width: '100%' }} {...props}>
      <div
        className="flex align-center justify-between"
        style={{
          width: '100%',
          padding: 'var(--space-md) 0 var(--space-xs) 0',
          position: 'relative',
          gap: 'var(--space-lg)',
          flexWrap: 'wrap'
        }}
      >
        <div className="flex flex-col" style={{ flex: '1 1 300px' }}>
          <h2
            className="font-display"
            style={{
              fontSize: '28px',
              color: 'var(--violet-ghost)',
              lineHeight: '1.3',
              marginBottom: 'var(--space-sm)'
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="font-body"
              style={{
                fontSize: '14px',
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                fontStyle: 'italic'
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {HeroImage && (
          <div
            className="flex align-center justify-center"
            style={{
              flex: '0 0 auto',
              maxHeight: '100px',
              opacity: 0.8
            }}
          >
            {React.isValidElement(HeroImage) ? HeroImage : <HeroImage />}
          </div>
        )}
      </div>
      
      <Divider style={{ margin: '12px 0 20px 0' }} />
    </div>
  );
};
