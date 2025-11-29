import PresentationSlide from '../components/PresentationSlide';

function DykScribe() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>DykScribe</h1>
        <h2>Knowledge Capture & Engineer Intelligence System</h2>
      </div>

      <div style={{ position: 'absolute', top: '40px', right: '40px' }}>
        <a 
          href="https://dykscribe.streamlit.app/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="live-project-btn"
          style={{ margin: 0, padding: '10px 20px', fontSize: '0.9em' }}
        >
          🚀 View Live Demo
        </a>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>Service engineers' troubleshooting knowledge exists only in their heads. When they retire or leave, decades of experience disappears.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a knowledge capture system where engineers can document solutions via voice/text, earn points, and create a searchable database.</p>
        </div>
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>50</div>
          <div className="metric-label">Target Engineers</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>∞</div>
          <div className="metric-label">Data Points</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100%</div>
          <div className="metric-label">Voice Capable</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>SQL</div>
          <div className="metric-label">Database</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Key Features</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Voice Recording:</strong> Speak solutions instead of typing</li>
            <li><strong>Points System:</strong> Gamification for sharing</li>
            <li><strong>Easy Referencing:</strong> Quick search of past solutions</li>
            <li><strong>QA Integration:</strong> Feeds into chatbot</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Knowledge Preservation:</strong> Retain expertise</li>
            <li><strong>Reduced Training:</strong> New engineers learn faster</li>
            <li><strong>Consistent Quality:</strong> Standardized troubleshooting</li>
          </ul>
        </div>
      </div>

      <div className="challenge-box" style={{ marginTop: 'auto', padding: '15px' }}>
        <h4 style={{ margin: '5px 0' }}>Current Status</h4>
        <p style={{ fontSize: '0.95em' }}>Built and deployed. Ready for organizational buy-in. Infrastructure is in place for future knowledge capture initiatives.</p>
      </div>
    </PresentationSlide>
  );
}

export default DykScribe;
