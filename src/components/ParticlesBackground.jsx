/**
 * ParticlesBackground.jsx
 * ─────────────────────────────────────────────────────────────
 * Interactive particles network — @tsparticles/react v4 (tree-shaken).
 * Uses ParticlesProvider with a stable init function for correct lifecycle.
 *
 * Props:
 *   preset — "network" | "polygons" | "dots"  (default: "network")
 */
import { useMemo } from 'react';
import Particles, { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { PRESETS } from './particlePresets';

/* Module-level stable initialization function */
const initParticles = async (engine) => {
  await loadSlim(engine);
};

export default function ParticlesBackground({ preset = 'network' }) {
  const options = useMemo(() => PRESETS[preset] ?? PRESETS.network, [preset]);

  return (
    <>
      {/* ── Deep mesh gradient base — GPU-only, no JS ── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 130% 90% at 15% 5%,  rgba(184,150,62,0.12) 0%, transparent 55%),' +
          'radial-gradient(ellipse 110% 75% at 85% 90%,  rgba(79,70,229,0.07) 0%, transparent 55%),' +
          'radial-gradient(ellipse 80%  55% at 50% 50%,  rgba(15,160,150,0.04) 0%, transparent 55%),' +
          'linear-gradient(160deg, #04040f 0%, #07071c 55%, #050515 100%)',
      }} />

      {/* ── SVG fractal noise micro-texture ── */}
      <svg aria-hidden="true" style={{
        position: 'fixed', inset: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none', opacity: 0.025,
      }}>
        <defs>
          <filter id="mesh-noise-p">
            <feTurbulence type="fractalNoise" baseFrequency="0.65"
              numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#mesh-noise-p)" />
      </svg>

      {/* ── tsParticles canvas — interactive, mouse-reactive ── */}
      <ParticlesProvider init={initParticles}>
        <Particles
          id="tsparticles"
          options={options}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      </ParticlesProvider>

      {/* ── Radial vignette — darkens edges, focuses center content ── */}
      <div aria-hidden="true" style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background:
          'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(4,4,15,0.70) 100%)',
      }} />
    </>
  );
}
