import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OWNER, PROJECTS, PHILOSOPHY, TIMELINE, BLOG_POSTS } from '../data/content';
import type { Project, BlogPost } from '../data/content';
import InteractiveTerminal from './InteractiveTerminal';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import ResumeModal from './ResumeModal';
import SkillsGrid from './SkillsGrid';
import Timeline from './Timeline';
import ThemeToggle from './ThemeToggle';
import LualineBar from './LualineBar';
import KeyboardHint from './KeyboardHint';
import BackgroundCanvas from './BackgroundCanvas';
import { sounds, setSoundEnabled } from '../utils/sounds';

// ── Animation helpers ─────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

// ── Sound toggle (muted by default) ───────────────────────────
const SoundToggle: React.FC = () => {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => { const n = !on; setOn(n); setSoundEnabled(n); if (n) sounds.enter(); }}
      onMouseEnter={() => sounds.hover()}
      title={on ? 'Mute sounds' : 'Enable sounds'}
      className={`flex items-center justify-center p-1.5 transition-colors duration-200 ${on ? 'text-primary' : 'text-zinc-600 hover:text-zinc-400'}`}
    >
      <span className="material-icons-outlined text-[18px]">{on ? 'volume_up' : 'volume_off'}</span>
    </button>
  );
};

// ── Project filter tabs ────────────────────────────────────────
const STATUS_FILTERS = ['ALL', 'ONGOING', 'PUBLISHED', 'BUILT', 'RESEARCH', 'AWARD WINNING'] as const;
type StatusFilter = typeof STATUS_FILTERS[number];

// ── Blog card ─────────────────────────────────────────────────
const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="blog-card group relative border border-zinc-100 dark:border-zinc-900 hover:border-primary/40 bg-white/40 dark:bg-zinc-950/50 p-6 flex flex-col"
  >
    {/* Top accent line */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

    <div className="flex flex-wrap gap-1.5 mb-4">
      {post.tags.map(tag => (
        <span key={tag} className="border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-600 text-[8px] uppercase tracking-[0.15em] px-2 py-0.5">
          {tag}
        </span>
      ))}
    </div>

    <h3 className="text-[15px] md:text-[17px] font-medium tracking-tight text-zinc-800 dark:text-dim mb-3 leading-snug group-hover:text-primary transition-colors duration-300">
      {post.title}
    </h3>

    <p className="text-[11px] text-zinc-500 leading-relaxed flex-1">
      {post.summary}
    </p>

    <div className="mt-5 flex items-center justify-between">
      <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-700">{post.date}</span>
      {post.link ? (
        <a
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => sounds.hover()}
          className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-primary hover:text-primary-hover transition-colors ul-slide"
        >
          Read &nbsp;→
        </a>
      ) : (
        <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-700 dark:text-zinc-800 italic">
          Coming soon
        </span>
      )}
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/30 transition-all duration-700" />
  </motion.div>
);

