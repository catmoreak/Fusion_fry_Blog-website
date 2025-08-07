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
    <label className="theme-toggle-glass relative w-[56px] h-[30px] cursor-pointer select-none flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="sr-only"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      />
      {/* Track */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-200 via-white to-yellow-100 dark:from-blue-900 dark:via-gray-800 dark:to-yellow-900 shadow-lg backdrop-blur-md border border-blue-300 dark:border-blue-800 transition-colors duration-300" />
      {/* Glow effect */}
      <span
        className={`absolute inset-0 rounded-full pointer-events-none transition-all duration-300 ${isDark ? 'shadow-[0_0_16px_4px_#2563eb55]' : 'shadow-[0_0_16px_4px_#facc1555]'}`}
        aria-hidden="true"
      />
      {/* Moon icon (left) */}
      <span className={`absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-[22px] h-[22px] transition-all duration-300 ${isDark ? 'scale-110' : 'opacity-60 scale-100'}`}>
        <Moon className={`h-5 w-5 transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-gray-400'}`} />
      </span>
      {/* Sun icon (right) */}
      <span className={`absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-[22px] h-[22px] transition-all duration-300 ${!isDark ? 'scale-110' : 'opacity-60 scale-100'}`}>
        <Sun className={`h-5 w-5 transition-colors duration-300 ${!isDark ? 'text-yellow-400' : 'text-gray-400'}`} />
      </span>
      {/* Ball */}
      <span
        className={`theme-toggle-ball absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full shadow-lg border border-blue-200 dark:border-blue-800 transition-transform duration-300 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md`}
        style={{
          transform: isDark
            ? 'translateX(30px) translateY(-50%)'
            : 'translateX(0) translateY(-50%)',
        }}
      >
        <span className={`block w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-yellow-400'} transition-colors duration-300`} />
      </span>
      <style>{`
        .theme-toggle-glass {
          box-shadow: 0 2px 16px 0 #2563eb22, 0 1.5px 8px 0 #facc1533;
          background: transparent;
        }
        .theme-toggle-ball {
          box-shadow: 0 2px 12px 0 #2563eb22, 0 1.5px 8px 0 #facc1533;
        }
      `}</style>
    </label>
  );
};