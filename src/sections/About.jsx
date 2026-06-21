import { useRef, useEffect, useState } from 'react';
import profileImg from '../assets/about.jpg';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const STATS = {
  en: [{ num: '2+', label: 'Years Experience' }, { num: '10+', label: 'Projects Completed' }, { num: '500+', label: 'GitHub Commits' }],
  ar: [{ num: '+2', label: 'سنوات خبرة' }, { num: '+10', label: 'مشروع مكتمل' }, { num: '+500', label: 'مساهمة على GitHub' }],
};

export default function About({ lang }) {
  const isRTL = lang === 'ar';
  const [ref, visible] = useInView();
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [transitionStyle, setTransitionStyle] = useState('transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)');

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
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

  return (
    <section id="about" className="section" style={{ background: 'transparent' }}>
      <div className="container">
        <div ref={ref} style={{ alignItems: 'center', direction: isRTL ? 'rtl' : 'ltr' }} className="grid-2">

          {/* Left: Image */}
          <div className={`reveal${visible ? ' visible' : ''} about-img-col`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              position: 'relative',
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: transitionStyle,
              transformStyle: 'preserve-3d',
            }}
          >
            <div style={{
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid var(--gold-border)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
              aspectRatio: '4/5',
              transform: 'translateZ(15px)',
            }}>
              <img src={profileImg} alt="Adham" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {/* Floating badge */}
            <div style={{
              position: 'absolute', bottom: '28px',
              [isRTL ? 'right' : 'left']: '-20px',
              background: 'var(--surface-2)', border: '1px solid var(--gold-border)',
              borderRadius: '14px', padding: '16px 22px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              display: 'flex', flexDirection: 'column', gap: '4px',
              transform: 'translateZ(40px)',
            }}>
              <span style={{ fontSize: '28px', fontWeight: 900, fontFamily: 'var(--font-en)', color: 'var(--gold)', lineHeight: 1 }}>2+</span>
              <span style={{ fontSize: '12px', color: 'var(--text-2)', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit', whiteSpace: 'nowrap' }}>
                {lang === 'en' ? 'Years of Experience' : 'سنوات خبرة'}
              </span>
            </div>
          </div>

          {/* Right: Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className={`reveal${visible ? ' visible' : ''} d1`}>
              <div className="section-label" style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
                {lang === 'en' ? 'About Me' : 'عني'}
              </div>
              <h2 className="section-title" style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>
                {lang === 'en' ? 'Who IS Adham Rakha' : 'من هو أدهم رخا'}
              </h2>
              <div className="divider" />
            </div>

            <p className={`reveal${visible ? ' visible' : ''} d2`} style={{
              fontSize: '15.5px', color: 'var(--text-2)', lineHeight: 1.8,
              fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
            }}>
              {lang === 'en'
                ? "Adham Rakha is a passionate Full-Stack Software Engineer and the founder of Earth Lion. He combines technical strength with analytical intelligence, allowing him to build scalable, high-performance web applications by bridging the gap between innovative design and robust backend architecture."
                : "أدهم رخا هو مهندس برمجيات Full-Stack متحمس ومؤسس Earth Lion. يجمع بين القوة التقنية والذكاء التحليلي، مما يسمح له ببناء تطبيقات ويب قابلة للتوسع وعالية الأداء عن طريق سد الفجوة بين التصميم المبتكر وهندسة الأنظمة الخلفية القوية."}
            </p>

            <p className={`reveal${visible ? ' visible' : ''} d3`} style={{
              fontSize: '15.5px', color: 'var(--text-2)', lineHeight: 1.8,
              fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
            }}>
              {lang === 'en'
                ? "Adham’s approach is defined by his ability to excel under pressure, consistently meeting deadlines while maintaining the highest standards of code quality. He is a versatile professional who thrives in collaborative team environments while possessing the autonomy and discipline to deliver exceptional results independently. Beyond his technical prowess, Adham maintains a professional presence and a polished image that reflects the integrity and commitment of his brand."
                : "يتميز منهج أدهم بقدرته على التفوق تحت ضغط العمل، والالتزام المستمر بالمواعيد النهائية مع الحفاظ على أعلى معايير جودة الكود. وهو محترف متعدد المهارات يزدهر في بيئات العمل الجماعي التعاونية، وفي الوقت نفسه يمتلك الاستقلالية والانضباط لتقديم نتائج استثنائية بشكل مستقل. وإلى جانب براعته التقنية، يحافظ أدهم على حضور مهني وصورة مصقولة تعكس نزاهة علامته التجارية والتزامها."}
            </p>

            {/* Stats row */}
            <div className={`reveal${visible ? ' visible' : ''} d4`} style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px', marginTop: '12px',
            }}>
              {STATS[lang].map(({ num, label }) => (
                <div key={label} style={{
                  padding: '20px 16px', borderRadius: '14px',
                  background: 'var(--surface)', border: '1px solid var(--border)',
                  textAlign: 'center',
                }}>
                  <div className="stat-num text-gold">{num}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-2)', marginTop: '6px', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
