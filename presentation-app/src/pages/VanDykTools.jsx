import PresentationSlide from '../components/PresentationSlide';
import { Link } from 'react-router-dom';

function VanDykTools() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
          <img src="/images/vdt/VanDykTools.png" alt="Van Dyk Tools Logo" style={{ height: '50px', width: 'auto' }} />
          <div>
            <h1 style={{ margin: 0 }}>Van Dyk Tools Hub</h1>
            <h2 style={{ margin: 0, fontSize: '1.1em' }}>All-in-One Platform for Internal Tools</h2>
          </div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>The Problem</h4>
          <p>We had many small, separate computer programs for different tasks. It was messy, hard to use, and difficult to keep everyone updated with the latest versions.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>I combined 20+ enterprise applications into one easy-to-use website. I used pure logic and AI to build a strong system that anyone can use without installing anything.</p>
        </div>
      </div>

      <div className="image-grid" style={{ margin: '15px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <img 
          src="/images/vdt/vdt1.png" 
          alt="Van Dyk Tools Hub Dashboard"
          className="main-image"
          style={{ maxHeight: '200px', objectFit: 'contain', width: 'auto' }}
        />
        <img 
          src="/images/vdt/vdt2.png" 
          alt="Van Dyk Tools Login"
          className="main-image"
          style={{ maxHeight: '200px', objectFit: 'contain', width: 'auto' }}
        />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>20+</div>
          <div className="metric-label">Enterprise Apps</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>50+</div>
          <div className="metric-label">Service Engineers</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>60+</div>
          <div className="metric-label">Company Users</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>O(1)</div>
          <div className="metric-label">Optimized Logic</div>
        </div>
      </div>

      <div style={{ margin: '15px 0', background: 'white', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderLeft: '4px solid var(--vdrs-orange)' }}>
        <h4 style={{ margin: '0 0 15px 0', color: 'var(--vdrs-blue)' }}>Processing Time Analysis</h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left' }}>
              <th style={{ padding: '8px', color: '#666' }}>Step</th>
              <th style={{ padding: '8px', color: '#666' }}>Original Time</th>
              <th style={{ padding: '8px', color: '#666' }}>Reduced to</th>
            </tr>
          </thead>
          <tbody>
            {[
              { step: 'Step 1', orig: 'Per File 2 mins', new: '10s' },
              { step: 'Step 2', orig: 'Per File 1mins', new: '5s' },
              { step: 'Step 3', orig: 'Per File 5mins', new: '60s' },
              { step: 'Step 4', orig: 'Per File 80mins', new: '5mins/120s' },
              { step: 'Step 5', orig: 'Per File 1 hr', new: '1min/60s' },
              { step: 'Step 6', orig: 'Per File 24hrs 6mins', new: '60s' },
              { step: 'Step 7', orig: 'Per file 15 mins', new: '60s' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '8px', fontWeight: '500' }}>{row.step}</td>
                <td style={{ padding: '8px', color: '#e53e3e' }}>{row.orig}</td>
                <td style={{ padding: '8px', color: '#38a169', fontWeight: 'bold' }}>{row.new}</td>
              </tr>
            ))}
            <tr style={{ background: '#f8f9fa', fontWeight: 'bold' }}>
              <td style={{ padding: '10px 8px', color: 'var(--vdrs-blue)' }}>TOTAL</td>
              <td style={{ padding: '10px 8px', color: '#e53e3e' }}>50 mins</td>
              <td style={{ padding: '10px 8px', color: '#38a169' }}>835s ≈ 6.5mins</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Integrated Tool Suite</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Data Extractor:</strong> Pulls important info from files automatically.</li>
            <li><strong>File Organizer:</strong> Sorts and renames files instantly.</li>
            <li><strong>Duplicate Finder:</strong> Finds and removes copy-pasted files.</li>
            <li><strong>Excel Comparator:</strong> Checks differences between two spreadsheets.</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Speed:</strong> Tasks that took hours now take minutes.</li>
            <li><strong>Consistency:</strong> Everyone uses the same tools and file formats.</li>
            <li><strong>Performance:</strong> Algorithmic optimization (O(1) lookups) handles 100K+ files efficiently.</li>
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
