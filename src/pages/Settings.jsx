import React from 'react';
import { PageHeader } from '../components/ui/PageHeader';

export const Settings = () => {
  return (
    <div
      className="flex flex-col animate-fade-up"
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        paddingBottom: 'var(--space-2xl)'
      }}
    >
      <PageHeader
        title="System Preferences"
        subtitle="Configure the scriptorium integrations, alerts notifications, and automated letters delivery intervals."
      />

      <style>{`
        .settings-section {
          margin-bottom: var(--space-xl);
          background: var(--bg-surface);
          border: 1px solid var(--bg-border);
          border-radius: var(--radius-md);
          padding: var(--space-lg);
        }
        .settings-title {
          font-family: var(--font-display);
          font-size: 16px;
          color: var(--gold-bright);
          margin-bottom: var(--space-sm);
          border-bottom: 1px solid rgba(42, 37, 69, 0.4);
          padding-bottom: var(--space-xs);
        }
        .form-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(232, 226, 252, 0.05);
        }
        .form-row:last-child {
          border-bottom: none;
        }
        .form-label-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }
        .form-control-input {
          background: var(--bg-elevated);
          border: 1px solid var(--bg-border);
          color: var(--text-primary);
          padding: 8px 12px;
          border-radius: var(--radius-sm);
          font-family: var(--font-ui);
          outline: none;
          font-size: 13px;
          transition: border-color var(--transition-fast);
        }
        .form-control-input:focus {
          border-color: var(--violet-glow);
        }
        
        /* Toggle Switch UI component styling */
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 22px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: var(--bg-elevated);
          border: 1px solid var(--bg-border);
          transition: .3s;
          border-radius: 34px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: var(--text-muted);
          transition: .3s;
          border-radius: 50%;
        }
        input:checked + .slider {
          background-color: var(--violet-deep);
          border-color: var(--violet-glow);
        }
        input:checked + .slider:before {
          transform: translateX(22px);
          background-color: var(--violet-ghost);
        }
      `}</style>

      {/* Section 1: Workspace */}
      <div className="settings-section">
        <h3 className="settings-title">Workspace Configuration</h3>
        
        <div className="form-row">
          <div className="form-label-col">
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Organization Name</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Name shown in generated letters heading</span>
          </div>
          <input className="form-control-input" type="text" defaultValue="Acme Engineering" style={{ width: '220px' }} />
        </div>

        <div className="form-row">
          <div className="form-label-col">
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Minimum Review Threshold</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Minimum PR reviews/comments to trigger Unsung Hero status</span>
          </div>
          <input className="form-control-input" type="number" defaultValue="50" style={{ width: '80px' }} />
        </div>
      </div>

      {/* Section 2: Notifications */}
      <div className="settings-section">
        <h3 className="settings-title">Notifications</h3>

        <div className="form-row">
          <div className="form-label-col">
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Draft Alerts</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Notify project admin when a letter draft is generated and ready</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="form-row">
          <div className="form-label-col">
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Weekly Digest Summaries</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Receive email report summarizing quiet contributors metrics</span>
          </div>
          <label className="switch">
            <input type="checkbox" defaultChecked />
            <span className="slider"></span>
          </label>
        </div>

        <div className="form-row">
          <div className="form-label-col">
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Sound Effects</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Play typing sounds and paper rustles during editor reviews</span>
          </div>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
      </div>

      {/* Section 3: Delivery Schedule */}
      <div className="settings-section">
        <h3 className="settings-title">Delivery Schedule</h3>

        <div className="form-row">
          <div className="form-label-col">
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Automated Send Intervals</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Frequency of delivering approved letters to Slack channels</span>
          </div>
          <select className="form-control-input" style={{ width: '160px', cursor: 'pointer' }} defaultValue="biweekly">
            <option value="weekly">Every Friday</option>
            <option value="biweekly">Bi-weekly (Alt Fridays)</option>
            <option value="monthly">Monthly (First Day)</option>
            <option value="manual">Manual Approval Only</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-label-col">
            <span style={{ fontSize: '13px', fontWeight: '500', color: 'var(--text-primary)' }}>Target Slack Channel</span>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Channel where public letters are delivered</span>
          </div>
          <input className="form-control-input" type="text" defaultValue="#shoutouts" style={{ width: '160px' }} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
