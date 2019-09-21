import React, { createContext, useState, useEffect } from 'react';
import { throttle } from 'lodash';

type Props = {
  children: React.ReactNode;
};

interface IMobileContext {
  isMobile: boolean;
}

const MobileContext = createContext<IMobileContext>({
  isMobile: true,
});

export function MobileProvider({ children }: Props) {
  const [isMobile, setMobileState] = useState(false);

  function handleResize() {
    setMobileState(window.innerWidth < 1200);
  }

  useEffect(() => {
    setMobileState(window.innerWidth < 1200);
  }, []);

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
