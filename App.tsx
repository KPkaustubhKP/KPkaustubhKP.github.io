
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Splash from './components/Splash';
import Portfolio from './components/Portfolio';

const App: React.FC = () => {
  const [isEntered, setIsEntered] = useState(false);

  // Persistence for user entry state if they refresh
  useEffect(() => {
    const entered = sessionStorage.getItem('portfolio_entered');
    if (entered === 'true') {
      setIsEntered(true);
    }
  }, []);

  const handleEnter = () => {
    setIsEntered(true);
    sessionStorage.setItem('portfolio_entered', 'true');
  };

  return (
    <div className="relative w-full h-full">
      {!isEntered ? (
        <Splash onEnter={handleEnter} />
      ) : (
        <div className="animate-in fade-in duration-1000">
           <Portfolio />
        </div>
      )}
    </div>
  );
};

export default App;
