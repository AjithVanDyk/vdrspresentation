import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';

import PresentationSlide from '../components/PresentationSlide';

function Summary() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Internship Summary</h1>
        <h2>8 Months of Impact & Innovation</h2>
      </div>

      <div className="journey-box" style={{ padding: '20px', margin: '15px 0' }}>
        <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.5em' }}>
          From Manufacturing Engineer to Full-Stack Developer
        </h4>
        <p style={{ color: 'white', fontSize: '1.1em' }}>
          "I came to Van Dyk with a manufacturing mindset - fix the root cause, eliminate waste, and optimize flow. I applied these same principles to software development, building systems that don't just work, but transform how the company operates."
        </p>
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
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
      </div>

      <h3>Key Achievements</h3>
      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ padding: '15px' }}>
          <h4 style={{ margin: '10px 0' }}>Technical Milestones</h4>
          <ul style={{ fontSize: '0.95em' }}>
            <li><strong>First AI Project:</strong> Built RAG system with 60% accuracy</li>
            <li><strong>First Full-Stack App:</strong> Created CDMS with React & Node.js</li>
            <li><strong>First Mobile App:</strong> Developed Van Dyk One replacement</li>
            <li><strong>First Web Platform:</strong> Consolidated 8 tools into one Hub</li>
          </ul>
        </div>
        
        <div className="tech-list" style={{ padding: '15px' }}>
          <h4 style={{ margin: '10px 0' }}>Professional Growth</h4>
          <ul style={{ fontSize: '0.95em' }}>
            <li><strong>Adaptability:</strong> Learned 5+ new frameworks</li>
            <li><strong>Problem Solving:</strong> Applied manufacturing TPM to software</li>
            <li><strong>Communication:</strong> Bridged gap between engineering and sales</li>
            <li><strong>Leadership:</strong> Took ownership of end-to-end projects</li>
          </ul>
        </div>
      </div>

      <div style={{ 
        marginTop: 'auto', 
        textAlign: 'center',
        padding: '20px',
        background: 'white',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        border: '2px solid var(--vdrs-orange)'
      }}>
        <h3 style={{ border: 'none', padding: 0, margin: '0 0 10px 0', fontSize: '1.8em' }}>Thank You!</h3>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '10px' }}>
          <img 
            src="/images/exp/Profile Pic M (1) (1).jpg" 
            alt="Ajith Srikanth"
            style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '1.2em', fontWeight: 'bold', color: 'var(--vdrs-blue)' }}>
              Ajith Srikanth
            </div>
            <div style={{ fontSize: '1em', color: '#666' }}>
              After Sales/Manufacturing Intern
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
          <a href="mailto:srikanth.aj@northeastern.edu" style={{ color: 'var(--vdrs-blue)', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ✉️ srikanth.aj@northeastern.edu
          </a>
          <a href="https://linkedin.com/in/ajithsrikanth" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5', textDecoration: 'none', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔗 linkedin.com/in/ajithsrikanth
          </a>
        </div>
      </div>
      
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
