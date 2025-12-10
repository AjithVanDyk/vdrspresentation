import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import Particles from '../components/Particles';
import { fadeInUp, staggerContainer, fadeInScale } from '../utils/animations';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  const handleHuskyClick = () => {
    const count = (window.huskyClickCount || 0) + 1;
    window.huskyClickCount = count;
    if (count === 3) {
      if (window.unlockAchievement) window.unlockAchievement('husky');
      window.huskyClickCount = 0;
      alert("🐾 Go Huskies!");
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
      <Particles count={60} />
      
      <motion.div 
        className="home-container"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-header" variants={fadeInUp}>
          <h1>8-Month Technical Internship Journey</h1>
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Transforming Operations at Van Dyk Recycling Solutions
          </motion.h2>
          <div className="hero-subtitle">Ajith Srikanth | Northeastern University</div>
        </motion.div>

        {/* Profile Section */}
        <motion.div className="profile-section" variants={fadeInScale}>
          <motion.img 
            src="/images/exp/Profile Pic M (1) (1).jpg" 
            alt="Ajith Srikanth"
            className="profile-image"
            whileHover={{ scale: 1.05 }}
          />
          <div className="profile-text">
            <h1 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--vd-primary-dark)' }}>
              Transforming Operations
            </h1>
            <h2 style={{ margin: '5px 0 0 0', fontSize: '1.4rem', color: 'var(--vd-neutral)' }}>
              8-Month Technical Internship Journey
            </h2>
          </div>
        </motion.div>

        {/* NU Badge */}
        <motion.div 
          className="nu-badge" 
          onClick={handleHuskyClick}
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/images/exp/husky.gif" alt="Husky" style={{ height: '40px' }} />
          <div>
            <img src="/images/exp/NU_Monogram_194x78.png" alt="NU" style={{ height: '20px', display: 'block' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--vd-neutral-light)' }}>
              Master's in Advanced and Intelligent Manufacturing
            </span>
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div className="metrics-row" variants={staggerContainer}>
          <motion.div 
            className="metric-item" 
            variants={fadeInUp} 
            style={{ '--card-color': '#667eea' }}
            whileHover={{ y: -10 }}
          >
            <div className="metric-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#667eea' }}>
              <AnimatedCounter value={11} duration={2} />
            </div>
            <div className="metric-label">Production Systems</div>
          </motion.div>

          <motion.div 
            className="metric-item" 
            variants={fadeInUp} 
            style={{ '--card-color': '#17a2b8' }}
            whileHover={{ y: -10 }}
          >
            <div className="metric-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#17a2b8' }}>
              <AnimatedCounter value={10000} duration={3} />+
            </div>
            <div className="metric-label">Files Processed</div>
          </motion.div>

          <motion.div 
            className="metric-item" 
            variants={fadeInUp} 
            style={{ '--card-color': '#ff9800' }}
            whileHover={{ y: -10 }}
          >
            <div className="metric-value" style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ff9800' }}>
              <AnimatedCounter value={100} duration={2} />GB
            </div>
            <div className="metric-label">Data Managed</div>
          </motion.div>
        </motion.div>

        {/* Journey */}
        <motion.div className="journey-section" variants={fadeInUp}>
          <div className="journey-title">
            🌏 Mechatronics → Operations → Manufacturing → After Sales
          </div>
          <div className="journey-grid">
            <div className="journey-column">
              <h4>🇮🇳 India (2022-2024)</h4>
              <ul>
                <li>Started on Shop Floor (Mechatronics)</li>
                <li>Learned Backend of Operations</li>
                <li>Reduced downtime by 83%</li>
              </ul>
            </div>
            <div className="journey-column">
              <h4>🇺🇸 United States (2024-2025)</h4>
              <ul>
                <li>Northeastern University Master's</li>
                <li>Building Custom AI Systems</li>
                <li>Streamlining Operations & Increasing Profits</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.button
          className="cta-btn-primary"
          onClick={() => navigate('/rag-system')}
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore My Work <span>→</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Home;
