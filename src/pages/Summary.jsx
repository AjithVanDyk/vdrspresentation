import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter';
import PresentationSlide from '../components/PresentationSlide';
import { Icon } from '../components/Icons';
import ImageCarousel from '../components/ImageCarousel';

function Summary() {

  const eventImages = [
    "/images/exp/CAB3B256-F15D-4059-AF1F-C3EEFF4E5A16.jpg",
    "/images/exp/Image (4).jpg",
    "/images/exp/IMG_9627.JPG",
    "/images/exp/Screenshot 2025-11-11 093620.png",
    "/images/exp/Screenshot 2025-11-11 093641.png"
  ];

  return (
    <PresentationSlide backgroundImage="/images/life_at_vdrs.png">
      <div className="slide-header summary-header">
        <h1>Life at Van Dyk</h1>
        <h2>Impact, Culture, and Family</h2>
      </div>

      {/* Career Journey Section */}
      <div className="journey-box" style={{ padding: '20px', margin: '15px 0', background: 'var(--vd-gradient-hero)' }}>
        <h2 style={{ color: 'white', marginBottom: '15px', fontSize: '1.5em', fontWeight: 'bold' }}>
          Mechatronics Engineer → Operations Manager → Manufacturing Engineer → After Sales Intern
        </h2>
        <p style={{ color: 'white', fontSize: '1.1em' }}>
          "My professional journey began on the shop floor, where I gained hands-on experience understanding how industrial machinery operates. This foundation led me to explore the backend of operations, learning how systems integrate and function at an organizational level. Today, I leverage that comprehensive operational knowledge to architect and build custom AI systems that solve real business challenges. The key insight is that logic precedes technology—by thoroughly understanding processes first, I can strategically apply AI to streamline operations, enhance efficiency, and drive measurable profit improvements."
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'var(--vd-gradient-hero)', padding: '20px' }}>
          <div className="metric-value" style={{ fontSize: '2.2em' }}>
            <AnimatedCounter value={11} duration={2} />
          </div>
          <div className="metric-label">Production Systems</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-primary)', padding: '20px' }}>
          <div className="metric-value" style={{ fontSize: '2.2em' }}>
            <AnimatedCounter value={2000} duration={2.5} />+
          </div>
          <div className="metric-label">Hours Invested</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, var(--vd-primary-light) 0%, var(--vd-primary) 100%)', padding: '20px' }}>
          <div className="metric-value" style={{ fontSize: '2.2em' }}>
            <AnimatedCounter value={200} duration={3} />K
          </div>
          <div className="metric-label">Annual Impact</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-accent)', padding: '20px' }}>
          <div className="metric-value" style={{ fontSize: '2.2em' }}>
            <AnimatedCounter value={100} duration={2} />%
          </div>
          <div className="metric-label">Commitment</div>
        </div>
      </div>

      {/* Culture Section */}
      <div style={{ margin: '30px 0' }}>
        <h2 style={{ borderBottom: '2px solid var(--vdrs-orange)', paddingBottom: '10px', marginBottom: '20px', color: '#1a202c', textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>
          More Than Just Work - A Family
        </h2>
        
        
        <div style={{ marginBottom: '20px' }}>
          <ImageCarousel 
            images={[
              { src: eventImages[0], alt: "Steve's Burger" },
              { src: eventImages[1], alt: "Summer Party" },
              { src: eventImages[2], alt: "Cleanup for Paul" },
              { src: eventImages[3], alt: "Walk Event" },
              { src: eventImages[4], alt: "Walk Event" }
            ]}
            height="400px" // Taller for these event photos
            autoPlay={true}
          />
        </div>
      </div>

      {/* Experience Outside Van Dyk Office */}
      <div style={{ margin: '30px 0', padding: '25px', background: 'rgba(255,255,255,0.95)', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ borderBottom: '2px solid var(--vdrs-orange)', paddingBottom: '10px', marginBottom: '20px', color: '#1a202c', fontWeight: 'bold' }}>
          Experience Outside Van Dyk Office
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '15px', background: 'rgba(0,83,155,0.05)', borderRadius: '10px', borderLeft: '4px solid var(--vdrs-orange)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Icon name="trophy" size={24} color="var(--vdrs-orange)" />
              <h3 style={{ margin: 0, color: 'var(--vdrs-blue)', fontSize: '1.2em' }}>NASCAR Races</h3>
            </div>
            <p style={{ margin: 0, color: '#333', fontSize: '0.95em' }}>Attended 2 NASCAR races, experiencing the excitement and energy of professional racing events.</p>
          </div>

          <div style={{ padding: '15px', background: 'rgba(0,83,155,0.05)', borderRadius: '10px', borderLeft: '4px solid var(--vdrs-orange)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Icon name="users" size={24} color="var(--vdrs-orange)" />
              <h3 style={{ margin: 0, color: 'var(--vdrs-blue)', fontSize: '1.2em' }}>Thursday Meetups</h3>
            </div>
            <p style={{ margin: 0, color: '#333', fontSize: '0.95em' }}>Regular Thursday meetups, mostly at Beer Garden, building connections and camaraderie with the team.</p>
          </div>

          <div style={{ padding: '15px', background: 'rgba(0,83,155,0.05)', borderRadius: '10px', borderLeft: '4px solid var(--vdrs-orange)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Icon name="heart" size={24} color="var(--vdrs-orange)" />
              <h3 style={{ margin: 0, color: 'var(--vdrs-blue)', fontSize: '1.2em' }}>Alzheimer's Walk</h3>
            </div>
            <p style={{ margin: 0, color: '#333', fontSize: '0.95em' }}>Participated in the Alzheimer's Walk, supporting a meaningful cause alongside the Van Dyk community.</p>
          </div>

          <div style={{ padding: '15px', background: 'rgba(0,83,155,0.05)', borderRadius: '10px', borderLeft: '4px solid var(--vdrs-orange)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Icon name="tools" size={24} color="var(--vdrs-orange)" />
              <h3 style={{ margin: 0, color: 'var(--vdrs-blue)', fontSize: '1.2em' }}>Helping Paul in Test Center</h3>
            </div>
            <p style={{ margin: 0, color: '#333', fontSize: '0.95em' }}>Assisted Paul in the Test Center with sorting tasks, contributing 3 times in total to support operations.</p>
          </div>

          <div style={{ padding: '15px', background: 'rgba(0,83,155,0.05)', borderRadius: '10px', borderLeft: '4px solid var(--vdrs-orange)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Icon name="calendar" size={24} color="var(--vdrs-orange)" />
              <h3 style={{ margin: 0, color: 'var(--vdrs-blue)', fontSize: '1.2em' }}>Summer Party</h3>
            </div>
            <p style={{ margin: 0, color: '#333', fontSize: '0.95em' }}>Participated in the Summer Party, helping with setup and wrap-up activities, contributing to team celebrations.</p>
          </div>
        </div>
      </div>

      {/* Acknowledgments Section */}
      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div style={{ margin: 0, padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 15px 0', color: 'var(--vdrs-blue)' }}>Special Thanks</h3>
          <ul style={{ fontSize: '0.95em', color: '#333', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px', color: '#333' }}>
              <strong>Ginny, Victoria, & Paul:</strong> Thank you for being so open, welcoming, and easy to work with. You made me feel at home from the very beginning.
            </li>
            <li style={{ marginBottom: '10px', color: '#333' }}>
              <strong>Faizan:</strong> Thank you for giving me the opportunity to explore, for trusting me to "fix it but not break it," and for believing in my experiments and innovative approaches.
            </li>
            <li style={{ marginBottom: '10px', color: '#333' }}>
              <strong>Gary & Sergio:</strong> Thank you for providing the space and tools to work on my car. Your generosity was greatly appreciated!
            </li>
            <li style={{ marginBottom: '10px', color: '#333' }}>
              <strong>Chef Steve:</strong> Thank you for the amazing food and the thoughtful extras. Your meals made every day better!
            </li>
          </ul>
        </div>

        <div style={{ margin: 0, padding: '20px', background: 'rgba(255,255,255,0.95)', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: '0 0 15px 0', color: 'var(--vdrs-blue)' }}>The Team</h3>
          <ul style={{ fontSize: '0.95em', color: '#333', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px', color: '#333' }}>
              <strong>Daksh:</strong> Thank you for helping me countless times. Your support was invaluable.
            </li>
            <li style={{ marginBottom: '10px', color: '#333' }}>
              <strong>Adeeb:</strong> Thank you for being such a great friend and for all the memorable moments we shared together.
            </li>
            <li style={{ marginBottom: '10px', color: '#333' }}>
              <strong>Intern Squad:</strong> Zach, Claudia, Ainsley, and Arjun—thank you for making the first few months truly memorable and enjoyable.
            </li>
            <li style={{ marginTop: '15px', fontStyle: 'italic', borderTop: '1px solid #eee', paddingTop: '10px', color: '#555' }}>
              "Even though I didn't have any family here, Van Dyk became my family."
            </li>
          </ul>
        </div>
      </div>

      {/* Contact Footer */}
      <div 
        style={{ 
          marginTop: '30px', 
          textAlign: 'center',
          padding: '25px',
          background: 'white',
          borderRadius: '15px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '2px solid var(--vdrs-orange)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
          <img 
            src="/images/exp/Profile Pic M (1) (1).jpg" 
            alt="Ajith Srikanth"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--vdrs-blue)' }}
          />
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '1.5em', fontWeight: 'bold', color: 'var(--vdrs-blue)' }}>
              Ajith Srikanth
            </div>
            <div style={{ fontSize: '1.1em', color: '#666' }}>
              After Sales/Manufacturing Intern
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <a 
            href="mailto:ajithsrikanth.f@northeastern.edu" 
            className="contact-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '12px 25px', 
              background: '#f0f4f8', 
              borderRadius: '50px', 
              textDecoration: 'none', 
              color: '#333',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <Icon name="mail" size={20} color="#333" />
            <span>Email Me</span>
          </a>
          
          <a 
            href="https://linkedin.com/in/as31" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-btn"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              padding: '12px 25px', 
              background: '#0077b5', 
              borderRadius: '50px', 
              textDecoration: 'none', 
              color: 'white',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
          >
            <Icon name="link" size={20} color="white" />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default Summary;
