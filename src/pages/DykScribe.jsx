import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';

function DykScribe() {
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
          <h1 className="dykscribe-title" style={{ 
            fontSize: '3.5em', 
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            DykScribe
          </h1>
          <h2 style={{ fontSize: '1.5em', fontWeight: '300', margin: '0 0 25px 0' }}>
            Knowledge Capture & Engineer Intelligence System
          </h2>
          
          <div style={{ display: 'inline-block' }}>
            <a 
              href="https://dykscribe.streamlit.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="live-project-btn"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 40px', 
                fontSize: '1.2em', 
                background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(255, 126, 95, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <span>🚀</span> View Live Demo
            </a>
            <div style={{ fontSize: '0.9em', marginTop: '10px' }}>
              (Walkthrough available after clicking)
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          
          {/* Problem & Solution Cards */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>🧩</span>
              <h3 style={{ margin: 0, color: '#feb47b' }}>The Problem</h3>
            </div>
            <p style={{ lineHeight: '1.6' }}>
              When experienced engineers retire, their knowledge leaves with them. There was no easy way to save their troubleshooting tips for new employees.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <span style={{ fontSize: '2em' }}>💡</span>
              <h3 style={{ margin: '0', color: '#68d391' }}>My Solution</h3>
            </div>
            <p style={{ lineHeight: '1.6' }}>
              I built a web app where engineers can record their answers by speaking or typing. It saves their knowledge so everyone can learn from it.
            </p>
          </motion.div>
        </div>

        {/* "What's in a Name?" Feature */}
        <motion.div 
          variants={itemVariants}
          style={{ 
            margin: '0 0 25px 0', 
            padding: '20px', 
            background: 'linear-gradient(90deg, rgba(66, 153, 225, 0.1) 0%, rgba(49, 130, 206, 0.05) 100%)', 
            borderRadius: '15px', 
            borderLeft: '5px solid #4299e1',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <span style={{ fontSize: '2.5em' }}>🤔</span>
          <div>
            <h4 style={{ margin: '0 0 5px 0', color: '#63b3ed', fontSize: '1.2em' }}>What's in a Name?</h4>
            <p style={{ margin: 0, fontSize: '1.1em', color: '#bee3f8' }}>
              <strong>"DykScribe"</strong> = <strong>"Van Dyk"</strong> + <strong>"Describe"</strong>. 
              It's about describing technical problems to build a shared brain for the company.
            </p>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '0 0 25px 0', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { label: 'Target Engineers', value: 50, suffix: '', color: '#805ad5' },
            { label: 'Data Points', value: '∞', suffix: '', color: '#38a169', isStatic: true },
            { label: 'Voice Capable', value: 100, suffix: '%', color: '#3182ce' },
            { label: 'Database', value: 'SQL', suffix: '', color: '#d69e2e', isStatic: true }
          ].map((metric, index) => (
            <div key={index} className="metric-card" style={{ 
              background: `linear-gradient(135deg, ${metric.color}22 0%, ${metric.color}44 100%)`, 
              padding: '20px',
              borderRadius: '15px',
              border: `1px solid ${metric.color}44`,
              textAlign: 'center'
            }}>
              <div className="metric-value" style={{ fontSize: '2.5em', fontWeight: 'bold', color: 'white', marginBottom: '5px' }}>
                {metric.isStatic ? metric.value : <AnimatedCounter value={metric.value} duration={2} />}{metric.suffix}
              </div>
              <div className="metric-label" style={{ fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features & Impact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h4 style={{ borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Key Features</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: '🎙️', text: 'Voice Recording: Speak instead of type' },
                { icon: '🎮', text: 'Points System: Gamified sharing' },
                { icon: '🔍', text: 'Easy Search: Instant answers' },
                { icon: '🛡️', text: 'SQL Database: Secure storage' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '1.2em' }}>{item.icon}</span> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h4 style={{ borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Business Impact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: '🧠', text: 'Save Knowledge: Retain expertise' },
                { icon: '🚀', text: 'Train Faster: "Shared brain" for new hires' },
                { icon: '⚡', text: 'Better Service: Faster fixes' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
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

export default DykScribe;
