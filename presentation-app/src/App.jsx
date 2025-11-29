import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Home from './pages/Home';
import RAGSystem from './pages/RAGSystem';
import DykScribe from './pages/DykScribe';
import DataExtractor from './pages/DataExtractor';
import CDMS from './pages/CDMS';
import VDRS360 from './pages/VDRS360';
import VanDykTools from './pages/VanDykTools';
import MobileApp from './pages/MobileApp';
import VDRSWebsite from './pages/VDRSWebsite';
import PersonalExperiences from './pages/PersonalExperiences';
import Summary from './pages/Summary';
import VanDykToolsDetail from './pages/VanDykToolsDetail';
import EasterEggManager from './components/EasterEggManager';

function App() {
  // Interactive background state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize coordinates -1 to 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
      
      // Update CSS variables for subtle background shift
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="bg-gradient" style={{
          transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) scale(1.05)`
        }} />
        <EasterEggManager />
        <AppContent />
      </div>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/rag-system" element={<PageTransition><RAGSystem /></PageTransition>} />
          <Route path="/dykscribe" element={<PageTransition><DykScribe /></PageTransition>} />
          <Route path="/data-extractor" element={<PageTransition><DataExtractor /></PageTransition>} />
          <Route path="/cdms" element={<PageTransition><CDMS /></PageTransition>} />
          <Route path="/vdrs360" element={<PageTransition><VDRS360 /></PageTransition>} />
          <Route path="/tools" element={<PageTransition><VanDykTools /></PageTransition>} />
          <Route path="/vandyk-tools-detail" element={<PageTransition><VanDykToolsDetail /></PageTransition>} />
          <Route path="/mobile-app" element={<PageTransition><MobileApp /></PageTransition>} />
          <Route path="/website" element={<PageTransition><VDRSWebsite /></PageTransition>} />
          <Route path="/experiences" element={<PageTransition><PersonalExperiences /></PageTransition>} />
          <Route path="/summary" element={<PageTransition><Summary /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: '100%', height: '100%' }}
    >
      {children}
    </motion.div>
  );
}

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  const routes = React.useMemo(() => [
    { path: '/', label: 'Home' },
    { path: '/rag-system', label: 'RAG System' },
    { path: '/dykscribe', label: 'DykScribe' },
    { path: '/data-extractor', label: 'Data Extractor' },
    { path: '/cdms', label: 'CDMS' },
    { path: '/vdrs360', label: 'VDRS360' },
    { path: '/tools', label: 'Tools Hub' },
    { path: '/mobile-app', label: 'Mobile App' },
    { path: '/website', label: 'VDRS Website' },
    { path: '/experiences', label: 'Personal Experiences' },
    { path: '/summary', label: 'Summary' }
  ], []);

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const currentIndex = routes.findIndex(r => r.path === currentPath);

  const goNext = useCallback(() => {
    if (currentIndex < routes.length - 1) {
      const nextPath = routes[currentIndex + 1].path;
      navigate(nextPath);
    }
  }, [currentIndex, navigate, routes]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      const prevPath = routes[currentIndex - 1].path;
      navigate(prevPath);
    }
  }, [currentIndex, navigate, routes]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'Home') {
        navigate('/');
      }
      if (e.key === 'End') {
        const lastPath = routes[routes.length - 1].path;
        navigate(lastPath);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, navigate, routes]);

  return (
    <>
      <div className="vdrs-logo">VAN DYK</div>
      <div className="progress-bar" style={{ width: `${((currentIndex + 1) / routes.length) * 100}%` }}></div>
      <div className="nav-controls">
        <button className="nav-btn" onClick={goPrev} disabled={currentIndex === 0}>← Prev</button>
        <div className="slide-indicator">{currentIndex + 1} / {routes.length}</div>
        <button className="nav-btn" onClick={goNext} disabled={currentIndex === routes.length - 1}>Next →</button>
      </div>
    </>
  );
}

export default App;
