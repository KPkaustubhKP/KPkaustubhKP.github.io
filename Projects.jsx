import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { projects } from "../components/data/data";

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

  /* Webkit browsers scrollbar */
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

  /* Firefox scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #869395 transparent;
`;

const StyledProject = styled.div`
  color: #c3c3c3;
  margin: 1.6rem;

  p {
    margin: 0;
    padding: 0;
  }
`;

const ProjectYear = styled.span`
  font-size: 36px;
  font-weight: 900;
  color: #869395;
`;

const ProjectName = styled.a`
  font-size: 28px;
  text-decoration: none;
  color: white;
  transition: all 0.3s ease;
  display: inline-block;
  margin: 8px 0;

  &:hover {
    color: #32b8c6;
    transform: translateX(5px);
  }
`;

const ProjectDescription = styled.p`
  font-size: 18px;
  font-weight: 100;
  color: #c3c3c3;
  margin-top: 4px;
`;

const ProjectDetails = styled.p`
  font-size: 24px;
  color: white;
  margin-top: 8px;
`;

const TechnologiesContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TechTag = styled.span`
  font-size: 12px;
  background-color: rgba(50, 184, 198, 0.15);
  color: #32b8c6;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(50, 184, 198, 0.3);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(195, 195, 195, 0.2);
  margin: 1.6rem 0;
`;

const AchievementsList = styled.ul`
  list-style: none;
  margin: 10px 0;
  padding-left: 0;

  li {
    font-size: 14px;
    color: #869395;
    margin: 4px 0;

    &:before {
      content: "✓ ";
      color: #32b8c6;
      font-weight: bold;
      margin-right: 6px;
    }
  }
`;

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Projects = () => {
  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <StyledProject>
        <p style={{ fontSize: "16px", color: "#869395", marginBottom: "20px" }}>
          // Featured Projects & Portfolio
        </p>
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={itemVariants}
            style={{ marginBottom: "20px" }}
          >
            <ProjectYear>{project.year}</ProjectYear>
            <ProjectName href={project.url} target="_blank" rel="noopener noreferrer">
              {project.name}
            </ProjectName>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectDetails>{project.details}</ProjectDetails>

            <div style={{ fontSize: "14px", color: "#869395", marginTop: "8px" }}>
              Role: <span style={{ color: "#c3c3c3" }}>{project.role}</span>
            </div>

            <TechnologiesContainer>
              {project.technologies.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </TechnologiesContainer>

            {project.achievements && project.achievements.length > 0 && (
              <AchievementsList>
                {project.achievements.map((achievement, idx) => (
                  <li key={idx}>{achievement}</li>
                ))}
              </AchievementsList>
            )}

            {index !== projects.length - 1 && <Divider />}
          </motion.div>
        ))}
      </StyledProject>
    </Container>
  );
};

export default Projects;
