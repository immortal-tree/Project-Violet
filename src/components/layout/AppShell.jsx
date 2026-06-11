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
          position: 'relative',
          overflow: 'hidden',
          background: isHomePage
            ? `linear-gradient(to right, #07060f 0%, transparent 6%), url(${homeBg}) center / cover no-repeat fixed`
            : `linear-gradient(to right, #07060f 0%, transparent 6%) var(--bg-base)`
        }}
      >
        {/* Sticky Top Header Bar */}
        <TopBar title={getPageTitle()} isHomePage={isHomePage} />
        
        <main
          style={{
            flex: 1,
            overflowY: isHomePage ? 'hidden' : 'auto',
            padding: 'var(--space-lg)',
            backgroundColor: 'transparent'
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
