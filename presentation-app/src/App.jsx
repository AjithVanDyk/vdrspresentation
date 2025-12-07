import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
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
import Summary from './pages/Summary';
import VanDykToolsDetail from './pages/VanDykToolsDetail';
import CostIQ from './pages/CostIQ';
import VDRSExchange from './pages/VDRSExchange';
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
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/rag-system" element={<PageTransition><RAGSystem /></PageTransition>} />
          <Route path="/dykscribe" element={<PageTransition><DykScribe /></PageTransition>} />
          <Route path="/cost-iq" element={<PageTransition><CostIQ /></PageTransition>} />
          <Route path="/vdrs-exchange" element={<PageTransition><VDRSExchange /></PageTransition>} />
          <Route path="/data-extractor" element={<PageTransition><DataExtractor /></PageTransition>} />
          <Route path="/cdms" element={<PageTransition><CDMS /></PageTransition>} />
          <Route path="/vdrs360" element={<PageTransition><VDRS360 /></PageTransition>} />
          <Route path="/tools" element={<PageTransition><VanDykTools /></PageTransition>} />
          <Route path="/vandyk-tools-detail" element={<PageTransition><VanDykToolsDetail /></PageTransition>} />
          <Route path="/mobile-app" element={<PageTransition><MobileApp /></PageTransition>} />
          <Route path="/website" element={<PageTransition><VDRSWebsite /></PageTransition>} />
          <Route path="/summary" element={<PageTransition><Summary /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const location = useLocation();
  
  const routes = [
    { path: '/', label: 'Home' },
    { path: '/rag-system', label: 'RAG' },
    { path: '/dykscribe', label: 'DykScribe' },
    { path: '/cost-iq', label: 'CostIQ' },
    { path: '/vdrs-exchange', label: 'Exchange' },
    { path: '/data-extractor', label: 'Extractor' },
    { path: '/cdms', label: 'CDMS' },
    { path: '/vdrs360', label: 'VDRS360' },
    { path: '/tools', label: 'Tools' },
    { path: '/mobile-app', label: 'Mobile' },
    { path: '/website', label: 'Website' },
    { path: '/summary', label: 'Life at VDRS' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-logo-container">
        <Link to="/">
          <img src="/images/logo/realvdrs.png" alt="VAN DYK" className="nav-logo" />
        </Link>
      </div>
      <div className="nav-links">
        {routes.map((route) => (
          <Link 
            key={route.path} 
            to={route.path} 
            className={`nav-link ${location.pathname === route.path ? 'active' : ''}`}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default App;
