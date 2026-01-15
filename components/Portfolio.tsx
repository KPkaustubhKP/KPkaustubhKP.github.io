
import React, { useEffect, useState } from 'react';
import ProjectCard from './ProjectCard';
import ThemeToggle from './ThemeToggle';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  fullDetails?: string[];
  links?: { label: string; url: string }[];
  span: string;
  aspect: string;
  featured?: boolean;
}

const Portfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects: Project[] = [
    {
      id: 2,
      title: "VSD SQUADRON ULTRA (THEJAS32_EVB)",
      category: "PCB DESIGN | KICAD",
      image: "squadron_ultra_TOP.jpg",
      description: "Evaluation board design for the Thejas32 Vega Processor. Managed high-speed routing and signal integrity.",
      fullDetails: [
        "Designed and laid out the evaluation board for the Thejas32 (by Vega Processor & CDAC) using KiCad.",
        "Collaborated on creating a shield for their FPGA board PCB design, integrating interface components.",
        "Applied high-speed routing and impedance control for critical signal paths.",
        "Generated manufacturing Gerber files and coordinated with fabrication partners."
      ],
      span: "md:col-span-12",
      aspect: "aspect-[21/9]",
      featured: true
    },
    {
      id: 3,
      title: "PID_MOTOR_CONTROLLER",
      category: "FPGA | VERILOG",
      image: "pid_controller.jpg",
      description: "Digital PID controller for DC motor speed regulation. Synthesized on FPGA using Vivado.",
      fullDetails: [
        "Designed a digital PID controller in Verilog HDL for DC motor speed regulation using encoder feedback signals.",
        "Synthesized and implemented the design on FPGA using Vivado with pipelined architecture.",
        "Validated timing behavior with GTKWave waveform analysis.",
        "Achieved closed-loop stability with tuned PID gains."
      ],
      links: [
        { label: "Publication", url: "https://ieeexplore.ieee.org/document/11232594" }
      ],
      span: "md:col-span-7",
      aspect: "aspect-[4/5]"
    },
    {
      id: 4,
      title: "4H-SiC_U-MOSFET",
      category: "TCAD | DEVICE PHYSICS",
      image: "sic_mosfet.jpg",
      description: "Research on high-voltage 4H-SiC trench U-MOSFETs achieving 556V breakdown voltage.",
      fullDetails: [
        "Co-authored research on 4H-SiC trench U-MOSFET achieving 556 V breakdown voltage using BPT technique.",
        "Performed 2D TCAD device simulations; optimized drift region and electric field profiles."
      ],
      span: "md:col-span-5 md:mt-32",
      aspect: "aspect-square"
    },
    {
      id: 5,
      title: "PROJECT_MANAS_UGV",
      category: "HARDWARE | POWER SYSTEMS",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600&h=700",
      description: "Hardware subsystem lead for an autonomous UGV platform.",
      fullDetails: [
        "Designed power distribution boards (PDB) for autonomous UGVs with robust thermal handling.",
        "Implemented precise current sensing using current-sense ICs.",
        "Developed motor and microcontroller interface boards.",
        "Integrated CAN-bus communication for reliable subsystem messaging."
      ],
      span: "md:col-span-12",
      aspect: "aspect-[16/9]"
    }
  ];

  const skills = [
    "SystemVerilog", "Verilog", "RTL Design", "Analog Design", "TCAD Simulation", "PCB Design",
    "Vivado", "KiCad", "Icarus Verilog", "Cadence", "LTSpice", "Physical Design"
  ];

  return (
    <div className={`min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 ${selectedProject ? 'overflow-hidden' : ''}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md py-4' : 'bg-transparent'}`}>
        <a href="#" className="text-xl font-bold tracking-tighter mono-font uppercase mix-blend-difference dark:text-white">Kaustubh.</a>
        <div className="flex gap-8 items-center mono-font">
          <ThemeToggle />
          <a href="#about" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary transition-colors">About</a>
          <a href="#work" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary transition-colors">Projects</a>
          <a href="#contact" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary transition-colors">Contact</a>
          <button className="md:hidden">
            <span className="material-icons-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="relative z-10 pt-48 pb-20 px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-7xl font-light leading-tight tracking-tighter mb-8 max-w-5xl mono-font">
          Selected <span className="italic text-primary">fragments</span> of silicon architecture and hardware innovation.
        </h1>
        <div className="mt-12 max-w-2xl">
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            I specialize in VLSI design, digital electronics, and semiconductor device simulation. From RTL design to physical implementation, I enjoy working across the entire chip design flow.
          </p>
        </div>
      </header>

      {/* About Section - Moved Above Projects */}
      <section id="about" className="py-40 px-8 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary mb-12 mono-font">About Me</h2>
            <p className="text-2xl md:text-3xl font-light leading-snug mono-font tracking-tight mb-8">
              I'm a VLSI enthusiast currently studying at <span className="text-primary italic">MIT Manipal</span>, passionate about pushing the boundaries of chip design.
            </p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              My journey in electronics has been driven by curiosity and a desire to understand how silicon transforms ideas into reality. I believe that hardware design is the bridge between theoretical physics and the digital future.
            </p>
          </div>
          <div>
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary mb-12 mono-font">Philosophy</h2>
            <p className="text-xl font-light leading-relaxed italic border-l-2 border-primary pl-8 text-slate-700 dark:text-slate-300">
              "I believe that VLSI design should be both innovative and inspiring. Every transistor, every logic gate, and every routing decision is an opportunity to create something remarkable. Through my work, I aim to demonstrate the artistic and creative aspects of hardware design while maintaining technical excellence."
            </p>
            <div className="mt-16">
              <h3 className="text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-8 mono-font">Technical Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skills.map(skill => (
                  <div key={skill} className="text-[11px] uppercase tracking-widest mono-font text-slate-500 hover:text-primary transition-colors cursor-default">
                    {skill}_
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <main id="work" className="relative z-10 px-8 py-40 max-w-[1600px] mx-auto border-t border-slate-200 dark:border-zinc-800">
        <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary mb-24 mono-font text-center">Selected Works</h2>
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {projects.map((project) => (
            <div key={project.id} className={`col-span-12 ${project.span}`} onClick={() => setSelectedProject(project)}>
              <ProjectCard {...project} />
            </div>
          ))}
        </div>
      </main>

      {/* Modal Detail View */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-background-light/40 dark:bg-background-dark/60 backdrop-blur-2xl" onClick={() => setSelectedProject(null)}></div>
          <div className="relative w-full max-w-6xl bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
            >
              <span className="material-icons-outlined">close</span>
            </button>
            
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-zinc-100 dark:bg-zinc-800">
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <p className="text-primary text-[10px] uppercase tracking-[0.3em] mono-font mb-4">{selectedProject.category}</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mono-font mb-8">{selectedProject.title}</h2>
              
              <div className="space-y-6 text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                {selectedProject.fullDetails?.map((detail, idx) => (
                  <p key={idx} className="flex gap-4">
                    <span className="text-primary mt-1.5 shrink-0">
                      <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg>
                    </span>
                    {detail}
                  </p>
                ))}
              </div>

              {selectedProject.links && (
                <div className="mt-12 flex flex-wrap gap-4">
                  {selectedProject.links.map((link, idx) => (
                    <a 
                      key={idx} 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-zinc-700 hover:border-primary text-[10px] uppercase tracking-widest mono-font transition-colors"
                    >
                      {link.label}
                      <span className="material-icons-outlined text-sm">open_in_new</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer id="contact" className="relative z-10 border-t border-slate-200 dark:border-zinc-800 py-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-12 mono-font leading-tight">
              Ready to start a<br />
              <span className="text-primary italic">new dialogue?</span>
            </h2>
            <div className="flex gap-10 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mono-font">
              <a className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8" href="mailto:kaustubhofficial.kp@gmail.com">Email</a>
              <a className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8" href="https://linkedin.com/in/kaustubh-pandey">LinkedIn</a>
              <a className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8" href="https://github.com/KPkaustubhKP">GitHub</a>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-3 mono-font opacity-60">Kaustubh Pandey © 2024</p>
            <p className="text-[10px] text-slate-500 mono-font">Crafted with precision and silicon logic.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
