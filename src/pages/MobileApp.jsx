import PresentationSlide from '../components/PresentationSlide';
import ImageCarousel from '../components/ImageCarousel';

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
          <p>The existing PowerApp solution was slow, clunky, difficult to update, and lacked proper offline functionality. Field service engineers struggled with poor user experience, unreliable connectivity in remote locations, and limited mobile optimization, leading to decreased productivity and frustration in the field.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a high-performance React Native cross-platform application (Van Dyk One) that replicates 100% of PowerApp functionality with significant improvements. Features include offline-aware data layer with SQLite fallback, five core workflows (Tickets, Machines, Sites, Expenses, Time Punches), React Navigation with tab and stack routing, and brand-consistent design. The app gracefully handles connectivity issues by falling back to local mock data when SQL Server is unavailable.</p>
        </div>
      </div>

      <div style={{ margin: '15px 0' }}>
        <ImageCarousel 
          images={[
            { src: "/images/vdo/4704B4FF-0C76-4DCD-94C5-94300162EBED.png", alt: "Van Dyk One App Interface 1" },
            { src: "/images/vdo/84E2F081-BF0A-4246-92BF-744FF2CEB67F_1_105_c.jpeg", alt: "Van Dyk One App Interface 2" },
            { src: "/images/vdo/FD3E46EB-678E-4194-B0AF-53E63BD6E868_1_105_c.jpeg", alt: "Van Dyk One App Interface 3" },
            { src: "/images/vdo/FDFE392E-B997-4C29-9551-618B44F8B1AF.png", alt: "Van Dyk One App Interface 4" }
          ]} 
          autoPlay={true}
        />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'var(--vd-gradient-hero)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>60</div>
          <div className="metric-label">Users</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-primary)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100%</div>
          <div className="metric-label">Replica</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, var(--vd-primary-light) 0%, var(--vd-primary) 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>PWA</div>
          <div className="metric-label">Offline Ready</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-accent)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>React</div>
          <div className="metric-label">Native Feel</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Key Features</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Five Core Workflows:</strong> Tickets, Machines, Sites, Expenses, and Home dashboard</li>
            <li><strong>Time Punch System:</strong> Dedicated stack for travel/labor tracking with 30-day history</li>
            <li><strong>DataProvider Architecture:</strong> SQL Server → SQLite → Mock data fallback chain</li>
            <li><strong>Offline-First Design:</strong> Full functionality without internet connectivity</li>
            <li><strong>Cross-Platform:</strong> React Native supports Android, iOS, and Web</li>
            <li><strong>Brand Fidelity:</strong> Van Dyk colors and typography throughout</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em', color: '#2d3748' }}>
            <li><strong>Efficiency:</strong> Faster report submission with offline capability</li>
            <li><strong>Accuracy:</strong> Reduced errors through improved UX and validation</li>
            <li><strong>Reliability:</strong> Works in remote locations with poor connectivity</li>
            <li><strong>User Satisfaction:</strong> Modern, responsive interface improves field team experience</li>
            <li><strong>Maintainability:</strong> React Native codebase easier to update than PowerApp</li>
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
