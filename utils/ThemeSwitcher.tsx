import { useEffect, useState } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const ThemeSwitcher = () => {
  const userTheme = localStorage.getItem('theme');
  const [darkMode, setDarkMode] = useState(userTheme === 'dark' || userTheme === null);

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

////////////   in HTML ////////////////
// <script>
//   const userTheme = localStorage.getItem('theme');
//   if (userTheme === 'dark') {
//     document.documentElement.classList.add('dark');
//   } else {
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     if (prefersDark) {
//       document.documentElement.classList.add('dark');
//     }
//   }
// </script>
