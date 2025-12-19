export const about = {
  name: "Kaustubh Pandey",
  title: "VLSI Design Engineer",
  institution: "Manipal Institute of Technology",
  specialization: "VLSI Design & Technology",
  degree: "Bachelor's in Electronics and Communication Engineering",
  description: "Passionate about VLSI design, semiconductor technology, and AI hardware acceleration. Specialized in digital circuit design, PCB development, and autonomous systems.",
  bio: "Passionate about VLSI design, semiconductor technology, and AI hardware acceleration. Specialized in digital circuit design, PCB development, and autonomous systems. Experienced with professional EDA tools and complete VLSI design flows from RTL to physical implementation.",
  tags: [
    "VLSI Design",
    "RTL Development",
    "PCB Design",
    "FPGA",
    "Embedded Systems",
    "Hardware Verification",
    "TCAD Simulation",
    "Physical Design"
  ],
  passions: [
    "Hardware Innovation",
    "Semiconductor Technology",
    "AI Hardware Acceleration",
    "Autonomous Systems Design"
  ]
};

export const projects = [
  {
    id: 1,
    title: "Project MANAS – SNA Subsystem Hardware",
    role: "Hardware Developer | Project MANAS, MIT",
    description: "Contributed to the development of hardware for the SNA (Sensing and Automation/Actuation) subsystem in MIT's premier autonomous vehicle project, culminating in a 3rd place finish at the International Ground Vehicle Competition (IGVC).",
    achievements: [
      "3rd place finish in IGVC with fully autonomous UGV platform",
      "Hardware-focused contributions to complete autonomous system architecture",
      "Sensor integration and hardware development for real-world deployment"
    ],
    technologies: ["PCB Design", "Sensor Integration", "Autonomous Systems", "Hardware Architecture"]
  },
  {
    id: 2,
    title: "Thejas32 Processor Evaluation Board",
    role: "PCB Designer & Layout Engineer",
    description: "Designed and developed a production-ready evaluation board for the Thejas32 processor (designed by Vega Processor & CDAC), implementing advanced high-speed routing techniques and generating manufacturing-ready Gerber files.",
    achievements: [
      "Applied high-speed routing techniques for optimal performance",
      "Implemented impedance control for signal integrity",
      "Managed power distribution and thermal considerations",
      "Generated manufacturing-ready Gerber files"
    ],
    technologies: ["KiCad", "High-Speed Design", "Signal Integrity", "PCB Layout", "DFM"]
  },
  {
    id: 3,
    title: "Digital PID Controller (Verilog)",
    role: "Hardware Designer | RTL to Layout",
    description: "Designed a complete digital controller for DC motor speed regulation using encoder feedback, demonstrating full VLSI design flow from RTL design through FPGA validation to ASIC implementation.",
    achievements: [
      "RTL Design: Digital PID algorithm in Verilog with encoder feedback",
      "FPGA Synthesis: Validated on Vivado with comprehensive testbenches",
      "Physical Design: Cadence Genus synthesis + Innovus P&R for ASIC",
      "Timing Closure: Achieved manufacturable design with full verification"
    ],
    technologies: ["Verilog", "Vivado", "Cadence Genus", "Cadence Innovus", "ModelSim", "PID Control"]
  },
  {
    id: 4,
    title: "Power Distribution Boards for Autonomous UGVs",
    role: "PCB Designer | Thermal & Power Management Specialist",
    description: "Designed robust power distribution systems for autonomous vehicle platforms, focusing on high-current switching, thermal management, and reliable power delivery under varying loads.",
    achievements: [
      "High-current switching with multiple motors and power devices",
      "Thermal management: Heat dissipation analysis and placement strategy",
      "Current sensing integration for real-time power monitoring",
      "Motor interface with CAN-bus communication and driver integration"
    ],
    technologies: ["KiCad", "Thermal Analysis", "CAN-bus", "Power Electronics", "Motor Control"]
  }
];

