import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Updated paths based on the new /src/components folder structure
import Portfolio from './components/Portfolio';
import Splash from './components/Splash';

const App: React.FC = () => {
  // State to handle the transition from the terminal splash to the main portfolio
  const [entered, setEntered] = useState<boolean>(() => {
    return sessionStorage.getItem('kp-portfolio-entered') === 'true';
  });

  // Theme initialization: persistent dark/light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem('kp-theme') || 'dark';
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleEnter = () => {
    setEntered(true);
    sessionStorage.setItem('kp-portfolio-entered', 'true');
  };

  return (
    <main className="min-h-screen bg-bg-light dark:bg-bg-dark selection:bg-primary/20 selection:text-primary transition-colors duration-300">
      <AnimatePresence mode="wait">
        {!entered ? (
          <Splash key="splash" onEnter={handleEnter} />
        ) : (
          <Portfolio key="portfolio" />
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
