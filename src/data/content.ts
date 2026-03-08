// ================================================================
//  KAUSTUBH PANDEY — PORTFOLIO CONTENT
//  Edit ONLY this file for all content changes.
// ================================================================

export const OWNER = {
  name: 'Kaustubh Pandey',
  initials: 'KP.',
  role: 'Hardware & VLSI Engineer',
  tagline: 'Building at the intersection of physics and logic — from transistors to autonomous systems.',
  shortBio: `Electronics & Communication student at MIT Manipal specializing in VLSI Design. I work across the full hardware stack — analog IC design in Cadence, digital RTL on FPGA, multi-layer PCBs in KiCad, and TCAD device simulation.`,
  longBio: `What started as curiosity about how chips work turned into a deep dive across the entire hardware design spectrum. Whether it's routing a differential pair, synthesizing RTL, or publishing research — I find the craft of making things exist in the physical world genuinely compelling.`,
  education: 'B.Tech ECE (VLSI) · Manipal Institute of Technology · CGPA 7.54',
  email: 'kaustubhofficial.kp@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kaustubh-pandey-b42082218/',
  github: 'https://github.com/KPkaustubhKP',
  instagram: 'https://instagram.com/kp._.kaustubh',
  website: 'https://kpkaustubhkp.github.io',
};

export const NEOFETCH = [
  { key: 'OS',     value: 'Fedora Linux (Zen Mode)' },
  { key: 'HOST',   value: 'KP_WORKSTATION' },
  { key: 'UPTIME', value: '22 Years' },
  { key: 'SHELL',  value: 'ZSH + Neovim (LazyVim)' },
  { key: 'STATUS', value: 'Designing LDO Regulators...' },
  { key: 'BINGE',  value: 'One Piece (Egghead Arc)' },
  { key: 'EDU',    value: 'MIT Manipal · ECE VLSI' },
];

export type Project = {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  fullDetails: string[];
  links: { label: string; url: string }[];
  span: number;
  aspect: string;
  status: 'ONGOING' | 'PUBLISHED' | 'BUILT' | 'RESEARCH' | 'AWARD WINNING';
};

