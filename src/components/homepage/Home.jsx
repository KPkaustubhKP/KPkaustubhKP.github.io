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
  height: calc(100vh - 50px);
  width: calc(100vw - 50px);
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
`;

const TopLeft = styled.div`
  position: absolute;
  left: 3rem;
  top: 3rem;
  animation: ${fadeIn} 0.8s ease-in-out 0.5s forwards;
  opacity: 0;
  z-index: 100;
`;

const Name = styled.h1`
  font-size: 56px;
  font-weight: 200;
  color: #ffffff;
  margin: 0 0 0.5rem 0;
  letter-spacing: -1px;
  font-family: 'Inter', sans-serif;
`;

const Role = styled.p`
  font-size: 18px;
  font-weight: 400;
  color: #999999;
  margin: 0;
  letter-spacing: 0.5px;
  font-family: 'Inter', sans-serif;
`;

const NavContainer = styled.div`
  position: absolute;
  left: 3rem;
  top: 15rem;
  animation: ${slideInLeft} 0.8s ease-in-out 0.8s forwards;
  opacity: 0;
  z-index: 100;
`;

const BottomRight = styled.div`
  position: absolute;
  right: 3rem;
  bottom: 3rem;
  max-width: 280px;
  animation: ${slideInRight} 0.8s ease-in-out 1s forwards;
  opacity: ${props => props.$show ? '1' : '0'};
  visibility: ${props => props.$show ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
  z-index: 100;
`;

const BioText = styled.p`
  font-size: 13px;
  font-weight: 300;
  color: #ffffff;
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.3px;
  font-family: 'Inter', sans-serif;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const NavItem = styled.li`
  font-weight: 400;
  transition: all 0.3s ease;
  color: #ffffff;
  font-size: 14px;
  font-family: 'Inter', sans-serif;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &.active {
      color: #ffffff;
      font-weight: 500;
    }

    &:hover {
      opacity: 0.6;
    }
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
`;

const ResumeButton = styled.a`
  text-decoration: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 400;
  font-size: 14px;
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;

  &:hover {
    opacity: 0.6;
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
  pointer-events: ${props => props.$shrink ? 'none' : 'auto'};

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
                → Resume
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
          <BioText>
            I believe VLSI design can be more innovative and inspiring.
          </BioText>
          <BioText>
            With a mission to present the possibilities of chip design,
            I am pursuing new expressions through hardware and experiments.
          </BioText>
        </BottomRight>

        <MainContent $shrink={!isHomePage} />

        <PageContent $show={!isHomePage}>
          <Outlet />
        </PageContent>
      </Container>
    </Background>
  );
};

export default Home;

