import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Link, Outlet, useLocation } from "react-router-dom";
import initializeParticleBackground from "../../utils/particleBackground";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;
`;

const CanvasBackground = styled.canvas`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const Container = styled.div`
  height: calc(100vh - min(50px, 5vw));
  width: calc(100vw - min(50px, 5vw));
  max-height: 100vh;
  max-width: 100vw;
  border: 1px solid #ffffff;
  background-color: transparent;
  position: fixed;
  animation: ${fadeIn} 1s ease-in-out forwards;
  z-index: 10;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  gap: 0;
  transition: gap 1s ease-in-out;

  @media (max-width: 1024px) {
    height: calc(100vh - 30px);
    width: calc(100vw - 30px);
  }

  @media (max-width: 768px) {
    height: calc(100vh - 20px);
    width: calc(100vw - 20px);
    flex-direction: column;
  }
`;

const TopLeft = styled.div`
  position: absolute;
  left: clamp(1rem, 3vw, 3rem);
  top: clamp(1rem, 3vw, 3rem);
  animation: ${fadeIn} 0.8s ease-in-out 0.5s forwards;
  opacity: 0;
  z-index: 100;
  max-width: calc(100% - 2rem);

  @media (max-width: 768px) {
    left: 1.5rem;
    top: 1.5rem;
    max-width: calc(100% - 3rem);
  }

  @media (max-width: 480px) {
    left: 1rem;
    top: 1rem;
    max-width: calc(100% - 2rem);
  }
`;

const Name = styled.h1`
  font-size: clamp(24px, 5vw, 56px);
  font-weight: 200;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
  font-family: 'Inter', sans-serif;
  word-wrap: break-word;
  overflow-wrap: break-word;

  @media (max-width: 1200px) {
    font-size: clamp(28px, 4vw, 48px);
  }

  @media (max-width: 768px) {
    font-size: clamp(24px, 6vw, 32px);
  }

  @media (max-width: 480px) {
    font-size: clamp(20px, 7vw, 28px);
  }
`;

const Role = styled.p`
  font-size: clamp(12px, 1.5vw, 18px);
  font-weight: 400;
  color: #999999;
  margin: 0;
  letter-spacing: 0.5px;
  font-family: 'Inter', sans-serif;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: clamp(11px, 3vw, 14px);
  }

  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

const NavContainer = styled.div`
  position: absolute;
  left: clamp(1rem, 3vw, 3rem);
  top: clamp(10rem, 15vh, 15rem);
  animation: ${slideInLeft} 0.8s ease-in-out 0.8s forwards;
  opacity: 0;
  z-index: 100;
  max-width: 250px;

  @media (max-width: 1200px) {
    top: clamp(8rem, 12vh, 12rem);
  }

  @media (max-width: 768px) {
    left: 1.5rem;
    top: auto;
    bottom: 1.5rem;
    right: 1.5rem;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    justify-content: space-between;
    max-width: calc(100% - 3rem);
  }

  @media (max-width: 480px) {
    flex-wrap: wrap;
    left: 1rem;
    bottom: 1rem;
    right: 1rem;
    max-width: calc(100% - 2rem);
    gap: 0.8rem;
  }
`;

const BottomRight = styled.div`
  position: absolute;
  right: clamp(1.5rem, 3vw, 3rem);
  bottom: clamp(1.5rem, 3vw, 3rem);
  max-width: min(280px, 25vw);
  animation: ${slideInRight} 0.8s ease-in-out 1s forwards;
  opacity: ${props => props.$show ? '1' : '0'};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  z-index: 100;

  @media (max-width: 1200px) {
    max-width: min(250px, 30vw);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const BioText = styled.p`
  font-size: clamp(11px, 1.1vw, 13px);
  font-weight: 300;
  color: #ffffff;
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.3px;
  font-family: 'Inter', sans-serif;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const NavItem = styled.li`
  font-weight: 400;
  transition: all 0.3s ease;
  color: #ffffff;
  font-size: clamp(12px, 1.2vw, 14px);
  font-family: 'Inter', sans-serif;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    white-space: nowrap;

    &.active {
      color: #ffffff;
      font-weight: 500;
    }

    &:hover {
      opacity: 0.6;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const NavIndicator = styled.span`
  display: inline-block;
  transition: all 0.3s ease;

  &.active {
    &::before {
      content: "•";
      font-size: 20px;
      line-height: 14px;
    }
  }

  &:not(.active)::before {
    content: "→";
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const ResumeButton = styled.a`
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 400;
  font-size: clamp(12px, 1.2vw, 14px);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;

  &:hover {
    opacity: 0.6;
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 11px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 3rem 2rem 3rem 2rem;
  transition: opacity 0.8s ease-in-out;
  opacity: ${props => props.$shrink ? '0' : '1'};
  visibility: ${props => props.$shrink ? 'hidden' : 'visible'};
  overflow-y: auto;
  overflow-x: hidden;
  pointer-events: ${props => props.$shrink ? 'none' : 'auto'};
  max-width: 100%;

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
    padding: 8rem 1.5rem 6rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 7rem 1rem 5rem 1rem;
  }
`;

const PageContent = styled.div`
  flex: ${props => props.$show ? '1' : '0'};
  opacity: ${props => props.$show ? '1' : '0'};
  transform: translateX(${props => props.$show ? '0' : '100%'});
  transition: flex 1s ease-in-out,
              opacity 1s ease-in-out,
              transform 1s ease-in-out;
  overflow: hidden;
  position: relative;
  pointer-events: ${props => props.$show ? 'auto' : 'none'};
  max-width: 100%;

  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex: 1;
    transform: translateY(${props => props.$show ? '0' : '100%'});
  }
`;

const Home = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const timer = setTimeout(() => {
      initializeParticleBackground();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Background>
      <CanvasBackground id="particles" />
      <Container>
        <TopLeft>
          <Name>Kaustubh Pandey</Name>
          <Role>VLSI Enthusiast</Role>
        </TopLeft>

        <NavContainer>
          <NavMenu>
            <NavItem>
              <Link to="/" className={isHomePage ? 'active' : ''}>
                <NavIndicator className={isHomePage ? 'active' : ''} />
                Home
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
                <NavIndicator className={location.pathname === '/about' ? 'active' : ''} />
                About
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
                <NavIndicator className={location.pathname === '/projects' ? 'active' : ''} />
                Projects
              </Link>
            </NavItem>
            <NavItem>
              <ResumeButton href="/KP_Resume.pdf" target="_blank" rel="noopener noreferrer">
                <span>→ Resume</span>
              </ResumeButton>
            </NavItem>
            <NavItem>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
                <NavIndicator className={location.pathname === '/contact' ? 'active' : ''} />
                Contact
              </Link>
            </NavItem>
          </NavMenu>
        </NavContainer>

        <BottomRight $show={isHomePage}>
          <BioText>Student at MIT Manipal.</BioText>
          <BioText>I believe VLSI design can be more innovative and inspiring.</BioText>
          <BioText>With a mission to present the possibilities of chip design,</BioText>
          <BioText>I am pursuing new expressions through hardware and experiments.</BioText>
        </BottomRight>

        <MainContent $shrink={!isHomePage}>
        </MainContent>

        <PageContent $show={!isHomePage}>
          <Outlet />
        </PageContent>
      </Container>
    </Background>
  );
};

export default Home;
