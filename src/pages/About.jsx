import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;
  max-width: 100vw;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  padding: clamp(2rem, 3vw, 3rem) clamp(2rem, 6vw, 6rem) clamp(2rem, 3vw, 3rem) clamp(1.5rem, 2vw, 2rem);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 4px;
  }

  @media (max-width: 768px) {
    padding: 2rem 1.5rem 5rem 1.5rem;
    align-items: flex-start;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem 4rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 2rem;
  }
`;

const Title = styled.h2`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 1rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 480px) {
    font-size: clamp(24px, 6vw, 28px);
  }
`;

const Paragraph = styled.p`
  font-size: clamp(14px, 1.7vw, 16px);
  color: #cccccc;
  line-height: 1.8;
  margin: 0;
  font-weight: 300;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  @media (max-width: 768px) {
    line-height: 1.6;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 500;
  color: #999999;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #ffffff;
  }

  @media (max-width: 768px) {
    padding-left: 1rem;
  }
`;

const SkillsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(clamp(120px, 20vw, 200px), 1fr));
  gap: 1rem;
  max-width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 0.6rem;
  }
`;

const SkillItem = styled.div`
  background-color: transparent;
  border: 1px solid #333333;
  padding: 1rem;
  transition: all 0.3s ease;
  text-align: center;
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 300;
  word-wrap: break-word;
  overflow-wrap: break-word;
  min-width: 0;

  &:hover {
    border-color: #ffffff;
    background-color: #ffffff;
    color: #000000;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 0.5rem;
  }
`;

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ContentWrapper>
        <div>
          <Title>About Me</Title>
          <Paragraph>
            I'm a VLSI enthusiast currently studying at MIT Manipal, passionate about
            pushing the boundaries of chip design and hardware innovation. My journey
            in electronics has been driven by curiosity and a desire to understand
            how silicon transforms ideas into reality.
          </Paragraph>
        </div>

        <Section>
          <SectionTitle>What I Do</SectionTitle>
          <Paragraph>
            I specialize in VLSI design, digital electronics, and semiconductor device
            simulation. From RTL design to physical implementation, I enjoy working
            across the entire chip design flow. My projects range from custom MAC
            architectures to TCAD device modeling and verification frameworks.
          </Paragraph>
        </Section>

        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillsList>
            <SkillItem>SystemVerilog</SkillItem>
            <SkillItem>Verilog HDL</SkillItem>
            <SkillItem>C/C++</SkillItem>
            <SkillItem>Python</SkillItem>
            <SkillItem>TCAD Simulation</SkillItem>
            <SkillItem>RTL Design</SkillItem>
            <SkillItem>Digital Verification</SkillItem>
            <SkillItem>ARM Assembly</SkillItem>
          </SkillsList>
        </Section>

        <Section>
          <SectionTitle>Philosophy</SectionTitle>
          <Paragraph>
            I believe that VLSI design should be both innovative and inspiring.
            Every transistor, every logic gate, and every routing decision is an
            opportunity to create something remarkable. Through my work, I aim to
            demonstrate the artistic and creative aspects of hardware design while
            maintaining technical excellence.
          </Paragraph>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default About;
