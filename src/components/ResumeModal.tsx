import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import resumeUrl from '../data/Kaustubh_Pandey.pdf';

interface ResumeModalProps { open: boolean; onClose: () => void; }

const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <motion.div className="absolute inset-0 bg-bg-dark/90 backdrop-blur-xl" onClick={onClose} />
          <motion.div className="relative z-10 w-full max-w-5xl h-[90vh] bg-zinc-950 border border-zinc-800 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-primary text-[10px] tracking-[0.3em] uppercase">&gt; RESUME_VIEWER.EXE</span>
                <span className="cursor-blink text-primary text-[10px]">▋</span>
              </div>
              <div className="flex items-center gap-4">
                <a href={resumeUrl} download="Kaustubh_Pandey_Resume.pdf"
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500 hover:text-primary transition-colors">
                  <span className="material-icons-outlined text-sm">download</span>Download
                </a>
                <button onClick={onClose} className="w-7 h-7 flex items-center justify-center border border-zinc-700 text-zinc-500 hover:border-primary hover:text-primary transition-all">
                  <span className="material-icons-outlined text-sm">close</span>
                </button>
              </div>
            </div>
            <div className="flex-1 bg-zinc-900">
              <iframe src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`} className="w-full h-full border-none" title="Kaustubh Pandey Resume" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ResumeModal;
