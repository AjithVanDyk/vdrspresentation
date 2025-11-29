import PresentationSlide from '../components/PresentationSlide';

function MobileApp() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Mobile App (Van Dyk One)</h1>
        <h2>Field Service Operations Platform</h2>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>The existing PowerApp was slow, clunky, and hard to update. Field engineers struggled with offline access and poor UX.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a high-performance React PWA that replicates 100% of the functionality but runs faster, works offline, and provides a modern user experience.</p>
        </div>
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>60</div>
          <div className="metric-label">Users</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100%</div>
          <div className="metric-label">Replica</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>PWA</div>
          <div className="metric-label">Offline Ready</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>React</div>
          <div className="metric-label">Native Feel</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Key Features</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Service Reports:</strong> Digital reporting from the field</li>
            <li><strong>Expense Tracking:</strong> Easy receipt capture and submission</li>
            <li><strong>Offline Mode:</strong> Works without internet connection</li>
            <li><strong>Push Notifications:</strong> Real-time updates for engineers</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Efficiency:</strong> Faster report submission</li>
            <li><strong>Accuracy:</strong> Reduced errors in data entry</li>
            <li><strong>Satisfaction:</strong> Better experience for field team</li>
          </ul>
        </div>
      </div>

      <div className="challenge-box" style={{ marginTop: 'auto', padding: '15px' }}>
        <h4 style={{ margin: '5px 0' }}>Current Status</h4>
        <p style={{ fontSize: '0.95em' }}>Fully developed replica of the existing PowerApp. Ready for deployment pending internal review and migration strategy.</p>
      </div>
    </PresentationSlide>
  );
}

export default MobileApp;
