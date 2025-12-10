import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';

function VDRSExchange() {
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
            VDRS Exchange
          </h1>
          <h2 style={{ fontSize: '1.5em', color: '#a0aec0', fontWeight: '300', margin: '0 0 25px 0' }}>
            Enterprise Secure File Exchange
          </h2>
          
          <div style={{ display: 'inline-block' }}>
            <div 
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
                cursor: 'default'
              }}
            >
              <span>🔒</span> Secure Supplier Portal
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          
          {/* Problem & Solution Cards */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>⚠️</span>
              <h2 style={{ margin: 0, color: '#feb47b' }}>The Challenge</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Suppliers needed a secure way to upload specific project files (Schematics, Manuals) without relying on insecure emails or complex FTP clients.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>🛡️</span>
              <h2 style={{ margin: 0, color: '#68d391' }}>My Solution</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Built a secure web portal with OTP authentication. Suppliers can easily upload files into 5 specific categories, which are automatically organized into our internal Azure Files structure.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '0 0 25px 0', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { label: 'Categories', value: 5, suffix: '', color: '#805ad5' },
            { label: 'Security', value: 256, suffix: '-bit', color: '#38a169' },
            { label: 'Uptime', value: 99, suffix: '%', color: '#3182ce' },
            { label: 'Integration', value: 100, suffix: '%', color: '#d69e2e' }
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
                { icon: '🔐', text: 'Auth: OTP with SHA-256 Hashing' },
                { icon: '🗄️', text: 'Backend: Flask & SQL Server' },
                { icon: '☁️', text: 'Storage: Azure Files (FTP Mirror)' },
                { icon: '⚛️', text: 'Frontend: React & Material-UI' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <span style={{ fontSize: '1.2em' }}>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h2 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Workflow Impact</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: '📂', text: 'Organization: Auto-sorted by Project' },
                { icon: '✅', text: 'Clarity: 5 Distinct File Categories' },
                { icon: '🔄', text: 'Sync: Instant Internal Access' }
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

export default VDRSExchange;
