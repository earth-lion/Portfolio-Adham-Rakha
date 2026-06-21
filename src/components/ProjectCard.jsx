import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ProjectCard({ project, lang }) {
  const isRTL = lang === 'ar';
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const gradients = [
    'linear-gradient(135deg, #1a1a3e 0%, #0d1f3c 100%)',
    'linear-gradient(135deg, #1a2e1a 0%, #0d2010 100%)',
    'linear-gradient(135deg, #2e1a1a 0%, #1f0d0d 100%)',
    'linear-gradient(135deg, #1a1a2e 0%, #0d0d28 100%)',
  ];
  const grad = gradients[project.id % gradients.length];

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [transitionStyle, setTransitionStyle] = useState('transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)');

  const handleMouseMove = (e) => {
    if (isMobile) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const rotateY = ((x - xc) / xc) * 8; // Max 8 degrees
    const rotateX = -((y - yc) / yc) * 8;

    setTransitionStyle('transform 0.08s ease-out');
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTransitionStyle('transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)');
    setTilt({ x: 0, y: 0 });
  };

  const fullDesc = project.desc[lang];
  const readMoreLabel = lang === 'ar' ? 'اقرأ المزيد' : 'Read More';
  const showLessLabel = lang === 'ar' ? 'إخفاء' : 'Show Less';

  return (
    <div className="card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        direction: isRTL ? 'rtl' : 'ltr',
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: transitionStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Card banner */}
      <div style={{
        height: '160px', background: grad, position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
        transform: 'translateZ(25px)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, rgba(200,168,75,0.12) 0%, transparent 70%)',
        }} />
        <div style={{
          fontFamily: 'var(--font-en)', fontSize: '52px', fontWeight: 900, opacity: 0.08,
          color: 'var(--gold)', letterSpacing: '-2px', userSelect: 'none',
        }}>
          {project.id.toString().padStart(2, '0')}
        </div>
        <div style={{
          position: 'absolute', top: '16px', right: isRTL ? 'auto' : '16px', left: isRTL ? '16px' : 'auto',
          display: 'flex', gap: '8px',
        }}>
          {project.github && (
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text)', textDecoration: 'none', transition: 'var(--tr)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-glow)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text)'; }}
            >
              <GithubIcon size={15} />
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '34px', height: '34px', borderRadius: '8px',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
              color: 'var(--text)', textDecoration: 'none', transition: 'var(--tr)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-glow)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'var(--text)'; }}
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <h3 style={{
          fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)',
          fontSize: '17px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.3,
        }}>
          {project.title[lang]}
        </h3>
        
        {isMobile ? (
          <>
            {expanded && (
              <p style={{
                fontSize: '13px', color: 'var(--text-2)', lineHeight: 1.7,
                animation: 'fadeIn 0.25s ease',
              }}>
                {fullDesc}
              </p>
            )}
            <button
              onClick={() => setExpanded(e => !e)}
              style={{
                alignSelf: isRTL ? 'flex-end' : 'flex-start',
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--gold)', fontSize: '13px', fontWeight: 700,
                padding: '2px 0', fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)',
                textDecoration: 'underline', textUnderlineOffset: '3px',
              }}
            >
              {expanded ? showLessLabel : readMoreLabel}
            </button>
          </>
        ) : (
          <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, flex: 1 }}>
            {fullDesc}
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '2px' }}>
          {project.tags.map(tag => (
            <span key={tag} className="tag" style={{ fontSize: '11px' }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
