import React, { useState, useEffect } from 'react';
import { sounds } from '../utils/sounds';

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(localStorage.getItem('kp-theme') !== 'light');
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    sounds.swoosh();
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kp-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kp-theme', 'light');
    }
  };

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => sounds.hover()}
      className="flex items-center justify-center p-1.5 text-zinc-600 hover:text-primary transition-colors duration-200"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="material-icons-outlined text-[18px]">
        {isDark ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};

export default ThemeToggle;
