import { useRef, useEffect, useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm';

function useInView(t = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [t]);
  return [ref, v];
}

export const GH = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);
export const LI = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
  </svg>
);

export const WA = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L0 24l6.335-1.51A11.954 11.954 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.368l-.36-.213-3.76.896.955-3.668-.234-.376A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
);

export const Phone = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.63 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.78a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

export const FB = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);


const INFO = {
  en: [
    { icon: <Mail size={20} />, label: 'Email',     href: 'mailto:adhmrkha22@gmail.com' },
    { icon: <Phone />,          label: 'Phone',     href: 'tel:+201080168234' },
    { icon: <FB />,             label: 'Facebook',  href: 'https://www.facebook.com/adhm.rkha' },
    { icon: <WA />,             label: 'WhatsApp',  href: 'https://wa.me/201080168234' },
    { icon: <GH />,             label: 'GitHub',    href: 'https://github.com/earth-lion' },
    { icon: <LI />,             label: 'LinkedIn',  href: 'https://linkedin.com/in/adham-rakha-0b0250394' },
    { icon: <MapPin size={20} />, label: 'Egypt, Cairo, Helwan, 15 May City', href: 'https://maps.google.com/?q=15+May+City,+Helwan,+Cairo,+Egypt' },
  ],
  ar: [
    { icon: <Mail size={20} />, label: 'البريد',   href: 'mailto:adhmrkha22@gmail.com' },
    { icon: <Phone />,          label: 'الهاتف',   href: 'tel:+201080168234' },
    { icon: <FB />,             label: 'فيسبوك',   href: 'https://www.facebook.com/adhm.rkha' },
    { icon: <WA />,             label: 'واتساب',   href: 'https://wa.me/201080168234' },
    { icon: <GH />,             label: 'GitHub',   href: 'https://github.com/earth-lion' },
    { icon: <LI />,             label: 'LinkedIn', href: 'https://linkedin.com/in/adham-rakha-0b0250394' },
    { icon: <MapPin size={20} />, label: 'مصر، القاهرة، حلوان، مدينة 15 مايو', href: 'https://maps.google.com/?q=15+May+City,+Helwan,+Cairo,+Egypt' },
  ],
};

export default function Contact({ lang }) {
  const isRTL = lang === 'ar';
  const [ref, visible] = useInView();

  return (
    <section id="contact" className="section">
      <div className="container">
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '56px' }} className={`reveal${visible ? ' visible' : ''}`}>
          <div className="section-label" style={{ justifyContent: 'center', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
            {lang === 'en' ? "Let's Connect" : 'تواصل معي'}
          </div>
          <h2 className="section-title" style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>
            {lang === 'en' ? 'Get In Touch' : 'ابدأ محادثة'}
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
            {lang === 'en'
              ? "Have a project in mind or want to collaborate? I'd love to hear from you."
              : 'لديك مشروع أو تريد التعاون؟ يسعدني التواصل معك.'}
          </p>
        </div>


        {/* ── Contact Info — Full Width (all screens) ── */}
        <div className={`reveal${visible ? ' visible' : ''} d1`} style={{ marginBottom: '28px' }}>
          <div style={{
            padding: '28px 32px', borderRadius: '16px',
            background: 'var(--surface)', border: '1px solid var(--border)',
            direction: isRTL ? 'rtl' : 'ltr',
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '10px', fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>
              {lang === 'en' ? 'Contact Info' : 'معلومات التواصل'}
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-2)', lineHeight: 1.7, fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
              {lang === 'en'
                ? "Open to freelance projects, full-time roles, and interesting collaborations."
                : 'متاح للمشاريع المستقلة والوظائف والتعاونات المثيرة.'}
            </p>
          </div>
        </div>

        {/* ── Below: Social List (left) + Form (right) — Desktop 2 cols / Mobile stacked ── */}
        <div style={{ gap: '28px', alignItems: 'start', direction: isRTL ? 'rtl' : 'ltr' }} className="grid-2 contact-grid">

          {/* Left Column: Desktop Social List (Hidden on Mobile) */}
          <div className={`contact-desktop-only reveal${visible ? ' visible' : ''} d2`} style={{ flexDirection: 'column', gap: '16px' }}>
            {INFO[lang].map(({ icon, label, href }) => {
              const Wrapper = href ? 'a' : 'div';
              const wrapperProps = href
                ? { href, target: '_blank', rel: 'noreferrer', style: { textDecoration: 'none' } }
                : {};
              return (
                <Wrapper key={label} {...wrapperProps}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '16px 20px', borderRadius: '14px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    transition: 'var(--tr)', cursor: href ? 'pointer' : 'default',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    if (!href) return;
                    e.currentTarget.style.borderColor = 'var(--gold-border)';
                    e.currentTarget.style.background = 'var(--gold-glow)';
                    e.currentTarget.style.transform = isRTL ? 'translateX(-4px)' : 'translateX(4px)';
                  }}
                  onMouseLeave={e => {
                    if (!href) return;
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'var(--surface)';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px', flexShrink: 0,
                    background: 'var(--gold-glow)', border: '1px solid var(--gold-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold)',
                  }}>{icon}</div>
                  <span style={{
                    fontSize: '15px', fontWeight: 700,
                    color: href ? 'var(--text)' : 'var(--text-2)',
                    fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)',
                  }}>{label}</span>
                  {href && (
                    <svg style={{ [isRTL ? 'marginRight' : 'marginLeft']: 'auto', color: 'var(--gold)', opacity: 0.6, flexShrink: 0 }}
                      width="16" height="16" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d={isRTL ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}/>
                    </svg>
                  )}
                </Wrapper>
              );
            })}
          </div>

          {/* Right Column: Form + Mobile Icons Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>

            {/* Contact Form */}
            <div className={`card reveal${visible ? ' visible' : ''} d2`} style={{ padding: '36px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px', fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>
                {lang === 'en' ? 'Send a Message' : 'أرسل رسالة'}
              </h3>
              <ContactForm lang={lang} />
            </div>

            {/* Mobile Icons Card (mobile only) */}
            <div className={`contact-mobile-only reveal d3${visible ? ' visible' : ''}`} style={{
              padding: '28px', borderRadius: '16px',
              background: 'var(--surface)', border: '1px solid var(--border)',
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
                {INFO[lang].map(({ icon, label, href }) => {
                  const Wrapper = href ? 'a' : 'div';
                  const wrapperProps = href
                    ? { href, target: '_blank', rel: 'noreferrer', title: label }
                    : { title: label };
                  return (
                    <Wrapper key={label} {...wrapperProps}
                      style={{
                        width: '48px', height: '48px', borderRadius: '12px',
                        background: 'var(--surface-2)', border: '1px solid var(--border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--text-2)', cursor: href ? 'pointer' : 'default',
                        transition: 'var(--tr)',
                      }}
                      onMouseEnter={e => {
                        if (!href) return;
                        e.currentTarget.style.borderColor = 'var(--gold)';
                        e.currentTarget.style.color = 'var(--gold)';
                        e.currentTarget.style.background = 'var(--gold-glow)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        if (!href) return;
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text-2)';
                        e.currentTarget.style.background = 'var(--surface-2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {icon}
                    </Wrapper>
                  );
                })}
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
