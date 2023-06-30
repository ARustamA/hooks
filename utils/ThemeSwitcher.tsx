import { useEffect, useState, useLayoutEffect } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false);
  const userTheme = localStorage.getItem('theme');
  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    } else {
      return 'dark';
    }
  };

  const systemTheme = getSystemTheme();

  useLayoutEffect(() => {
    if ((userTheme && userTheme === 'dark') || (!userTheme && systemTheme)) setDarkMode(true);
    else setDarkMode(false);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <DarkModeSwitch
      checked={!darkMode}
      moonColor="black"
      sunColor="white"
      onChange={() => setDarkMode(!darkMode)}
      size={20}
    />
  );
};

export default ThemeSwitcher;
