import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

const useMobile = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handler() {
      setWidth(window.innerWidth);
    }

    const throttledHandler = throttle(handler, 500);

    window.addEventListener('resize', throttledHandler);

    return () => {
      window.removeEventListener('resize', throttledHandler);
    };
  }, []);

  return width < 1200;
};

export default useMobile;
