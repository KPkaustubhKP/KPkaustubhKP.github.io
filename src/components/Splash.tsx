import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { sounds } from '../utils/sounds';

interface SplashProps { onEnter: () => void; }

const Splash: React.FC<SplashProps> = ({ onEnter }) => {
  // Auto-enter after 5s
  useEffect(() => {
    const t = setTimeout(onEnter, 5000);
    return () => clearTimeout(t);
  }, [onEnter]);

  return (
    <motion.div
      className="relative h-screen w-screen overflow-hidden bg-bg-dark flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      onClick={() => { sounds.click(); onEnter(); }}
    >
      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="particle-a absolute w-[500px] h-[500px] rounded-full blur-[130px]"
          style={{ background: 'rgba(201,27,104,0.05)', top: '-10%', left: '-15%' }}
        />
        <div
          className="particle-b absolute w-80 h-80 rounded-full blur-[100px]"
          style={{ background: 'rgba(128,159,255,0.04)', bottom: '0%', right: '-8%' }}
        />
      </div>

      {/* Thin top border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-7 text-center select-none">

        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[8px] uppercase tracking-[0.7em] text-zinc-700"
        >
          Portfolio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-2xl font-light tracking-[0.22em] uppercase text-dim hover:text-primary transition-all duration-500"
        >
          Kaustubh Pandey
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-12 h-px bg-primary/50"
        />

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center gap-1.5"
        >
          <div className="dot-1 w-1 h-1 rounded-full bg-primary/60" />
          <div className="dot-2 w-1 h-1 rounded-full bg-primary/60" />
          <div className="dot-3 w-1 h-1 rounded-full bg-primary/60" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          transition={{ delay: 1.5 }}
          className="text-[8px] uppercase tracking-[0.4em] text-zinc-700"
        >
          Click to enter · auto in 5s
        </motion.p>
      </div>

      {/* Corner labels */}
      <div className="absolute top-8 left-8 hidden md:block">
        <p className="text-[8px] uppercase tracking-[0.35em] text-zinc-800">Hardware · VLSI</p>
      </div>
      <div className="absolute top-8 right-8 hidden md:block">
        <p className="text-[8px] uppercase tracking-[0.35em] text-zinc-800 text-right">MIT Manipal</p>
      </div>

      {/* Bottom signature */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-[8px] uppercase tracking-[0.45em] text-zinc-800 whitespace-nowrap">
          KP. &nbsp;·&nbsp; 2026
        </p>
      </div>

      {/* Bottom border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.7, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
      />
    </motion.div>
  );
};

export default Splash;
