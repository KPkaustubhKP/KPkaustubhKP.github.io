import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";

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

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  max-width: 700px;
  width: 100%;

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 1.5rem;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: transparent;
  border: none;
  border-left: 2px solid #333333;
  padding: 1rem 0 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  max-width: 100%;
  overflow: hidden;

  &:hover {
    border-left-color: #ffffff;
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 0 0.8rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem 0 0.7rem 0.8rem;
  }
`;

const CardTitle = styled.h3`
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  transition: all 0.3s ease;
  word-wrap: break-word;
  overflow-wrap: break-word;

  ${ProjectCard}:hover & {
    opacity: 0.7;
  }

  @media (max-width: 480px) {
    font-size: clamp(16px, 4vw, 18px);
  }
`;

const CardRole = styled.p`
  font-size: clamp(12px, 1.5vw, 14px);
  color: #999999;
  margin: 0.6rem 0 0 0;
  font-weight: 300;
  word-wrap: break-word;
`;

const ExpandedView = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000000;
  z-index: 200;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 4px;
  }
`;

const ExpandedContent = styled(motion.div)`
  max-width: min(950px, calc(100% - 3rem));
  margin: 0 auto;
  padding: clamp(2rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem);
  min-height: 100vh;
  overflow-x: hidden;

  @media (max-width: 768px) {
    max-width: calc(100% - 2rem);
    padding: 2rem 1.5rem;
  }

  @media (max-width: 480px) {
    max-width: calc(100% - 1.5rem);
    padding: 1.5rem 1rem;
  }
`;

const HeaderSection = styled.div`
  border-bottom: 2px solid #333333;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  max-width: 100%;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    padding-bottom: 1.5rem;
    margin-bottom: 2rem;
  }
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 400;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 2rem;
  padding: 0;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.6;
    transform: translateX(-5px);
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const ProjectTitle = styled.h1`
  font-size: clamp(28px, 5vw, 48px);
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;

  @media (max-width: 480px) {
    font-size: clamp(24px, 6vw, 28px);
  }
`;

const ProjectRole = styled.p`
  font-size: clamp(14px, 1.8vw, 16px);
  color: #999999;
  margin: 0;
  font-weight: 300;
  word-wrap: break-word;
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: clamp(2rem, 4vw, 4rem);
  margin-bottom: 3rem;
  max-width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const MainColumn = styled.div`
  min-width: 0;
  max-width: 100%;
  overflow-wrap: break-word;
`;

const SideColumn = styled.div`
  min-width: 0;
  max-width: 100%;

  @media (max-width: 768px) {
    order: -1;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
  max-width: 100%;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 500;
  color: #999999;
  margin: 0 0 1.5rem 0;
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
    margin: 0 0 1rem 0;
    padding-left: 1rem;
  }
`;

const ProjectDescription = styled.p`
  font-size: clamp(14px, 1.7vw, 16px);
  line-height: 1.8;
  color: #cccccc;
  margin: 0;
  font-weight: 300;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    line-height: 1.6;
  }
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 100%;

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const AchievementItem = styled.div`
  background-color: transparent;
  border-left: 2px solid #333333;
  padding: 1.5rem;
  transition: all 0.3s ease;
  max-width: 100%;
  overflow-wrap: break-word;

  &:hover {
    border-left-color: #ffffff;
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 480px) {
    padding: 0.8rem;
  }
`;

const AchievementText = styled.p`
  font-size: clamp(13px, 1.6vw, 15px);
  line-height: 1.6;
  color: #cccccc;
  margin: 0;
  font-weight: 300;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const TechSection = styled.div`
  position: sticky;
  top: 2rem;
  max-width: 100%;

  @media (max-width: 768px) {
    position: relative;
    top: 0;
  }
`;

const TechTitle = styled.h3`
  font-size: clamp(12px, 1.5vw, 14px);
  font-weight: 500;
  color: #999999;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    margin: 0 0 1rem 0;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  max-width: 100%;

  @media (max-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
`;

const TechTag = styled.div`
  background-color: transparent;
  color: #ffffff;
  padding: 0.8rem 1rem;
  font-size: clamp(12px, 1.5vw, 14px);
  border: 1px solid #333333;
  transition: all 0.3s ease;
  text-align: center;
  font-weight: 300;
  word-wrap: break-word;
  overflow-wrap: break-word;

  &:hover {
    background-color: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    flex: 0 0 auto;
  }
`;

const Projects = () => {
  const [expandedProject, setExpandedProject] = useState(null);

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
      >
        <ProjectsList>
          {projects.map((project) => (
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

      {expandedProject && (
        <AnimatePresence>
          <ExpandedView
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedProject(null)}
          >
            <ExpandedContent
              onClick={(e) => e.stopPropagation()}
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
        </AnimatePresence>
      )}
    </>
  );
};

export default Projects;
