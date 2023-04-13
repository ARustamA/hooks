import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export default function useTheme(): [Theme, React.Dispatch<React.SetStateAction<Theme>>] {
  const [theme, setTheme] = useState<Theme>(localStorage.theme || 'light');
  const colorTheme = theme === 'dark' ? 'light' : 'dark';

  // const [darkMode, setDarkMode] = useState(false);
  // const userTheme = localStorage.getItem("theme");
  // const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // useEffect(() => {
  //   if ((userTheme && userTheme === "dark") || (!userTheme && systemTheme))
  //     setDarkMode(true);
  //   else setDarkMode(false);
  // }, []);

  // useEffect(() => {
  //   if (darkMode) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // }, [darkMode]);
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);

    localStorage.setItem('theme', theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
}
