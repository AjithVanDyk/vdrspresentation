import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';
import { Icon } from '../components/Icons';

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
          
          <div style={{ display: 'inline-block', marginBottom: '20px' }}>
            <a 
              href="https://vdrs-costiq.onrender.com/" 
              target="_blank" 
              rel="noopener noreferrer"
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
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
            >
              <Icon name="rocket" size={20} color="white" /> View Live System
            </a>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          
          {/* Problem & Solution Cards */}
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="chart" size={32} color="#feb47b" />
              <h2 style={{ margin: 0, color: '#feb47b' }}>The Challenge</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Quoting service travel costs was a manual, estimation-heavy process that required extensive time and often led to inaccuracies. We needed a way to accurately predict multi-leg trip costs (flights, lodging, ground transportation) instantly with high precision to prevent revenue loss from incorrect quotes.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="robot" size={32} color="#68d391" />
              <h2 style={{ margin: 0, color: '#68d391' }}>My Solution</h2>
            </div>
            <p style={{ color: '#e2e8f0', lineHeight: '1.6' }}>
              Built a production-ready Flask-based ML pipeline with 3 specialized models (Airfare, Lodging, Mileage) trained on 10,000+ historical data points. The system features auto column mapping, intelligent outlier detection, hyperparameter tuning with Optuna, and MLflow experiment tracking. It generates quotes with 95% confidence intervals in under 5 seconds.
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
                { icon: 'python', text: 'Backend: Flask API with React frontend' },
                { icon: 'brain', text: 'ML: 12+ models tested (CatBoost, XGBoost, LightGBM)' },
                { icon: 'database', text: 'Data: Excel-based with auto column mapping' },
                { icon: 'refresh', text: 'MLflow: Experiment tracking and model versioning' },
                { icon: 'zap', text: 'Optimization: Optuna hyperparameter tuning' },
                { icon: 'check', text: 'Validation: Intelligent outlier detection' }
              ].map((item, i) => (
                <li key={i} style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
                  <Icon name={item.icon} size={20} color="#feb47b" /> {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px' }}>
            <h2 style={{ color: '#a0aec0', borderBottom: '1px solid #4a5568', paddingBottom: '10px', marginBottom: '15px' }}>Business Impact</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                { icon: 'money', text: 'Revenue Protection: 92% accuracy prevents costly misquotes' },
                { icon: 'zap', text: 'Speed: 5-second quotes vs hours of manual calculation' },
                { icon: 'target', text: 'Precision: Component-based breakdown with confidence intervals' },
                { icon: 'rocket', text: 'Scalability: Handles 10K+ data points efficiently' },
                { icon: 'check', text: 'Reliability: MLflow tracking ensures model quality' }
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

export default CostIQ;
