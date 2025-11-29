import PresentationSlide from '../components/PresentationSlide';

function CDMS() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Container Document Management System (CDMS)</h1>
        <h2>My First Full-Stack Application</h2>
      </div>

      <div style={{ position: 'absolute', top: '40px', right: '40px' }}>
        <a 
          href="https://delightful-desert-08fe4fc0f.2.azurestaticapps.net/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="live-project-btn"
          style={{ margin: 0, padding: '10px 20px', fontSize: '0.9em' }}
        >
          🚀 View Live System
        </a>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>Suppliers were emailing critical container documents, leading to lost files and version confusion. The existing "Contracts App" was insecure and hard to use.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a secure, cloud-based portal where suppliers upload documents directly. Replaced email chaos with structured Azure Blob Storage.</p>
        </div>
      </div>

      <div className="image-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '15px 0' }}>
        <img src="/images/cdms/image.png" alt="CDMS Dashboard" className="grid-image" style={{ height: '120px' }} />
        <img src="/images/cdms/image (1).png" alt="Upload Interface" className="grid-image" style={{ height: '120px' }} />
        <img src="/images/cdms/image (2).png" alt="Document List" className="grid-image" style={{ height: '120px' }} />
        <img src="/images/cdms/image (3).png" alt="Admin View" className="grid-image" style={{ height: '120px' }} />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>5</div>
          <div className="metric-label">Suppliers</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>10GB</div>
          <div className="metric-label">Storage</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>87%</div>
          <div className="metric-label">Faster</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>40</div>
          <div className="metric-label">Users</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Technical Stack</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Frontend:</strong> React (Hooks, Router)</li>
            <li><strong>Backend:</strong> Node.js & Express</li>
            <li><strong>Storage:</strong> Azure Blob Storage</li>
            <li><strong>Security:</strong> SAS Tokens</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Security:</strong> No more sensitive docs in email</li>
            <li><strong>Efficiency:</strong> Instant access for logistics team</li>
            <li><strong>Scalability:</strong> Handles unlimited suppliers</li>
          </ul>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default CDMS;
