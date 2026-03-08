import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../utils/sounds';

const COMMANDS = [
  { key: 'j / k', desc: 'Next / Prev section' },
  { key: 'g g', desc: 'Jump to top' },
  { key: 'G', desc: 'Jump to bottom' },
  { key: 'r', desc: 'Open resume' },
  { key: 't', desc: 'Toggle theme' },
  { key: 'Esc', desc: 'Close modal' },
];

const KeyboardHint: React.FC<{ onOpenResume: () => void }> = ({ onOpenResume: _ }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => { setOpen(true); sounds.click(); }}
        onMouseEnter={() => sounds.hover()}
        className="fixed bottom-8 right-5 z-[150] text-[9px] uppercase tracking-[0.25em] text-zinc-600 dark:text-zinc-700 hover:text-primary dark:hover:text-zinc-400 transition-all duration-200"
      >
        [ ? ]
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[160] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setOpen(false); sounds.click(); }}
          >
            <div className="absolute inset-0 bg-black/60 dark:bg-black/70 backdrop-blur-lg" />
            <motion.div
              className="relative z-10 w-full max-w-xs bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-7 shadow-2xl"
              initial={{ scale: 0.95, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-[9px] text-primary uppercase tracking-[0.35em] mb-5 flex items-center gap-2">
                <span>Keyboard Shortcuts</span>
                <span className="cursor-blink">▋</span>
              </p>
              <div className="space-y-3">
                {COMMANDS.map((cmd) => (
                  <div key={cmd.key} className="flex items-center justify-between gap-6">
                    <code className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 shrink-0">
                      {cmd.key}
                    </code>
                    <span className="text-[10px] text-zinc-500 dark:text-zinc-500 tracking-wide text-right">{cmd.desc}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { setOpen(false); sounds.click(); }}
                className="mt-6 text-[9px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 hover:text-primary transition-colors"
              >
                [ Close ]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default KeyboardHint;
