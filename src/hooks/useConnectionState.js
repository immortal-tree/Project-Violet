import { useState } from 'react';
import { WORKSPACE_SOURCES } from '../store/mockData';

export const useConnectionState = () => {
  const [sources, setSources] = useState(() => 
    WORKSPACE_SOURCES.map(source => ({ ...source, status: 'disconnected' }))
  );

  const connectSource = (id) => {
    // 1. Transition to 'connecting'
    setSources(prev =>
      prev.map(src => (src.id === id ? { ...src, status: 'connecting' } : src))
    );

    // 2. Transition to 'live' after 1500ms
    setTimeout(() => {
      setSources(prev =>
        prev.map(src => (src.id === id ? { ...src, status: 'live' } : src))
      );
    }, 1500);
  };

  const getConnectedCount = () => {
    return sources.filter(src => src.status === 'live').length;
  };

  const isConnectingAny = () => {
    return sources.some(src => src.status === 'connecting');
  };

  return {
    sources,
    connectSource,
    getConnectedCount,
    isConnectingAny
  };
};
