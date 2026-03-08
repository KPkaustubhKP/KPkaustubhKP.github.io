import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Path corrected for src/components/ to src/data/
import resumeUrl from "../data/Kaustubh_Pandey.pdf";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-bg-dark/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full h-full max-w-5xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
              <div className="flex items-center gap-3">
                <span className="material-icons-outlined text-primary">description</span>
                <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-400">Curriculum Vitae</span>
              </div>
              <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <span className="material-icons-outlined">close</span>
              </button>
            </div>
            <div className="flex-1 bg-zinc-800">
              <iframe 
                src={`${resumeUrl}#toolbar=0&navpanes=0`} 
                className="w-full h-full border-none" 
                title="Resume PDF"
              />
            </div>
            <div className="px-6 py-3 border-t border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <p className="text-[10px] text-zinc-500">Kaustubh_Pandey_Resume_2026.pdf</p>
              <a 
                href={resumeUrl} 
                download 
                className="text-[10px] text-primary uppercase tracking-widest hover:underline"
              >
                Download PDF
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ResumeModal;