export const PROJECTS: Project[] = [
  {
    id: 1,
    category: 'Analog IC Design',
    title: 'LDO Regulator',
    subtitle: '180nm CMOS · Cadence Virtuoso',
    description: 'High-performance Low-Dropout regulator in 180nm CMOS. Focused on stability, transient response, and transistor-level precision.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
    tags: ['Cadence Virtuoso', '180nm CMOS', 'Analog IC', 'LDO'],
    fullDetails: [
      'Designing a high-performance LDO in Cadence Virtuoso using 180nm CMOS technology.',
      'Implementing error amplifier topologies and pass transistor sizing for optimal dropout voltage.',
      'Analyzing frequency compensation and loop stability across variable load conditions.',
      'Target: sub-100mV dropout, > 60° phase margin, fast transient load response.',
    ],
    links: [],
    span: 8,
    aspect: 'aspect-video',
    status: 'ONGOING',
  },
  {
    id: 2,
    category: 'FPGA · RTL Design',
    title: 'PID Motor Controller',
    subtitle: 'Verilog · Vivado · IEEE Published',
    description: 'Digital PID controller for DC motor speed regulation on FPGA. Pipelined architecture with encoder feedback. Published in IEEE Xplore.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    tags: ['Verilog', 'Vivado', 'Icarus Verilog', 'GTKWave', 'FPGA'],
    fullDetails: [
      'Verilog HDL digital PID controller for DC motor speed regulation with encoder feedback.',
      'Synthesized on FPGA using Vivado with pipelined architecture for deterministic loop timing.',
      'Full simulation via Icarus Verilog; waveforms validated with GTKWave.',
      'Closed-loop stability achieved with tuned gains; validated against real motor dynamics.',
      'Published in IEEE Xplore: DOI 11232594.',
    ],
    links: [{ label: 'IEEE Paper', url: 'https://ieeexplore.ieee.org/document/11232594' }],
    span: 4,
    aspect: 'aspect-square',
    status: 'PUBLISHED',
  },
  {
    id: 3,
    category: 'FPGA · Autonomous Navigation',
    title: 'Lane & Obstacle Detection',
    subtitle: 'Hardware Acceleration for UGV',
    description: 'FPGA offloading real-time lane detection and obstacle avoidance for Project MANAS autonomous ground vehicle.',
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800',
    tags: ['Verilog', 'Vivado', 'RTL Design', 'Computer Vision'],
    fullDetails: [
      'Early-stage FPGA implementation for autonomous navigation in Project MANAS.',
      'Designed Data Path and Control Path architectures for real-time lane and obstacle detection.',
      'Offloads CPU by handling high-bandwidth sensor data directly on FPGA fabric.',
    ],
    links: [],
    span: 5,
    aspect: 'aspect-square',
    status: 'ONGOING',
  },
  {
    id: 4,
    category: 'Autonomous UGV · PCB',
    title: 'Project MANAS Hardware',
    subtitle: 'Power Systems · Interfaces · CAN-bus',
    description: "Hardware engineering for MIT Manipal's AI robotics team — power distribution, motor interfaces, CAN-bus comms for the UGV.",
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1600',
    tags: ['KiCad', 'Power Electronics', 'CAN-bus', 'PCB Design', 'UGV'],
    fullDetails: [
      'Designed multi-rail power distribution boards with high-current switching and precision current sensing.',
      'Developed motor driver and microcontroller interface boards in KiCad.',
      'Integrated CAN-bus transceivers (MCP2542FD) for deterministic inter-subsystem communication.',
      '3rd place AutoNav Challenge (IGVC 2025), PIMA Winner (ISDC 2025).',
    ],
    links: [{ label: 'Team Website', url: 'https://projectmanas.in/' }],
    span: 7,
    aspect: 'aspect-video',
    status: 'AWARD WINNING',
  },
  {
    id: 5,
    category: 'PCB Design · RISC-V',
    title: 'VSD Squadron Ultra',
    subtitle: 'Thejas32 Evaluation Board',
    description: 'Evaluation board for Thejas32 RISC-V (CDAC). KiCad layout, high-speed routing, impedance control, and Gerber coordination.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600&h=600',
    tags: ['KiCad', 'PCB Layout', 'RISC-V', 'Thejas32 Vega', 'High-Speed'],
    fullDetails: [
      'Designed eval board for Thejas32 Vega RISC-V (CDAC) — schematic to layout in KiCad.',
      'Created FPGA shield board with interface components, ensuring signal integrity.',
      'Applied high-speed routing and impedance control on all critical paths.',
      'Generated Gerber files and coordinated prototype fabrication.',
    ],
    links: [{ label: 'GitHub', url: 'https://github.com/VSDSquadron' }],
    span: 12,
    aspect: 'aspect-video',
    status: 'BUILT',
  },
  {
    id: 6,
    category: 'TCAD · Device Physics',
    title: '4H-SiC Trench U-MOSFET',
    subtitle: '556V Breakdown · BPT Technique',
    description: 'Co-authored research on 4H-SiC trench U-MOSFET achieving 556V breakdown via Breakdown Point Transfer. 2D Synopsys Sentaurus.',
    image: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?auto=format&fit=crop&q=80&w=800',
    tags: ['Synopsys Sentaurus', 'TCAD', 'Device Physics', '4H-SiC', 'Power Devices'],
    fullDetails: [
      'Co-authored research on 4H-SiC trench U-MOSFET achieving 556V breakdown using BPT.',
      'Performed 2D TCAD device simulations in Synopsys Sentaurus.',
      'Optimized drift region doping and electric field profiles for high-voltage SiC performance.',
    ],
    links: [],
    span: 12,
    aspect: 'aspect-video',
    status: 'RESEARCH',
  },
];

export type SkillItem = { name: string; def: string };
export type SkillGroup = { group: string; items: SkillItem[] };

