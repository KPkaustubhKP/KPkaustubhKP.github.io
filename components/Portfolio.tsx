
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

interface JourneyEvent {
  year: string;
  title: string;
  description: string;
  achievement?: string;
}

const Portfolio: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showResume, setShowResume] = useState(false);

  // Path to your resume on GitHub Pages (relative to the root)
  const resumePath = "resume.pdf";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects: Project[] = [
  {
      id: 3,
      title: "PID_MOTOR_CONTROLLER",
      category: "FPGA | VERILOG",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=1000",
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
      span: "md:col-span-12",
      aspect: "aspect-[21/9]"
    },
    {
      id: 2,
      title: "VSD SQUADRON ULTRA ",
      category: "PCB DESIGN | KICAD",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600&h=700",
      description: "Evaluation board design for the Thejas32 Vega Processor. Managed high-speed routing and signal integrity.",
      fullDetails: [
        "Designed and laid out the evaluation board for the Thejas32 (by Vega Processor & CDAC) using KiCad.",
        "Collaborated on creating a shield for their FPGA board PCB design, integrating interface components.",
        "Applied high-speed routing and impedance control for critical signal paths.",
        "Generated manufacturing Gerber files and coordinated with fabrication partners."
      ],
      span: "md:col-span-7",
      aspect: "aspect-[4/5]",
      featured: true
    },
    {
      id: 4,
      title: "4H-SiC_U-MOSFET",
      category: "TCAD | DEVICE PHYSICS",
      image: "https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&q=80&w=800&h=800",
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
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=1600&h=900",
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

  const skillGroups = [
    {
      title: "Languages",
      skills: ["C/C++", "SystemVerilog", "Verilog", "Latex"]
    },
    {
      title: "Tools",
      skills: ["Vivado", "KiCad", "Icarus Verilog", "GTKWave", "Cadence", "virtuoso", "Synopsys Sentaurus", "LTSpice"]
    },
    {
      title: "Technologies",
      skills: ["RTL Design", "Analog Design", "TCAD Simulation", "PCB Layout", "Physical Design"]
    }
  ];

  const journeyEvents: JourneyEvent[] = [
    {
      year: "2023",
      title: "Silicon Origins: MIT Manipal",
      description: "Commenced undergraduate studies at Manipal Institute of Technology (MIT), specializing in Electronics Engineering in VLSI Design and Technology."
    },
    {
      year: "2024",
      title: "Project Manas: Robotics Systems",
      description: "Inducted into Project Manas, the premier AI and Robotics team of MIT Manipal. Appointed as a Sensing and Automation Member, specializing in electronics Hardware and PCB design."
    },
    {
      year: "2025",
      title: "ISDC'25 PIMA Winners",
      description: "Secured 1st Place in the PIMA (Project Implementation and Management Assessment) category at the International Space Drone Challenge held at BITS Goa.",
      achievement: "1st Place Winner - Worldwide"
    },
    {
      year: "2025",
      title: "Global Podium at IGVC USA",
      description: "Achieved 3rd Place Overall at the Intelligent Ground Vehicle Competition held at Oakland University, Michigan, USA. Led the hardware reliability efforts for the autonomous platform.",
      achievement: "3rd Place Overall - International"
    },
    {
      year: "2025",
      title: "Thejas32 Hardware Ecosystem",
      description: "Developed the VSD Squadron Ultra, an advanced evaluation board designed to support the RISC-V Thejas32 Vega Processor, bridging custom silicon with real-world applications.",
      achievement: "SoC Evaluation Board"
    },
    {
      year: "2025",
      title: "IEEE Publication: PID Control",
      description: "Authored and published a research paper on Digital PID Motor Controllers, optimizing Verilog HDL implementations for real-time robotic speed regulation.",
      achievement: "Published IEEE Researcher"
    }
  ];

  return (
    <div className={`min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 ${(selectedProject || showResume) ? 'overflow-hidden' : ''}`}>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md py-4' : 'bg-transparent'}`}>
        <a href="#" className="text-xl font-bold tracking-tighter mono-font uppercase mix-blend-difference dark:text-white">Kaustubh.</a>
        <div className="flex gap-8 items-center mono-font">
          <ThemeToggle />
          <a href="#about" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary transition-colors">About</a>
          <a href="#work" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary transition-colors">Projects</a>
          <a href="#journey" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary transition-colors">Journey</a>
          <a href="#contact" className="hidden md:block text-xs uppercase tracking-widest hover:text-primary transition-colors">Contact</a>
          <button 
            onClick={() => setShowResume(true)}
            className="px-4 py-1.5 border border-slate-900 dark:border-white text-[10px] uppercase tracking-widest hover:bg-primary hover:border-primary hover:text-white transition-all"
          >
            Resume
          </button>
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
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            I specialize in VLSI design, digital electronics, and semiconductor device simulation. From RTL design to physical implementation, I enjoy working across the entire chip design flow.
          </p>
        </div>
      </header>

      {/* About & Skills Section */}
      <section id="about" className="py-40 px-8 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-[0.4em] text-primary mb-12 mono-font font-bold">About Me</h2>
            <p className="text-2xl md:text-5xl font-light leading-snug mono-font tracking-tight mb-8">
              I'm a VLSI enthusiast currently studying at <span className="text-primary italic">MIT Manipal</span>, passionate about pushing the boundaries of chip design.
            </p>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              My journey in electronics has been driven by curiosity and a desire to understand how silicon transforms ideas into reality. I believe that hardware design is the bridge between theoretical physics and the digital future.
            </p>
          </div>
          <div>
            <h2 className="text-lg md:text-xl uppercase tracking-[0.4em] text-primary mb-12 mono-font font-bold">Technical Stack</h2>
            <div className="space-y-16">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs md:text-sm uppercase tracking-[0.3em] text-slate-400 mb-8 mono-font font-bold">{group.title}</h3>
                  <div className="flex flex-wrap gap-x-10 gap-y-6">
                    {group.skills.map(skill => (
                      <div key={skill} className="text-base md:text-lg uppercase tracking-widest mono-font text-slate-700 dark:text-slate-300 hover:text-primary transition-colors cursor-default border-b-2 border-transparent hover:border-primary">
                        {skill}_
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid (Projects) */}
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

      {/* Journey Section */}
      <section id="journey" className="py-40 px-8 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg md:text-xl uppercase tracking-[0.4em] text-primary mb-24 mono-font font-bold text-center">Milestones & Journey</h2>
          
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-slate-200 dark:bg-zinc-800 transform -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-16">
              {journeyEvents.map((event, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-start ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 bg-primary rounded-full transform -translate-x-1/2 mt-1 z-10 hidden md:block shadow-[0_0_15px_rgba(0,212,255,0.5)]"></div>
                  
                  <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} pl-8 md:pl-0`}>
                    <div className="flex items-center gap-4 mb-2">
                       <span className="text-primary font-bold mono-font text-xl">{event.year}</span>
                       <div className="h-[1px] flex-grow bg-primary/20 md:hidden"></div>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mono-font mb-4 tracking-tight">{event.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed text-lg mb-4">
                      {event.description}
                    </p>
                    {event.achievement && (
                      <div className="inline-block px-4 py-2 bg-primary/5 border border-primary/20 text-primary text-xs uppercase tracking-widest mono-font font-bold">
                        {event.achievement}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-40 px-8 border-t border-slate-200 dark:border-zinc-800">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-primary mb-12 mono-font font-bold">Philosophy</h2>
          <p className="text-2xl md:text-4xl font-light leading-relaxed italic border-l-4 border-primary pl-8 text-slate-700 dark:text-slate-300 mono-font tracking-tight">
            "I believe that VLSI design should be both innovative and inspiring. Every transistor, every logic gate, and every routing decision is an opportunity to create something remarkable."
          </p>
        </div>
      </section>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-8 animate-in fade-in zoom-in duration-300">
          <div className="absolute inset-0 bg-background-light/80 dark:bg-background-dark/90 backdrop-blur-xl" onClick={() => setShowResume(false)}></div>
          <div className="relative w-full max-w-5xl h-[90vh] bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest mono-font font-bold opacity-60">resume_viewer.exe</span>
              <div className="flex gap-4 items-center">
                <a 
                  href={resumePath} 
                  download 
                  className="flex items-center gap-2 text-[10px] uppercase tracking-widest mono-font hover:text-primary transition-colors"
                >
                  <span className="material-icons-outlined text-sm">download</span>
                  Download PDF
                </a>
                <button 
                  onClick={() => setShowResume(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <span className="material-icons-outlined">close</span>
                </button>
              </div>
            </div>
            <div className="flex-grow bg-slate-50 dark:bg-zinc-950">
              <iframe 
                src={`${resumePath}#toolbar=0&navpanes=0&scrollbar=0`} 
                className="w-full h-full border-none"
                title="Kaustubh Pandey Resume"
              />
            </div>
          </div>
        </div>
      )}

      {/* Project Modal Detail View */}
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
                    <span className="text-primary mt-1.5 shrink-0"><svg width="6" height="6" viewBox="0 0 6 6" fill="none"><circle cx="3" cy="3" r="3" fill="currentColor"/></svg></span>
                    {detail}
                  </p>
                ))}
              </div>
              {selectedProject.links && (
                <div className="mt-12 flex flex-wrap gap-4">
                  {selectedProject.links.map((link, idx) => (
                    <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 dark:border-zinc-700 hover:border-primary text-[10px] uppercase tracking-widest mono-font transition-colors">
                      {link.label} <span className="material-icons-outlined text-sm">open_in_new</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer / Contact */}
      <footer id="contact" className="relative z-10 border-t border-slate-200 dark:border-zinc-800 py-32 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-8 md:gap-10 text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 mono-font items-center font-bold">
              <a className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8" href="mailto:kaustubhofficial.kp@gmail.com">Email</a>
              <a className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8" href="https://www.linkedin.com/in/kaustubh-pandey-b42082218/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8" href="https://github.com/KPkaustubhKP" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8" href="https://instagram.com/kp._.kaustubh" target="_blank" rel="noopener noreferrer">Instagram</a>
              <button onClick={() => setShowResume(true)} className="hover:text-primary transition-colors font-bold text-primary underline decoration-primary/30 underline-offset-8">VIEW RESUME</button>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <p className="text-[10px] uppercase tracking-[0.4em] mb-3 mono-font opacity-60">Kaustubh Pandey © 2025</p>
            <p className="text-[10px] text-slate-500 mono-font">Engineered with silicon precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
