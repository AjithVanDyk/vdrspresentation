import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import Particles from '../components/Particles';
import { Icon } from '../components/Icons';
import ClickableImage from '../components/ClickableImage';
import { fadeInUp, staggerContainer, fadeInScale } from '../utils/animations';
import './Home.css';

function Home() {
  const navigate = useNavigate();


  return (
    <div className="home-background" style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
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
            Transforming After Sales/Service Operations and Streamlining it
          </motion.h2>
          <div className="hero-subtitle">Ajith Srikanth | Northeastern University</div>
        </motion.div>

        {/* Profile Section */}
        <motion.div className="profile-section" variants={fadeInScale}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <ClickableImage
                src="/images/Editorial/DSC01481.JPG"
                alt="Ajith Srikanth"
                className="profile-image"
              />
            </motion.div>
          <div className="profile-text">
            <h2 style={{ margin: 0, fontSize: '2.5rem', color: 'var(--vd-primary-dark)' }}>
              Transforming Operations
            </h2>
            <h3 style={{ margin: '5px 0 0 0', fontSize: '1.4rem', color: 'var(--vd-neutral)' }}>
              8-Month Technical Internship Journey
            </h3>
          </div>
        </motion.div>

        {/* NU Badge */}
        <motion.div 
          className="nu-badge" 
          variants={fadeInUp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img src="/images/exp/husky.gif" alt="Husky" style={{ height: '40px' }} />
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--vd-neutral-dark)' }}>
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
              <AnimatedCounter value={30} duration={2} />
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
              <AnimatedCounter value={1} duration={2} />
            </div>
            <div className="metric-label">Website</div>
          </motion.div>
        </motion.div>

        {/* Journey */}
        <motion.div className="journey-section" variants={fadeInUp}>
          <h2 className="journey-title">
            <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
              <Icon name="globe" size={24} color="white" />
            </span>
            Mechatronics → Operations → Manufacturing → After Sales
          </h2>
          <div className="journey-grid">
            <div className="journey-column">
              <h3>
                <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
                  <Icon name="flag" size={20} color="white" />
                </span>
                India (2022-2024)
              </h3>
              <ul>
                <li>Started on Shop Floor (Mechatronics)</li>
                <li>Learned Backend of Operations</li>
                <li>Reduced downtime by 83%</li>
              </ul>
            </div>
            <div className="journey-column">
              <h3>
                <span style={{ display: 'inline-flex', alignItems: 'center', marginRight: '8px' }}>
                  <Icon name="flag" size={20} color="white" />
                </span>
                United States (2024-2025)
              </h3>
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
