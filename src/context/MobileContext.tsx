import React, { createContext, useState, useEffect } from 'react';
import { throttle } from 'lodash';

type Props = {
  children: React.ReactNode;
};

interface IMobileContext {
  isMobile: boolean;
}

const MobileContext = createContext<IMobileContext>({ isMobile: true });

export function MobileProvider({ children }: Props) {
  const [isMobile, setMobileState] = useState(window.innerWidth < 900);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 900 && !isMobile) {
        setMobileState(true);
      }

      if (window.innerHeight >= 900 && isMobile) {
        setMobileState(false);
      }
    }

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
