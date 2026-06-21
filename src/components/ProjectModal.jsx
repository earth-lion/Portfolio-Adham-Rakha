import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

export default function ProjectModal({ project, onClose, lang }) {
  const isRTL = lang === 'ar';

  // Prevent scroll behind modal when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  const gradients = [
    'linear-gradient(135deg, #1a1a3e 0%, #0d1f3c 100%)',
    'linear-gradient(135deg, #1a2e1a 0%, #0d2010 100%)',
    'linear-gradient(135deg, #2e1a1a 0%, #1f0d0d 100%)',
    'linear-gradient(135deg, #1a1a2e 0%, #0d0d28 100%)',
  ];
  const grad = gradients[project.id % gradients.length];

  // Labels based on language
  const techLabel = isRTL ? 'التقنيات المستخدمة' : 'Technologies & Stack';
  const categoryLabel = isRTL ? 'التصنيف' : 'Category';
  const visitLabel = isRTL ? 'زيارة الموقع' : 'Live Demo';
  const codeLabel = isRTL ? 'كود المشروع' : 'View Code';

  const categoryNames = {
    fullstack: isRTL ? 'فول ستاك (Full-Stack)' : 'Full-Stack Development',
    frontend: isRTL ? 'فرونت إند (Frontend)' : 'Frontend Development',
  };

  return (
    <div 
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 5, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'modalFadeIn 0.3s ease-out forwards',
        cursor: 'pointer',
      }}
    >
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
        style={{
          width: '100%',
          maxWidth: '680px',
          background: 'var(--surface)',
          border: '1px solid var(--gold-border)',
          borderRadius: 'var(--radius)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.65)',
          overflow: 'hidden',
          position: 'relative',
          direction: isRTL ? 'rtl' : 'ltr',
          animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          cursor: 'default',
        }}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            [isRTL ? 'left' : 'right']: '16px',
            zIndex: 100,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            border: '1px solid var(--border)',
            background: 'rgba(7, 7, 26, 0.75)',
            backdropFilter: 'blur(4px)',
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'var(--tr)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
        >
          <X size={18} />
        </button>

        {/* Modal Header / Banner */}
        <div style={{
          height: '240px',
          background: project.image ? 'none' : grad,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {project.image ? (
            <img src={project.image} alt={project.title[lang]} style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }} />
          ) : (
            <>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(200,168,75,0.15) 0%, transparent 80%)',
              }} />
              <div style={{
                fontFamily: 'var(--font-en)', fontSize: '90px', fontWeight: 900, opacity: 0.05,
                color: 'var(--gold)', letterSpacing: '-4px', userSelect: 'none',
              }}>
                {project.id.toString().padStart(2, '0')}
              </div>
            </>
          )}
          {/* Bottom Gradient overlay */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background: 'linear-gradient(to top, var(--surface) 0%, transparent 100%)',
          }} />
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
          {/* Metadata Row */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: 700, 
              color: 'var(--gold)',
              textTransform: 'uppercase', 
              letterSpacing: '1.5px',
              fontFamily: isRTL ? 'var(--font-ar)' : 'inherit'
            }}>
              {categoryLabel}: {categoryNames[project.category]}
            </span>
            <h2 style={{
              fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)',
              fontSize: 'clamp(20px, 4vw, 26px)',
              fontWeight: 800,
              color: 'var(--text)',
              lineHeight: 1.25,
            }}>
              {project.title[lang]}
            </h2>
          </div>

          <div style={{ width: '40px', height: '2px', background: 'var(--gold)', borderRadius: '2px' }} />

          {/* Description */}
          <p style={{
            fontSize: '15px',
            color: 'var(--text-2)',
            lineHeight: 1.8,
            margin: 0,
            whiteSpace: 'pre-line',
            fontFamily: isRTL ? 'var(--font-ar)' : 'inherit'
          }}>
            {project.desc[lang]}
          </p>

          {/* Tech stack */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ 
              fontSize: '13px', 
              fontWeight: 700, 
              color: 'var(--text)',
              fontFamily: isRTL ? 'var(--font-ar)' : 'inherit'
            }}>
              {techLabel}
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.tags.map(tag => (
                <span key={tag} className="tag" style={{ fontSize: '11px', padding: '5px 12px' }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Actions / Links */}
          <div style={{ 
            display: 'flex', 
            gap: '14px', 
            marginTop: '12px', 
            paddingTop: '20px', 
            borderTop: '1px solid var(--border)',
            flexDirection: 'row',
          }}>
            {project.github && project.github !== '#' && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-ghost"
                style={{ 
                  flex: 1, 
                  justifyContent: 'center', 
                  fontSize: '14px',
                  padding: '11px 20px',
                }}
              >
                <GithubIcon size={16} />
                <span style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
                  {codeLabel}
                </span>
              </a>
            )}
            {project.link && project.link !== '#' && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-gold"
                style={{ 
                  flex: 1, 
                  justifyContent: 'center', 
                  fontSize: '14px',
                  padding: '11px 20px',
                }}
              >
                <ExternalLink size={16} />
                <span style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
                  {visitLabel}
                </span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Global CSS for modal animations if not already added */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
