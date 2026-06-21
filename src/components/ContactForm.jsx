import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || 'YOUR_WEB3FORMS_ACCESS_KEY_HERE';

export default function ContactForm({ lang }) {
  const isRTL = lang === 'ar';
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const t = {
    en: { name: 'Your Name', email: 'Email Address', msg: 'Your Message', send: 'Send Message', ok: 'Message sent successfully!', err: 'Something went wrong. Try again.' },
    ar: { name: 'اسمك الكامل', email: 'البريد الإلكتروني', msg: 'رسالتك', send: 'إرسال الرسالة', ok: 'تم إرسال رسالتك بنجاح!', err: 'حدث خطأ ما. حاول مرة أخرى.' },
  };

  const submit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: ACCESS_KEY, ...form }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
      if (data.success) setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', direction: isRTL ? 'rtl' : 'ltr' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>{t[lang].name}</label>
          <input
            className="input"
            type="text"
            placeholder={t[lang].name}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>{t[lang].email}</label>
          <input
            className="input"
            type="email"
            placeholder={t[lang].email}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-2)', fontFamily: isRTL ? 'var(--font-ar)' : 'inherit' }}>{t[lang].msg}</label>
        <textarea
          className="input"
          rows={5}
          placeholder={t[lang].msg}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          required
        />
      </div>

      {status === 'success' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontSize: '14px', fontWeight: 600 }}>
          <CheckCircle size={18} /> <span>{t[lang].ok}</span>
        </div>
      )}
      {status === 'error' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f87171', fontSize: '14px', fontWeight: 600 }}>
          <AlertCircle size={18} /> <span>{t[lang].err}</span>
        </div>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn btn-gold" style={{ alignSelf: isRTL ? 'flex-start' : 'flex-end', opacity: status === 'loading' ? 0.7 : 1 }}>
        {status === 'loading' ? <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={16} />}
        <span>{t[lang].send}</span>
      </button>

      <style>{`@keyframes spin { from{transform:rotate(0)} to{transform:rotate(360deg)} }`}</style>
    </form>
  );
}
