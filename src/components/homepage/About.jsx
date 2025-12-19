import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;
  color: #c3c3c3;
  font-family: "Inconsolata", monospace;
  overflow-y: auto;
  padding: 2rem 4rem 2rem 2rem;
  position: relative;
  display: flex;
  align-items: flex-end;
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

const ContentWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 2rem;
`;

const ProfileSection = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(50, 184, 198, 0.3);
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid #32b8c6;
  object-fit: cover;
  box-shadow: 0 0 30px rgba(50, 184, 198, 0.3);
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Name = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.5rem 0;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #32b8c6;
  margin: 0 0 1rem 0;
`;

const Location = styled.p`
  font-size: 16px;
  color: #869395;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "📍";
  }
`;

const AboutSection = styled(motion.div)`
  padding: 1rem 0;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 900;
  color: #32b8c6;
  margin: 0 0 1rem 0;
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

const AboutText = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #c3c3c3;
  margin: 0 0 1rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1.5rem;
`;

const InfoCard = styled.div`
  background-color: rgba(50, 184, 198, 0.05);
  border-left: 3px solid #32b8c6;
  padding: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(50, 184, 198, 0.1);
    transform: translateX(5px);
  }
`;

const InfoLabel = styled.p`
  font-size: 12px;
  color: #869395;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 0.5rem 0;
`;

const InfoValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  margin: 0;
`;

const HighlightsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
`;

const HighlightItem = styled.div`
  font-size: 15px;
  color: #c3c3c3;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: "▸";
    position: absolute;
    left: 0;
    color: #32b8c6;
    font-weight: 900;
  }
`;

const About = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: 100, transition: { duration: 0.5 } }}
    >
      <ContentWrapper>
        <ProfileSection variants={itemVariants}>
          <ProfileImageWrapper>
            <ProfileImage 
              src="/path-to-your-image.jpg" 
              alt="Profile"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150/32b8c6/ffffff?text=You";
              }}
            />
          </ProfileImageWrapper>
          <ProfileInfo>
            <Name>Your Name</Name>
            <Title>VLSI Design Engineer</Title>
            <Location>Narnaund, Haryana, India</Location>
          </ProfileInfo>
        </ProfileSection>

        <AboutSection variants={itemVariants}>
          <SectionTitle>About Me</SectionTitle>
          <AboutText>
            A passionate VLSI design engineer specializing in digital circuit design, 
            RTL development, and semiconductor device simulation. Currently pursuing 
            advanced studies in VLSI design with hands-on experience in complete 
            hardware development flows from RTL to layout.
          </AboutText>
          <AboutText>
            Experienced in working with professional EDA tools, TCAD simulation, 
            and microcontroller programming. Dedicated to creating efficient, 
            optimized hardware solutions for complex digital systems.
          </AboutText>
        </AboutSection>

        <AboutSection variants={itemVariants}>
          <SectionTitle>Education & Background</SectionTitle>
          <InfoGrid>
            <InfoCard>
              <InfoLabel>Institution</InfoLabel>
              <InfoValue>Manipal Institute of Technology</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoLabel>Degree</InfoLabel>
              <InfoValue>B.E. ECE</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoLabel>Specialization</InfoLabel>
              <InfoValue>VLSI Design</InfoValue>
            </InfoCard>
            <InfoCard>
              <InfoLabel>Focus Areas</InfoLabel>
              <InfoValue>Digital Design & Verification</InfoValue>
            </InfoCard>
          </InfoGrid>
        </AboutSection>

        <AboutSection variants={itemVariants}>
          <SectionTitle>What I Do</SectionTitle>
          <HighlightsList>
            <HighlightItem>RTL design and synthesis using Verilog & SystemVerilog</HighlightItem>
            <HighlightItem>Physical design and place-and-route for ASICs</HighlightItem>
            <HighlightItem>TCAD semiconductor device simulation and modeling</HighlightItem>
            <HighlightItem>PCB design for high-speed and power electronics</HighlightItem>
            <HighlightItem>Embedded systems and microcontroller programming</HighlightItem>
            <HighlightItem>Hardware verification and timing analysis</HighlightItem>
          </HighlightsList>
        </AboutSection>
      </ContentWrapper>
    </Container>
  );
};

export default About;

