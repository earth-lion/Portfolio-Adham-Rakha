import { useEffect, useState, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop({ lang }) {
  const [showTop, setShowTop] = useState(false);
  const circleRef = useRef(null);
  const isRTL = lang === 'ar';

  useEffect(() => {
    const fn = () => {
      // 1. Toggle showTop state only when it changes
      const shouldShow = window.scrollY > 400;
      setShowTop((prev) => {
        if (prev !== shouldShow) return shouldShow;
        return prev;
      });

      // 2. Direct DOM update for circle progress stroke-dashoffset
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      
      if (circleRef.current) {
        const radius = 21;
        const circumference = 2 * Math.PI * radius;
        const offset = circumference - (pct / 100) * circumference;
        circleRef.current.style.strokeDashoffset = offset;
      }
    };

    window.addEventListener('scroll', fn, { passive: true });
    // Run once initially to set proper progress
    fn();
    return () => window.removeEventListener('scroll', fn);
  }, []);

  if (!showTop) return null;

  const radius = 21;
  const circumference = 2 * Math.PI * radius;

  return (
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
          ref={circleRef}
          cx="24" cy="24" r="21"
          fill="transparent"
          stroke="var(--gold)"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      <ArrowUp size={18} style={{ position: 'relative', zIndex: 2 }} />
    </button>
  );
}
