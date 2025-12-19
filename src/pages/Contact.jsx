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
  align-items: flex-start;

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

const Subtitle = styled.p`
  font-size: clamp(14px, 1.7vw, 16px);
  color: #999999;
  margin-bottom: 2rem;
  line-height: 1.8;
  font-weight: 300;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 768px) {
    line-height: 1.6;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: clamp(1.5rem, 3vw, 3rem);
  flex-wrap: wrap;
  max-width: 100%;

  @media (max-width: 480px) {
    gap: 1.5rem;
    justify-content: center;
  }
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-8px) scale(1.15);
    opacity: 0.7;
  }

  &::after {
    content: attr(data-label);
    position: absolute;
    bottom: -35px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 11px;
    color: #999999;
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0;
    transition: opacity 0.3s ease;
    font-weight: 300;
  }

  &:hover::after {
    opacity: 1;
  }

  @media (max-width: 768px) {
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const IconSVG = styled.svg`
  width: clamp(36px, 5vw, 48px);
  height: clamp(36px, 5vw, 48px);
  fill: currentColor;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
  }
`;

const Divider = styled.div`
  width: 100%;
  max-width: 400px;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    #333333,
    transparent
  );
  margin: 1rem 0;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const MessageText = styled.p`
  font-size: clamp(12px, 1.5vw, 14px);
  color: #999999;
  line-height: 1.6;
  font-weight: 300;
  font-style: italic;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
`;

const Contact = () => {
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
          <Title>Let's Connect</Title>
          <Subtitle>
            Whether you want to collaborate on VLSI projects, discuss hardware
            design, or just say hi, feel free to reach out through any of these
            platforms.
          </Subtitle>
        </div>

        <SocialLinks>
          {/* Email */}
          <SocialIcon href="mailto:kaustubhofficial.kp@gmail.com" data-label="Email">
            <IconSVG viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </IconSVG>
          </SocialIcon>

          {/* GitHub */}
          <SocialIcon href="https://github.com/KPkaustubhKP" target="_blank" rel="noopener noreferrer" data-label="GitHub">
            <IconSVG viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </IconSVG>
          </SocialIcon>

          {/* LinkedIn */}
          <SocialIcon href="https://www.linkedin.com/in/kaustubh-pandey-b42082218/" target="_blank" rel="noopener noreferrer" data-label="LinkedIn">
            <IconSVG viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </IconSVG>
          </SocialIcon>

          {/* Instagram */}
          <SocialIcon href="https://instagram.com/kp._.kaustubh" target="_blank" rel="noopener noreferrer" data-label="Instagram">
            <IconSVG viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </IconSVG>
          </SocialIcon>
        </SocialLinks>

        <Divider />

        <MessageText>
          "Building the future of hardware, one transistor at a time."
        </MessageText>
      </ContentWrapper>
    </Container>
  );
};

export default Contact;
