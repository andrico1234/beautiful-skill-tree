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
    const throttleHandleResize = throttle(handleResize, 500);

    window.addEventListener('resize', throttleHandleResize);

    return function cleanup() {
      window.removeEventListener('resize', throttleHandleResize);
    };
  });

  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
}

export default MobileContext;
