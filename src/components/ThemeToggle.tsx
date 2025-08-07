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

  // Track previous theme to trigger animation only when toggling to light or dark mode
  const prevIsDark = React.useRef(isDark);
  const [sunShouldRoll, setSunShouldRoll] = React.useState(false);
  const [moonShouldBounce, setMoonShouldBounce] = React.useState(false);
  const [showStars, setShowStars] = React.useState(false);

  React.useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }

    // If toggling from dark to light, roll the sun
    if (prevIsDark.current && !isDark) {
      setSunShouldRoll(true);
      setTimeout(() => setSunShouldRoll(false), 700); // match animation duration
    }
    // If toggling from light to dark, bounce the moon and show stars
    if (!prevIsDark.current && isDark) {
      setMoonShouldBounce(true);
      setShowStars(true);
      setTimeout(() => setMoonShouldBounce(false), 500); // match animation duration
      setTimeout(() => setShowStars(false), 900); // stars fade out after 0.9s
    }
    prevIsDark.current = isDark;
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
      {/* Moon icon (left) - bounces only when toggling to dark mode, stars burst when toggling to dark mode */}
      <span className={`absolute left-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-[22px] h-[22px] transition-all duration-300 ${isDark ? 'scale-110' : 'opacity-60 scale-100'}`} style={{zIndex:2}}>
        <Moon className={`h-5 w-5 transition-colors duration-300 ${isDark ? 'text-blue-400' : 'text-gray-400'} ${moonShouldBounce ? 'animate-bounce-moon' : ''}`} />
        {/* Stars burst animation */}
        {showStars && (
          <>
            <svg className="star-burst star1" width="10" height="10" viewBox="0 0 10 10" fill="none"><polygon points="5,0 6,3.5 9.5,4 6.5,6 7.5,9.5 5,7.5 2.5,9.5 3.5,6 0.5,4 4,3.5" fill="#fffbe9" stroke="#ffe066" strokeWidth="0.5"/></svg>
            <svg className="star-burst star2" width="8" height="8" viewBox="0 0 8 8" fill="none"><polygon points="4,0 4.7,2.5 7.5,3 5.2,4.5 6,7 4,5.5 2,7 2.8,4.5 0.5,3 3.3,2.5" fill="#fffbe9" stroke="#ffe066" strokeWidth="0.4"/></svg>
            <svg className="star-burst star3" width="7" height="7" viewBox="0 0 7 7" fill="none"><polygon points="3.5,0 4,2 6.5,2.5 4.5,4 5,6.5 3.5,5.2 2,6.5 2.5,4 0.5,2.5 3,2" fill="#fffbe9" stroke="#ffe066" strokeWidth="0.3"/></svg>
            <svg className="star-burst star4" width="6" height="6" viewBox="0 0 6 6" fill="none"><polygon points="3,0 3.4,1.5 5.5,2 3.8,3 4.2,5 3,4 1.8,5 2.2,3 0.5,2 2.6,1.5" fill="#fffbe9" stroke="#ffe066" strokeWidth="0.3"/></svg>
            <svg className="star-burst star5" width="5" height="5" viewBox="0 0 5 5" fill="none"><polygon points="2.5,0 2.8,1.2 4.5,1.5 3.2,2.5 3.5,4.5 2.5,3.5 1.5,4.5 1.8,2.5 0.5,1.5 2.2,1.2" fill="#fffbe9" stroke="#ffe066" strokeWidth="0.2"/></svg>
          </>
        )}
      </span>
      {/* Sun icon (right) - rolls only when toggling to light mode */}
      <span className={`absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center w-[22px] h-[22px] transition-all duration-300 ${!isDark ? 'scale-110' : 'opacity-60 scale-100'}`}>
        <Sun className={`h-5 w-5 transition-colors duration-300 ${!isDark ? 'text-yellow-400' : 'text-gray-400'} ${sunShouldRoll ? 'animate-roll' : ''}`} />
      </span>
      {/* Ball */}
      <span
        className={`theme-toggle-ball absolute top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full shadow-lg border border-blue-200 dark:border-blue-800 transition-transform duration-300 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md`}
        style={{
          zIndex: !isDark ? 3 : 1,
          // When in light mode, move the ball to the left and slightly forward to fully cover the moon
          transform: isDark
            ? 'translateX(30px) translateY(-50%)'
            : 'translateX(-2px) translateY(-50%)',
          boxShadow: !isDark ? '0 0 0 4px #fff, 0 2px 12px 0 #2563eb22, 0 1.5px 8px 0 #facc1533' : undefined
        }}
      >
        <span className={`block w-2 h-2 rounded-full ${isDark ? 'bg-blue-400' : 'bg-yellow-400'} transition-colors duration-300`} />
      </span>
      <style>{`
        @keyframes roll {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes bounce-moon {
          0% { transform: scale(1) translateY(0); }
          20% { transform: scale(1.15, 0.85) translateY(-2px); }
          40% { transform: scale(0.95, 1.1) translateY(-8px); }
          60% { transform: scale(1.1, 0.9) translateY(-2px); }
          80% { transform: scale(0.98, 1.02) translateY(0); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes star-burst {
          0% { opacity: 0; transform: scale(0.5) translate(0,0); }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; transform: scale(1.1) translate(var(--tx), var(--ty)); }
        }
        .star-burst {
          position: absolute;
          opacity: 0;
          z-index: 1;
          animation: star-burst 0.9s cubic-bezier(.7,.2,.3,1) 1;
          filter: drop-shadow(0 0 2px #fffbe9cc);
        }
        .star1 { --tx: -12px; --ty: -10px; left: 2px; top: 2px; }
        .star2 { --tx: 14px; --ty: -8px; right: 2px; top: 4px; }
        .star3 { --tx: -10px; --ty: 10px; left: 3px; bottom: 2px; }
        .star4 { --tx: 12px; --ty: 10px; right: 3px; bottom: 2px; }
        .star5 { --tx: 0px; --ty: -16px; left: 8px; top: -6px; width: 4px; height: 4px; }
        .animate-roll {
          animation: roll 0.7s cubic-bezier(.7,.2,.3,1) 1;
        }
        .animate-bounce-moon {
          animation: bounce-moon 0.5s cubic-bezier(.7,.2,.3,1) 1;
        }
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