import { useNavigate } from 'react-router-dom';
import AnimatedCounter from '../components/AnimatedCounter';

import PresentationSlide from '../components/PresentationSlide';

function Home() {
  const navigate = useNavigate();

  return (
    <PresentationSlide className="home-page">
      <div className="slide-header">
        <h1>8-Month Technical Internship Journey</h1>
        <h2>Transforming Operations at Van Dyk Recycling Solutions</h2>
        <div className="subtitle">Ajith Srikanth | Northeastern University</div>
      </div>

      {/* Profile Section with Image */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        marginBottom: '20px',
        justifyContent: 'center'
      }}>
        <img 
          src="/images/exp/Profile Pic M (1) (1).jpg" 
          alt="Ajith Srikanth"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '4px solid var(--vdrs-orange)',
            objectFit: 'cover',
            boxShadow: '0 8px 32px rgba(214, 102, 56, 0.3)'
          }}
        />
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '2.5em', margin: 0 }}>
            Transforming Operations
          </h1>
          <h2 style={{ fontSize: '1.5em', margin: '5px 0 0 0' }}>
            8-Month Technical Internship Journey
          </h2>
        </div>
      </div>

      {/* Northeastern University Section */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        marginBottom: '20px',
        padding: '10px 20px',
        background: 'rgba(30, 60, 114, 0.05)',
        borderRadius: '15px',
        border: '2px solid rgba(214, 102, 56, 0.2)',
        width: 'fit-content',
        margin: '0 auto 20px auto'
      }}>
        <img 
          src="/images/exp/husky.gif" 
          alt="Northeastern Husky"
          style={{ height: '50px', cursor: 'pointer' }}
          onClick={() => {
            const count = (window.huskyClickCount || 0) + 1;
            window.huskyClickCount = count;
            if (count === 3) {
              if (window.unlockAchievement) window.unlockAchievement('husky');
              window.huskyClickCount = 0;
              alert("🐾 Go Huskies!");
            }
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <img 
            src="/images/exp/NU_Monogram_194x78.png" 
            alt="Northeastern University" 
            style={{ height: '25px', marginBottom: '4px' }}
          />
          <div style={{ fontSize: '0.85em', color: '#666' }}>
            Master's in Advanced and Intelligent Manufacturing
          </div>
        </div>
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
          <div className="metric-value" style={{ fontSize: '2.2em' }}>
            <AnimatedCounter value={11} duration={2} />
          </div>
          <div className="metric-label">Production Systems</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '20px' }}>
          <div className="metric-value" style={{ fontSize: '2.2em' }}>
            <AnimatedCounter value={10000} duration={3} />+
          </div>
          <div className="metric-label">Files Processed</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '20px' }}>
          <div className="metric-value" style={{ fontSize: '2.2em' }}>
            <AnimatedCounter value={100} duration={2} />GB
          </div>
          <div className="metric-label">Data Managed</div>
        </div>
      </div>

      {/* Journey Box */}
      <div className="journey-box" style={{ padding: '20px', margin: '15px 0' }}>
        <h4 style={{ color: 'white', marginBottom: '15px', fontSize: '1.3em' }}>
          🌏 Mechatronics → Operations → Manufacturing → After Sales
        </h4>
        <div className="two-column" style={{ textAlign: 'left', gap: '20px', margin: 0 }}>
          <div>
            <p style={{ margin: '5px 0' }}><strong style={{ color: 'white' }}>🇮🇳 India (2022-2024):</strong></p>
            <ul style={{ color: 'white', marginLeft: '20px', fontSize: '0.95em' }}>
              <li>Started on Shop Floor (Mechatronics)</li>
              <li>Learned Backend of Operations</li>
              <li>Reduced downtime by 83%</li>
            </ul>
          </div>
          <div>
            <p style={{ margin: '5px 0' }}><strong style={{ color: 'white' }}>🇺🇸 United States (2024-2025):</strong></p>
            <ul style={{ color: 'white', marginLeft: '20px', fontSize: '0.95em' }}>
              <li>Northeastern University Master's</li>
              <li>Building Custom AI Systems</li>
              <li>Streamlining Operations & Increasing Profits</li>
            </ul>
          </div>
        </div>
      </div>

      <button
        className="cta-button"
        onClick={() => navigate('/rag-system')}
        style={{ marginTop: '10px', padding: '10px 30px' }}
      >
        Explore My Work →
      </button>
    </PresentationSlide>
  );
}

export default Home;
