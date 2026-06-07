import { Howl } from 'howler';
import keyClickSrc from '../assets/sounds/key-click.mp3';
import carriageReturnSrc from '../assets/sounds/carriage-return.mp3';

// ─── Typewriter SFX ──────────────────────────────────────────────────────────

const KEY_CLICK = new Howl({
  src: [keyClickSrc],
  volume: 0.3,
  preload: true,
});

const CARRIAGE_RETURN = new Howl({
  src: [carriageReturnSrc],
  volume: 2.0,
  preload: true,
});

export function playKeyClick() {
  const instance = KEY_CLICK.play();
  // Slight pitch variation per keystroke for a realistic mechanical feel
  KEY_CLICK.rate(0.9 + Math.random() * 0.2, instance);
}

export function playCarriageReturn() {
  CARRIAGE_RETURN.play();
}

// No-ops retained so TypewriterScene.jsx and Landing.jsx compile without changes
export function startAmbientWind() { }
export function stopAmbientWind() { }
export function unlockAudio() { }

// ─── Retain original hook export for layout/page compatibility ────────────────
export const useSoundEffect = () => {
  const playSound = (_actionName) => { };
  return playSound;
};
