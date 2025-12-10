import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';

function CostIQ() {
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
            background: 'linear-gradient(to right, #f59e0b, #d97706)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            CostIQ
          </h1>
          <h2 style={{ fontSize: '1.5em', color: '#a0aec0', fontWeight: '300', margin: '0 0 25px 0' }}>
            Travel Cost ML Pipeline
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
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(245, 158, 11, 0.4)',
                cursor: 'default'
              }}
            >
              <span>🧠</span> Predictive Analytics
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          
          {/* Problem & Solution Cards */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>📉</span>
              <h2 style={{ margin: 0, color: '#feb47b' }}>The Challenge</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Quoting service travel costs was a manual, estimation-heavy process. We needed a way to accurately predict multi-leg trip costs (flights, lodging, ground) instantly.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>🤖</span>
              <h2 style={{ margin: 0, color: '#68d391' }}>My Solution</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Built a Flask-based ML pipeline with 3 specialized models for Airfare, Lodging, and Mileage. It uses SQL data to predict precise service costs for customer quotes.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '0 0 25px 0', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { label: 'Models', value: 3, suffix: '', color: '#805ad5' },
            { label: 'Accuracy', value: 92, suffix: '%', color: '#38a169' },
            { label: 'Quote Time', value: 5, suffix: 's', color: '#3182ce' },
            { label: 'Data Points', value: 10, suffix: 'K+', color: '#d69e2e' }
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
                { icon: '🐍', text: 'Backend: Flask & Python' },
                { icon: '🧠', text: 'ML: 3 Specialized Models' },
                { icon: '🗄️', text: 'Data: SQL (Single Source of Truth)' },
                { icon: '🔄', text: 'Validation: Cross-validation Pipeline' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <span style={{ fontSize: '1.2em' }}>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h2 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Business Impact</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: '💰', text: 'Revenue: Accurate quoting prevents loss' },
                { icon: '⚡', text: 'Speed: Instant quotes vs manual calculation' },
                { icon: '🎯', text: 'Precision: Component-based cost breakdown' }
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

export default CostIQ;