export const SKILLS: SkillGroup[] = [
  {
    group: 'Languages',
    items: [
      { name: 'SystemVerilog', def: 'Advanced HDL for SoC design and UVM-based verification.' },
      { name: 'Verilog',       def: 'Standard RTL modeling for FPGA synthesis and simulation.' },
      { name: 'C / C++',       def: 'Embedded system programming and firmware.' },
      { name: 'Python',        def: 'Scripting and automation for hardware workflows.' },
      { name: 'Bash',          def: 'Shell scripting for EDA tool automation.' },
      { name: 'LaTeX',         def: 'Typesetting for IEEE-quality technical papers.' },
    ],
  },
  {
    group: 'Tools',
    items: [
      { name: 'KiCad',               def: 'Schematic capture and multi-layer PCB layout.' },
      { name: 'Vivado',              def: 'Xilinx synthesis, implementation, and timing analysis.' },
      { name: 'Cadence Virtuoso',    def: 'Custom analog and mixed-signal IC design.' },
      { name: 'Synopsys Sentaurus',  def: 'TCAD semiconductor device modeling and simulation.' },
      { name: 'Icarus Verilog',      def: 'Open-source Verilog simulation.' },
      { name: 'GTKWave',             def: 'Waveform viewer for digital timing analysis.' },
      { name: 'LTSpice',             def: 'SPICE simulation for analog circuit analysis.' },
    ],
  },
  {
    group: 'Technologies',
    items: [
      { name: 'RTL Design',        def: 'Register-Transfer Level logic for FPGA and ASIC.' },
      { name: 'Analog Design',     def: 'Transistor-level design of amplifiers, regulators, and mixed-signal circuits.' },
      { name: 'PCB Layout',        def: 'Multi-layer boards with signal integrity and power delivery focus.' },
      { name: 'TCAD Simulation',   def: 'Device-level physics simulation for semiconductor R&D.' },
      { name: 'Physical Design',   def: 'RTL-to-GDS: floorplanning, placement, CTS, routing.' },
      { name: 'Power Electronics', def: 'High-current PDB design, protection, and thermal management.' },
    ],
  },
];

export type TimelineEvent = {
  year: string;
  title: string;
  org: string;
  description: string;
  badge: string | null;
  link?: { label: string; url: string };
};

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2023',
    title: 'B.Tech at MIT Manipal',
    org: 'Manipal Institute of Technology',
    description: 'Commenced B.Tech in Electronics & Communication Engineering with VLSI specialization. Began coursework spanning VLSI Design, Semiconductor Physics, Analog Circuits, and FPGA Systems.',
    badge: 'VLSI Specialization',
    link: { label: 'MIT Manipal', url: 'https://manipal.edu/mit.html' },
  },
  {
    year: '2024',
    title: 'Hardware Engineer — Project MANAS',
    org: 'Autonomous UGV Team · MIT Manipal',
    description: 'Inducted into Project MANAS as Hardware Engineer. Designed power distribution boards, motor interface PCBs, and CAN-bus communication circuitry for the autonomous ground vehicle platform.',
    badge: 'Hardware Design',
    link: { label: 'projectmanas.in', url: 'https://projectmanas.in/' },
  },
  {
    year: '2025',
    title: "ISDC'25 PIMA Winners",
    org: 'BITS Goa · National Competition',
    description: 'Secured 1st Place in the PIMA category at the International Space Drone Challenge 2025 held at BITS Goa. Recognized for hardware innovation in autonomous aerial platforms.',
    badge: '🏆 1st Place — Worldwide',
  },
  {
    year: '2025',
    title: 'Global Podium at IGVC USA',
    org: 'Oakland University · Michigan, USA',
    description: 'Achieved 3rd Place Overall at the Intelligent Ground Vehicle Competition at Oakland University, Michigan — representing MIT Manipal on the international stage.',
    badge: '🥉 3rd Place — International',
  },
  {
    year: '2025',
    title: 'Thejas32 Hardware Ecosystem',
    org: 'VLSI System Design · Feb–Oct 2025',
    description: 'Developed the VSD Squadron Ultra — an evaluation board supporting the RISC-V Thejas32 Vega Processor by CDAC. Handled KiCad layout, high-speed routing, impedance control, and Gerber fabrication.',
    badge: 'SoC Eval Board',
    link: { label: 'GitHub', url: 'https://github.com/VSDSquadron' },
  },
  {
    year: '2025',
    title: 'IEEE Publication: PID Control',
    org: 'IEEE Xplore · May 2025',
    description: 'Authored and published research on Digital PID Motor Controllers — Verilog HDL implementation with pipelined control architecture, closed-loop stability analysis, and hardware validation.',
    badge: 'Published IEEE Researcher',
    link: { label: 'IEEE Xplore', url: 'https://ieeexplore.ieee.org/document/11232594' },
  },
  {
    year: '2026',
    title: 'Core Committee — SPROS WEEK',
    org: 'IRC & ISDC 2026 · MIT Manipal',
    description: 'Serving as Core Committee member for SPROS WEEK, organizing IRC and ISDC 2026 — international robotics and space drone competitions at MIT Manipal.',
    badge: 'Leadership',
  },
];

