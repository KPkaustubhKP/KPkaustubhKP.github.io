import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/data";

const Container = styled(motion.div)`
  height: 100%;
  width: 100%;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  overflow-y: auto;
  padding: 3rem 6rem 3rem 2rem;
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
  border-left: 2px solid #333333;
  padding: 1rem 0 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-left-color: #ffffff;
    transform: translateX(5px);
  }
`;

const CardTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: #ffffff;
  margin: 0;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 0.7;
  }
`;

const CardRole = styled.p`
  font-size: 14px;
  color: #999999;
  margin: 0.6rem 0 0 0;
  font-weight: 300;
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
  max-width: 950px;
  margin: 0 auto;
  padding: 4rem 3rem;
  min-height: 100vh;
`;

const HeaderSection = styled.div`
  border-bottom: 2px solid #333333;
  padding-bottom: 2rem;
  margin-bottom: 3rem;
`;

const BackLink = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 14px;
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
`;

const ProjectTitle = styled.h1`
  font-size: 48px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 1rem 0;
  line-height: 1.2;
`;

const ProjectRole = styled.p`
  font-size: 16px;
  color: #999999;
  margin: 0;
  font-weight: 300;
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
  font-size: 14px;
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
`;

const ProjectDescription = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: #cccccc;
  margin: 0;
  font-weight: 300;
`;

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const AchievementItem = styled.div`
  background-color: transparent;
  border-left: 2px solid #333333;
  padding: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    border-left-color: #ffffff;
    transform: translateX(5px);
  }
`;

const AchievementText = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: #cccccc;
  margin: 0;
  font-weight: 300;
`;

const TechSection = styled.div`
  position: sticky;
  top: 2rem;
`;

const TechTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #999999;
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const TechStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const TechTag = styled.div`
  background-color: transparent;
  color: #ffffff;
  padding: 0.8rem 1rem;
  font-size: 14px;
  border: 1px solid #333333;
  transition: all 0.3s ease;
  text-align: center;
  font-weight: 300;

  &:hover {
    background-color: #ffffff;
    color: #000000;
    border-color: #ffffff;
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

      <AnimatePresence>
        {expandedProject && (
          <ExpandedView
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedProject(null)}
          >
            <ExpandedContent
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
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
                    <ProjectDescription>
                      {expandedProject.description}
                    </ProjectDescription>
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

