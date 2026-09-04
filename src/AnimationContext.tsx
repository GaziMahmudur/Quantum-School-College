import React, { createContext, useContext, useState, useEffect } from 'react';

export const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: (enabled: boolean) => {},
});

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    if (!animationsEnabled) {
      document.documentElement.classList.add('animations-disabled');
    } else {
      document.documentElement.classList.remove('animations-disabled');
    }
  }, [animationsEnabled]);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
};
