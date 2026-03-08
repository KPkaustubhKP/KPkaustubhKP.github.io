import React from 'react';
import { motion } from 'framer-motion';
import { TIMELINE } from '../data/content';
import { sounds } from '../utils/sounds';

const Timeline: React.FC = () => {
  return (
    /* Scrollable container — max-height so it doesn't push everything down */
    <div
      className="relative overflow-y-auto pr-2"
      style={{ maxHeight: '78vh', scrollbarWidth: 'thin', scrollbarColor: 'rgba(201,27,104,0.3) transparent' }}
    >
      {/* Top fade */}
      <div className="pointer-events-none sticky top-0 z-20 h-5 -mb-5 bg-gradient-to-b from-bg-light dark:from-bg-dark to-transparent" />

      <div className="pt-2 pb-4">
        {TIMELINE.map((event, index) => {
          const isLast = index === TIMELINE.length - 1;

          return (
            <motion.div
              key={index}
              /* ── Use items-stretch so both columns fill the same height ── */
              className="group flex items-stretch gap-5 md:gap-7"
              initial={{ opacity: 0, x: -14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* ── LEFT COLUMN: node + vertical line ─────────────────── */}
              <div className="flex flex-col items-center w-5 shrink-0">
                {/* Dot */}
                <div className="node-pulse relative z-10 mt-[22px] w-[14px] h-[14px] shrink-0 rounded-full border-2 border-primary bg-bg-dark group-hover:bg-primary/20 transition-all duration-300" />
                {/* Line — flex-1 fills to next item's top.
                    Last item: no line. All others: full height. */}
                {!isLast && (
                  <div className="flex-1 w-px min-h-[32px] mt-1 mb-0 bg-zinc-800 group-hover:bg-primary/30 transition-colors duration-500" />
                )}
              </div>

              {/* ── RIGHT COLUMN: content card ─────────────────────────── */}
              <div className={`flex-1 ${isLast ? 'pb-2' : 'pb-8'}`}>
                {/* Year line */}
                <div className="flex items-center gap-3 mb-3 mt-4">
                  <span className="text-primary font-bold text-base tracking-tight group-hover:tracking-widest transition-all duration-500">
                    {event.year}
                  </span>
                  <div className="flex-1 h-px bg-zinc-800 dark:bg-zinc-900 group-hover:bg-primary/25 transition-colors duration-500" />
                </div>

                {/* Card */}
                <div className="border border-zinc-100 dark:border-zinc-900 bg-white/40 dark:bg-zinc-950/50 p-5 group-hover:border-primary/30 group-hover:-translate-y-0.5 transition-all duration-300">
                  {/* Title — bigger */}
                  <h3 className="text-[16px] md:text-[18px] font-medium tracking-tight text-zinc-800 dark:text-dim mb-1 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-[9px] text-primary/60 uppercase tracking-[0.22em] mb-3">
                    {event.org}
                  </p>
                  <p className="text-[12px] text-zinc-500 dark:text-zinc-500 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {/* Badge + link row */}
                  <div className="flex flex-wrap items-center gap-3">
                    {event.badge && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-primary/20 bg-primary/5 text-primary text-[9px] uppercase tracking-[0.15em] group-hover:bg-primary group-hover:text-black transition-all duration-300">
                        <span className="material-icons-outlined text-xs">workspace_premium</span>
                        {event.badge}
                      </span>
                    )}
                    {event.link && (
                      <a
                        href={event.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => sounds.hover()}
                        onClick={() => sounds.click()}
                        className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider text-zinc-500 hover:text-hover transition-colors duration-200 group/link"
                      >
                        <span className="group-hover/link:underline underline-offset-2">{event.link.label}</span>
                        <span className="material-icons-outlined text-xs">open_in_new</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none sticky bottom-0 z-20 h-8 bg-gradient-to-t from-bg-light dark:from-bg-dark to-transparent" />
    </div>
  );
};

export default Timeline;
