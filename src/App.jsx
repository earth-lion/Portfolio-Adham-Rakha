import { useState, useEffect } from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import BackgroundGlow from './components/BackgroundGlow';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact, { GH, LI, WA, Phone, FB } from './sections/Contact';


export default function App() {
  const [lang, setLang] = useState('en');
  const [showTop, setShowTop] = useState(false);
  const [pct, setPct] = useState(0);
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

  useEffect(() => {
    const fn = () => {
      setShowTop(window.scrollY > 400);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <>
      <BackgroundGlow />
      <Navbar lang={lang} setLang={setLang} />

      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '36px 0',
        background: 'var(--bg)',
        position: 'relative', zIndex: 1,
      }}>
        <div className="container" style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          gap: '12px', textAlign: 'center',
          direction: isRTL ? 'rtl' : 'ltr',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            fontFamily: 'var(--font-en)', fontWeight: 800, fontSize: '16px',
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            Earth Lion
          </div>
          {/* Footer Social Icons */}
          <div style={{ display: 'flex', gap: '12px', margin: '8px 0' }}>
            {[
              { icon: <Mail size={18} />, label: 'Email', href: 'mailto:adhmrkha22@gmail.com' },
              { icon: <Phone />, label: 'Phone', href: 'tel:+201080168234' },
              { icon: <FB />, label: 'Facebook', href: 'https://www.facebook.com/adhm.rkha' },
              { icon: <WA />, label: 'WhatsApp', href: 'https://wa.me/201080168234' },
              { icon: <GH />, label: 'GitHub', href: 'https://github.com/earth-lion' },
              { icon: <LI />, label: 'LinkedIn', href: 'https://linkedin.com/in/adham-rakha-0b0250394' },
            ].map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                title={label}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-2)',
                  transition: 'var(--tr)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--gold)';
                  e.currentTarget.style.color = 'var(--gold)';
                  e.currentTarget.style.background = 'var(--gold-glow)';
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.2)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(184,150,62,0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.color = 'var(--text-2)';
                  e.currentTarget.style.background = 'var(--surface)';
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {icon}
              </a>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
            {isRTL
              ? `© ${new Date().getFullYear()} أدهم رخا — جميع الحقوق محفوظة`
              : `© ${new Date().getFullYear()} Adham Rakha — All Rights Reserved`}
          </p>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
            {isRTL ? 'صُنع بـ ❤️ باستخدام React + Vite' : 'Built with ❤️ using React + Vite'}
          </p>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed', bottom: '28px',
            [isRTL ? 'left' : 'right']: '28px',
            width: '48px', height: '48px', borderRadius: '50%', border: 'none',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--gold)', cursor: 'pointer', zIndex: 999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            transition: 'var(--tr)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'var(--gold-border)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'var(--border)';
          }}
        >
          {/* Progress circle */}
          <svg style={{ position: 'absolute', transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
            <circle
              cx="24" cy="24" r="21"
              fill="transparent"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="2.5"
            />
            <circle
              cx="24" cy="24" r="21"
              fill="transparent"
              stroke="var(--gold)"
              strokeWidth="2.5"
              strokeDasharray={2 * Math.PI * 21}
              strokeDashoffset={2 * Math.PI * 21 - (pct / 100) * 2 * Math.PI * 21}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          <ArrowUp size={18} style={{ position: 'relative', zIndex: 2 }} />
        </button>
      )}
    </>
  );
}
