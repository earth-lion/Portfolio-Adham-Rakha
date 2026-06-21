/**
 * particlePresets.js
 * ─────────────────────────────────────────────────────
 * Modular tsParticles configurations.
 * Toggle between presets by passing `preset` prop to ParticlesBackground.
 * Available: "network" | "polygons" | "dots"
 */

const SHARED = {
  fullScreen: { enable: false },
  detectRetina: true,
  fpsLimit: 60,
  background: { color: { value: 'transparent' } },
};

// ── PRESET 1: Connected Network (default) ─────────────
export const NETWORK = {
  ...SHARED,
  particles: {
    number: { value: 85, density: { enable: true, area: 900 } },
    color: { value: ['#B8963E', '#CCA84A', '#8A6E28', '#D4B86A'] },
    opacity: {
      value: { min: 0.15, max: 0.55 },
      animation: { enable: true, speed: 1.2, minimumValue: 0.1, sync: false },
    },
    size: {
      value: { min: 1, max: 3 },
      animation: { enable: true, speed: 2.5, minimumValue: 0.5, sync: false },
    },
    shape: { type: 'circle' },
    move: {
      enable: true,
      speed: { min: 0.6, max: 1.4 },
      direction: 'none',
      outModes: 'bounce',
      attract: { enable: false },
    },
    links: {
      enable: true,
      distance: 160,
      color: '#B8963E',
      opacity: 0.18,
      width: 1,
      triangles: { enable: false },
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: ['grab', 'bubble'] },
      onClick: { enable: true, mode: 'push' },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.6, color: '#CCA84A' } },
      bubble: { distance: 200, size: 5, opacity: 0.6, duration: 0.4 },
      push: { quantity: 3 },
    },
  },
};

// ── PRESET 2: Polygon / Star Nodes ────────────────────
export const POLYGONS = {
  ...SHARED,
  particles: {
    number: { value: 45, density: { enable: true, area: 1000 } },
    color: { value: ['#B8963E', '#CCA84A', '#6366f1'] },
    opacity: { value: { min: 0.2, max: 0.6 } },
    size: { value: { min: 2, max: 6 } },
    shape: {
      type: ['triangle', 'polygon', 'star'],
      options: { polygon: { sides: 6 }, star: { sides: 5 } },
    },
    rotate: {
      value: { min: 0, max: 360 },
      animation: { enable: true, speed: 3, sync: false },
    },
    move: {
      enable: true,
      speed: { min: 0.4, max: 1 },
      direction: 'none',
      outModes: 'bounce',
    },
    links: {
      enable: true,
      distance: 140,
      color: '#B8963E',
      opacity: 0.12,
      width: 1,
    },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: 'repulse' },
      onClick: { enable: true, mode: 'push' },
      resize: { enable: true },
    },
    modes: {
      repulse: { distance: 160, duration: 0.4, speed: 1.5 },
      push: { quantity: 2 },
    },
  },
};

// ── PRESET 3: Minimal Dots ────────────────────────────
export const DOTS = {
  ...SHARED,
  particles: {
    number: { value: 90, density: { enable: true, area: 800 } },
    color: { value: '#B8963E' },
    opacity: { value: { min: 0.05, max: 0.3 } },
    size: { value: { min: 1, max: 2.5 } },
    shape: { type: 'circle' },
    move: {
      enable: true,
      speed: { min: 0.2, max: 0.6 },
      direction: 'none',
      outModes: 'out',
    },
    links: { enable: false },
  },
  interactivity: {
    detectsOn: 'window',
    events: {
      onHover: { enable: true, mode: 'bubble' },
      onClick: { enable: true, mode: 'push' },
      resize: { enable: true },
    },
    modes: {
      bubble: { distance: 200, size: 5, opacity: 0.5, duration: 0.3 },
      push: { quantity: 4 },
    },
  },
};

export const PRESETS = { network: NETWORK, polygons: POLYGONS, dots: DOTS };
