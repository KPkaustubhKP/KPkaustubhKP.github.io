
import React, { useEffect } from 'react';

interface SplashProps {
  onEnter: () => void;
}

const Splash: React.FC<SplashProps> = ({ onEnter }) => {
  useEffect(() => {
    // Auto-enter after 4 seconds
    const timer = setTimeout(() => {
      onEnter();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onEnter]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background-light dark:bg-background-dark flex flex-col items-center justify-center transition-colors duration-500">
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="particle bg-primary/20 w-64 h-64 top-1/4 -left-20" style={{ animationDelay: '0s' }}></div>
        <div className="particle bg-indigo-500/10 w-96 h-96 bottom-1/4 -right-20" style={{ animationDelay: '-2s' }}></div>
        <div className="particle bg-purple-500/15 w-80 h-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '-5s' }}></div>
      </div>

      {/* Navigation Points */}
      <nav className="fixed inset-0 z-50 pointer-events-none p-12">
        <div className="absolute top-12 left-12 pointer-events-auto group">
          <div className="flex items-center space-x-4 cursor-pointer">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-primary transition-colors"></div>
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-display text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">About</span>
          </div>
        </div>
        <div className="absolute top-12 right-12 pointer-events-auto group">
          <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse cursor-pointer">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-primary transition-colors"></div>
            <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-display text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Work</span>
          </div>
        </div>
        <div className="absolute bottom-12 left-12 pointer-events-auto group">
          <div className="flex items-center space-x-4 cursor-pointer">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-primary transition-colors"></div>
            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-display text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Contact</span>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 pointer-events-auto group">
          <div className="flex items-center flex-row-reverse space-x-4 space-x-reverse cursor-pointer">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:bg-primary transition-colors"></div>
            <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 font-display text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400">Social</span>
          </div>
        </div>
      </nav>

      {/* Center Logo/Entry */}
      <main className="relative z-10 text-center group">
        <button 
          onClick={onEnter}
          className="font-display text-lg md:text-xl font-light tracking-[0.2em] text-slate-800 dark:text-slate-200 uppercase transition-all duration-500 hover:text-primary hover:tracking-[0.25em] focus:outline-none"
        >
          Kaustubh Pandey
        </button>
        <div className="mt-4 flex justify-center space-x-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse"></div>
          <div className="w-1 h-1 rounded-full bg-primary/60 animate-pulse delay-75"></div>
          <div className="w-1 h-1 rounded-full bg-primary/40 animate-pulse delay-150"></div>
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 animate-pulse block md:hidden">Entering in 4s...</p>
      </main>

      {/* Footer Copyright */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 pointer-events-none text-center">
        <p className="font-display text-[9px] uppercase tracking-[0.4em] text-slate-400 dark:text-slate-600 opacity-60">
          KAUSTUBH PANDEY PORTFOLIO © 2026
        </p>
      </div>
    </div>
  );
};

export default Splash;
