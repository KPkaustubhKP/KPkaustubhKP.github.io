import React, { useState, useEffect } from 'react';

const LualineBar: React.FC = () => {
  const [scrollPct, setScrollPct] = useState(0);
  const [section, setSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = Math.round((window.scrollY / (el.scrollHeight - el.clientHeight)) * 100) || 0;
      setScrollPct(pct);
      // Determine current section
      const sections = ['hero', 'about', 'work', 'journey', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] h-6 flex items-center justify-between px-3 bg-[#0a0a0a] border-t border-zinc-900"
      style={{ fontSize: '9px', fontFamily: "'JetBrains Mono', monospace" }}
    >
      <div className="flex items-center gap-3">
        <span className="px-2 py-0.5 bg-primary text-black uppercase tracking-widest font-bold text-[8px]">
          NORMAL
        </span>
        <span className="text-zinc-500 tracking-wider hidden sm:block">~/portfolio/KP.v</span>
        <span className="hidden md:block text-zinc-700">·</span>
        <span className="hidden md:block text-zinc-600">{section}</span>
      </div>
      <div className="flex items-center gap-3 text-zinc-600">
        <span className="hidden md:block">UTF-8</span>
        <span className="hidden md:block">·</span>
        <span className="hidden md:block">React 19</span>
        <span>·</span>
        <span>{scrollPct}%</span>
      </div>
    </div>
  );
};

export default LualineBar;
