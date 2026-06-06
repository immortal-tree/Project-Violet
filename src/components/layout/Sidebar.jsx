import React, { createContext, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import {
  QuillIcon,
  HomeIcon,
  DiscoverIcon,
  LettersIcon,
  StoriesIcon,
  ArchiveIcon,
  AnalyticsIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LavenderSprig
} from '../icons';

const SidebarContext = createContext(null);

export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  
  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  const collapseSidebar = () => setIsExpanded(false);
  const expandSidebar = () => setIsExpanded(true);

  return (
    <SidebarContext.Provider value={{ isExpanded, toggleSidebar, collapseSidebar, expandSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const Sidebar = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const playSound = useSoundEffect();

  const navItems = [
    { label: 'Home', path: '/app/home', icon: HomeIcon },
    { label: 'Discover', path: '/app/discover', icon: DiscoverIcon },
    { label: 'Letters', path: '/app/letters', icon: LettersIcon },
    { label: 'Stories', path: '/app/stories', icon: StoriesIcon },
    { label: 'Archive', path: '/app/archive', icon: ArchiveIcon },
    { label: 'Analytics', path: '/app/analytics', icon: AnalyticsIcon },
    { label: 'Settings', path: '/app/settings', icon: SettingsIcon }
  ];

  const handleToggle = () => {
    playSound('click');
    toggleSidebar();
  };

  return (
    <aside
      className="flex flex-col justify-between"
      style={{
        width: isExpanded ? '240px' : '64px',
        backgroundColor: 'var(--bg-surface)',
        borderRight: '1px solid var(--bg-border)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 100,
        transition: 'width var(--transition-normal)',
        overflowX: 'hidden'
      }}
    >
      <div className="flex flex-col" style={{ width: '100%' }}>
        {/* Top Header Logo Area */}
        <div
          className="flex align-center"
          style={{
            padding: '24px var(--space-md)',
            gap: 'var(--space-sm)',
            borderBottom: '1px solid rgba(42, 37, 69, 0.4)',
            minHeight: '80px',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          <div style={{ color: 'var(--gold-bright)', flexShrink: 0 }}>
            <QuillIcon size={28} />
          </div>
          <span
            className="font-display animate-fade-in"
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'var(--violet-ghost)',
              letterSpacing: '0.05em',
              opacity: isExpanded ? 1 : 0,
              visibility: isExpanded ? 'visible' : 'hidden',
              transition: 'opacity 0.2s, visibility 0.2s'
            }}
          >
            Auto Memory
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col" style={{ padding: 'var(--space-sm) 0', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => `flex align-center ${isActive ? 'nav-active' : ''}`}
                style={({ isActive }) => ({
                  padding: '12px 20px',
                  gap: '16px',
                  color: isActive ? 'var(--violet-ghost)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(61, 47, 138, 0.25)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--violet-mid)' : '3px solid transparent',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast)'
                })}
                onClick={() => playSound('nav_click')}
                data-sound="nav_hover"
              >
                <div style={{ flexShrink: 0 }}>
                  <Icon size={20} />
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '14px',
                    fontWeight: '500',
                    opacity: isExpanded ? 1 : 0,
                    visibility: isExpanded ? 'visible' : 'hidden',
                    transition: 'opacity 0.2s, visibility 0.2s'
                  }}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="flex flex-col align-center" style={{ padding: 'var(--space-md) var(--space-sm)' }}>
        {/* Lavender Flourish */}
        {isExpanded && (
          <div
            className="flex flex-col align-center"
            style={{
              width: '100%',
              maxHeight: '120px',
              opacity: 0.25,
              marginBottom: 'var(--space-md)',
              textAlign: 'center'
            }}
          >
            <LavenderSprig style={{ width: '40px', height: '80px' }} />
            <span
              className="font-body"
              style={{
                fontSize: '10px',
                fontStyle: 'italic',
                color: 'var(--text-muted)',
                marginTop: '4px'
              }}
            >
              "Every thread weaves the story."
            </span>
          </div>
        )}

        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          className="flex align-center justify-center btn-secondary"
          style={{
            width: '32px',
            height: '32px',
            padding: 0,
            borderRadius: '50%',
            alignSelf: isExpanded ? 'flex-end' : 'center',
            border: '1px solid var(--bg-border)',
            background: 'var(--bg-elevated)'
          }}
          aria-label={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isExpanded ? <ChevronLeftIcon size={16} /> : <ChevronRightIcon size={16} />}
        </button>
      </div>
    </aside>
  );
};
