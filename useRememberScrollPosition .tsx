import { useState, useEffect } from 'react';

export const useRememberScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const rememberScrollPosition = () => {
    setScrollPosition(window.pageYOffset);
  };

  const scrollToRememberedPosition = () => {
    if (scrollPosition !== null) {
      window.scrollTo({ top: scrollPosition });
    }
  };

  return { rememberScrollPosition, scrollToRememberedPosition };
};
