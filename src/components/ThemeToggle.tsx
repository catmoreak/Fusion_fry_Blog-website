import React from 'react';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
             (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);


  return (
    <label className="relative w-[50px] h-[26px] cursor-pointer bg-gray-900 dark:bg-gray-700 rounded-full transition-colors duration-300 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="sr-only"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      />
      {/* Moon icon (left) */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[22px] h-[22px]">
        <Moon className={`h-4 w-4 z-10 transition-colors duration-300 ${isDark ? 'text-yellow-400' : 'text-gray-400'}`} />
      </span>
      {/* Sun icon (right) */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-[22px] h-[22px]">
        <Sun className={`h-4 w-4 z-10 transition-colors duration-300 ${!isDark ? 'text-yellow-500' : 'text-gray-400'}`} />
      </span>
      {/* Ball */}
      <span
        className="absolute left-1 top-1/2 -translate-y-1/2 w-[22px] h-[22px] bg-white rounded-full shadow transition-transform duration-300"
        style={{
          transform: isDark
            ? 'translateX(24px) translateY(-50%)'
            : 'translateX(0) translateY(-50%)',
        }}
      />
    </label>
  );
};