import PresentationSlide from '../components/PresentationSlide';

function DataExtractor() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Data Extractor Suite</h1>
        <h2>PDF & DWG Processing Tools</h2>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>Engineers spend hours manually extracting data from PDF documents and technical drawings (DWG files). Repetitive, error-prone work that wastes valuable time.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a suite of specialized tools for extracting data from PDFs and DWG files. These tools became modules in the Van Dyk Tools Hub, making them easily accessible to the team.</p>
        </div>
      </div>

      <div className="image-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', margin: '15px 0' }}>
        <img src="/images/vdt/Screenshot 2025-10-27 110500.png" alt="Data Extractor Interface" className="grid-image" style={{ height: '150px' }} />
        <img src="/images/vdt/Screenshot 2025-10-28 112718.png" alt="PDF Processing" className="grid-image" style={{ height: '150px' }} />
        <img src="/images/vdt/Screenshot 2025-11-10 161206.png" alt="Extraction Results" className="grid-image" style={{ height: '150px' }} />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'var(--vd-gradient-hero)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>10s</div>
          <div className="metric-label">Processing Time</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-primary)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>PDF+DWG</div>
          <div className="metric-label">File Types</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, var(--vd-primary-light) 0%, var(--vd-primary) 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>Modules</div>
          <div className="metric-label">In Tools Hub</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-accent)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>Auto</div>
          <div className="metric-label">Extraction</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Tool Capabilities</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>PDF Engines:</strong> PyMuPDF & pdfplumber for robust extraction</li>
            <li><strong>DWG Processing:</strong> Extract info from technical drawings</li>
            <li><strong>Infrastructure:</strong> Azure Files with FTP Sync</li>
            <li><strong>Modular Design:</strong> Tools use specific code modules</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Time Savings:</strong> Eliminates hours of manual entry</li>
            <li><strong>Fast Turnaround:</strong> 10 seconds vs manual extraction</li>
            <li><strong>Accuracy:</strong> Automated extraction reduces errors</li>
          </ul>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default DataExtractor;
