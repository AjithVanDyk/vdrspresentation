import PresentationSlide from '../components/PresentationSlide';
import ClickableImage from '../components/ClickableImage';

function VDRS360() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>VDRS360</h1>
        <h2>Excel-Based AMI on Steroids - Equipment Management System</h2>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h3>The Problem</h3>
          <p>Equipment data was scattered across multiple disconnected systems with no unified interface. Field engineers and operations teams lacked a centralized view of machine information, maintenance history, operational status, and lifecycle data. Manual data compilation from various sources was extremely time-consuming and error-prone, hindering efficient equipment management and decision-making.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h3>My Solution</h3>
          <p>Built a sophisticated Excel-based Asset Management Interface (AMI) that establishes direct two-way communication with SQL Server databases. The system fetches and updates more than 10,000 lines of equipment data in real-time, providing a familiar Excel interface with powerful database integration. Custom VBA macros enable automated data synchronization, validation, and reporting, transforming Excel into a robust equipment management platform.</p>
        </div>
      </div>

      <div className="image-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', margin: '15px 0' }}>
        {[
          { src: "/images/vdrsex/Screenshot 2025-10-29 175510.png", alt: "VDRS360 Dashboard" },
          { src: "/images/vdrsex/Screenshot 2025-10-30 104013.png", alt: "Data Management" },
          { src: "/images/vdrsex/Screenshot 2025-10-30 153958.png", alt: "Equipment View" }
        ].map((img, index) => (
          <ClickableImage
            key={index}
            src={img.src}
            alt={img.alt}
            images={[
              { src: "/images/vdrsex/Screenshot 2025-10-29 175510.png", alt: "VDRS360 Dashboard" },
              { src: "/images/vdrsex/Screenshot 2025-10-30 104013.png", alt: "Data Management" },
              { src: "/images/vdrsex/Screenshot 2025-10-30 153958.png", alt: "Equipment View" }
            ]}
            index={index}
            className="grid-image"
            style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
          />
        ))}
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
          <h3 style={{ margin: '5px 0' }}>System Capabilities</h3>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>SQL Server Integration:</strong> Direct ODBC connection for real-time data access</li>
            <li><strong>Bidirectional Sync:</strong> Fetch equipment data AND update records back to database</li>
            <li><strong>Real-Time Updates:</strong> Live connection ensures data accuracy and currency</li>
            <li><strong>VBA Automation:</strong> Custom macros for data validation, formatting, and reporting</li>
            <li><strong>Excel Interface:</strong> Familiar spreadsheet environment with database power</li>
            <li><strong>Scalability:</strong> Handles 10,000+ records efficiently with optimized queries</li>
          </ul>
        </div>

        <div className="challenge-box" style={{ margin: 0, padding: '15px' }}>
          <h3 style={{ margin: '5px 0' }}>Current Status</h3>
          <p style={{ fontSize: '0.95em' }}>System fully developed and tested with 10,000+ lines of SQL data integration. Successfully demonstrated the ability to build enterprise-grade Excel-based systems that bridge the gap between traditional spreadsheet workflows and modern database architectures, providing users with powerful tools without requiring new software training.</p>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default VDRS360;
