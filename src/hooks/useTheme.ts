import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('scouts-theme');
    if (saved === 'dark') return 'dark';
    return 'light';
  });

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    const saved = localStorage.getItem('scouts-font-size');
    if (saved === 'large' || saved === 'xlarge') return saved;
    return 'normal';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('scouts-theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('text-normal', 'text-large', 'text-xlarge');
    if (fontSize === 'large') {
      root.classList.add('text-large');
    } else if (fontSize === 'xlarge') {
      root.classList.add('text-xlarge');
    } else {
      root.classList.add('text-normal');
    }
    localStorage.setItem('scouts-font-size', fontSize);
  }, [fontSize]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme, setTheme, fontSize, setFontSize };
}
