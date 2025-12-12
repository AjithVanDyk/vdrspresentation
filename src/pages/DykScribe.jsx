import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';
import { Icon } from '../components/Icons';

function DykScribe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <PresentationSlide>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ 
          height: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          opacity: 1,
          minHeight: '100vh'
        }}
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
          <h2 style={{ fontSize: '1.5em', fontWeight: '300', margin: '0 0 25px 0', color: '#4a5568' }}>
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
              <Icon name="rocket" size={20} color="white" /> View Live Demo
            </a>
            <div style={{ fontSize: '0.9em', marginTop: '10px', color: '#718096' }}>
              (Walkthrough available after clicking)
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          
          {/* Problem & Solution Cards */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="puzzle" size={32} color="#dd6b20" />
              <h2 style={{ margin: 0, color: '#dd6b20' }}>The Problem</h2>
            </div>
            <p style={{ lineHeight: '1.6', color: '#2d3748', fontSize: '1em' }}>
              When experienced engineers retire or move on, their invaluable troubleshooting knowledge and field expertise leaves with them. There was no systematic way to capture, store, and share this institutional knowledge with new employees, leading to repeated mistakes and slower problem resolution.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="lightbulb" size={32} color="#38a169" />
              <h2 style={{ margin: '0', color: '#38a169' }}>My Solution</h2>
            </div>
            <p style={{ lineHeight: '1.6', color: '#2d3748', fontSize: '1em' }}>
              Built a sophisticated Streamlit web application that enables engineers to capture knowledge through dual input methods: voice recording with AI transcription (OpenAI Whisper) or manual Q&A entry. The system uses GPT-4 for intelligent Q&A extraction, integrates with SQL Server for secure storage, and includes equipment management, PDF manual uploads, and a gamified points system to encourage knowledge sharing.
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
          <Icon name="question" size={40} color="#63b3ed" />
          <div>
            <h3 style={{ margin: '0 0 5px 0', color: '#3182ce', fontSize: '1.2em' }}>What's in a Name?</h3>
            <p style={{ margin: 0, fontSize: '1.1em', color: '#2d3748' }}>
              <strong style={{ color: '#3182ce' }}>"DykScribe"</strong> = <strong style={{ color: '#3182ce' }}>"Van Dyk"</strong> + <strong style={{ color: '#3182ce' }}>"Describe"</strong>. 
              It's about describing technical problems to build a shared brain for the company.
            </p>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '0 0 25px 0', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { label: 'Target Engineers', value: 50, suffix: '', color: '#805ad5' },
            { label: 'Service Engineer Brain', value: '∞', suffix: '', color: '#38a169', isStatic: true, description: 'Collective knowledge grows infinitely as engineers contribute their experience' },
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
              <div className="metric-value" style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#2d3748', marginBottom: '5px' }}>
                {metric.isStatic ? metric.value : <AnimatedCounter value={metric.value} duration={2} />}{metric.suffix}
              </div>
              <div className="metric-label" style={{ fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px', color: '#4a5568', fontWeight: '500', marginBottom: metric.description ? '8px' : '0' }}>
                {metric.label}
              </div>
              {metric.description && (
                <div style={{ fontSize: '0.75em', color: '#718096', fontStyle: 'italic', lineHeight: '1.3', marginTop: '5px' }}>
                  {metric.description}
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Features & Impact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h2 style={{ color: '#dd6b20', borderBottom: '1px solid #cbd5e0', paddingBottom: '10px', marginBottom: '15px' }}>Key Features</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'microphone', text: 'Dual Input: Voice recording (Whisper AI) or manual entry' },
                { icon: 'brain', text: 'AI Processing: GPT-4 for intelligent Q&A extraction' },
                { icon: 'gamepad', text: 'Points System: 1 point per valid Q&A pair' },
                { icon: 'database', text: 'SQL Server: Secure storage with duplicate prevention' },
                { icon: 'file', text: 'PDF Uploads: Attach equipment manuals (up to 25MB)' },
                { icon: 'building', text: 'Equipment Management: Dynamic type/manufacturer/model selection' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748', fontSize: '1em' }}>
                  <Icon name={item.icon} size={20} color="#dd6b20" /> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h2 style={{ color: '#dd6b20', borderBottom: '1px solid #cbd5e0', paddingBottom: '10px', marginBottom: '15px' }}>Business Impact</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'brain', text: 'Knowledge Retention: Preserve institutional expertise' },
                { icon: 'rocket', text: 'Faster Training: "Shared brain" accelerates onboarding' },
                { icon: 'zap', text: 'Improved Service: Instant access to proven solutions' },
                { icon: 'shield', text: 'Data Security: Hash-based duplicate prevention' },
                { icon: 'refresh', text: 'Future Integration: Combines with RAG for complete knowledge base' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748', fontSize: '1em' }}>
                  <Icon name={item.icon} size={20} color="#dd6b20" /> {item.text}
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
