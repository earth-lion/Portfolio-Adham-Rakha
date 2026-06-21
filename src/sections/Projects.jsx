import { useRef, useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import bistroBlissImg from '../assets/My Work/Bistro Bliss.png';
import loginImg from '../assets/My Work/LOGIN.png';
import portfolioImg from '../assets/My Work/portfolio.png';

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

const PROJECTS = [
  {
    id: 1,
    title: { en: 'Bistro Bliss — Restaurant Portal', ar: 'Bistro Bliss — بوابة المطعم' },
    desc: {
      en: 'Full-stack restaurant management platform with real-time order tracking, AI-powered chatbot, Stripe checkout, dual-language support, and admin dashboard.',
      ar: 'منصة إدارة مطاعم متكاملة مع تتبع الطلبات الفوري، شات بوت ذكي، دفع إلكتروني، دعم اللغتين، ولوحة تحكم للمدير.',
    },
    tags: ['React', 'Laravel', 'MySQL', 'Stripe', 'TailwindCSS', 'AI Chatbot'],
    github: 'https://github.com/earth-lion/Bistro-Bliss',
    link: '#',
    category: 'fullstack',
    image: bistroBlissImg,
  },
  {
    id: 2,
    title: { en: 'Smart Student Portal', ar: 'بوابة الطالب الذكية' },
    desc: {
      en: 'University dashboard with course scheduler, exam engine, grade analytics charts, and real-time teacher feedback channels.',
      ar: 'لوحة تحكم جامعية لجدولة المقررات، محرك امتحانات، رسوم بيانية للدرجات، وقنوات تواصل فوري مع المعلمين.',
    },
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'ChartJS', 'WebSockets'],
    github: '#', link: '#', category: 'fullstack',
  },
  {
    id: 3,
    title: { en: 'Server Monitor Dashboard', ar: 'لوحة تحليلات الخوادم' },
    desc: {
      en: 'Real-time monitoring console reporting active connections, system latency, and memory usage over live WebSocket streams.',
      ar: 'لوحة مراقبة فورية لمتابعة الاتصالات النشطة، تأخير النظام، واستهلاك الذاكرة عبر WebSocket.',
    },
    tags: ['React', 'Node.js', 'WebSockets', 'ChartJS', 'Express'],
    github: '#', link: '#', category: 'frontend',
  },
  {
    id: 4,
    title: { en: 'E-Commerce Platform', ar: 'منصة تجارة إلكترونية' },
    desc: {
      en: 'Complete shopping platform with product catalog, cart management, secure payment gateway, and order tracking system.',
      ar: 'منصة تسوق متكاملة مع كتالوج المنتجات، إدارة السلة، بوابة دفع آمنة، ونظام تتبع الطلبات.',
    },
    tags: ['React', 'Laravel', 'MySQL', 'Stripe', 'Redis'],
    github: '#', link: '#', category: 'fullstack',
  },
  {
    id: 5,
    title: { en: 'Task Management App', ar: 'تطبيق إدارة المهام' },
    desc: {
      en: 'Kanban-style productivity application with drag-and-drop boards, team collaboration features, and progress analytics.',
      ar: 'تطبيق إنتاجية بنظام Kanban مع لوحات قابلة للسحب والإفلات، ميزات التعاون الجماعي، وتحليلات التقدم.',
    },
    tags: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Redux'],
    github: '#', link: '#', category: 'fullstack',
  },
  {
    id: 6,
    title: { en: 'Interactive Luxury Portfolio', ar: 'معرض أعمال تفاعلي راقٍ' },
    desc: {
      en: 'A high-end developer portfolio featuring glassmorphic UI, custom particles backdrop, 3D tilt interaction, smooth page navigation, and full bi-lingual support.',
      ar: 'موقع معرض أعمال مطور برمجيات فاخر يتميز بتصميم زجاجي، خلفية جزيئات تفاعلية، كروت ثلاثية الأبعاد تفاعلية، وتوافق كامل باللغتين العربية والإنجليزية.',
    },
    tags: ['React', 'Vite', 'CSS Modules', 'tsParticles', 'Lucide Icons'],
    github: 'https://github.com/earth-lion/Portfolio-Adham-Rakha',
    link: 'https://earth-lion.github.io/Portfolio-Adham-Rakha/',
    category: 'frontend',
    image: portfolioImg,
  },
  {
    id: 7,
    title: { en: 'Modern Login & Registration Portal', ar: 'بوابة تسجيل دخول وإنشاء حساب' },
    desc: {
      en: 'A beautiful, fully responsive login and registration interface featuring a clean modern layout, smooth interactive transitions, and form validations.',
      ar: 'واجهة تسجيل دخول وإنشاء حساب جميلة ومتجاوبة بالكامل تتميز بتخطيط عصري، انتقالات تفاعلية سلسة، والتحقق من صحة المدخلات.',
    },
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Form Validation'],
    github: 'https://github.com/earth-lion/login',
    link: 'https://earth-lion.github.io/login/',
    category: 'frontend',
    image: loginImg,
  },
];

