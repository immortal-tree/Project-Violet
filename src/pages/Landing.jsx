import React from 'react';
import PetalCanvas from '../components/ui/PetalCanvas';
import TypewriterScene from '../components/landing/TypewriterScene';
import BrandTitle from '../components/landing/BrandTitle';
import ConnectButton from '../components/landing/ConnectButton';
import FloatingQuote from '../components/landing/FloatingQuote';
import CandleGlows from '../components/landing/CandleGlows';

export default function Landing() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#07050f',
      }}
    >
      {/* Layer 1: Background with Animated Candles */}
      <CandleGlows />

      {/* Subtle center darkening to make text readable */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(7,5,15,0.15) 0%, rgba(7,5,15,0.5) 100%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Layer 2: Petals */}
      <PetalCanvas />

      {/* Dynamic Floating Quotes */}
      <FloatingQuote />

      {/* Layer 3: Foreground — anchored to bottom, typewriter sits on table */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: '9vh',
      }}>
        <TypewriterScene />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 18 }}>
          <BrandTitle />
          <ConnectButton />
        </div>
      </div>
    </div>
  );
}
