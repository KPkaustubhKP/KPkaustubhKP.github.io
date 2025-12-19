import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: auto;
  color: #c3c3c3;
  position: absolute;
  bottom: 0;
  right: 0;
  font-family: "Inconsolata", monospace;
  z-index: 99;
  overflow: hidden;
  max-height: 80vh;
  overflow-y: auto;
  padding-right: 15px;
  margin: 1.6rem;

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

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  color: #32b8c6;
  margin-bottom: 1rem;
  border-bottom: 2px solid rgba(50, 184, 198, 0.3);
  padding-bottom: 0.5rem;
`;

const BioText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #c3c3c3;
  max-width: 600px;
  margin: 0 0 1rem 0;
`;

const SkillCategory = styled.div`
  margin-bottom: 1.5rem;
`;

const CategoryName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #869395;
  margin: 0.5rem 0;
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 0.8rem;
`;

const SkillTag = styled.span`
  background-color: rgba(50, 184, 198, 0.1);
  color: #32b8c6;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  border: 1px solid rgba(50, 184, 198, 0.2);
`;

const AchievementItem = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: rgba(50, 184, 198, 0.05);
  border-left: 3px solid #32b8c6;
  border-radius: 4px;
`;

const AchievementTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #32b8c6;
  margin: 0 0 0.5rem 0;
`;

const AchievementDesc = styled.p`
  font-size: 14px;
  color: #c3c3c3;
  margin: 0.5rem 0 0 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
`;

const InfoBox = styled.div`
  background-color: rgba(50, 184, 198, 0.08);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(50, 184, 198, 0.15);
`;

const InfoLabel = styled.p`
  font-size: 12px;
  color: #869395;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
`;

const InfoValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #32b8c6;
  margin: 0.5rem 0 0 0;
`;

const About = () => {
  return (
    <Container
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Personal Info */}
      <Section>
        <SectionTitle>About Me</SectionTitle>
        <BioText>
          Passionate about VLSI design, semiconductor technology, and AI hardware
          acceleration. Specialized in digital circuit design, PCB development, and
          autonomous systems with experience spanning RTL-to-GDS ASIC design flows,
          FPGA prototyping, and production-ready hardware implementation.
        </BioText>
        <BioText>
          Currently pursuing Bachelor's in Electronics and Communication Engineering
          with specialization in VLSI Design and Technology at Manipal Institute of
          Technology.
        </BioText>

        <InfoGrid>
          <InfoBox>
            <InfoLabel>Institution</InfoLabel>
            <InfoValue>Manipal Institute of Technology</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Degree</InfoLabel>
            <InfoValue>B.E. ECE</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Specialization</InfoLabel>
            <InfoValue>VLSI Design & Technology</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>Karnataka, India</InfoValue>
          </InfoBox>
        </InfoGrid>
      </Section>

      {/* Skills */}
      <Section>
        <SectionTitle>Technical Skills</SectionTitle>

        <SkillCategory>
          <CategoryName>VLSI & Hardware Design</CategoryName>
          <SkillsList>
            <SkillTag>Verilog</SkillTag>
            <SkillTag>SystemVerilog</SkillTag>
            <SkillTag>RTL Design</SkillTag>
            <SkillTag>ASIC Design Flow</SkillTag>
            <SkillTag>FPGA Prototyping</SkillTag>
          </SkillsList>
        </SkillCategory>

        <SkillCategory>
          <CategoryName>EDA Tools (Professional)</CategoryName>
          <SkillsList>
            <SkillTag>Cadence Innovus</SkillTag>
            <SkillTag>Cadence Genus</SkillTag>
            <SkillTag>Vivado</SkillTag>
            <SkillTag>KiCad</SkillTag>
            <SkillTag>ModelSim</SkillTag>
            <SkillTag>LTspice</SkillTag>
            <SkillTag>Sentaurus</SkillTag>
          </SkillsList>
        </SkillCategory>

        <SkillCategory>
          <CategoryName>PCB Design & Hardware</CategoryName>
          <SkillsList>
            <SkillTag>High-Speed Routing</SkillTag>
            <SkillTag>Impedance Control</SkillTag>
            <SkillTag>Signal Integrity</SkillTag>
            <SkillTag>Thermal Management</SkillTag>
            <SkillTag>Power Distribution</SkillTag>
          </SkillsList>
        </SkillCategory>

        <SkillCategory>
          <CategoryName>Programming Languages</CategoryName>
          <SkillsList>
            <SkillTag>C++</SkillTag>
            <SkillTag>Python</SkillTag>
            <SkillTag>MATLAB</SkillTag>
            <SkillTag>Tcl</SkillTag>
          </SkillsList>
        </SkillCategory>

        <SkillCategory>
          <CategoryName>Autonomous Systems & Robotics</CategoryName>
          <SkillsList>
            <SkillTag>Sensor Integration</SkillTag>
            <SkillTag>Motor Control</SkillTag>
            <SkillTag>CAN-bus Protocol</SkillTag>
            <SkillTag>PID Control</SkillTag>
          </SkillsList>
        </SkillCategory>
      </Section>

      {/* Achievements */}
      <Section>
        <SectionTitle>Key Achievements</SectionTitle>

        <AchievementItem>
          <AchievementTitle>3rd Place IGVC</AchievementTitle>
          <AchievementDesc>
            International Ground Vehicle Competition with fully autonomous UGV
            platform from MIT. Major recognition demonstrating project leadership
            and technical excellence in autonomous systems.
          </AchievementDesc>
        </AchievementItem>

        <AchievementItem>
          <AchievementTitle>Thejas32 PCB Success</AchievementTitle>
          <AchievementDesc>
            Successfully designed production-ready evaluation board for Thejas32
            processor with advanced high-speed routing, demonstrating technical
            excellence in real-world VLSI application.
          </AchievementDesc>
        </AchievementItem>

        <AchievementItem>
          <AchievementTitle>VLSI Specialization Admission</AchievementTitle>
          <AchievementDesc>
            Admitted to prestigious VLSI Design & Technology specialization at
            Manipal Institute of Technology, recognizing academic excellence and
            focused expertise in semiconductor design.
          </AchievementDesc>
        </AchievementItem>

        <AchievementItem>
          <AchievementTitle>Project MANAS Contributor</AchievementTitle>
          <AchievementDesc>
            Chosen as hardware contributor for MIT's premier autonomous vehicle
            project, demonstrating leadership role in critical hardware development
            for competition-grade autonomous systems.
          </AchievementDesc>
        </AchievementItem>
      </Section>
    </Container>
  );
};

export default About;

