import React, { createContext, useState, useEffect } from 'react';
import { throttle } from 'lodash';

type Props = {
  children: React.ReactNode;
};

interface IMobileContext {
  isMobile: boolean;
}

const isSmallScreen = () => window.innerWidth < 1200;

const MobileContext = createContext<IMobileContext>({
  isMobile: isSmallScreen(),
});

export function MobileProvider({ children }: Props) {
  const [isMobile, setMobileState] = useState(isSmallScreen());

  function handleResize() {
    setMobileState(isSmallScreen());
  }

  useEffect(() => {
    window.addEventListener('resize', throttle(handleResize, 500));

    return function cleanup() {
      window.removeEventListener('resize', throttle(handleResize, 500));
    };
  });

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
}

export default MobileContext;
