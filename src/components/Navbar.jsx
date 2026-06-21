import { useEffect, useState } from 'react';
import { Globe, Menu, X, Download } from 'lucide-react';
import logoImg from '../assets/logo.png';
import cvFile from '../assets/CV Adham Rakha .pdf';

export default function Navbar({ lang, setLang }) {
  const [scrolled, setScrolled] = useState(false);
  const [pct, setPct] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn);
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
  };

  const linkBase = {
    color: 'var(--text-2)', textDecoration: 'none', fontSize: '15px',
    fontWeight: 500, position: 'relative', padding: '4px 0',
    transition: 'color 0.2s ease', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
  };

  return (
    <>
      <header style={navStyle}>
        {/* Progress bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, height: '2px',
          width: `${pct}%`, background: 'linear-gradient(90deg, var(--gold-dark), var(--gold-light))',
          transition: 'width 0.1s linear',
        }} />

        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', direction: isRTL ? 'rtl' : 'ltr', maxWidth: '1340px' }}>
          {/* Premium Logo Seal & Title */}
          <a href="#hero" onClick={e => go(e, 'hero')} style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
            <div className="nav-logo-seal" style={{ position: 'relative', width: '85px', height: '85px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  {/* Top arc (clockwise, left to right) */}
                  <path id="logo-top-path" d="M 12,50 A 38,38 0 0,1 88,50" fill="none" />
                  {/* Bottom arc (counter-clockwise, left to right along the bottom to keep text right-side-up) */}
                  <path id="logo-bottom-path" d="M 12,50 A 38,38 0 0,0 88,50" fill="none" />
                </defs>

                {/* Decorative outer rings */}
                <circle cx="50" cy="50" r="44" fill="none" stroke="var(--gold-border)" strokeWidth="0.75" strokeDasharray="2 3" />
                <circle cx="50" cy="50" r="26" fill="none" stroke="var(--gold-border)" strokeWidth="0.5" />

                {/* Curved Text Top */}
                <text fontSize="5.5px" fontWeight="700" letterSpacing="0.8px" fontFamily="var(--font-en)" fill="var(--gold-light)">
                  <textPath href="#logo-top-path" startOffset="50%" textAnchor="middle" dy="-3">
                    CREATIVE POWER IN EVERY DESIGN
                  </textPath>
                </text>

                {/* Curved Text Bottom */}
                <text fontSize="7px" fontWeight="900" letterSpacing="0.8px" fontFamily="var(--font-en)" fill="var(--gold)">
                  <textPath href="#logo-bottom-path" startOffset="50%" textAnchor="middle" dy="11">
                    EARTH LION
                  </textPath>
                </text>
              </svg>
              
              {/* Lion image in center — zoomed to 140% to focus on the gold lion head */}
              <div style={{
                position: 'absolute',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid var(--gold)',
                background: '#07071a',
                boxShadow: '0 0 15px rgba(184,150,62,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img src={logoImg} alt="Earth Lion" style={{ width: '140%', height: '140%', objectFit: 'cover' }} />
              </div>
            </div>
            
            {/* Brand Title */}
            <span className="nav-logo-title" style={{
              fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)',
              fontWeight: 800, fontSize: '22px',
              background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              letterSpacing: '0.5px',
            }}>
              Earth Lion
            </span>
          </a>

          {/* Desktop links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '36px' }} className="desk-nav">
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

            <a href={cvFile} download className="btn btn-gold" style={{ padding: '9px 18px', fontSize: '13px' }} >
              <Download size={14} />
              <span className="nav-resume-label">{lang === 'en' ? 'Resume' : 'السيرة الذاتية'}</span>
            </a>

            {/* Mobile toggle */}
            <button onClick={() => setOpen(!open)} className="mob-btn" style={{
              display: 'none', background: 'transparent', border: 'none',
              color: 'var(--text)', cursor: 'pointer', padding: '4px',
            }}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Responsive CSS */}
        <style>{`
          .desk-nav { display:flex !important; }
          .mob-btn { display:none !important; }
          @media (max-width:768px) {
            .desk-nav { display:none !important; }
            .mob-btn { display:flex !important; }
          }
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
        </div>
      )}
    </>
  );
}
