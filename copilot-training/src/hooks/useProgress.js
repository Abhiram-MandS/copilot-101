import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'copilot-training-progress';

const defaultProgress = {
  where: false,
  context: false,
  mastering: false
};

export const useProgress = () => {
  // Lazy initialization — read from localStorage synchronously on first render
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);
  
  const markComplete = useCallback((moduleId) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: true
    }));
  }, []);
  
  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);
  
  const getCompletionPercentage = useCallback(() => {
    const completed = Object.values(progress).filter(Boolean).length;
    return Math.round((completed / 3) * 100);
  }, [progress]);
  
  return {
    progress,
    markComplete,
    resetProgress,
    getCompletionPercentage
  };
};
