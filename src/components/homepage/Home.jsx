import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link, Outlet, useLocation } from "react-router-dom";
import Typed from "typed.js";
import initializeParticleBackground from "../../utils/particleBackground";
import { about } from "../data/data";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
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

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: hsl(0, 0%, 5%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Inconsolata", monospace;
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
  border: 1px solid #c3c3c3;
  background-color: transparent;
  position: fixed;
  animation: ${fadeIn} 1s ease-in-out forwards;
  z-index: 10;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  gap: ${props => props.$hasGap ? '3rem' : '0'};
  transition: gap 1s ease-in-out;
`;

const BottomLeft = styled.div`
  position: absolute;
  left: 1.6rem;
  bottom: 1.6rem;
  animation: ${slideInLeft} 0.8s ease-in-out 0.3s forwards;
  opacity: 0;
  z-index: 100;
`;

const NavMenu = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 2rem;
`;

const NavItem = styled.li`
  font-weight: 900;
  transition: all 0.3s ease;
  color: #c3c3c3;
  font-size: 16px;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    &.active {
      color: #32b8c6;
    }
  }

  &:hover {
    transform: translateY(-3px);
    color: #32b8c6;
  }
`;

const MainContent = styled.div`
  flex: ${props => props.$show ? (props.$shrink ? '0.35' : '1') : '0'};
  display: flex;
  flex-direction: column;
  align-items: ${props => props.$shrink ? 'flex-start' : 'center'};
  justify-content: flex-start;
  padding-top: ${props => props.$shrink ? '3rem' : '10rem'};
  padding-left: ${props => props.$shrink ? '2rem' : '0'};
  padding-right: ${props => props.$shrink ? '2rem' : '0'};
  padding-bottom: 5rem;
  text-align: ${props => props.$shrink ? 'left' : 'center'};
  transition: flex 1s ease-in-out,
              align-items 1s ease-in-out,
              padding 1s ease-in-out,
              text-align 1s ease-in-out,
              opacity 0.8s ease-in-out;
  opacity: ${props => props.$show ? '1' : '0'};
  overflow-y: auto;
  
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

const Header = styled.div`
  color: #c3c3c3;
  animation: ${slideInDown} 0.8s ease-in-out 0.2s forwards;
  opacity: 0;
  max-width: ${props => props.$shrink ? '450px' : '800px'};
  transition: max-width 1s ease-in-out;
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: ${props => props.$shrink ? '36px' : '56px'};
  padding-bottom: 0.5rem;
  margin: 0;
  color: #c3c3c3;
  transition: font-size 1s ease-in-out;
`;

const Subtitle = styled.h2`
  font-weight: 900;
  font-size: ${props => props.$shrink ? '32px' : '48px'};
  color: #32b8c6;
  margin: 0;
  transition: font-size 1s ease-in-out;
`;

const Description = styled.p`
  font-size: ${props => props.$shrink ? '15px' : '18px'};
  line-height: 1.8;
  color: #869395;
  margin-top: ${props => props.$shrink ? '1.2rem' : '2rem'};
  max-width: ${props => props.$shrink ? '400px' : '700px'};
  transition: font-size 1s ease-in-out,
              max-width 1s ease-in-out,
              margin-top 1s ease-in-out;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 2rem;
  justify-content: center;
  opacity: ${props => props.$shrink ? '0' : '1'};
  max-height: ${props => props.$shrink ? '0' : '200px'};
  overflow: hidden;
  transition: opacity 0.8s ease-in-out, 
              max-height 1s ease-in-out;
`;

const Tag = styled.span`
  background-color: rgba(50, 184, 198, 0.15);
  color: #32b8c6;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  border: 1px solid rgba(50, 184, 198, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(50, 184, 198, 0.25);
    transform: translateY(-2px);
  }
`;

const Institution = styled.p`
  font-size: ${props => props.$shrink ? '14px' : '16px'};
  color: #869395;
  margin: ${props => props.$shrink ? '0.5rem 0 0 0' : '1rem 0 0 0'};
  transition: font-size 1s ease-in-out,
              margin 1s ease-in-out;

  span {
    color: #32b8c6;
  }
`;

const PageContent = styled.div`
  flex: ${props => props.$show ? '0.65' : '0'};
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
  const typedRef = useRef(null);
  const location = useLocation();
  
  // Check if we're on the home page (root path)
  const isHomePage = location.pathname === '/';

  // Typed.js animation
  useEffect(() => {
    if (!typedRef.current) return;
    const typed = new Typed(typedRef.current, {
      strings: [about.name],
      startDelay: 400,
      typeSpeed: 40,
      backDelay: 1500,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Particle animation
  useEffect(() => {
    const timer = setTimeout(() => {
      initializeParticleBackground();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Background>
      <CanvasBackground id="particles" />
      <Container $hasGap={!isHomePage}>
        <BottomLeft>
          <NavMenu>
            <NavItem>
              <Link to="/" className={isHomePage ? 'active' : ''}>→ Home</Link>
            </NavItem>
            <NavItem>
              <Link to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>→ Projects</Link>
            </NavItem>
            <NavItem>
              <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>→ Contact</Link>
            </NavItem>
          </NavMenu>
        </BottomLeft>

        {/* Show home content - shrinks when not on home page */}
        <MainContent $show={true} $shrink={!isHomePage}>
          <Header $shrink={!isHomePage}>
            <Title $shrink={!isHomePage}>. Hi, I'm</Title>
            <Subtitle $shrink={!isHomePage}>
              <span ref={typedRef}></span>
            </Subtitle>
            <Institution $shrink={!isHomePage}>
              B.E. ECE @ <span>{about.institution}</span>
            </Institution>
            <Description $shrink={!isHomePage}>{about.bio}</Description>
            <Tags $shrink={!isHomePage}>
              <Tag>VLSI Design</Tag>
              <Tag>PCB Layout</Tag>
              <Tag>Hardware</Tag>
              <Tag>Embedded Systems</Tag>
            </Tags>
          </Header>
        </MainContent>

        {/* This is where Projects and Contact will render */}
        <PageContent $show={!isHomePage}>
          <Outlet />
        </PageContent>
      </Container>
    </Background>
  );
};

export default Home;

