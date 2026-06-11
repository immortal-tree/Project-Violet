import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useContributors } from '../../hooks/useContributors';
import { useSoundEffect } from '../../hooks/useSoundEffect';
import { BellIcon, ChevronDownIcon } from '../icons';

export const TopBar = ({ title = '', isHomePage = false }) => {
  const navigate = useNavigate();
  const playSound = useSoundEffect();
  const { user, logout } = useAuth();
  const { getUpcomingTasks, getContributorById } = useContributors();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  
  const tasks = getUpcomingTasks();
  const initials = user?.name ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2) : 'VE';

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = () => {
    playSound('click');
    setShowNotifications(prev => !prev);
    setShowProfileMenu(false);
  };

  const handleProfileClick = () => {
    playSound('click');
    setShowProfileMenu(prev => !prev);
    setShowNotifications(false);
  };

  const handleSignOut = () => {
    playSound('click');
    logout();
    navigate('/');
  };

  const handleTaskClick = (task) => {
    playSound('click');
    setShowNotifications(false);
    if (task.contributorId) {
      if (task.type === 'draft_ready' || task.type === 'pending_review') {
        navigate(`/app/letters?id=l001`);
      } else {
        navigate(`/app/discover?id=${task.contributorId}`);
      }
    }
  };

  const rightControls = (
    <div className="flex align-center gap-md">
      {/* Notifications Bell */}
      <div ref={notificationRef} style={{ position: 'relative' }}>
        <button
          onClick={handleNotificationClick}
          className="flex align-center justify-center btn-secondary"
          style={{
            width: '38px',
            height: '38px',
            padding: 0,
            borderRadius: '50%',
            position: 'relative'
          }}
          aria-label="Toggle notifications"
        >
          <BellIcon size={20} />
          {tasks.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--danger)',
                border: '1.5px solid var(--bg-surface)'
              }}
            />
          )}
        </button>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div
            className="card-surface animate-fade-up"
            style={{
              position: 'absolute',
              top: '48px',
              right: '0',
              width: '320px',
              maxHeight: '400px',
              overflowY: 'auto',
              backgroundColor: 'var(--bg-elevated)',
              zIndex: 110,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--bg-border)',
              padding: 'var(--space-md)'
            }}
          >
            <h4 className="font-display" style={{ fontSize: '13px', color: 'var(--gold-bright)', marginBottom: 'var(--space-sm)' }}>
              Upcoming Tasks & Alerts
            </h4>
            <div className="flex flex-col gap-sm">
              {tasks.map((task) => {
                const person = getContributorById(task.contributorId);
                return (
                  <div
                    key={task.id}
                    onClick={() => handleTaskClick(task)}
                    data-cursor="pointer"
                    style={{
                      padding: '10px',
                      backgroundColor: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(42, 37, 69, 0.4)',
                      transition: 'border-color var(--transition-fast)'
                    }}
                    className="notification-item"
                  >
                    <style>{`
                      .notification-item:hover {
                        border-color: var(--violet-glow);
                      }
                    `}</style>
                    <div className="font-ui" style={{ fontSize: '12px', fontWeight: '500', color: 'var(--text-primary)' }}>
                      {task.label}
                    </div>
                    <div className="flex justify-between align-center" style={{ marginTop: '6px' }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {person?.role || 'Engineer'}
                      </span>
                      {task.dueDate && (
                        <span style={{ fontSize: '9px', color: 'var(--gold-warm)', fontFamily: 'var(--font-display)' }}>
                          Due: {task.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* User Profile */}
      <div ref={profileRef} style={{ position: 'relative' }}>
        <button
          onClick={handleProfileClick}
          className="flex align-center gap-xs"
          style={{
            padding: '4px 12px 4px 6px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--bg-border)',
            background: 'rgba(22, 19, 42, 0.4)',
            transition: 'border-color var(--transition-fast)'
          }}
        >
          {/* Initials Avatar */}
          <div
            className="flex align-center justify-center font-display"
            style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              backgroundColor: 'var(--violet-deep)',
              color: 'var(--violet-ghost)',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            {initials}
          </div>
          
          {/* User Info (Visible on larger screens) */}
          <div className="flex flex-col text-left profile-user-info" style={{ width: '90px', overflow: 'hidden' }}>
            <span className="font-ui" style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              {user?.name || 'Admin'}
            </span>
            <span className="font-ui" style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
              {user?.role || 'Manager'}
            </span>
          </div>
          <ChevronDownIcon size={14} style={{ color: 'var(--text-secondary)' }} />
        </button>

        {/* Profile Dropdown */}
        {showProfileMenu && (
          <div
            className="card-surface animate-fade-up"
            style={{
              position: 'absolute',
              top: '44px',
              right: '0',
              width: '180px',
              backgroundColor: 'var(--bg-elevated)',
              zIndex: 110,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.5)',
              border: '1px solid var(--bg-border)',
              padding: 'var(--space-xs) 0'
            }}
          >
            <button
              onClick={() => { setShowProfileMenu(false); navigate('/app/settings'); }}
              style={{
                padding: '10px 16px',
                width: '100%',
                textAlign: 'left',
                fontSize: '12px',
                color: 'var(--text-primary)',
                display: 'block'
              }}
              className="profile-menu-item"
            >
              Profile Settings
            </button>
            <button
              onClick={() => { setShowProfileMenu(false); navigate('/app/settings'); }}
              style={{
                padding: '10px 16px',
                width: '100%',
                textAlign: 'left',
                fontSize: '12px',
                color: 'var(--text-primary)',
                display: 'block'
              }}
              className="profile-menu-item"
            >
              Workspace Preferences
            </button>
            
            <div style={{ height: '1px', backgroundColor: 'var(--bg-border)', margin: '4px 0' }} />
            
            <button
              onClick={handleSignOut}
              style={{
                padding: '10px 16px',
                width: '100%',
                textAlign: 'left',
                fontSize: '12px',
                color: 'var(--danger)',
                display: 'block',
                fontWeight: '500'
              }}
              className="profile-menu-item"
            >
              Sign out
            </button>

            <style>{`
              .profile-menu-item {
                transition: background var(--transition-fast), color var(--transition-fast);
              }
              .profile-menu-item:hover {
                background: rgba(61, 47, 138, 0.25);
                color: var(--violet-ghost) !important;
              }
              .profile-user-info {
                display: flex;
              }
              @media (max-width: 600px) {
                .profile-user-info {
                  display: none !important;
                }
              }
            `}</style>
          </div>
        )}
      </div>
    </div>
  );

  if (isHomePage || title === 'The Letter Room') {
    return (
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: 'var(--space-lg)',
          zIndex: 100
        }}
      >
        {rightControls}
      </div>
    );
  }

  return (
    <header
      className="flex align-center justify-between"
      style={{
        height: '60px',
        backgroundColor: 'var(--bg-base)',
        borderBottom: '1px solid var(--bg-border)',
        padding: '0 var(--space-lg)',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}
    >
      {/* Route / Page Title */}
      <div className="flex align-center">
        <h3
          className="font-display animate-fade-in"
          style={{
            fontSize: '18px',
            color: 'var(--violet-ghost)',
            fontWeight: '600',
            letterSpacing: '0.05em'
          }}
        >
          {title || 'Dashboard'}
        </h3>
      </div>

      {rightControls}
    </header>
  );
};
