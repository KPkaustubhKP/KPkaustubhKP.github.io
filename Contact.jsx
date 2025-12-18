import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  height: auto;
  color: #c3c3c3;
  position: absolute;
  bottom: 0;
  right: 0;
  font-family: "Inconsolata", monospace;
  z-index: 99;
  margin: 1.6rem;
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

const ContactLink = styled(motion.a)`
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

const CopyButton = styled(motion.button)`
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

const SocialIcon = styled(motion.a)`
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

const SendButton = styled(motion.button)`
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

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

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

    // Simulate form submission (replace with actual backend)
    setTimeout(() => {
      setSending(false);
      setFormData({ name: "", email: "", message: "" });
      alert("Message sent! I'll get back to you soon.");
    }, 1500);
  };

  return (
    <Container variants={containerVariants} initial="hidden" animate="visible">
      <Title>Get In Touch</Title>
      <Subtitle>
        Let's connect! Whether you want to collaborate, discuss VLSI projects, or just say hi.
      </Subtitle>

      <ContactLinks>
        <motion.div variants={itemVariants}>
          <ContactLink href="mailto:your.email@example.com">
            <span className="icon">✉</span>
            <div className="text">
              <span className="label">Email</span>
              <span className="value">your.email@example.com</span>
            </div>
          </ContactLink>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ContactLink href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">
            <span className="icon">⚙</span>
            <div className="text">
              <span className="label">GitHub</span>
              <span className="value">github.com/your-username</span>
            </div>
          </ContactLink>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ContactLink href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer">
            <span className="icon">💼</span>
            <div className="text">
              <span className="label">LinkedIn</span>
              <span className="value">linkedin.com/in/your-profile</span>
            </div>
          </ContactLink>
        </motion.div>

        <motion.div variants={itemVariants}>
          <ContactLink
            as="div"
            style={{ cursor: "pointer", justifyContent: "space-between" }}
            onClick={() => handleCopy("+91-XXXXXXXXXX")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <span className="icon">📱</span>
              <div className="text">
                <span className="label">Phone</span>
                <span className="value">+91-XXXXXXXXXX</span>
              </div>
            </div>
            <CopyButton>
              {copied ? "Copied!" : "Copy"}
            </CopyButton>
          </ContactLink>
        </motion.div>
      </ContactLinks>

      <SocialLinks>
        <SocialIcon
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="GitHub"
        >
          🐙
        </SocialIcon>
        <SocialIcon
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="LinkedIn"
        >
          💼
        </SocialIcon>
        <SocialIcon
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Twitter"
        >
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
              placeholder="Your name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              name="message"
              placeholder="Your message here..."
              value={formData.message}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <SendButton
            type="submit"
            disabled={sending}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {sending ? "Sending..." : "Send Message"}
          </SendButton>
        </form>
      </FormSection>
    </Container>
  );
};

export default Contact;
