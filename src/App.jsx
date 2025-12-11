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
import Customers from './pages/Customers';

// Theme Configuration
const LIGHT_THEME_ROUTES = ['/rag-system', '/dykscribe', '/vdrs360', '/mobile-app'];

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

function AppWrapper() {
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Determine if current route should be light theme
  const isLightTheme = LIGHT_THEME_ROUTES.includes(location.pathname);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
      document.documentElement.style.setProperty('--mouse-x', x);
      document.documentElement.style.setProperty('--mouse-y', y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={`app ${isLightTheme ? 'theme-light' : 'theme-dark'}`}>
      <div className="bg-gradient" style={{
        transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px) scale(1.05)`
      }} />
      <AppContent />
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition key="home"><Home /></PageTransition>} />
          
          {/* Incomplete / Light Theme Group */}
          <Route path="/rag-system" element={<PageTransition key="rag"><RAGSystem /></PageTransition>} />
          <Route path="/dykscribe" element={<PageTransition key="dykscribe"><DykScribe /></PageTransition>} />
          <Route path="/vdrs360" element={<PageTransition key="vdrs360"><VDRS360 /></PageTransition>} />
          <Route path="/mobile-app" element={<PageTransition key="mobile"><MobileApp /></PageTransition>} />
          
          {/* Completed / Dark Theme Group */}
          <Route path="/website" element={<PageTransition key="website"><VDRSWebsite /></PageTransition>} />
          <Route path="/tools" element={<PageTransition key="tools"><VanDykTools /></PageTransition>} />
          <Route path="/cdms" element={<PageTransition key="cdms"><CDMS /></PageTransition>} />
          <Route path="/vdrs-exchange" element={<PageTransition key="exchange"><VDRSExchange /></PageTransition>} />
          <Route path="/cost-iq" element={<PageTransition key="costiq"><CostIQ /></PageTransition>} />
          <Route path="/customers" element={<PageTransition key="customers"><Customers /></PageTransition>} />
          <Route path="/summary" element={<PageTransition key="summary"><Summary /></PageTransition>} />
          
          {/* Hidden/Detail Routes */}
          <Route path="/data-extractor" element={<PageTransition key="extractor"><DataExtractor /></PageTransition>} />
          <Route path="/vandyk-tools-detail" element={<PageTransition key="tools-detail"><VanDykToolsDetail /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function PageTransition({ children }) {
  useEffect(() => {
    // Scroll to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ width: '100%', minHeight: '100vh', position: 'relative' }}
    >
      {children}
    </motion.div>
  );
}

function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Custom Chronology Order (Home hidden from chronological text list to match user request)
  const routes = [
    { path: '/rag-system', label: 'RAG' },
    { path: '/dykscribe', label: 'DykScribe' },
    { path: '/vdrs360', label: 'VDRS360' },
    { path: '/mobile-app', label: 'Mobile' },
    { path: '/website', label: 'Website' },
    { path: '/tools', label: 'Tools' },
    { path: '/cdms', label: 'CDMS' },
    { path: '/vdrs-exchange', label: 'Exchange' },
    { path: '/cost-iq', label: 'CostIQ' },
    { path: '/customers', label: 'Customers' },
    { path: '/summary', label: 'Life at VDRS' }
  ];

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-logo-container">
        <Link to="/">
          <motion.img 
            src="/images/logo/realvdrs.png" 
            alt="VAN DYK" 
            className="nav-logo" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </Link>
      </div>
      <div className="nav-links">
        {routes.map((route, i) => (
          <Link 
            key={route.path} 
            to={route.path} 
          >
            <motion.div
              className={`nav-link ${location.pathname === route.path ? 'active' : ''}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.3 }}
            >
              {route.label}
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.nav>
  );
}

export default App;
