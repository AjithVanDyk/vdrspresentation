import PresentationSlide from '../components/PresentationSlide';

function VDRS360() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>VDRS360</h1>
        <h2>Excel-Based AMI on Steroids - Equipment Management System</h2>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>Equipment data scattered across multiple systems. No centralized view of machine information, maintenance history, or operational status. Manual data compilation was time-consuming.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a sophisticated Excel-based Asset Management Interface (AMI) that fetches and updates more than 10,000 lines of data from SQL databases. Excel on steroids!</p>
        </div>
      </div>

      <div className="image-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', margin: '15px 0' }}>
        <img src="/images/vdrsex/Screenshot 2025-10-29 175510.png" alt="VDRS360 Dashboard" className="grid-image" style={{ height: '150px' }} />
        <img src="/images/vdrsex/Screenshot 2025-10-30 104013.png" alt="Data Management" className="grid-image" style={{ height: '150px' }} />
        <img src="/images/vdrsex/Screenshot 2025-10-30 153958.png" alt="Equipment View" className="grid-image" style={{ height: '150px' }} />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'var(--vd-gradient-hero)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>10K+</div>
          <div className="metric-label">SQL Lines</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-primary)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>Excel</div>
          <div className="metric-label">Platform</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, var(--vd-primary-light) 0%, var(--vd-primary) 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>SQL</div>
          <div className="metric-label">Database</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-accent)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>Test</div>
          <div className="metric-label">Status</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>System Capabilities</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>SQL Integration:</strong> Direct connection to databases</li>
            <li><strong>Two-Way Sync:</strong> Fetch AND update records</li>
            <li><strong>Real-Time Data:</strong> Live connection to SQL server</li>
            <li><strong>Automation:</strong> Custom VBA macros</li>
          </ul>
        </div>

        <div className="challenge-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Current Status</h4>
          <p style={{ fontSize: '0.95em' }}>System fully developed and tested with 10K+ lines of SQL data integration. Demonstrated ability to build complex Excel-based systems with database integration.</p>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default VDRS360;
