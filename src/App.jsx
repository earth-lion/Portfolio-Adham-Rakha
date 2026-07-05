import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import BackgroundGlow from './components/BackgroundGlow';
import BackToTop from './components/BackToTop';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact, { GH, LI, WA, Phone, FB } from './sections/Contact';


export default function App() {
  const [lang, setLang] = useState('en');
  const isRTL = lang === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang, isRTL]);

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
      <BackToTop lang={lang} />
    </>
  );
}
