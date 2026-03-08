import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SKILLS } from '../data/content';
import { sounds } from '../utils/sounds';

const SkillsGrid: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {SKILLS.map((group) => (
        <div key={group.group}>
          <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-600 mb-5">
            {group.group}_
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-4">
            {group.items.map((skill) => (
              <div
                key={skill.name}
                className="relative"
                onMouseEnter={() => { setHovered(skill.name); sounds.hover(); }}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="text-[13px] tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-primary dark:hover:text-primary transition-colors duration-200 border-b border-transparent hover:border-primary/40 pb-0.5 select-none">
                  {skill.name}_
                </div>

                <AnimatePresence>
                  {hovered === skill.name && (
                    <motion.div
                      className="absolute bottom-full left-0 mb-3 w-60 p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 z-50 pointer-events-none shadow-lg dark:shadow-none"
                      initial={{ opacity: 0, y: 5, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                    >
                      <p className="text-[9px] text-primary uppercase tracking-[0.2em] mb-1.5">
                        Info_
                      </p>
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        {skill.def}
                      </p>
                      <div className="absolute top-full left-4 w-2.5 h-2.5 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-700 rotate-45 -translate-y-1.5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      ))}
      <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-700 italic">
        * Hover for details
      </p>
    </div>
  );
};

export default SkillsGrid;
