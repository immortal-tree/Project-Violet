import React, { createContext, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import {
  QuillIcon,
  HomeIcon,
  DiscoverIcon,
  LettersIcon,
  SettingsIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LavenderSprig
} from '../icons';
import sidebarBg from '../../assets/sidebar-bg.jpg';
import brandLogo from '../../assets/brand-logo.png';
import lineDivider from '../../assets/line-divider.png';

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
  const collapsed = !isExpanded;
  const playSound = useSoundEffect();

  const navItems = [
    { label: 'Home',      path: '/app/home',      icon: HomeIcon,      subtitle: null },
    { label: 'Discover',  path: '/app/discover',  icon: DiscoverIcon,  subtitle: 'Find hidden heroes' },
    { label: 'Letters',   path: '/app/letters',   icon: LettersIcon,   subtitle: 'Generated letters' },
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
        backgroundColor: '#07060f',
        backgroundImage: `url(${sidebarBg})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center 75%',
        backgroundRepeat: 'no-repeat',
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
      <div className="flex flex-col" style={{ position: 'relative', zIndex: 1, width: '100%', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Top Header Logo Area */}
        <div
          className="flex align-center justify-center"
          style={{
            padding: '24px 0',
            overflow: 'hidden',
            width: '100%',
            position: 'relative',
            zIndex: 1
          }}
        >
          {isExpanded ? (
            <img
              src={brandLogo}
              alt="Auto Memory Logo"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '180px',
                objectFit: 'contain',
                transform: 'scale(1.6)',
                transition: 'transform var(--transition-normal), max-height var(--transition-normal)'
              }}
            />
          ) : (
            <div style={{ color: '#c99a6c', flexShrink: 0, marginTop: '8px' }} className="animate-fade-in">
              <QuillIcon size={32} />
            </div>
          )}
        </div>

        {/* Navigation List */}
        <nav
          className="flex flex-col"
          style={{
            padding: 'var(--space-sm) 0',
            gap: '2px',
            position: 'relative',
            zIndex: 2,
            marginTop: collapsed ? 0 : -30,
            background: 'linear-gradient(to bottom, rgba(10,8,20,0.7) 0%, transparent 100%)'
          }}
        >
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
                  background: isActive ? 'linear-gradient(to right, rgba(45,28,110,0.85) 0%, rgba(61,47,138,0.4) 35%, transparent 100%)' : 'transparent',
                  borderLeft: isActive ? '3px solid #c9a86c' : '3px solid transparent',
                  borderTopLeftRadius: isActive ? 6 : 0,
                  borderBottomLeftRadius: isActive ? 6 : 0,
                  marginLeft: isActive ? 6 : 0,
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
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
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

        {/* Bottom Quote — visible only when expanded */}
        {isExpanded && (
          <div style={{
            marginTop: 'auto',
            padding: '0 16px 4px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <img
              src={lineDivider}
              alt=""
              aria-hidden="true"
              style={{
                width: '90%',
                height: 'auto',
                opacity: 0.75,
                display: 'block',
                marginBottom: 10,
                objectFit: 'cover',
                objectPosition: 'center',
                maxHeight: 20,
              }}
            />
            <p style={{
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 11.5,
              lineHeight: 1.7,
              color: 'rgba(197,180,240,0.5)',
              margin: '0 0 6px 0',
              textAlign: 'center',
            }}>
              "Words have the power to heal, thank, and remember."
            </p>
            <span style={{
              fontFamily: "'Lora', Georgia, serif",
              fontStyle: 'italic',
              fontSize: 10.5,
              color: 'rgba(164,142,210,0.38)',
              letterSpacing: '0.03em',
              textAlign: 'center',
            }}>
              — Violet Evergarden
            </span>
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

      {/* Atmospheric golden divider line */}
      <div style={{
        position:   'absolute',
        right:      0,
        top:        0,
        width:      1,
        height:     '100%',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(180,140,60,0.15) 15%, rgba(200,160,80,0.55) 28%, rgba(180,140,60,0.2) 42%, transparent 55%, rgba(180,140,60,0.12) 68%, rgba(200,160,80,0.45) 78%, rgba(180,140,60,0.15) 88%, transparent 100%)',
        pointerEvents: 'none',
        zIndex:     10,
      }} />
    </aside>
  );
};
