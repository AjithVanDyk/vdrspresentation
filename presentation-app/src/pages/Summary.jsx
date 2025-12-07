import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import PresentationSlide from '../components/PresentationSlide';

function Summary() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const eventImages = [
    "/images/exp/Image (4).jpg",
    "/images/exp/unnamed.jpg",
    "/images/exp/unnamed (1).jpg",
    "/images/exp/image.png",
    "/images/exp/image (3).jpg",
    "/images/exp/Screenshot 2025-10-07 163516.png",
    "/images/exp/IMG_9627.JPG"
  ];

  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Life at Van Dyk</h1>
        <h2>Impact, Culture, and Family</h2>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Career Journey Section */}
        <motion.div variants={itemVariants} className="journey-box" style={{ padding: '20px', margin: '15px 0' }}>
          <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.5em' }}>
            Mechatronics Engineer → Operations Manager → Manufacturing Engineer → After Sales Intern
          </h4>
          <p style={{ color: 'white', fontSize: '1.1em' }}>
            "My journey started on the shop floor, learning how machines work. Then I moved to understanding the backend of operations. Now, I use that deep operational knowledge to build custom AI systems. Logic is key—understanding the process first allows me to use AI effectively to streamline operations, improve efficiency, and increase profits."
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '15px 0' }}>
          <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
            <div className="metric-value" style={{ fontSize: '2.2em' }}>
              <AnimatedCounter value={11} duration={2} />
            </div>
            <div className="metric-label">Production Systems</div>
          </div>

          <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '20px' }}>
            <div className="metric-value" style={{ fontSize: '2.2em' }}>
              <AnimatedCounter value={2000} duration={2.5} />+
            </div>
            <div className="metric-label">Hours Invested</div>
          </div>

          <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '20px' }}>
            <div className="metric-value" style={{ fontSize: '2.2em' }}>
              <AnimatedCounter value={200} duration={3} />K
            </div>
            <div className="metric-label">Annual Impact</div>
          </div>

          <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '20px' }}>
            <div className="metric-value" style={{ fontSize: '2.2em' }}>
              <AnimatedCounter value={100} duration={2} />%
            </div>
            <div className="metric-label">Commitment</div>
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.div variants={itemVariants} style={{ margin: '30px 0' }}>
          <h3 style={{ borderBottom: '2px solid var(--vdrs-orange)', paddingBottom: '10px', marginBottom: '20px' }}>
            More Than Just Work - A Family
          </h3>
          
          <div className="image-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '20px' }}>
            {eventImages.map((src, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.05 }}
                style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              >
                <img 
                  src={src} 
                  alt={`Van Dyk Event ${index + 1}`}
                  style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Acknowledgments Section */}
        <motion.div variants={itemVariants} className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
          <div style={{ margin: 0, padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: 'var(--vdrs-blue)' }}>Special Thanks</h4>
            <ul style={{ fontSize: '0.95em', color: '#333', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px', color: '#333' }}>
                <strong>Ginny, Victoria, & Paul:</strong> Thank you for being so open, welcoming, and easy to work with. You made me feel at home.
              </li>
              <li style={{ marginBottom: '10px', color: '#333' }}>
                <strong>Faizan:</strong> Thank you for the opportunity to explore, for trusting me to "fix it but not break it," and for believing that my experiments would work out.
              </li>
              <li style={{ marginBottom: '10px', color: '#333' }}>
                <strong>Gary & Sergio:</strong> Appreciate the help with the space and tools to work on my car!
              </li>
              <li style={{ marginBottom: '10px', color: '#333' }}>
                <strong>Chef Steve:</strong> For the amazing food (and the free extras!).
              </li>
            </ul>
          </div>

          <div style={{ margin: 0, padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: 'var(--vdrs-blue)' }}>The Team</h4>
            <ul style={{ fontSize: '0.95em', color: '#333', listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px', color: '#333' }}>
                <strong>Daksh:</strong> Thanks for helping me out so many times.
              </li>
              <li style={{ marginBottom: '10px', color: '#333' }}>
                <strong>Adeeb:</strong> For hanging out and being a great friend.
              </li>
              <li style={{ marginBottom: '10px', color: '#333' }}>
                <strong>Intern Squad:</strong> Zach, Claudia, Ainsley, and Arjun - thanks for making the first few months memorable.
              </li>
              <li style={{ marginTop: '15px', fontStyle: 'italic', borderTop: '1px solid #eee', paddingTop: '10px', color: '#555' }}>
                "Even though I didn't have any family here, Van Dyk became my family."
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Contact Footer */}
        <motion.div 
          variants={itemVariants}
          style={{ 
            marginTop: '30px', 
            textAlign: 'center',
            padding: '25px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            border: '2px solid var(--vdrs-orange)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
            <img 
              src="/images/exp/Profile Pic M (1) (1).jpg" 
              alt="Ajith Srikanth"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--vdrs-blue)' }}
            />
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'var(--vdrs-blue)' }}>
                Ajith Srikanth
              </div>
              <div style={{ fontSize: '1.1em', color: '#666' }}>
                After Sales/Manufacturing Intern
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <a 
              href="mailto:ajithsrikanth.f@northeastern.edu" 
              className="contact-btn"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '12px 25px', 
                background: '#f0f4f8', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                color: '#333',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <span style={{ fontSize: '1.5em' }}>✉️</span>
              <span>Email Me</span>
            </a>
            
            <a 
              href="https://linkedin.com/in/as31" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-btn"
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                padding: '12px 25px', 
                background: '#0077b5', 
                borderRadius: '50px', 
                textDecoration: 'none', 
                color: 'white',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              <span style={{ fontSize: '1.5em' }}>🔗</span>
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Decorative Baler SVG */}
      <img 
        src="/images/exp/image (1).png" 
        alt="Baler Graphic" 
        style={{ 
          position: 'absolute', 
          bottom: '20px', 
          right: '20px', 
          width: '80px', 
          opacity: 0.1,
          pointerEvents: 'none'
        }} 
      />
    </PresentationSlide>
  );
}

export default Summary;