export const PHILOSOPHY =
  '"Engineering is the art of organizing the physical world into logical systems — one transistor at a time."';

// ── BLOG POSTS ─────────────────────────────────────────────────
// To add a new post: add an entry below.
// Set `link` to an external URL (Medium, etc.) or leave undefined for a coming-soon state.
export type BlogPost = {
  id: number;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  readTime: string;
  link?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Designing a Digital PID Controller in Verilog',
    date: 'May 2025',
    tags: ['Verilog', 'FPGA', 'Control Systems'],
    summary: 'A deep dive into implementing a pipelined PID controller in Verilog HDL for real-time DC motor speed regulation — covering fixed-point arithmetic, timing constraints, and hardware validation.',
    readTime: '8 min',
    link: 'https://ieeexplore.ieee.org/document/11232594',
  },
  {
    id: 2,
    title: 'PCB Layout Lessons from the VSD Squadron Ultra',
    date: 'Oct 2025',
    tags: ['KiCad', 'PCB Design', 'RISC-V'],
    summary: 'Practical lessons learned while laying out the evaluation board for the Thejas32 RISC-V processor — high-speed routing, impedance control, differential pairs, and coordinating with fab houses.',
    readTime: '6 min',
  },
  {
    id: 3,
    title: 'Getting Started with Cadence Virtuoso for Analog IC Design',
    date: 'Nov 2025',
    tags: ['Cadence', 'Analog IC', 'CMOS', '180nm'],
    summary: 'A beginner-oriented guide to Cadence Virtuoso — schematic entry, simulation with Spectre, understanding the 180nm PDK, and common pitfalls when designing your first LDO regulator.',
    readTime: '10 min',
  },
];

// ── TERMINAL DATA ──────────────────────────────────────────────
export const TERMINAL_DATA = {
  education: {
    institution: 'Manipal Institute of Technology',
    degree: 'B.Tech Electronics & Communication (VLSI)',
    duration: '2023 – Present',
    cgpa: '7.54 / 10 (5th Semester)',
    coursework: [
      'VLSI Design', 'Digital IC Design', 'Analog IC Design', 'Physical Design',
      'Analog Circuits', 'FPGA System Design', 'Semiconductor Physics', 'Verilog HDL',
    ],
  },
  experience: [
    {
      role: 'PCB Design Intern',
      org: 'VLSI System Design (VSD)',
      period: 'Feb 2025 – Oct 2025',
      points: [
        'Evaluation board for Thejas32 RISC-V (CDAC) in KiCad',
        'High-speed routing and impedance control',
        'FPGA shield board with interface components',
        'Gerber generation and fab coordination',
      ],
    },
    {
      role: 'Hardware Engineer',
      org: 'Project MANAS — Autonomous UGV',
      period: 'June 2024 – Present',
      points: [
        'Power distribution boards (high-current, current sensing)',
        'Motor + microcontroller interface PCBs in KiCad',
        'CAN-bus integration (MCP2542FD transceivers)',
        '3rd place IGVC 2025, PIMA Winner ISDC 2025',
      ],
    },
  ],
};
