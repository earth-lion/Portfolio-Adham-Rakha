import { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play } from 'lucide-react';

const welcomeMessage = {
  en: [
    'Welcome to Earth Lion Console v1.0.0',
    'Type "help" to list available commands.',
    '----------------------------------------',
  ],
  ar: [
    'مرحباً بك في كونسول Earth Lion إصدار 1.0.0',
    'اكتب "help" أو "مساعدة" لعرض الأوامر المتاحة.',
    '----------------------------------------',
  ],
};

export default function Terminal({ lang, onSecretMode, matrixMode }) {
  const [history, setHistory] = useState(() => welcomeMessage[lang]);
  const [input, setInput] = useState('');
  const [prevLang, setPrevLang] = useState(lang);
  const terminalEndRef = useRef(null);

  if (lang !== prevLang) {
    setPrevLang(lang);
    setHistory(welcomeMessage[lang]);
  }

  useEffect(() => {
    // Scroll terminal to bottom
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const commands = {
    en: {
      help: 'Show available console commands',
      about: 'Learn who is Adham Rakha (Earth Lion)',
      skills: 'List core technical competencies',
      projects: 'Describe highlight applications',
      contact: 'Get details to connect directly',
      secret: 'Execute system-wide cyber core injection',
      clear: 'Flush the console log buffer',
    },
    ar: {
      help: 'عرض الأوامر المتاحة في الكونسول',
      about: 'تعرف على أدهم رخة (Earth Lion)',
      skills: 'عرض المهارات التقنية واللغات المستخدمة',
      projects: 'تفاصيل أهم المشاريع الحالية',
      contact: 'طرق الاتصال المباشرة',
      secret: 'تفعيل نظام الحماية الرقمي للأسد الترابي',
      clear: 'مسح جميع السجلات الحالية من الشاشة',
    },
  };

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    let response = [];

    if (!trimmed) return;

    response.push(`guest@earth-lion:~$ ${cmdText}`);

    switch (trimmed) {
      case 'help':
      case 'مساعدة':
        response.push(lang === 'en' ? 'Available commands:' : 'الأوامر المتاحة:');
        Object.entries(commands[lang]).forEach(([name, desc]) => {
          response.push(`  ${name.padEnd(10)} - ${desc}`);
        });
        break;
      case 'about':
      case 'عني':
        if (lang === 'en') {
          response.push(
            'Name: Adham Rakha (Earth Lion)',
            'Role: Full-Stack Software Engineer',
            'Bio: A high-performance engineer focused on building elegant web systems. Fusing clean backend logic with immersive animated user interfaces.',
            'Philosophy: Code should be fast, responsive, and tell a story.'
          );
        } else {
          response.push(
            'الاسم: أدهم رخة (Earth Lion)',
            'الوظيفة: مهندس برمجيات Full-Stack',
            'نبذة: مهندس متخصص في تطوير النظم البرمجية المتكاملة وعالية الأداء. أجمع بين منطق الباك إند القوي وتجربة المستخدم التفاعلية الأنيقة.',
            'الفلسفة: الكود يجب أن يكون سريعاً، متجاوباً، وذو طابع فريد.'
          );
        }
        break;
      case 'skills':
      case 'مهارات':
        response.push(
          'Frontend: HTML5, CSS3, JavaScript (ES6+), React 19, TailwindCSS',
          'Backend: Node.js, Express, PHP, Laravel API',
          'Databases: MySQL, PostgreSQL, MongoDB',
          'DevOps & Tools: Git, GitHub, Docker, Vite, HMR'
        );
        break;
      case 'projects':
      case 'مشاريع':
        if (lang === 'en') {
          response.push(
            '1. Bistro Bliss - Premium Full-Stack Restaurant Portal',
            '   * Tech Stack: React, Tailwind, Laravel API, Stripe Checkout, AI Chatbot',
            '   * Highlights: Dual-language support, real-time orders status desk, notification panel.',
            '2. Smart Student Portal - Academic Portal System',
            '   * Tech Stack: React, Node.js, Express, MongoDB/SQL',
            '   * Highlights: Class schedules, exam scores dashboard, course management module.'
          );
        } else {
          response.push(
            '1. Bistro Bliss - تطبيق مطعم متكامل راقٍ',
            '   * التقنيات: React, Tailwind, Laravel API, Stripe Checkout, AI Chatbot',
            '   * المميزات: دعم متعدد اللغات، لوحة إدارة طلبات فورية، نظام إشعارات ذكي.',
            '2. Smart Student Portal - نظام إدارة الطلاب الأكاديمي',
            '   * التقنيات: React, Node.js, Express, MongoDB/SQL',
            '   * المميزات: جداول دراسية، لوحة درجات ذكية، إدارة المقررات والامتحانات.'
          );
        }
        break;
      case 'contact':
      case 'اتصال':
        response.push(
          `Email:  adhmrkha22@gmail.com`,
          `GitHub: github.com/adhmrkha22`,
          `Status: Open for custom high-end contracts & senior positions`
        );
        break;
      case 'secret':
      case 'سر':
        onSecretMode();
        if (lang === 'en') {
          response.push(
            '>> INITIATING EARTH LION MATRIX OVERRIDE...',
            '>> GOLD CORE INJECTED SUCCESSFULLY.',
            '>> BACKGROUND SYSTEM SET TO BINARY FALLBACK.'
          );
        } else {
          response.push(
            '>> جاري تشغيل مصفوفة الأسد الترابي الرقمية...',
            '>> تم دمج النواة الذهبية بنجاح.',
            '>> تم تحويل نظام الخلفية إلى التوهج الثنائي.'
          );
        }
        break;
      case 'clear':
      case 'مسح':
        setHistory([]);
        setInput('');
        return;
      default:
        response.push(
          lang === 'en'
            ? `Command not found: "${trimmed}". Type "help" for a list of commands.`
            : `الطلب غير معروف: "${trimmed}". اكتب "help" لمعاينة الأوامر.`
        );
    }

    setHistory((prev) => [...prev, ...response]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div
      className="glass-panel"
      style={{
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: matrixMode ? '0 0 30px rgba(16, 185, 129, 0.2)' : '0 15px 40px rgba(0, 0, 0, 0.6)',
        border: matrixMode ? '1px solid var(--accent-emerald)' : '1px solid rgba(255, 255, 255, 0.08)',
        transition: 'var(--transition-smooth)',
      }}
    >
      {/* Console Header Bar */}
      <div
        style={{
          background: 'rgba(15, 22, 36, 0.9)',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
          <TerminalIcon size={14} style={{ color: matrixMode ? 'var(--accent-emerald)' : 'var(--accent-gold)' }} />
          <span>earth-lion@console:~</span>
        </div>
        <div style={{ width: '50px' }} />
      </div>

      {/* Terminal Screen output log */}
      <div
        style={{
          background: 'rgba(7, 9, 14, 0.95)',
          padding: '24px',
          height: '350px',
          overflowY: 'auto',
          fontFamily: 'var(--font-mono)',
          fontSize: '14px',
          color: matrixMode ? '#10b981' : '#e5e7eb',
          textAlign: 'left',
          direction: 'ltr',
          lineHeight: '1.7',
        }}
      >
        {history.map((line, index) => (
          <div
            key={index}
            style={{
              whiteSpace: 'pre-wrap',
              color: line.startsWith('guest@') 
                ? (matrixMode ? '#34d399' : 'var(--accent-gold)') 
                : line.startsWith('  ') 
                ? 'var(--text-secondary)' 
                : line.startsWith('>>') 
                ? (matrixMode ? '#fff' : 'var(--accent-emerald)') 
                : 'inherit',
            }}
          >
            {line}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Interactive prompt input */}
      <div
        style={{
          background: 'rgba(10, 14, 23, 0.98)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          fontFamily: 'var(--font-mono)',
          direction: 'ltr',
        }}
      >
        <span style={{ color: matrixMode ? '#10b981' : 'var(--accent-gold)', fontWeight: 'bold' }}>guest@earth-lion:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={lang === 'en' ? 'Type command...' : 'اكتب أمراً هنا...'}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: matrixMode ? '#10b981' : '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
          }}
          className="clickable"
        />
        <button
          onClick={() => handleCommand(input)}
          className="clickable"
          style={{
            background: matrixMode ? 'rgba(16, 185, 129, 0.1)' : 'rgba(212, 175, 55, 0.1)',
            border: matrixMode ? '1px solid var(--accent-emerald)' : '1px solid var(--accent-gold)',
            borderRadius: '4px',
            color: matrixMode ? '#10b981' : 'var(--accent-gold)',
            padding: '4px 10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          <Play size={12} />
          <span>RUN</span>
        </button>
      </div>
    </div>
  );
}
