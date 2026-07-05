import { useEffect, useState, useRef } from 'react';
import { Globe, Menu, X, Download } from 'lucide-react';
import logoImg from '../assets/logo.webp';
import cvFile from '../assets/CV Adham Rakha .pdf';

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const fn = () => {
      // Only set state when the state changes
      const isScrolled = window.scrollY > 40;
      setScrolled((prev) => {
        if (prev !== isScrolled) return isScrolled;
        return prev;
      });

      // Update progress bar DOM directly to avoid re-renders
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }
    };
    
    window.addEventListener('scroll', fn, { passive: true });
    // Run once initially
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = {
    en: [
      { l: 'Home',     id: 'hero' },
      { l: 'About',    id: 'about' },
      { l: 'Skills',   id: 'skills' },
      { l: 'Projects', id: 'projects' },
      { l: 'Contact',  id: 'contact' },
    ],
    ar: [
      { l: 'الرئيسية', id: 'hero' },
      { l: 'عني',      id: 'about' },
      { l: 'مهاراتي',  id: 'skills' },
      { l: 'مشاريعي',  id: 'projects' },
      { l: 'تواصل',    id: 'contact' },
    ],
  };

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' });
  };

  const isRTL = lang === 'ar';

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    padding: scrolled ? '14px 0' : '24px 0',
    background: scrolled ? 'rgba(7,7,26,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(18px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(18px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
    overflow: 'hidden',
    maxWidth: '100vw',
  };

  const linkBase = {
    color: 'var(--text-2)', textDecoration: 'none', fontSize: '15px',
    fontWeight: 500, position: 'relative', padding: '4px 0',
    transition: 'color 0.2s ease', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
  };

  // Logo component — reused in both desktop + mobile
  const LogoSeal = ({ size = 85, hideText = false }) => (
    <a href="#hero" onClick={e => go(e, 'hero')} style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', flexShrink: 0, minWidth: 0 }}>
      <div style={{ position: 'relative', width: `${size}px`, height: `${size}px`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
          <defs>
            <path id="logo-top-path" d="M 12,50 A 38,38 0 0,1 88,50" fill="none" />
            <path id="logo-bottom-path" d="M 12,50 A 38,38 0 0,0 88,50" fill="none" />
          </defs>
          <circle cx="50" cy="50" r="44" fill="none" stroke="var(--gold-border)" strokeWidth="0.75" strokeDasharray="2 3" />
          <circle cx="50" cy="50" r="26" fill="none" stroke="var(--gold-border)" strokeWidth="0.5" />
          <text fontSize="5.5px" fontWeight="700" letterSpacing="0.8px" fontFamily="var(--font-en)" fill="var(--gold-light)">
            <textPath href="#logo-top-path" startOffset="50%" textAnchor="middle" dy="-3">
              CREATIVE POWER IN EVERY DESIGN
            </textPath>
          </text>
          <text fontSize="7px" fontWeight="900" letterSpacing="0.8px" fontFamily="var(--font-en)" fill="var(--gold)">
            <textPath href="#logo-bottom-path" startOffset="50%" textAnchor="middle" dy="11">
              EARTH LION
            </textPath>
          </text>
        </svg>
        <div style={{
          position: 'absolute',
          width: `${size * 0.56}px`,
          height: `${size * 0.56}px`,
          borderRadius: '50%',
          overflow: 'hidden',
          border: '1.5px solid var(--gold)',
          background: '#07071a',
          boxShadow: '0 0 15px rgba(184,150,62,0.3)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src={logoImg} alt="Earth Lion" loading="eager" style={{ width: '140%', height: '140%', objectFit: 'cover' }} />
        </div>
      </div>
      {!hideText && (
        <span className="nav-logo-title" style={{
          fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)',
          fontWeight: 800, fontSize: '22px',
          background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          letterSpacing: '0.5px',
          whiteSpace: 'nowrap',
        }}>
          Earth Lion
        </span>
      )}
    </a>
  );

  return (
    <>
      <header style={navStyle}>
        {/* Progress bar */}
        <div 
          ref={progressBarRef}
          style={{
            position: 'absolute', top: 0, left: 0, height: '2px',
            width: '0%', background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))',
            transition: 'width 0.1s linear',
          }} 
        />

        {/* ── DESKTOP layout (> 768px) ── */}
        <div className="nav-desktop container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: isRTL ? 'rtl' : 'ltr', maxWidth: '1340px' }}>
          <LogoSeal size={85} />

          {/* Desktop links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
            {links[lang].map(({ l, id }) => (
              <a key={id} href={`#${id}`} onClick={e => go(e, id)} style={linkBase}
                onMouseEnter={e => e.target.style.color = 'var(--gold)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
              >{l}</a>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text)', padding: '7px 14px', borderRadius: '20px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
              fontSize: '13px', fontWeight: 600, transition: 'var(--tr)',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <Globe size={14} />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            <a href={cvFile} download className="btn btn-gold" style={{ padding: '9px 18px', fontSize: '13px' }}>
              <Download size={14} />
              <span className="nav-resume-label">{lang === 'en' ? 'Resume' : 'السيرة الذاتية'}</span>
            </a>
          </div>
        </div>

        {/* ── MOBILE layout (≤ 768px) — 3 equal columns: Lang | Logo (center) | Menu ── */}
        <div className="nav-mobile" style={{
          display: 'none', alignItems: 'center',
          direction: isRTL ? 'rtl' : 'ltr',
          padding: '0 16px', width: '100%', boxSizing: 'border-box',
        }}>
          {/* Col 1 — Language toggle (left) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
            <button onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              color: 'var(--text)', padding: '6px 12px', borderRadius: '20px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
              fontSize: '13px', fontWeight: 600, transition: 'var(--tr)', flexShrink: 0,
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
            >
              <Globe size={14} />
              <span>{lang === 'en' ? 'عربي' : 'EN'}</span>
            </button>
          </div>

          {/* Col 2 — Logo (center, perfectly centered) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <LogoSeal size={58} hideText={true} />
          </div>

          {/* Col 3 — Hamburger (right) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setOpen(!open)} style={{
              background: 'transparent', border: 'none',
              color: 'var(--text)', cursor: 'pointer', padding: '4px',
              display: 'flex', alignItems: 'center', flexShrink: 0,
            }}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Responsive CSS */}
        <style>{`
          .nav-desktop { display:flex !important; }
          .nav-mobile  { display:none !important; }
          @media (max-width:768px) {
            .nav-desktop { display:none !important; }
            .nav-mobile  { display:flex !important; }
          }
          html, body { overflow-x: hidden; max-width: 100vw; }
        `}</style>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div style={{
          position: 'fixed', top: '70px', left: '16px', right: '16px', zIndex: 999,
          background: 'rgba(13,13,38,0.96)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px',
          padding: '20px', display: 'flex', flexDirection: 'column', gap: '4px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
          direction: isRTL ? 'rtl' : 'ltr',
        }}>
          {links[lang].map(({ l, id }) => (
            <a key={id} href={`#${id}`} onClick={e => go(e, id)} style={{
              color: 'var(--text-2)', textDecoration: 'none', fontSize: '17px',
              fontWeight: 600, padding: '12px 8px',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = 'var(--gold)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-2)'}
            >{l}</a>
          ))}

          {/* Resume button inside drawer */}
          <a href={cvFile} download className="btn btn-gold" style={{
            marginTop: '12px', justifyContent: 'center', fontSize: '15px', padding: '12px',
            fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
          }}>
            <Download size={16} />
            {lang === 'en' ? 'Download Resume' : 'تحميل السيرة الذاتية'}
          </a>
        </div>
      )}
    </>
  );
}