// ═══════════════════════════════════════════════════════════════
//  MAIN PORTFOLIO
// ═══════════════════════════════════════════════════════════════
const Portfolio: React.FC = () => {
  const [scrolled, setScrolled]           = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showResume, setShowResume]        = useState(false);
  const [mobileMenu, setMobileMenu]        = useState(false);
  const [projectFilter, setProjectFilter]  = useState<StatusFilter>('ALL');

  const carouselRef   = useRef<HTMLDivElement>(null);
  const lastGTime     = useRef<number>(0);
  const sectionIds    = ['hero', 'about', 'work', 'journey', 'blog', 'contact'];

  // Scroll state for nav
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenu(false);
    sounds.navEnter();
  }, []);

  const openResume = useCallback(() => { setShowResume(true); sounds.navEnter(); }, []);

  // Vim-style keyboard navigation
  useEffect(() => {
    const getSections = () =>
      sectionIds.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const getIdx = () => {
      const mid = window.innerHeight / 2;
      const sections = getSections();
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top <= mid) return i;
      }
      return 0;
    };
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA'].includes(tag)) return;
      if (selectedProject || showResume) return;
      const sections = getSections();
      if (e.key === 'j') { sections[Math.min(getIdx() + 1, sections.length - 1)]?.scrollIntoView({ behavior: 'smooth' }); sounds.navEnter(); }
      if (e.key === 'k') { sections[Math.max(getIdx() - 1, 0)]?.scrollIntoView({ behavior: 'smooth' }); sounds.navEnter(); }
      if (e.key === 'g') {
        const now = Date.now();
        if (now - lastGTime.current < 500) { window.scrollTo({ top: 0, behavior: 'smooth' }); sounds.navEnter(); }
        lastGTime.current = now;
      }
      if (e.key === 'G') { window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); sounds.navEnter(); }
      if (e.key === 'r') openResume();
      if (e.key === 't') {
        const dark = document.documentElement.classList.contains('dark');
        if (dark) { document.documentElement.classList.remove('dark'); localStorage.setItem('kp-theme', 'light'); }
        else { document.documentElement.classList.add('dark'); localStorage.setItem('kp-theme', 'dark'); }
        sounds.swoosh();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [selectedProject, showResume, openResume]);

  const scrollCarousel = (dir: 'left' | 'right') => {
    carouselRef.current?.scrollBy({ left: dir === 'right' ? 340 : -340, behavior: 'smooth' });
    sounds.swoosh();
  };

  // Filtered projects
  const filteredProjects = projectFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.status === projectFilter);

  const NAV_LINKS = ['about', 'work', 'journey', 'blog'];

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-zinc-700 dark:text-dim transition-colors duration-300">
      <BackgroundCanvas />

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/90 dark:bg-bg-dark/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-900'
          : 'py-5 bg-transparent'
      }`}>
        <button
          onClick={() => scrollTo('hero')}
          onMouseEnter={() => sounds.hover()}
          className="text-lg font-bold tracking-tight text-primary hover:opacity-70 transition-opacity"
        >
          KP.
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(id => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={() => sounds.hover()}
              className="text-[10px] uppercase tracking-[0.22em] text-zinc-500 hover:text-dim transition-colors duration-200 ul-slide"
            >
              {id}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <SoundToggle />
          <ThemeToggle />
          <button
            onClick={openResume}
            onMouseEnter={() => sounds.hover()}
            className="hidden md:flex ml-3 px-4 py-1.5 border border-zinc-300 dark:border-zinc-800 hover:border-primary text-[10px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 hover:text-primary transition-all duration-200"
          >
            Resume
          </button>
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden ml-1 text-zinc-500 p-1"
          >
            <span className="material-icons-outlined text-xl">{mobileMenu ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-14 inset-x-0 z-40 bg-white/96 dark:bg-bg-dark/97 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-900 px-6 py-5 flex flex-col gap-5 md:hidden"
          >
            {[...NAV_LINKS, 'contact'].map(id => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left text-[11px] uppercase tracking-[0.25em] text-zinc-600 hover:text-primary transition-colors">
                {id}
              </button>
            ))}
            <button onClick={() => { openResume(); setMobileMenu(false); }} className="text-left text-[11px] uppercase tracking-[0.25em] text-primary">
              Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════
          HERO — two-column: name left, terminal right
      ════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative pt-28 md:pt-36 pb-20 px-5 md:px-10 max-w-[1340px] mx-auto">
        {/* Subtle grid bg */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.025]">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="pg" width="56" height="56" patternUnits="userSpaceOnUse">
                <path d="M 56 0 L 0 0 0 56" fill="none" stroke="#c91b68" strokeWidth="0.4"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pg)" />
          </svg>
        </div>

        {/* Ambient glow orbs */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="particle-a absolute w-72 h-72 rounded-full blur-[120px] opacity-[0.07]" style={{ background: '#c91b68', top: '10%', left: '-5%' }} />
          <div className="particle-b absolute w-56 h-56 rounded-full blur-[100px] opacity-[0.04]" style={{ background: '#809fff', bottom: '15%', right: '-3%' }} />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_480px] xl:grid-cols-[1fr_520px] gap-10 lg:gap-16 items-start">

          {/* ── LEFT: name / tagline / stats ──────────────────── */}
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.p
              variants={fadeUp}
              className="text-[9px] text-primary uppercase tracking-[0.55em] mb-8"
            >
              Hardware Engineer · MIT Manipal
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-light leading-[1.05] tracking-[-0.02em] mb-5 text-zinc-900 dark:text-zinc-100"
            >
              Kaustubh
              <br />
              <span className="text-zinc-400 dark:text-zinc-600">Pandey</span>
              <span className="text-primary">.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600 mb-8"
            >
              FPGA &nbsp;·&nbsp; PCB Design &nbsp;·&nbsp; Analog IC &nbsp;·&nbsp; TCAD
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-[14px] text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-md mb-10 italic"
            >
              {OWNER.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
              <button
                onClick={() => scrollTo('work')}
                onMouseEnter={() => sounds.hover()}
                className="px-6 py-2.5 bg-primary/10 border border-primary/40 hover:bg-primary hover:text-black text-primary text-[10px] uppercase tracking-[0.2em] transition-all duration-200"
              >
                View Projects
              </button>
              <button
                onClick={() => scrollTo('about')}
                onMouseEnter={() => sounds.hover()}
                className="px-6 py-2.5 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 dark:hover:border-zinc-600 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-400 transition-all duration-200"
              >
                About Me
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-200 dark:border-zinc-900 pt-10"
            >
              {[
                { n: '6',     label: 'Projects' },
                { n: '2×',    label: 'Competition Wins' },
                { n: 'IEEE',  label: 'Published' },
                { n: '180nm', label: 'IC Design Node' },
              ].map(({ n, label }) => (
                <div key={label} className="group">
                  <p className="text-2xl font-light text-zinc-800 dark:text-zinc-200 mb-1 group-hover:text-primary transition-colors duration-300">{n}</p>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-700">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Interactive Terminal ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <div className="mb-3 flex items-center gap-3">
              <p className="text-[8px] uppercase tracking-[0.45em] text-zinc-600">Interactive Terminal</p>
              <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-900" />
              <span className="text-[8px] text-zinc-700 italic">try: love · matrix · man kp</span>
            </div>
            <InteractiveTerminal className="w-full" />
          </motion.div>

          {/* Mobile terminal (collapsed) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="lg:hidden"
          >
            <details className="group">
              <summary className="text-[9px] uppercase tracking-[0.35em] text-zinc-600 hover:text-primary cursor-pointer transition-colors flex items-center gap-2 list-none">
                <span className="material-icons-outlined text-sm">terminal</span>
                Open Terminal
                <span className="material-icons-outlined text-xs ml-auto group-open:rotate-90 transition-transform">chevron_right</span>
              </summary>
              <div className="mt-3">
                <InteractiveTerminal compact className="w-full" />
              </div>
            </details>
          </motion.div>

        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-10 bg-gradient-to-b from-transparent via-zinc-600 dark:via-zinc-700 to-transparent"
          />
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════════════════════ */}
      <section id="about" className="py-28 px-5 md:px-10 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24">

          {/* Bio side */}
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
            <motion.div variants={fadeUp} className="mb-10">
              <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-700 mb-3">01 / About</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-800 dark:text-dim">
                About<span className="text-primary">.</span>
              </h2>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="text-2xl md:text-3xl font-light leading-snug tracking-tight text-zinc-700 dark:text-zinc-300 mb-7"
            >
              ECE student at{' '}
              <span className="text-primary">MIT Manipal</span>,
              building hardware across the full stack.
            </motion.p>

            <motion.p variants={fadeUp} className="text-[13px] text-zinc-600 dark:text-zinc-500 leading-relaxed mb-4">
              {OWNER.shortBio}
            </motion.p>
            <motion.p variants={fadeUp} className="text-[13px] text-zinc-500 dark:text-zinc-600 leading-relaxed mb-8">
              {OWNER.longBio}
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-8">
              <div className="flex items-center gap-3">
                <span className="material-icons-outlined text-[14px] text-primary">school</span>
                <span className="text-[12px] text-zinc-500 dark:text-zinc-600">{OWNER.education}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-icons-outlined text-[14px] text-primary">location_on</span>
                <span className="text-[12px] text-zinc-500 dark:text-zinc-600">Manipal, Karnataka, India</span>
              </div>
            </motion.div>

            {/* Coursework */}
            <motion.div variants={fadeUp}>
              <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-700 mb-3">Coursework</p>
              <div className="flex flex-wrap gap-2">
                {['VLSI Design', 'Analog IC Design', 'Digital IC Design', 'Physical Design', 'FPGA Systems', 'Semiconductor Physics', 'Analog Circuits', 'Verilog HDL'].map(c => (
                  <span key={c} className="px-2.5 py-1 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-600 text-[9px] tracking-wide hover:border-primary hover:text-primary transition-all duration-200">
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Skills side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="mb-10">
              <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-700 mb-3">Stack</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-800 dark:text-dim">
                Skills<span className="text-primary">.</span>
              </h2>
            </div>
            <SkillsGrid />
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PROJECTS  (horizontal carousel + filter)
      ════════════════════════════════════════════════════════ */}
      <section id="work" className="py-28 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-[1340px] mx-auto px-5 md:px-10">

          {/* Header row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
          >
            <div>
              <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-700 mb-3">02 / Work</p>
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-800 dark:text-dim">
                Projects<span className="text-primary">.</span>
              </h2>
            </div>

            {/* Carousel nav buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                onMouseEnter={() => sounds.hover()}
                className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-primary hover:text-primary transition-all duration-200"
              >
                <span className="material-icons-outlined text-lg">chevron_left</span>
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                onMouseEnter={() => sounds.hover()}
                className="w-9 h-9 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-primary hover:text-primary transition-all duration-200"
              >
                <span className="material-icons-outlined text-lg">chevron_right</span>
              </button>
            </div>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {STATUS_FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => { setProjectFilter(filter); sounds.click(); }}
                onMouseEnter={() => sounds.hover()}
                className={`px-3 py-1.5 text-[8px] uppercase tracking-[0.18em] border transition-all duration-200 ${
                  projectFilter === filter
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-700 dark:hover:text-zinc-400'
                }`}
              >
                {filter}
                {filter !== 'ALL' && (
                  <span className="ml-2 text-[7px] text-zinc-600 dark:text-zinc-700">
                    ({PROJECTS.filter(p => p.status === filter).length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Carousel (edge-to-edge) */}
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-bg-light dark:from-bg-dark to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-bg-light dark:from-bg-dark to-transparent z-10" />

          <div
            ref={carouselRef}
            className="project-scroll flex gap-5 px-5 md:px-10 pb-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="project-card-snap"
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex items-center justify-center py-20 text-zinc-600 text-[12px] tracking-widest"
              >
                No projects with status "{projectFilter}"
              </motion.div>
            )}
            <div className="shrink-0 w-6" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          JOURNEY (scrollable timeline)
      ════════════════════════════════════════════════════════ */}
      <section id="journey" className="py-28 px-5 md:px-10 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-[900px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-14"
          >
            <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-700 mb-3">03 / Journey</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-800 dark:text-dim">
              Journey<span className="text-primary">.</span>
            </h2>
            <p className="text-[12px] text-zinc-500 dark:text-zinc-600 mt-3">Milestones &amp; achievements</p>
          </motion.div>

          <Timeline />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PHILOSOPHY QUOTE
      ════════════════════════════════════════════════════════ */}
      <section className="py-20 px-5 md:px-10 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-2xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-2xl font-light leading-relaxed italic border-l-2 border-primary pl-7 text-zinc-600 dark:text-zinc-400 tracking-tight"
          >
            {PHILOSOPHY}
          </motion.blockquote>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          BLOG
      ════════════════════════════════════════════════════════ */}
      <section id="blog" className="py-28 px-5 md:px-10 border-t border-zinc-200 dark:border-zinc-900">
        <div className="max-w-[1340px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="mb-14"
          >
            <p className="text-[9px] uppercase tracking-[0.5em] text-zinc-500 dark:text-zinc-700 mb-3">04 / Writing</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-zinc-800 dark:text-dim">
              Blog<span className="text-primary">.</span>
            </h2>
            <p className="text-[12px] text-zinc-500 dark:text-zinc-600 mt-3">
              Notes on hardware, VLSI, and things I figured out the hard way.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-8 text-[9px] uppercase tracking-[0.35em] text-zinc-600 dark:text-zinc-800"
          >
            More posts coming soon — the schematic is ready, just needs layout review.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CONTACT / FOOTER
      ════════════════════════════════════════════════════════ */}
      <footer id="contact" className="border-t border-zinc-200 dark:border-zinc-900 py-20 px-5 md:px-10">
        <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div>
            <p className="text-[9px] uppercase tracking-[0.45em] text-zinc-500 dark:text-zinc-700 mb-8">Get in touch_</p>
            <div className="flex flex-wrap gap-7 text-[11px] uppercase tracking-[0.2em]">
              {[
                { label: 'Email',     href: `mailto:${OWNER.email}` },
                { label: 'LinkedIn',  href: OWNER.linkedin },
                { label: 'GitHub',    href: OWNER.github },
                { label: 'Instagram', href: OWNER.instagram },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => sounds.hover()}
                  onClick={() => sounds.click()}
                  className="text-zinc-500 dark:text-zinc-600 hover:text-hover transition-colors duration-200 ul-slide"
                >
                  {label}
                </a>
              ))}
              <button
                onClick={openResume}
                onMouseEnter={() => sounds.hover()}
                className="text-primary hover:opacity-70 transition-opacity ul-slide"
              >
                Resume
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[9px] uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-700 mb-1.5">
              Kaustubh Pandey © 2026
            </p>
            <p className="text-[9px] text-zinc-400 dark:text-zinc-800 italic">
              Built with Vite &amp; React. Deployed on GitHub Pages.
            </p>
          </div>
        </div>
      </footer>

      {/* ── Fixed UI ──────────────────────────────────────────── */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ResumeModal open={showResume} onClose={() => setShowResume(false)} />
      <LualineBar />
      <KeyboardHint onOpenResume={openResume} />
    </div>
  );
};

export default Portfolio;
