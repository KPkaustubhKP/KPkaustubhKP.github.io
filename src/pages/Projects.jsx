import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;
  color: #c3c3c3;
  font-family: "Inconsolata", monospace;
  overflow-y: auto;
  padding: 3rem 4rem 3rem 2rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #869395;
    border-radius: 4px;
  }
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  max-width: 700px;
  width: 100%;
`;

const ProjectCard = styled(motion.div)`
  background-color: transparent;
  border: none;
  border-left: 2px solid rgba(50, 184, 198, 0.3);
  padding: 1rem 0 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-left-color: #32b8c6;
    transform: translateX(-10px);
  }
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 900;
  color: #32b8c6;
  margin: 0;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    color: #fff;
  }
`;

const CardRole = styled.p`
  font-size: 16px;
  color: #869395;
  margin: 0.6rem 0 0 0;
`;

const ExpandedView = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: hsl(0, 0%, 5%);
  z-index: 200;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #32b8c6;
    border-radius: 4px;
  }
`;

const ExpandedContent = styled(motion.div)`
  max-width: 950px;
  margin: 0 auto;
  padding: 4rem 3rem;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  border-bottom: 2px solid rgba(50, 184, 198, 0.3);
  padding-bottom: 2rem;
  margin-bottom: 3rem;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #32b8c6;
  font-family: "Inconsolata", monospace;
  font-size: 20px;
  font-weight: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    color: #3dd4e4;
    transform: translateX(-5px);
  }
`;


const ProjectTitle = styled.h1`
  font-size: 48px;
  font-weight: 900;
  color: #fff;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const ProjectRole = styled.p`
  font-size: 18px;
  color: #32b8c6;
  margin: 0;
  font-weight: 600;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MainColumn = styled.div``;

const SideColumn = styled.div``;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  color: #32b8c6;
  margin: 0 0 1.5rem 0;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #32b8c6, transparent);
  }
`;

const ProjectDescription = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #c3c3c3;
  margin: 0;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AchievementItem = styled.div`
  background-color: rgba(50, 184, 198, 0.05);
  border-left: 3px solid #32b8c6;
  padding: 1.5rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(50, 184, 198, 0.1);
    transform: translateX(5px);
  }
`;

const AchievementText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #c3c3c3;
  margin: 0;
`;

const TechSection = styled.div`
  position: sticky;
  top: 2rem;
`;

const TechTitle = styled.h3`
  font-size: 20px;
  font-weight: 900;
  color: #32b8c6;
  margin: 0 0 1.5rem 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TechTag = styled.div`
  background-color: rgba(50, 184, 198, 0.1);
  color: #fff;
  padding: 0.8rem 1rem;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid rgba(50, 184, 198, 0.3);
  transition: all 0.3s ease;
  text-align: center;
  font-weight: 600;

  &:hover {
    background-color: rgba(50, 184, 198, 0.2);
    border-color: #32b8c6;
  }
`;

const projectsData = [
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

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Individual card animation variants
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <Container
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
      >
        <ProjectsList>
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              variants={cardVariants}
              onClick={() => setExpandedProject(project)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <CardTitle>{project.title}</CardTitle>
              <CardRole>{project.role}</CardRole>
            </ProjectCard>
          ))}
        </ProjectsList>
      </Container>

      <AnimatePresence>
        {expandedProject && (
          <ExpandedView
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <ExpandedContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <HeaderSection>
                <BackLink onClick={() => setExpandedProject(null)}>
                  ← Back to Projects
                </BackLink>
                <ProjectTitle>{expandedProject.title}</ProjectTitle>
                <ProjectRole>{expandedProject.role}</ProjectRole>
              </HeaderSection>

              <ContentGrid>
                <MainColumn>
                  <Section>
                    <SectionTitle>Overview</SectionTitle>
                    <ProjectDescription>{expandedProject.description}</ProjectDescription>
                  </Section>

                  <Section>
                    <SectionTitle>Key Achievements</SectionTitle>
                    <AchievementsList>
                      {expandedProject.achievements.map((achievement, idx) => (
                        <AchievementItem key={idx}>
                          <AchievementText>{achievement}</AchievementText>
                        </AchievementItem>
                      ))}
                    </AchievementsList>
                  </Section>
                </MainColumn>

                <SideColumn>
                  <TechSection>
                    <TechTitle>Tech Stack</TechTitle>
                    <TechStack>
                      {expandedProject.technologies.map((tech, idx) => (
                        <TechTag key={idx}>{tech}</TechTag>
                      ))}
                    </TechStack>
                  </TechSection>
                </SideColumn>
              </ContentGrid>
            </ExpandedContent>
          </ExpandedView>
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;

