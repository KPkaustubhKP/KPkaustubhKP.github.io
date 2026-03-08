import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project } from '../data/content';
import { sounds } from '../utils/sounds';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const STATUS_STYLE: Record<string, string> = {
  ONGOING:           'text-yellow-600 dark:text-yellow-400 border-yellow-400/50 bg-yellow-50 dark:bg-yellow-400/5',
  PUBLISHED:         'text-green-600 dark:text-green-400 border-green-400/50 bg-green-50 dark:bg-green-400/5',
  RESEARCH:          'text-violet-600 dark:text-violet-400 border-violet-400/50 bg-violet-50 dark:bg-violet-400/5',
  BUILT:             'text-sky-600 dark:text-primary border-sky-400/50 bg-sky-50 dark:bg-sky-400/5',
  'COMPETITION WINNER': 'text-amber-600 dark:text-amber-400 border-amber-400/50 bg-amber-50 dark:bg-amber-400/5',
};

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') { onClose(); sounds.click(); } };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    if (project) { document.body.style.overflow = 'hidden'; sounds.navEnter(); }
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 dark:bg-black/80 backdrop-blur-xl"
            onClick={() => { onClose(); sounds.click(); }}
          />

          <motion.div
            className="relative z-10 w-full max-w-5xl max-h-[90vh] bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col md:flex-row shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              onClick={() => { onClose(); sounds.click(); }}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-500 hover:border-primary hover:text-primary transition-all duration-200 bg-white dark:bg-transparent"
            >
              <span className="material-icons-outlined text-sm">close</span>
            </button>

            {/* Image */}
            <div className="w-full md:w-2/5 h-56 md:h-auto shrink-0 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-7 md:p-10 overflow-y-auto">
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-[9px] text-primary uppercase tracking-[0.3em] mb-2">
                    {project.category}
                  </p>
                  <h2 className="text-xl md:text-3xl font-medium tracking-tight text-zinc-900 dark:text-white leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-[11px] text-zinc-500 tracking-wider mt-1">{project.subtitle}</p>
                </div>
                <span className={`shrink-0 px-2.5 py-1 border text-[8px] tracking-[0.15em] uppercase mt-1 ${STATUS_STYLE[project.status] ?? STATUS_STYLE.BUILT}`}>
                  {project.status}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-7">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-500 text-[9px] uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Details */}
              <div className="space-y-3.5 mb-8">
                {project.fullDetails.map((detail, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-primary mt-0.5 shrink-0 text-[10px]">▸</span>
                    <p className="text-[13px] text-zinc-600 dark:text-zinc-400 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>

              {/* Links */}
              {project.links.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => sounds.hover()}
                      onClick={() => sounds.click()}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-300 dark:border-zinc-700 hover:border-primary text-zinc-600 dark:text-zinc-400 hover:text-primary text-[10px] uppercase tracking-[0.2em] transition-all duration-200"
                    >
                      {link.label}
                      <span className="material-icons-outlined text-xs">open_in_new</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
