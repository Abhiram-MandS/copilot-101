import React, { useState, useRef } from 'react';

export const Footer = () => {
  const [clicks, setClicks] = useState(0);
  const [showEaster, setShowEaster] = useState(false);
  const timerRef = useRef(null);

  const handleDotClick = () => {
    const next = clicks + 1;
    setClicks(next);

    if (next >= 5) {
      setShowEaster(true);
      setClicks(0);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setShowEaster(false), 1000);
    }
  };

  return (
    <footer 
      onClick={handleDotClick}
      className="py-12 text-center text-slate-400 text-xs border-t border-slate-200 bg-white relative cursor-pointer select-none"
    >
      {showEaster && (
        <div className="absolute inset-0 flex items-center justify-center bg-white animate-fade pointer-events-none">
          <span className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Thanks from Abhi &lt;3
          </span>
        </div>
      )}
      <span>© 2026 GitHub Copilot Training Portal</span>
      <span className="inline-block mx-3 w-1.5 h-1.5 rounded-full bg-slate-300 align-middle"></span>
      <span>Made with Vibes &lt;3</span>
    </footer>
  );
};
