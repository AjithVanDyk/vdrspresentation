import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';
import { Icon } from '../components/Icons';

function VDRSWebsite() {
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
            background: 'linear-gradient(to right, #f83600, #f9d423)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            Van Dyk Website
          </h1>
          <h2 style={{ fontSize: '1.5em', color: '#a0aec0', fontWeight: '300', margin: '0 0 25px 0' }}>
            Modern Corporate Web Presence
          </h2>
          
          <div style={{ display: 'inline-block' }}>
            <a 
              href="https://vdrsweb.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className="live-project-btn"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 40px', 
                fontSize: '1.2em', 
                background: 'linear-gradient(135deg, #f83600 0%, #f9d423 100%)',
                borderRadius: '50px',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 'bold',
                boxShadow: '0 10px 20px rgba(248, 54, 0, 0.4)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <Icon name="rocket" size={20} color="white" /> View Live Website
            </a>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          
          {/* Problem & Solution Cards */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="web" size={32} color="#feb47b" />
              <h3 style={{ margin: 0, color: '#feb47b' }}>The Problem</h3>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              The existing corporate website was outdated, contained limited information about services and capabilities, and provided a poor mobile user experience. The design and functionality did not reflect Van Dyk's position as an industry leader in recycling solutions, potentially impacting brand perception and customer engagement.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="zap" size={32} color="#68d391" />
              <h3 style={{ margin: 0, color: '#68d391' }}>My Solution</h3>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Built a modern, fully responsive corporate website using React 18 and TypeScript. Features include professional design aligned with brand identity, optimized performance with 100 Lighthouse score, smooth Framer Motion animations, comprehensive SEO optimization, and flawless mobile responsiveness. The site works seamlessly across all devices and browsers, providing an exceptional user experience that reflects Van Dyk's market leadership.
            </p>
          </motion.div>
        </div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '0 0 25px 0', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { label: 'Lighthouse', value: 100, suffix: '', color: '#805ad5' },
            { label: 'Framework', value: 'React', suffix: '', color: '#38a169', isStatic: true },
            { label: 'Responsive', value: 'Mobile', suffix: '', color: '#3182ce', isStatic: true },
            { label: 'Deployment', value: 'Vercel', suffix: '', color: '#d69e2e', isStatic: true }
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
              <div className="metric-label" style={{ color: '#cbd5e0', fontSize: '0.9em', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Features & Impact Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h4 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Technologies Learned</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'atom', text: 'React 18 & TypeScript: Robust SPAs' },
                { icon: 'web', text: 'Tailwind CSS: Rapid styling' },
                { icon: 'zap', text: 'Framer Motion: Professional animations' },
                { icon: 'rocket', text: 'SEO & Performance: Optimization' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <Icon name={item.icon} size={20} color="#feb47b" /> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h4 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Business Impact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'web', text: 'Brand Elevation: Reflects market leadership' },
                { icon: 'web', text: 'Accessibility: Mobile-friendly information' },
                { icon: 'globe', text: 'Global Reach: Fast loading worldwide' }
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

export default VDRSWebsite;
