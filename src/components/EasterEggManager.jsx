import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

const ACHIEVEMENTS = {
  'EXPLORER': { id: 'explorer', title: 'Full Stack Explorer', desc: 'Visited all project pages', icon: '🧭' },
  'KONAMI': { id: 'konami', title: 'Retro Gamer', desc: 'Entered the Konami Code', icon: '🎮' },
  'HUSKY': { id: 'husky', title: 'Go Huskies!', desc: 'Found the hidden Husky interaction', icon: '🐾' },
  'SPEEDSTER': { id: 'speedster', title: 'Speed Reader', desc: 'Navigated through 5 pages quickly', icon: '⚡' },
  'MASTER': { id: 'master', title: 'Presentation Master', desc: 'Unlocked all achievements', icon: '🏆' }
};

const EasterEggManager = () => {
  const [inputSequence, setInputSequence] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [unlocked, setUnlocked] = useState(() => {
    const saved = sessionStorage.getItem('vdrs_achievements');
    return saved ? JSON.parse(saved) : [];
  });
  const visitedPagesRef = useRef(new Set());
  const location = useLocation();
  const lastPageTimeRef = useRef(0);
  const fastNavCountRef = useRef(0);
  const unlockAchievementRef = useRef(null);

  // Unlock achievement function
  const unlockAchievement = useCallback((id) => {
    if (!unlocked.includes(id)) {
      const achievement = Object.values(ACHIEVEMENTS).find(a => a.id === id);
      if (achievement) {
        const newUnlocked = [...unlocked, id];
        setUnlocked(newUnlocked);
        sessionStorage.setItem('vdrs_achievements', JSON.stringify(newUnlocked));
        
        // Add toast - using performance.now() instead of Date.now() for unique IDs
        const toastId = performance.now();
        setToasts(prev => [...prev, { ...achievement, toastId }]);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.toastId !== toastId));
        }, 4000);

        // Check for Master achievement
        if (newUnlocked.length === Object.keys(ACHIEVEMENTS).length - 1 && !newUnlocked.includes('master')) {
          setTimeout(() => {
            if (unlockAchievementRef.current) {
              unlockAchievementRef.current('master');
            }
          }, 1000);
        }
      }
    }
  }, [unlocked]);

  // Store the ref in useEffect
  useEffect(() => {
    unlockAchievementRef.current = unlockAchievement;
  }, [unlockAchievement]);

  // Listen for Konami code
  useEffect(() => {
    const handleKeyDown = (e) => {
      const newSequence = [...inputSequence, e.key];
      if (newSequence.length > KONAMI_CODE.length) {
        newSequence.shift();
      }
      setInputSequence(newSequence);

      if (newSequence.join('') === KONAMI_CODE.join('')) {
        unlockAchievement('konami');
        // Trigger confetti or special effect here if desired
        document.body.style.animation = "shake 0.5s cubic-bezier(.36,.07,.19,.97) both";
        setTimeout(() => {
          document.body.style.animation = "";
        }, 500);
        setInputSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, unlockAchievement]);

  // Track page visits
  useEffect(() => {
    const path = location.pathname;
    const visitedPages = visitedPagesRef.current;
    
    if (!visitedPages.has(path)) {
      visitedPages.add(path);
      // Use setTimeout to defer the state update
      if (visitedPages.size >= 8) { // Assuming ~8 main project pages
        setTimeout(() => unlockAchievement('explorer'), 0);
      }
    }

    // Check for speedster
    const now = performance.now();
    if (lastPageTimeRef.current !== 0 && now - lastPageTimeRef.current < 2000) { // Less than 2 seconds per page
      fastNavCountRef.current += 1;
      // Use setTimeout to defer the state update
      if (fastNavCountRef.current >= 5) setTimeout(() => unlockAchievement('speedster'), 0);
    } else {
      fastNavCountRef.current = 0;
    }
    lastPageTimeRef.current = now;

  }, [location, unlockAchievement]);

  // Expose unlock function globally for other components to use
  useEffect(() => {
    window.unlockAchievement = unlockAchievement;
    return () => { delete window.unlockAchievement; };
  }, [unlockAchievement]);

  return (
    <div className="easter-egg-container" style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      pointerEvents: 'none'
    }}>
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.toastId}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            style={{
              background: 'rgba(20, 20, 30, 0.9)',
              backdropFilter: 'blur(10px)',
              border: '1px solid var(--vdrs-orange)',
              borderRadius: '12px',
              padding: '15px 20px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              minWidth: '300px'
            }}
          >
            <div style={{ fontSize: '2em' }}>{toast.icon}</div>
            <div>
              <div style={{ 
                color: 'var(--vdrs-orange)', 
                fontWeight: 'bold', 
                fontSize: '0.9em',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Achievement Unlocked
              </div>
              <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.1em' }}>
                {toast.title}
              </div>
              <div style={{ color: '#aaa', fontSize: '0.9em' }}>
                {toast.desc}
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};

export default EasterEggManager;
