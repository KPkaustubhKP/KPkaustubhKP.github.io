import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
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

const PageContainer = styled.div`
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

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const LeftMenu = styled.nav`
  width: 20%;
  padding: 1.6rem;
  border-right: 1px solid rgba(195, 195, 195, 0.2);
  overflow-y: auto;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 1rem;

    a {
      text-decoration: none;
      color: #c3c3c3;
      font-weight: 900;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      &:hover {
        color: #32b8c6;
        transform: translateX(5px);
      }
    }
  }
`;

const RightContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.6rem;
  color: #c3c3c3;

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

const Title = styled.h2`
  font-size: 40px;
  font-weight: 900;
  color: white;
  margin: 0 0 2rem 0;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #869395;
  margin-bottom: 2rem;
  max-width: 500px;
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(50, 184, 198, 0.08);
  border: 1px solid rgba(50, 184, 198, 0.2);
  border-radius: 6px;
  text-decoration: none;
  color: #32b8c6;
  transition: all 0.3s ease;
  width: fit-content;

  &:hover {
    background-color: rgba(50, 184, 198, 0.15);
    transform: translateX(8px);
    border-color: rgba(50, 184, 198, 0.4);
  }

  .icon {
    font-size: 20px;
    min-width: 24px;
  }

  .text {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label {
    font-size: 12px;
    color: #869395;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    color: #c3c3c3;
  }
`;

const CopyButton = styled.button`
  background: none;
  border: 1px solid rgba(50, 184, 198, 0.3);
  color: #32b8c6;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Inconsolata", monospace;

  &:hover {
    background-color: rgba(50, 184, 198, 0.2);
    border-color: rgba(50, 184, 198, 0.6);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(50, 184, 198, 0.1);
  border: 1px solid rgba(50, 184, 198, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #32b8c6;
  text-decoration: none;
  font-size: 18px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(50, 184, 198, 0.2);
    transform: translateY(-4px);
  }
`;

const FormSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(50, 184, 198, 0.2);
`;

const FormTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #32b8c6;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  font-size: 12px;
  color: #869395;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 184, 198, 0.2);
  border-radius: 4px;
  color: #c3c3c3;
  font-family: "Inconsolata", monospace;
  font-size: 14px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(50, 184, 198, 0.6);
    background-color: rgba(50, 184, 198, 0.08);
  }

  &::placeholder {
    color: #869395;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 400px;
  min-height: 100px;
  padding: 0.75rem;
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(50, 184, 198, 0.2);
  border-radius: 4px;
  color: #c3c3c3;
  font-family: "Inconsolata", monospace;
  font-size: 14px;
  resize: vertical;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: rgba(50, 184, 198, 0.6);
    background-color: rgba(50, 184, 198, 0.08);
  }

  &::placeholder {
    color: #869395;
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: rgba(50, 184, 198, 0.2);
  border: 1px solid #32b8c6;
  color: #32b8c6;
  border-radius: 4px;
  font-family: "Inconsolata", monospace;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover:not(:disabled) {
    background-color: rgba(50, 184, 198, 0.3);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [copied, setCopied] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent! I'll get back to you soon.");
    }, 1500);
  };

  return (
    <Background>
      <CanvasBackground id="particle-canvas" />
      <PageContainer>
        <ContentWrapper>
          <LeftMenu>
            <MenuList>
              <li>
                <Link to="/">→ Home</Link>
              </li>
              <li>
                <Link to="/projects">→ Projects</Link>
              </li>
              <li>
                <Link to="/contact">→ Contact</Link>
              </li>
            </MenuList>
          </LeftMenu>

          <RightContent>
            <Title>Get In Touch</Title>
            <Subtitle>
              Let's connect! Whether you want to collaborate, discuss VLSI projects, or just say hi.
            </Subtitle>

            <ContactLinks>
              <ContactLink href="mailto:your.email@example.com">
                <div className="icon">✉</div>
                <div className="text">
                  <div className="label">Email</div>
                  <div className="value">your.email@example.com</div>
                </div>
              </ContactLink>

              <ContactLink href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
                <div className="icon">⚡</div>
                <div className="text">
                  <div className="label">GitHub</div>
                  <div className="value">github.com/your-username</div>
                </div>
              </ContactLink>

              <ContactLink href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
                <div className="icon">💼</div>
                <div className="text">
                  <div className="label">LinkedIn</div>
                  <div className="value">linkedin.com/in/your-profile</div>
                </div>
              </ContactLink>

              <ContactLink
                as="div"
                style={{ cursor: "pointer", display: "flex", justifyContent: "space-between" }}
                onClick={() => handleCopy("+91-XXXXXXXXXX")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className="icon">📱</div>
                  <div className="text">
                    <div className="label">Phone</div>
                    <div className="value">+91-XXXXXXXXXX</div>
                  </div>
                </div>
                <CopyButton onClick={() => handleCopy("+91-XXXXXXXXXX")}>
                  {copied ? "Copied!" : "Copy"}
                </CopyButton>
              </ContactLink>
            </ContactLinks>

            <SocialLinks>
              <SocialIcon href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer">
                𝕏
              </SocialIcon>
            </SocialLinks>

            <FormSection>
              <FormTitle>Quick Message</FormTitle>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="message">Message</Label>
                  <TextArea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message..."
                    required
                  />
                </FormGroup>

                <SendButton type="submit" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"}
                </SendButton>
              </form>
            </FormSection>
          </RightContent>
        </ContentWrapper>
      </PageContainer>
    </Background>
  );
};

export default Contact;
