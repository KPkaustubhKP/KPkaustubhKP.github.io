import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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

const ContentWrapper = styled.div`
  max-width: 700px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  align-items: flex-start;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  color: #ffffff;
  margin: 0 0 1rem 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #999999;
  margin-bottom: 2rem;
  line-height: 1.8;
  font-weight: 300;
  max-width: 600px;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
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
`;

const IconSVG = styled.svg`
  width: 48px;
  height: 48px;
  fill: currentColor;
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
`;

const MessageText = styled.p`
  font-size: 14px;
  color: #999999;
  line-height: 1.6;
  font-weight: 300;
  font-style: italic;
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
    <Container variants={containerVariants} initial="hidden" animate="visible">
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
          <SocialIcon
            href="mailto:kasutubhofficial.kp@gmail.com"
            data-label="Email"
            title="Email"
          >
            <IconSVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </IconSVG>
          </SocialIcon>

          {/* GitHub */}
          <SocialIcon
            href="https://github.com/KPkaustubhKP"
            target="_blank"
            rel="noopener noreferrer"
            data-label="GitHub"
            title="GitHub"
          >
            <IconSVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
            </IconSVG>
          </SocialIcon>

          {/* LinkedIn */}
          <SocialIcon
            href="https://www.linkedin.com/in/kaustubh-pandey-b42082218/"
            target="_blank"
            rel="noopener noreferrer"
            data-label="LinkedIn"
            title="LinkedIn"
          >
            <IconSVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </IconSVG>
          </SocialIcon>

          {/* Instagram */}
          <SocialIcon
            href="https://instagram.com/kp._.kaustubh"
            target="_blank"
            rel="noopener noreferrer"
            data-label="Instagram"
            title="Instagram"
          >
            <IconSVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
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

