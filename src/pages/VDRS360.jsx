import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';
import { Icon } from '../components/Icons';

function VDRS360() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <PresentationSlide>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '3.5em', 
            background: 'linear-gradient(to right, #00539B, #3182ce)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            VDRS360
          </h1>
          <h2 style={{ fontSize: '1.5em', color: '#4a5568', fontWeight: '300', margin: '0 0 25px 0' }}>
            Excel-Based AMI on Steroids - Equipment Management System
          </h2>
          
          <div style={{ display: 'inline-block', marginBottom: '20px' }}>
            <a 
              href="https://vdrsequip360.streamlit.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="live-project-btn"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 40px', 
                fontSize: '1.2em', 
                background: 'linear-gradient(135deg, #00539B 0%, #3182ce 100%)',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(0, 83, 155, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <Icon name="rocket" size={20} color="white" /> View Live System
            </a>
          </div>
        </motion.div>

        {/* Problem & Solution Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.9)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="puzzle" size={32} color="#e53e3e" />
              <h3 style={{ margin: 0, color: '#e53e3e' }}>The Problem</h3>
            </div>
            <p style={{ lineHeight: '1.6', color: '#2d3748' }}>
              Equipment data was scattered across multiple disconnected systems with no unified interface. Field engineers and operations teams lacked a centralized view of machine information, maintenance history, operational status, and lifecycle data. Manual data compilation from various sources was extremely time-consuming and error-prone, hindering efficient equipment management and decision-making.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.9)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="lightbulb" size={32} color="#38a169" />
              <h3 style={{ margin: 0, color: '#38a169' }}>My Solution</h3>
            </div>
            <p style={{ lineHeight: '1.6', color: '#2d3748' }}>
              Built a sophisticated Excel-based Asset Management Interface (AMI) that establishes direct two-way communication with SQL Server databases. The system fetches and updates more than 10,000 lines of equipment data in real-time, providing a familiar Excel interface with powerful database integration. Custom VBA macros enable automated data synchronization, validation, and reporting, transforming Excel into a robust equipment management platform.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '15px 0' }}>
          <div className="metric-card" style={{ background: 'var(--vd-gradient-hero)', padding: '15px' }}>
            <div className="metric-value" style={{ fontSize: '2em' }}>10K+</div>
            <div className="metric-label">SQL Lines</div>
          </div>

          <div className="metric-card" style={{ background: 'var(--vd-gradient-primary)', padding: '15px' }}>
            <div className="metric-value" style={{ fontSize: '2em' }}>Excel</div>
            <div className="metric-label">Platform</div>
          </div>

          <div className="metric-card" style={{ background: 'linear-gradient(135deg, var(--vd-primary-light) 0%, var(--vd-primary) 100%)', padding: '15px' }}>
            <div className="metric-value" style={{ fontSize: '2em' }}>SQL</div>
            <div className="metric-label">Database</div>
          </div>

          <div className="metric-card" style={{ background: 'var(--vd-gradient-accent)', padding: '15px' }}>
            <div className="metric-value" style={{ fontSize: '2em' }}>Real-Time</div>
            <div className="metric-label">Sync</div>
          </div>
        </motion.div>

        {/* System Capabilities & Current Status */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          <motion.div variants={itemVariants} style={{ padding: '20px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#00539B', borderBottom: '2px solid #00539B', paddingBottom: '10px' }}>System Capabilities</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9em' }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="database" size={18} color="#00539B" /> <strong>SQL Integration:</strong> Direct, secure connection to SQL databases for comprehensive data access.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="refresh" size={18} color="#00539B" /> <strong>Two-Way Sync:</strong> Ability to both fetch and update records in real-time, ensuring data accuracy.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="refresh" size={18} color="#00539B" /> <strong>Real-Time Data:</strong> Live connection to SQL server provides up-to-the-minute equipment information.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="zap" size={18} color="#00539B" /> <strong>Automation:</strong> Custom VBA macros automate complex data compilation and reporting tasks.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="chart" size={18} color="#00539B" /> <strong>Centralized View:</strong> Provides a unified dashboard for machine information, maintenance history, and operational status.
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#FF6B35', borderBottom: '2px solid #FF6B35', paddingBottom: '10px' }}>Current Status & Business Value</h4>
            <p style={{ fontSize: '0.95em', color: '#2d3748', margin: 0, lineHeight: '1.6' }}>
              The VDRS360 system is fully developed and rigorously tested, demonstrating robust integration with over 10,000 lines of SQL data. This project showcases the ability to build complex, high-performance Excel-based Asset Management Interfaces (AMI) that significantly reduce manual data compilation time and enhance operational oversight. It provides a critical centralized view, transforming scattered data into actionable insights.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </PresentationSlide>
  );
}

export default VDRS360;
