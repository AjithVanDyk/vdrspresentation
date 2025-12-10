import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';

function CDMS() {
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
    <PresentationSlide className="dark-mode">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '3em', 
            background: 'linear-gradient(to right, #4facfe, #00f2fe)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            CDMS
          </h1>
          <h2 style={{ fontSize: '1.5em', color: '#a0aec0', fontWeight: '300', margin: '0 0 25px 0' }}>
            Container Document Management System
          </h2>
          
          <div style={{ display: 'inline-block' }}>
            <a 
              href="https://cdms.vdrs.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="live-project-btn"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 40px', 
                fontSize: '1.2em', 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(79, 172, 254, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <span>🚀</span> View Live System
            </a>
            <div style={{ fontSize: '0.9em', color: '#718096', marginTop: '10px' }}>
              (Walkthrough available after clicking)
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          
          {/* Problem & Solution Cards */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>📧</span>
              <h3 style={{ margin: 0, color: '#feb47b' }}>The Problem</h3>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              We had an old "Contracts App" that wasn't working well. Suppliers were emailing important files, which was messy and insecure.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>🛡️</span>
              <h3 style={{ margin: 0, color: '#68d391' }}>My Solution</h3>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              I built a secure website where suppliers can upload files directly. Even though I was new to React and Azure, I learned quickly and delivered a robust solution.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '0 0 25px 0', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { label: 'Partner Companies', value: 5, suffix: '', color: '#805ad5' },
            { label: 'Codebase', value: 3.5, suffix: 'K+', color: '#38a169' },
            { label: 'Uptime', value: 99.9, suffix: '%', color: '#3182ce' },
            { label: 'Users', value: 40, suffix: '+', color: '#d69e2e' }
          ].map((metric, index) => (
            <div key={index} className="metric-card" style={{ 
              background: `linear-gradient(135deg, ${metric.color}22 0%, ${metric.color}44 100%)`, 
              padding: '20px',
              borderRadius: '15px',
              border: `1px solid ${metric.color}44`,
              textAlign: 'center'
            }}>
              <div className="metric-value" style={{ fontSize: '2.5em', fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>
                <AnimatedCounter value={metric.value} duration={2} />{metric.suffix}
              </div>
              <div className="metric-label" style={{ color: '#cbd5e0', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features & Impact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h4 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Technical Architecture</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: '⚛️', text: 'Frontend: React & Material-UI' },
                { icon: '🟢', text: 'Backend: Node.js & Express' },
                { icon: '🗄️', text: 'DB: Azure SQL Server' },
                { icon: '☁️', text: 'Storage: Azure Blob Storage' },
                { icon: '🔐', text: 'Auth: OTP & JWT (Office 365)' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <span style={{ fontSize: '1.2em' }}>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h4 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Enterprise Features</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: '👥', text: 'RBAC: Supplier vs. Employee Views' },
                { icon: '📄', text: 'Docs: Auto-categorized Uploads' },
                { icon: '🔍', text: 'Search: VDRS Reference Tracking' },
                { icon: '🚀', text: 'CI/CD: GitHub Actions Pipelines' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <span style={{ fontSize: '1.2em' }}>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

      </motion.div>
    </PresentationSlide>
  );
}

export default CDMS;
