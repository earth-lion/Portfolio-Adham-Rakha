import { useRef, useEffect, useState } from 'react';
import { Code2, Cpu, Database, Wrench } from 'lucide-react';

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

const SKILLS = [
  {
    icon: <Code2 size={20} />,
    cat: { en: 'Frontend', ar: 'الواجهات الأمامية' },
    items: [
      { name: 'HTML5 / CSS3', pct: 95 },
      { name: 'JavaScript (ES6+)', pct: 90 },
      { name: 'React (Vite)', pct: 88 },
      { name: 'TailwindCSS', pct: 85 },
    ],
  },
  {
    icon: <Cpu size={20} />,
    cat: { en: 'Backend', ar: 'الخوادم والأنظمة' },
    items: [
      { name: 'PHP / Laravel', pct: 90 },
      { name: 'RESTful APIs', pct: 90 },
      { name: 'MVC Architecture', pct: 85 },
      { name: 'OOP (Object Oriented Programming)', pct: 88 },
    ],
  },
  {
    icon: <Database size={20} />,
    cat: { en: 'Database', ar: 'قواعد البيانات' },
    items: [
      { name: 'MySQL', pct: 88 },
      { name: 'Database Design', pct: 82 },
      { name: 'DB Optimization', pct: 75 },
      { name: 'Query Performance', pct: 80 },
    ],
  },
  {
    icon: <Wrench size={20} />,
    cat: { en: 'Tools & DevOps', ar: 'الأدوات والنشر' },
    items: [
      { name: 'Git & GitHub', pct: 92 },
      { name: 'AI-Assisted Development (Copilot/AI Studio)', pct: 95 },
      { name: 'Postman', pct: 85 },
      { name: 'Composer/Vite', pct: 85 },
    ],
  },
];

function SkillBar({ name, pct, visible, delay }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>{name}</span>
        <span style={{ fontSize: '12px', color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{pct}%</span>
      </div>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: visible ? `${pct}%` : '0%', transitionDelay: `${delay}ms` }} />
      </div>
    </div>
  );
}

export default function Skills({ lang }) {
  const isRTL = lang === 'ar';
  const [ref, visible] = useInView();

  return (
    <section id="skills" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }} className={`reveal${visible ? ' visible' : ''}`} ref={ref}>
          <div className="section-label" style={{ justifyContent: 'center', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
            {lang === 'en' ? 'My Skills' : 'مهاراتي'}
          </div>
          <h2 className="section-title" style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>
            {lang === 'en' ? 'Engineering Stack' : 'القدرات البرمجية'}
          </h2>
          <p className="section-sub" style={{ margin: '0 auto', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
            {lang === 'en'
              ? 'Technologies and frameworks I use to build production-ready systems.'
              : 'التقنيات وأطر العمل التي أستخدمها في بناء الأنظمة الجاهزة للإنتاج.'}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '28px', direction: isRTL ? 'rtl' : 'ltr' }} className="grid-2">
          {SKILLS.map((group, gi) => (
            <div key={gi} className={`card reveal${visible ? ' visible' : ''} d${gi + 1}`} style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Category header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  background: 'var(--gold-glow)', border: '1px solid var(--gold-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--gold)',
                }}>
                  {group.icon}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>
                  {group.cat[lang]}
                </h3>
              </div>
              {/* Skill bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {group.items.map((item, ii) => (
                  <SkillBar key={item.name} name={item.name} pct={item.pct} visible={visible} delay={gi * 100 + ii * 80} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badges */}
        <div className={`reveal${visible ? ' visible' : ''} d4`} style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 600 }}>
            {lang === 'en' ? 'Also familiar with' : 'أيضاً على دراية بـ'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {['TypeScript', 'Next.js', 'Redux', 'Socket.io', 'Stripe', 'AWS S3', 'Figma', 'Linux'].map(t => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
