import PresentationSlide from '../components/PresentationSlide';
import { Link } from 'react-router-dom';

function VanDykTools() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Van Dyk Tools Hub</h1>
        <h2>Consolidated Platform for Internal Tools</h2>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>Team members juggled multiple standalone Python scripts and tools for file operations, PDF processing, and data extraction. No unified interface, difficult to distribute updates.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Consolidated 8+ standalone tools into a single Flask-based web application. One login, one interface, and centralized updates. Designed specifically for After Sales interns.</p>
        </div>
      </div>

      <div className="image-grid" style={{ margin: '15px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <img 
          src="/images/exp/VanDykTools.png" 
          alt="Van Dyk Tools Hub Dashboard"
          className="main-image"
          style={{ maxHeight: '200px', objectFit: 'contain', width: 'auto' }}
        />
        <img 
          src="/images/exp/Login.png" 
          alt="Van Dyk Tools Login"
          className="main-image"
          style={{ maxHeight: '200px', objectFit: 'contain', width: 'auto' }}
        />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>8+</div>
          <div className="metric-label">Tools</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>1</div>
          <div className="metric-label">Platform</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>Flask</div>
          <div className="metric-label">Backend</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>G Drive</div>
          <div className="metric-label">Integration</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Integrated Tool Suite</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>File Management:</strong> Organizer, Renamer, Duplicate Finder</li>
            <li><strong>Data Processing:</strong> PDF Extractor, Excel Comparator</li>
            <li><strong>Tech Stack:</strong> Flask, SocketIO, Feature Flags</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Efficiency:</strong> Tasks reduced from hours to minutes</li>
            <li><strong>Standardization:</strong> Consistent folder structures</li>
            <li><strong>Maintenance:</strong> Single codebase to update</li>
          </ul>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Link 
          to="/vandyk-tools-detail"
          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
          style={{ textDecoration: 'none' }}
        >
          <span>View Detailed Flowcharts</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </PresentationSlide>
  );
}

export default VanDykTools;
