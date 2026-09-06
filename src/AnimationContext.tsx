import React, { createContext, useContext, useState, useEffect } from 'react';

export const AnimationContext = createContext({
  animationsEnabled: true,
  setAnimationsEnabled: (enabled: boolean) => {},
});

export const AnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    // Defer classList mutation to next paint frame to avoid forced reflow
    const rafId = requestAnimationFrame(() => {
      if (!animationsEnabled) {
        document.documentElement.classList.add('animations-disabled');
      } else {
        document.documentElement.classList.remove('animations-disabled');
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [animationsEnabled]);

  return (
    <AnimationContext.Provider value={{ animationsEnabled, setAnimationsEnabled }}>
      {children}
    </AnimationContext.Provider>
  );
};
