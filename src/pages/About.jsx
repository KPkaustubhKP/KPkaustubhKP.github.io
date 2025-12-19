import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { about } from "../data/data";

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-y: auto;
  padding: 3rem 6rem 3rem 15rem;
  position: relative;
  display: flex;
  align-items: flex-start;
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
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding-left: 0;
`;

const Section = styled(motion.div)`
  padding-bottom: 2rem;
  border-bottom: 1px solid #333333;
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #cccccc;
  margin: 0 0 1rem 0;
  font-weight: 300;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const Institution = styled.p`
  font-size: 16px;
  color: #ffffff;
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
`;

const InstitutionDetail = styled.span`
  color: #999999;
  font-weight: 300;
  display: block;
  margin-top: 0.5rem;
  font-size: 14px;
`;

const TagsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
`;

const Tag = styled.div`
  background-color: transparent;
  color: #ffffff;
  padding: 0.6rem 1rem;
  border: 1px solid #333333;
  font-size: 14px;
  text-align: center;
  transition: all 0.3s ease;
  font-weight: 300;

  &:hover {
    border-color: #ffffff;
    background-color: #ffffff;
    color: #000000;
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
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <ContentWrapper>
        <Section variants={itemVariants}>
          <SectionTitle>About</SectionTitle>
          <Text>
            {about.description}
          </Text>
          <Text>
            Experienced in working with professional EDA tools, TCAD simulation,
            and microcontroller programming. Dedicated to creating efficient,
            optimized hardware solutions for complex digital systems.
          </Text>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>Education</SectionTitle>
          <Institution>
            {about.institution}
            <InstitutionDetail>{about.degree}</InstitutionDetail>
            <InstitutionDetail>Specialization: {about.specialization}</InstitutionDetail>
          </Institution>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>Skills & Technologies</SectionTitle>
          <TagsGrid>
            {about.tags.map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsGrid>
        </Section>

        <Section variants={itemVariants}>
          <SectionTitle>Focus Areas</SectionTitle>
          <Text>• RTL design and synthesis using Verilog & SystemVerilog</Text>
          <Text>• Physical design and place-and-route for ASICs</Text>
          <Text>• TCAD semiconductor device simulation and modeling</Text>
          <Text>• PCB design for high-speed and power electronics</Text>
          <Text>• Embedded systems and microcontroller programming</Text>
          <Text>• Hardware verification and timing analysis</Text>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

export default About;

