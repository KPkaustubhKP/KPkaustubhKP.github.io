import { useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link, Outlet } from "react-router-dom";
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

const slideInRight = keyframes`
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
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Container = styled.div`
  height: calc(100vh - 50px);
  width: calc(100vw - 50px);
  border: 1px solid #c3c3c3;
  background-color: hsla(0, 0%, 5%, 0.95);
  position: fixed;
  animation: ${fadeIn} 1s ease-in-out forwards;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Header = styled.div`
  width: 50%;
  color: #c3c3c3;
  margin: 1.6rem;
  animation: ${slideInRight} 0.8s ease-in-out 0.2s forwards;
  opacity: 0;
`;

const Title = styled.h1`
  font-weight: 200;
  font-size: 40px;
  padding-bottom: 0.5rem;
  margin: 0;
  color: #c3c3c3;
`;

const Subtitle = styled.h2`
  font-weight: 900;
  font-size: 32px;
  color: #32b8c6;
  margin: 0;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #869395;
  margin-top: 1.6rem;
  max-width: 600px;
`;

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const Tag = styled.span`
  background-color: rgba(50, 184, 198, 0.15);
  color: #32b8c6;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  border: 1px solid rgba(50, 184, 198, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(50, 184, 198, 0.25);
    transform: translateY(-2px);
  }
`;

const NavMenu = styled.ul`
  list-style: none;
  cursor: pointer;
  padding: 0;
  margin-top: auto;
  margin-left: 1.6rem;
  margin-bottom: 1.6rem;
  display: flex;
  gap: 2rem;
`;

const NavItem = styled.li`
  padding: 0.8rem 0;
  font-weight: 900;
  transition: all 0.3s ease;
  color: #c3c3c3;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &:hover {
    transform: translateX(5px);
    color: #32b8c6;
  }
`;

const TypedSpan = styled.span`
  color: #32b8c6;
  font-weight: 900;
  font-size: 16px;
`;

const Institution = styled.p`
  font-size: 14px;
  color: #869395;
  margin: 0.5rem 0 0 0;

  span {
    color: #32b8c6;
  }
`;

const Home = () => {
  const typedRef = useRef(null);

  // Typed.js animation
  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [about.name],
      startDelay: 400,
      typeSpeed: 40,
      backDelay: 1500,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  // Particle animation
  useEffect(() => {
    initializeParticleBackground();
  }, []);

  return (
    <Background>
      <CanvasBackground id="particles" />
      <Container>
        <Header>
          <Title>Hey, I'm</Title>
          <TypedSpan ref={typedRef} />

          <Institution>
            <span>{about.specialization}</span> @ {about.institution}
          </Institution>

          <Description>
            {about.bio}
          </Description>

          <Tags>
            {about.passions.map((passion) => (
              <Tag key={passion}>{passion}</Tag>
            ))}
          </Tags>
        </Header>

        <NavMenu>
          <NavItem>
            <Link to="/">
              <span>→</span> Home
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/projects">
              <span>→</span> Projects
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/contact">
              <span>→</span> Contact
            </Link>
          </NavItem>
        </NavMenu>

        <Outlet />
      </Container>
    </Background>
  );
};

export default Home;
