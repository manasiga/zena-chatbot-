import React from 'react';

const SOCIALS = [
  { cls: 'ig', label: '📸 Follow Instagram', url: 'https://instagram.com' },
  { cls: 'wa', label: '💬 Join WhatsApp Community', url: 'https://whatsapp.com' },
  { cls: 'li', label: '🔗 Follow LinkedIn', url: 'https://linkedin.com' },
];

const SocialLinks: React.FC = () => (
  <div className="sw">
    <div className="sl">Stay Connected with ZeAI Soft</div>
    <div className="sr">
      {SOCIALS.map((s) => (
        <button
          key={s.cls}
          className={`so ${s.cls}`}
          onClick={() => window.open(s.url, '_blank')}
        >
          {s.label}
        </button>
      ))}
    </div>
  </div>
);

export default SocialLinks;
