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
import sidebarBg from '../../assets/sidebar-bg.jpg';

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
    { label: 'Home',      path: '/app/home',      icon: HomeIcon,      subtitle: null },
    { label: 'Discover',  path: '/app/discover',  icon: DiscoverIcon,  subtitle: 'Find hidden heroes' },
    { label: 'Letters',   path: '/app/letters',   icon: LettersIcon,   subtitle: 'Generated letters' },
    { label: 'Stories',   path: '/app/stories',   icon: StoriesIcon,   subtitle: 'Impact stories' },
    { label: 'Archive',   path: '/app/archive',   icon: ArchiveIcon,   subtitle: 'Past letters' },
    { label: 'Analytics', path: '/app/analytics', icon: AnalyticsIcon, subtitle: 'Insights & impact' },
    { label: 'Settings',  path: '/app/settings',  icon: SettingsIcon,  subtitle: 'Preferences' },
  ];

  const handleToggle = () => {
    playSound('click');
    toggleSidebar();
  };

  return (
    <aside
      className="flex flex-col"
      style={{
        width: isExpanded ? '240px' : '64px',
        backgroundImage: `url(${sidebarBg})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center 75%',
        backgroundRepeat: 'no-repeat',
        borderRight: '1px solid var(--bg-border)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
        zIndex: 100,
        transition: 'width var(--transition-normal)',
        overflowX: 'hidden',
      }}
    >

      {/* All content above the overlay */}
      <div className="flex flex-col" style={{ position: 'relative', zIndex: 1, width: '100%', flex: 1, minHeight: 0 }}>
        {/* Top Header Logo Area */}
        <div
          className="flex align-center"
          style={{
            padding: '24px var(--space-md)',
            gap: 'var(--space-sm)',
            borderBottom: '1px solid rgba(42, 37, 69, 0.4)',
            minHeight: '80px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <div style={{ color: '#c9a86c', flexShrink: 0 }}>
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
              transition: 'opacity 0.2s, visibility 0.2s',
            }}
          >
            Auto Memory
          </span>
        </div>

        {/* Navigation List */}
        <nav className="flex flex-col" style={{ padding: 'var(--space-sm) 0', gap: '2px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }) => `flex align-center ${isActive ? 'nav-active' : ''}`}
                style={({ isActive }) => ({
                  padding: item.subtitle ? '10px 20px 10px 20px' : '12px 20px',
                  gap: '16px',
                  color: isActive ? '#e8c97a' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(61, 47, 138, 0.25)' : 'transparent',
                  borderLeft: isActive ? '3px solid #c9a86c' : '3px solid transparent',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  transition: 'background var(--transition-fast), border-color var(--transition-fast), color var(--transition-fast)',
                })}
                onClick={() => playSound('nav_click')}
                data-sound="nav_hover"
                onMouseEnter={e => {
                  if (!e.currentTarget.classList.contains('nav-active')) {
                    e.currentTarget.style.background = 'rgba(91, 69, 196, 0.12)';
                  }
                }}
                onMouseLeave={e => {
                  if (!e.currentTarget.classList.contains('nav-active')) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {({ isActive }) => (
                  <>
                    <div style={{ flexShrink: 0, color: isActive ? '#e8c97a' : '#7c65d6' }}>
                      <Icon size={20} />
                    </div>
                    <div style={{
                      opacity: isExpanded ? 1 : 0,
                      visibility: isExpanded ? 'visible' : 'hidden',
                      transition: 'opacity 0.2s, visibility 0.2s',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1px',
                      overflow: 'hidden',
                    }}>
                      <span style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '14px',
                        fontWeight: '500',
                        lineHeight: 1.3,
                      }}>
                        {item.label}
                      </span>
                      {item.subtitle && (
                        <span style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '11px',
                          color: '#6b6094',
                          lineHeight: 1.2,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}>
                          {item.subtitle}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Flex spacer pushes quote to the bottom */}
        <div style={{ flex: 1 }} />

        {/* Bottom Quote — visible only when expanded */}
        {isExpanded && (
          <div style={{
            padding: '0 20px 28px',
            opacity: isExpanded ? 1 : 0,
            transition: 'opacity 0.2s',
          }}>
            {/* Ornamental divider */}
            <svg width="100%" height="14" viewBox="0 0 160 14" style={{ opacity: 0.35, marginBottom: '10px', display: 'block' }} aria-hidden="true">
              <line x1="0" y1="7" x2="66" y2="7" stroke="#c9a86c" strokeWidth="0.7" />
              <path d="M76 7 L80 3 L84 7 L80 11 Z" fill="#c9a86c" />
              <line x1="94" y1="7" x2="160" y2="7" stroke="#c9a86c" strokeWidth="0.7" />
            </svg>

            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '11.5px',
              color: 'rgba(197, 180, 240, 0.5)',
              margin: '0 0 4px 0',
              lineHeight: 1.5,
            }}>
              "Words have the power to heal, thank, and remember."
            </p>
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontSize: '11px',
              color: 'rgba(197, 180, 240, 0.3)',
              margin: 0,
            }}>
              — Violet Evergarden
            </p>
          </div>
        )}
      </div>

      {/* Sidebar Footer — Toggle button */}
      <div
        className="flex flex-col align-center"
        style={{
          padding: 'var(--space-md) var(--space-sm)',
          position: 'relative',
          zIndex: 1,
        }}
      >
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
            background: 'var(--bg-elevated)',
          }}
          aria-label={isExpanded ? 'Collapse Sidebar' : 'Expand Sidebar'}
        >
          {isExpanded ? <ChevronLeftIcon size={16} /> : <ChevronRightIcon size={16} />}
        </button>
      </div>
    </aside>
  );
};
