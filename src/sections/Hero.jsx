import { useEffect, useRef, useState } from 'react';
import { Download, Mail, ArrowDown } from 'lucide-react';
import profileImg from '../assets/hero.png';
import cvFile from '../assets/CV Adham Rakha .pdf';

const GH = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
const LI = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

const ROLES = {
  en: ['Full-Stack Engineer', 'React Developer', 'Laravel Architect', 'Problem Solver'],
  ar: ['مهندس Full-Stack', 'مطور React', 'مهندس Laravel', 'مبدع في حل المشكلات'],
};

export default function Hero({ lang }) {
  const isRTL = lang === 'ar';
  const [typed, setTyped] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const words = ROLES[lang];
    const word = words[roleIdx % words.length];
    const speed = deleting ? 50 : 100;
    timerRef.current = setTimeout(() => {
      if (!deleting && typed === word) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && typed === '') {
        setDeleting(false);
        setRoleIdx(i => i + 1);
      } else {
        setTyped(prev => deleting ? prev.slice(0, -1) : word.slice(0, prev.length + 1));
      }
    }, speed);
    return () => clearTimeout(timerRef.current);
  }, [typed, deleting, roleIdx, lang]);

  const [prevLang, setPrevLang] = useState(lang);
  if (lang !== prevLang) {
    setPrevLang(lang);
    setTyped('');
    setRoleIdx(0);
    setDeleting(false);
  }

  const scrollDown = () => {
    const el = document.getElementById('about');
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [transitionStyle, setTransitionStyle] = useState('transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateY = ((x - xc) / xc) * 8;
    const rotateX = -((y - yc) / yc) * 8;
    setTransitionStyle('transform 0.08s ease-out');
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTransitionStyle('transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)');
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section id="hero" style={{
      minHeight: 'calc(100vh - 0px)', display: 'flex', alignItems: 'center',
      padding: '130px 0 80px', position: 'relative', zIndex: 1,
    }}>
      <div className="container" style={{ width: '100%' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1.15fr 0.85fr',
          gap: '60px', alignItems: 'center', direction: isRTL ? 'rtl' : 'ltr',
        }} className="hero-grid">

          {/* Left: Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="hero-animate ha1" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '8px 18px', borderRadius: '30px', width: 'fit-content',
              background: 'var(--gold-glow)', border: '1px solid var(--gold-border)',
              fontSize: '13px', fontWeight: 700, color: 'var(--gold)',
              letterSpacing: '1px', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
            }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
              {lang === 'en' ? 'Available for Work' : 'متاح للعمل'}
            </div>

            <h1 className="hero-animate ha2" style={{
              fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)',
              fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900,
              lineHeight: 1.1, color: 'var(--text)',
            }}>
              {lang === 'en' ? "Hi, I'm " : 'أهلاً، أنا '}
              <span className="text-gold">
                {lang === 'en' ? 'Adham' : 'أدهم'}
              </span>
              <br />
              <span style={{ color: 'var(--text)' }}>
                {lang === 'en' ? 'Rakha' : 'رخا'}
              </span>
            </h1>

            <div className="hero-animate ha3" style={{
              fontSize: 'clamp(16px, 2.2vw, 22px)', fontWeight: 600,
              color: 'var(--text-2)', display: 'flex', alignItems: 'center', gap: '6px',
              fontFamily: isRTL ? 'var(--font-ar)' : 'inherit', minHeight: '32px',
            }}>
              <span>{typed}</span>
              <span className="cursor-blink" style={{ color: 'var(--gold)', marginInlineStart: '2px' }}>|</span>
            </div>

            <p className="hero-animate ha4" style={{
              fontSize: '16px', color: 'var(--text-2)', lineHeight: 2,
              maxWidth: '540px', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
            }}>
              {lang === 'en' ? (
                <>
                  <strong style={{ fontWeight: 700, color: 'var(--text-2)' }}>Full-Stack Engineer at Earth Lion,</strong>
                  {' '}dedicated to crafting high-performance, AI-integrated web applications that bridge the gap between elegant user interfaces and scalable, clean backend architectures to deliver exceptional digital experiences.
                </>
              ) : (
                <>
                  <strong style={{ fontWeight: 700, color: 'var(--text-2)' }}>مهندس Full-Stack في Earth Lion،</strong>
                  {' '}متخصص في بناء تطبيقات ويب عالية الأداء مدمجة بالذكاء الاصطناعي، تجمع بين واجهات المستخدم الأنيقة والأنظمة الخلفية القابلة للتوسع لتقديم تجارب رقمية استثنائية.
                </>
              )}
            </p>

            <div className="hero-animate ha5 hero-btns" style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '6px' }}>
              <a href={cvFile} download className="btn btn-gold">
                <Download size={16} />
                <span style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
                  {lang === 'en' ? 'Download CV' : 'تحميل السيرة الذاتية'}
                </span>
              </a>
              <button className="btn btn-ghost" onClick={() => {
                const el = document.getElementById('contact');
                if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
              }}>
                <Mail size={16} />
                <span style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
                  {lang === 'en' ? 'Contact Me' : 'تواصل معي'}
                </span>
              </button>
            </div>

            <div className="hero-animate ha5 hero-socials" style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
              <a href="https://github.com/earth-lion" target="_blank" rel="noreferrer" className="social-btn"><GH /></a>
              <a href="https://linkedin.com/in/adham-rakha-0b0250394" target="_blank" rel="noreferrer" className="social-btn"><LI /></a>
              <a href="mailto:adhmrkha22@gmail.com" className="social-btn"><Mail size={20} /></a>
              <a href="https://wa.me/201080168234" target="_blank" rel="noreferrer" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.51A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.368l-.36-.213-3.76.896.955-3.668-.234-.376A9.818 9.818 0 1 1 12 21.818z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://www.facebook.com/adhm.rkha" target="_blank" rel="noreferrer" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="hero-animate ha3 hero-img-wrap"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                position: 'relative', width: '320px', height: '320px',
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: transitionStyle,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Spinning ring */}
              <svg className="ring-spin" style={{ position: 'absolute', inset: '-20px', width: 'calc(100% + 40px)', height: 'calc(100% + 40px)', opacity: 0.5, transform: 'translateZ(-10px)' }} viewBox="0 0 360 360">
                <circle cx="180" cy="180" r="170" fill="none" stroke="url(#rg)" strokeWidth="1.5" strokeDasharray="12 8" />
                <defs>
                  <linearGradient id="rg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--gold)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Gold glow blob */}
              <div style={{
                position: 'absolute', inset: '10px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(184,150,62,0.25) 0%, transparent 70%)',
                filter: 'blur(20px)',
                zIndex: 1,
                transform: 'translateZ(10px)',
              }} />
              {/* Image */}
              <div style={{
                position: 'relative', zIndex: 2,
                width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden',
                border: '3px solid var(--gold-border)',
                boxShadow: '0 0 40px rgba(184,150,62,0.2), 0 20px 60px rgba(0,0,0,0.5)',
                transform: 'translateZ(30px)',
              }}>
                <img src={profileImg} alt="Adham Rakha" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button onClick={scrollDown} style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            cursor: 'pointer', display: 'inline-flex', flexDirection: 'column',
            alignItems: 'center', gap: '6px', fontSize: '12px', transition: 'var(--tr)',
          }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <span style={{ letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
              {lang === 'en' ? 'Scroll' : 'تمرير'}
            </span>
            <ArrowDown size={16} style={{ animation: 'heroFadeUp 1.5s ease infinite alternate' }} />
          </button>
        </div>
      </div>

      <style>{`
        .hero-grid { grid-template-columns: 1.15fr 0.85fr !important; }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center !important; }
          .hero-grid > div:last-child { order: -1; }
          .hero-grid > div:first-child { align-items: center !important; }
        }
      `}</style>
    </section>
  );
}