const FILTERS = {
  en: [{ k: 'all', l: 'All' }, { k: 'fullstack', l: 'Full-Stack' }, { k: 'frontend', l: 'Frontend' }],
  ar: [{ k: 'all', l: 'الكل' }, { k: 'fullstack', l: 'فول ستاك' }, { k: 'frontend', l: 'فرونت إند' }],
};

export default function Projects({ lang }) {
  const isRTL = lang === 'ar';
  const [filter, setFilter] = useState('all');
  const [activeProject, setActiveProject] = useState(null);
  const [ref, visible] = useInView();
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="section" style={{ background: 'transparent' }}>
      <div className="container">
        <div ref={ref} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className={`reveal${visible ? ' visible' : ''}`}>
            <div className="section-label" style={{ justifyContent: 'center', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
              {lang === 'en' ? 'My Work' : 'أعمالي'}
            </div>
            <h2 className="section-title" style={{ fontFamily: isRTL ? 'var(--font-ar)' : 'var(--font-en)' }}>
              {lang === 'en' ? 'Featured Projects' : 'المشاريع البارزة'}
            </h2>
            <p className="section-sub" style={{ margin: '0 auto', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>
              {lang === 'en'
                ? 'Production-ready applications showcasing clean architecture and modern design.'
                : 'تطبيقات جاهزة للإنتاج تعرض هندسة نظيفة وتصميم حديث.'}
            </p>
          </div>

          {/* Filter tabs */}
          <div className={`reveal${visible ? ' visible' : ''} d1 filter-row`} style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '32px', flexWrap: 'wrap' }}>
            {FILTERS[lang].map(({ k, l }) => (
              <button key={k} onClick={() => setFilter(k)} style={{
                padding: '8px 22px', borderRadius: '20px', cursor: 'pointer',
                fontSize: '14px', fontWeight: 600, transition: 'var(--tr)',
                fontFamily: isRTL ? 'var(--font-ar)' : 'inherit',
                background: filter === k ? 'linear-gradient(135deg, var(--gold), var(--gold-dark))' : 'rgba(255,255,255,0.04)',
                color: filter === k ? '#07071a' : 'var(--text-2)',
                border: filter === k ? 'none' : '1px solid var(--border)',
              }}>{l}</button>
            ))}
          </div>
        </div>

        <div style={{ direction: isRTL ? 'rtl' : 'ltr' }} className="grid-3">
          {filtered.map((p, i) => (
            <div key={p.id} className={`reveal${visible ? ' visible' : ''} d${(i % 4) + 1}`}>
              <ProjectCard project={p} lang={lang} onClick={() => setActiveProject(p)} />
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {activeProject && (
        <ProjectModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
          lang={lang} 
        />
      )}
    </section>
  );
}
