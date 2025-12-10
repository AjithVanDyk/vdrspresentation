import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';
import { Icon } from '../components/Icons';

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
              <Icon name="rocket" size={20} color="white" /> View Live System
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
              <Icon name="mail" size={32} color="#feb47b" />
              <h2 style={{ margin: 0, color: '#feb47b' }}>The Problem</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              The legacy "Contracts App" was unreliable and difficult to maintain. Suppliers were forced to email critical project files (schematics, manuals, safety documents), creating security risks, organizational chaos, and version control issues. There was no centralized, secure system for document exchange with external partners.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="shield" size={32} color="#68d391" />
              <h2 style={{ margin: 0, color: '#68d391' }}>My Solution</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Built a production-ready Container Document Management System (CDMS) using React frontend and Node.js/Express backend. Features include secure OTP authentication with SHA-256 hashing, role-based access control (supplier vs. employee views), automatic file categorization into 5 distinct categories, Azure Blob Storage integration, and seamless synchronization with internal Azure Files structure. The system provides a professional, secure portal for supplier document uploads.
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
            <h2 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Technical Architecture</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'atom', text: 'Frontend: React & Material-UI' },
                { icon: 'server', text: 'Backend: Node.js & Express' },
                { icon: 'database', text: 'DB: Azure SQL Server' },
                { icon: 'cloud', text: 'Storage: Azure Blob Storage' },
                { icon: 'lock', text: 'Auth: OTP & JWT (Office 365)' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <Icon name={item.icon} size={20} color="#feb47b" /> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h2 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Enterprise Features</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'users', text: 'RBAC: Supplier vs. Employee Views' },
                { icon: 'file', text: 'Docs: Auto-categorized Uploads' },
                { icon: 'search', text: 'Search: VDRS Reference Tracking' },
                { icon: 'rocket', text: 'CI/CD: GitHub Actions Pipelines' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <Icon name={item.icon} size={20} color="#feb47b" /> {item.text}
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
