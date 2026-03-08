import React from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../data/content';
import { sounds } from '../utils/sounds';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const STATUS_STYLE: Record<string, string> = {
  ONGOING:           'text-yellow-600 dark:text-yellow-400 border-yellow-400/50 bg-yellow-400/5',
  PUBLISHED:         'text-green-600 dark:text-green-400 border-green-400/50 bg-green-400/5',
  RESEARCH:          'text-violet-600 dark:text-violet-400 border-violet-400/50 bg-violet-400/5',
  BUILT:             'text-sky-600 dark:text-primary border-sky-400/50 bg-sky-400/5',
  'COMPETITION WINNER': 'text-amber-600 dark:text-amber-400 border-amber-400/50 bg-amber-400/5',
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      className="group relative cursor-pointer shrink-0 w-80 md:w-96"
      onClick={() => { onClick(); sounds.click(); }}
      onMouseEnter={() => sounds.hover()}
      whileHover="hover"
      initial="rest"
    >
      {/* Hover glow */}
      <motion.div
        variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-4 bg-primary/8 blur-2xl rounded-full pointer-events-none z-0"
      />

      <div className="relative z-10 bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 group-hover:border-primary/40 transition-all duration-400 overflow-hidden">
        {/* Image */}
        <div className={`relative overflow-hidden ${project.aspect} bg-zinc-100 dark:bg-zinc-900`}>
          {/* Scan line on mount */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
            initial={false}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '300%' }}
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeInOut' }}
              className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-primary/15 to-transparent"
            />
          </motion.div>

          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            variants={{
              rest: { filter: 'grayscale(0.85) brightness(0.8)', scale: 1 },
              hover: { filter: 'grayscale(0) brightness(0.95)', scale: 1.05 },
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Hover overlay */}
          <motion.div
            variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-zinc-900/40 backdrop-blur-[2px]"
          >
            <span className="px-4 py-1.5 border border-white/70 text-white text-[9px] uppercase tracking-[0.3em]">
              View Details
            </span>
          </motion.div>

          {/* Status badge */}
          <div className={`absolute top-3 right-3 z-10 px-2 py-0.5 border text-[8px] tracking-[0.15em] uppercase ${STATUS_STYLE[project.status] ?? STATUS_STYLE.BUILT}`}>
            {project.status}
          </div>
        </div>

        {/* Card footer */}
        <div className="p-5">
          <motion.p
            variants={{ rest: { y: 0 }, hover: { y: -2 } }}
            transition={{ duration: 0.25 }}
            className="text-[9px] text-primary uppercase tracking-[0.25em] mb-2"
          >
            {project.category}
          </motion.p>
          <motion.h3
            variants={{ rest: { x: 0 }, hover: { x: 4 } }}
            transition={{ duration: 0.3 }}
            className="text-[15px] font-medium tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug mb-1"
          >
            {project.title}
          </motion.h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-600 tracking-wide">
            {project.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
