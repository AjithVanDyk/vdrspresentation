import PresentationSlide from '../components/PresentationSlide';

function VDRSWebsite() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>Van Dyk Website</h1>
        <h2>Modern Corporate Web Presence</h2>
      </div>

      <div style={{ position: 'absolute', top: '40px', right: '40px' }}>
        <a 
          href="https://vdrsweb.vercel.app" 
          target="_blank" 
          rel="noopener noreferrer"
          className="live-project-btn"
          style={{ margin: 0, padding: '10px 20px', fontSize: '0.9em' }}
        >
          🚀 View Live Website
        </a>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>The existing website was outdated, had limited information, and provided a poor mobile experience. It didn't reflect Van Dyk's position as a market leader.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a modern, responsive website using React 18. Features professional design, fast loading times, smooth animations, and works perfectly on all devices.</p>
        </div>
      </div>

      <div className="image-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', margin: '15px 0' }}>
        <img src="/images/vdrs/Screenshot 2025-10-07 115533.png" alt="Website Homepage" className="grid-image" style={{ height: '120px' }} />
        <img src="/images/vdrs/Screenshot 2025-10-14 153414.png" alt="Equipment Catalog" className="grid-image" style={{ height: '120px' }} />
        <img src="/images/vdrs/Screenshot 2025-11-05 165643.png" alt="Mobile View" className="grid-image" style={{ height: '120px' }} />
        <img src="/images/vdrs/Screenshot 2025-11-17 114656.png" alt="Contact Page" className="grid-image" style={{ height: '120px' }} />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100</div>
          <div className="metric-label">Lighthouse</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>React</div>
          <div className="metric-label">Framework</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>Mobile</div>
          <div className="metric-label">Responsive</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>Vercel</div>
          <div className="metric-label">Deployment</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Technologies Learned</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>React 18 & TypeScript:</strong> Robust SPAs</li>
            <li><strong>Tailwind CSS:</strong> Rapid styling</li>
            <li><strong>Framer Motion:</strong> Professional animations</li>
            <li><strong>SEO & Performance:</strong> Optimization skills</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Brand Elevation:</strong> Reflects market leadership</li>
            <li><strong>Accessibility:</strong> Mobile-friendly information</li>
            <li><strong>Global Reach:</strong> Fast loading worldwide</li>
          </ul>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default VDRSWebsite;
