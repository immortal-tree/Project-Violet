import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, SidebarProvider } from './Sidebar';
import { TopBar } from './TopBar';

const AppShellContent = () => {
  const location = useLocation();
  
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
            backgroundColor: 'var(--bg-base)'
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
