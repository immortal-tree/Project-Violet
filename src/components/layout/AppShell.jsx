import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, SidebarProvider } from './Sidebar';
import { TopBar } from './TopBar';
import homeBg from '../../assets/home-bg.jpg';

const AppShellContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname.endsWith('/home');
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.endsWith('/home')) return 'The Scriptorium';
    if (path.endsWith('/discover')) return 'The Hall of Heroes';
    if (path.endsWith('/letters')) return 'The Letter Room';
    if (path.endsWith('/stories')) return 'Chronicles of Impact';
    if (path.endsWith('/archive')) return 'The Great Archives';
    if (path.endsWith('/analytics')) return 'Signals & Insights';
    if (path.endsWith('/settings')) return 'System Preferences';
    return 'Auto Memory';
  };

  return (
    <div
      className="flex"
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-void)'
      }}
    >
      {/* Collapsible Sidebar */}
      <Sidebar />
      
      {/* Right Content Panel Area */}
      <div
        className="flex flex-col"
        style={{
          flex: 1,
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        {/* Sticky Top Header Bar */}
        <TopBar title={getPageTitle()} />
        
        {/* Scrollable Workspace Container */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--space-lg)',
            backgroundColor: 'var(--bg-base)',
            backgroundImage: isHomePage ? `linear-gradient(rgba(15, 13, 26, 0.85), rgba(15, 13, 26, 0.92)), url(${homeBg})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export const AppShell = () => {
  return (
    <SidebarProvider>
      <AppShellContent />
    </SidebarProvider>
  );
};

export default AppShell;
