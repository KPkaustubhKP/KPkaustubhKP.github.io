import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { about, skills, achievements } from "../data/data";

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
  animation: slideIn 0.6s ease-out;

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
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
  margin: 0;
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

const AchievementYear = styled.span`
  font-size: 12px;
  color: #869395;
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
    <Container>
      {/* Personal Info */}
      <Section>
        <SectionTitle>About Me</SectionTitle>
        <BioText>{about.bio}</BioText>
        
        <InfoGrid>
          <InfoBox>
            <InfoLabel>Institution</InfoLabel>
            <InfoValue>{about.institution}</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Degree</InfoLabel>
            <InfoValue>B.E. ECE</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Specialization</InfoLabel>
            <InfoValue>{about.specialization}</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Location</InfoLabel>
            <InfoValue>Niti Haryana, India</InfoValue>
          </InfoBox>
        </InfoGrid>
      </Section>

      {/* Skills */}
      <Section>
        <SectionTitle>Technical Skills</SectionTitle>

        {Object.values(skills).map((skillGroup, idx) => (
          <SkillCategory key={idx}>
            <CategoryName>{skillGroup.category}</CategoryName>
            <SkillsList>
              {skillGroup.items.map((item) => (
                <SkillTag key={item}>{item}</SkillTag>
              ))}
            </SkillsList>
            {skillGroup.tools && (
              <div style={{ marginTop: "0.5rem", fontSize: "12px", color: "#869395" }}>
                Tools: {skillGroup.tools.join(" • ")}
              </div>
            )}
          </SkillCategory>
        ))}
      </Section>

      {/* Achievements */}
      <Section>
        <SectionTitle>Key Achievements</SectionTitle>
        {achievements.map((achievement, idx) => (
          <AchievementItem key={idx}>
            <AchievementTitle>{achievement.title}</AchievementTitle>
            <AchievementDesc>{achievement.description}</AchievementDesc>
            <AchievementYear>{achievement.year}</AchievementYear>
          </AchievementItem>
        ))}
      </Section>
    </Container>
  );
};

export default About;
