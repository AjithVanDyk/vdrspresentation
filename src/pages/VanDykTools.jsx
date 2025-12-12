import React, { useEffect, useRef, useState, useMemo } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import flowchartsMd from '../data/TOOLS_FLOWCHARTS.md?raw';
import ClickableImage from '../components/ClickableImage';
import ImageCarousel from '../components/ImageCarousel';

// Initialize mermaid with enhanced theme
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'Outfit, sans-serif',
  themeVariables: {
    primaryColor: '#FF6B35',
    primaryTextColor: '#1a202c',
    primaryBorderColor: '#FF6B35',
    lineColor: '#2c5282',
    secondaryColor: '#fff5f0',
    tertiaryColor: '#edf2f7',
    background: '#ffffff',
    mainBkg: '#ffffff',
    secondBkg: '#fff5f0',
    tertiaryBkg: '#ffffff',
    secondaryBorderColor: '#FF6B35',
    tertiaryBorderColor: '#cbd5e0',
    secondaryTextColor: '#2d3748',
    tertiaryTextColor: '#4a5568',
    textColor: '#1a202c',
    fontSize: '14px',
    fontFamily: 'Outfit, sans-serif',
  },
  flowchart: {
    curve: 'basis',
    padding: 15,
    useMaxWidth: true,
    htmlLabels: true,
  },
  themeCSS: `
    .node rect, .node circle, .node ellipse, .node polygon {
      fill: #ffffff;
      stroke: #FF6B35;
      stroke-width: 1.5px;
    }
    .edgePath .path {
      stroke: #2c5282;
      stroke-width: 1.5px;
    }
    .nodeLabel {
      font-family: 'Outfit', sans-serif;
      font-weight: 500;
      font-size: 14px;
    }
  `
});

const MermaidDiagram = ({ chart, id, title }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      setError(null);

      const uniqueId = `mermaid-${id}-${Math.random().toString(36).substr(2, 9)}`;
      
      try {
        mermaid.render(uniqueId, chart)
          .then(({ svg }) => {
            if (containerRef.current) {
              containerRef.current.innerHTML = svg;
              // Ensure the SVG fits nicely and is responsive to browser
              const svgElement = containerRef.current.querySelector('svg');
              if (svgElement) {
                svgElement.style.maxWidth = '100%';
                svgElement.style.width = '100%';
                svgElement.style.height = 'auto';
                svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');
                // Make it responsive by adjusting viewBox if needed
                const viewBox = svgElement.getAttribute('viewBox');
                if (!viewBox) {
                  const width = svgElement.getAttribute('width');
                  const height = svgElement.getAttribute('height');
                  if (width && height) {
                    svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
                    svgElement.removeAttribute('width');
                    svgElement.removeAttribute('height');
                  }
                }
              }
            }
          })
          .catch((err) => {
            console.error('Mermaid render failed:', err);
            setError('Failed to render chart');
          });
      } catch (e) {
        console.error('Mermaid syntax error:', e);
        setError('Invalid chart syntax');
      }
    }
  }, [chart, id]);

  return (
    <div style={{ 
      background: 'white', 
      padding: '15px', 
      borderRadius: '8px', 
      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)', 
      border: '1px solid #e2e8f0',
      minHeight: '150px',
      maxHeight: '400px', // Limit height as requested
      overflow: 'auto', // Allow scrolling
      display: 'flex',
      justifyContent: 'flex-start', // Alert from center to flex-start for scrolling
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%'
    }}>
      {error ? (
        <div style={{ color: '#e53e3e', textAlign: 'center' }}>
          <p>⚠️ {error}</p>
        </div>
      ) : (
        <div 
          ref={containerRef} 
          className="mermaid-diagram"
          style={{ 
            width: '100%', 
            maxWidth: '100%',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
      )}
      {title && <p style={{ marginTop: '10px', color: '#718096', fontSize: '0.9em' }}>{title}</p>}
    </div>
  );
};

function VanDykTools() {
  const [expandedCard, setExpandedCard] = useState(null);

  const sections = useMemo(() => {
    const lines = flowchartsMd.split('\n');
    const parsedSections = [];
    let currentSection = null;
    let captureMermaid = false;
    let mermaidContent = '';

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        if (currentSection) parsedSections.push(currentSection);
        currentSection = {
          title: line.replace('## ', '').trim(),
          content: [],
          mermaid: null,
        };
      } else if (line.startsWith('```mermaid')) {
        captureMermaid = true;
        mermaidContent = '';
      } else if (line.startsWith('```') && captureMermaid) {
        captureMermaid = false;
        if (currentSection) currentSection.mermaid = mermaidContent.trim();
      } else if (captureMermaid) {
        mermaidContent += line + '\n';
      } else if (currentSection && line.trim() !== '' && !line.startsWith('---')) {
        currentSection.content.push(line);
      }
    });
    if (currentSection) parsedSections.push(currentSection);
    return parsedSections.filter(s => s.title !== 'Summary');
  }, []);

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

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
          <p>Van Dyk operations relied on numerous small, disconnected computer programs and scripts scattered across different systems. This fragmented approach created chaos: tools were difficult to locate, version control was non-existent, updates required manual distribution, and new team members struggled to find and learn the available tools. The lack of centralization wasted significant time and reduced operational efficiency.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a comprehensive web-based automation suite that consolidates 30+ specialized enterprise tools into a single, unified platform accessible via web browser. The Van Dyk Tools Hub integrates AI-powered extraction, intelligent file processing, Excel automation, PDF manipulation, and data synchronization tools. Using Flask backend with modern web technologies, the system provides a centralized, version-controlled solution that eliminates installation requirements and ensures all team members access the latest tool versions instantly.</p>
        </div>
      </div>

      <div style={{ margin: '30px 0' }}>
        <ImageCarousel 
          images={[
            { src: "/images/vdt/vdt1.png", alt: "Van Dyk Tools Hub Dashboard" },
            { src: "/images/vdt/vdt2.png", alt: "Van Dyk Tools Login" },
            { src: "/images/vdt/vdt3.png", alt: "Van Dyk Tools Features" },
            { src: "/images/vdt/Screenshot 2025-10-27 110500.png", alt: "Van Dyk Tools Interface" },
            { src: "/images/vdt/Screenshot 2025-10-28 112718.png", alt: "Van Dyk Tools Reports" },
            { src: "/images/vdt/Screenshot 2025-11-10 161206.png", alt: "Van Dyk Tools Analytics" }
          ]} 
        />
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'var(--vd-gradient-hero)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>20+</div>
          <div className="metric-label">Enterprise Apps</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-primary)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>50+</div>
          <div className="metric-label">Service Engineers</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, var(--vd-primary-light) 0%, var(--vd-primary) 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>60+</div>
          <div className="metric-label">Company Users</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-accent)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>O(1)</div>
          <div className="metric-label">Optimized Logic</div>
        </div>
      </div>

      <div style={{ margin: '15px 0', background: 'white', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderLeft: '4px solid var(--vdrs-orange)' }}>
        <h4 style={{ margin: '0 0 15px 0', color: '#1a202c' }}>Processing Time Analysis</h4>
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
                <td style={{ padding: '8px', fontWeight: '500', color: '#2d3748' }}>{row.step}</td>
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
            <li><strong>Machine Parser:</strong> Extracts machine information from project folders with automatic Excel merging</li>
            <li><strong>Project Initialize:</strong> Standardizes project setup and structure creation</li>
            <li><strong>File Processor:</strong> Automated file organization and processing workflows</li>
            <li><strong>Pipeline 1-4:</strong> Sequential processing pipelines for data extraction and transformation</li>
            <li><strong>Manual Spare Parts Extraction:</strong> GPT-4 or Python-based extraction (user choice)</li>
            <li><strong>VDRS Sync:</strong> Synchronizes data with VDRS systems and Azure Blob Storage</li>
            <li><strong>Data Dropper:</strong> Processes equipment data and extracts structured information</li>
            <li><strong>BlobCheck:</strong> Validates SQL values against Azure Blobs for data consistency</li>
            <li><strong>Spares Compare:</strong> Compares two Tomra spare parts files for differences</li>
            <li><strong>Subassembly Organiser:</strong> Pipeline 3 extension for organizing subassembly drawings</li>
            <li><strong>Excel Tools:</strong> Serial matcher, duplicate finder, part number formatter, and more</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0', color: 'white' }}>Business Impact</h4>
          <ul className="force-white-text" style={{ fontSize: '0.9em', color: 'white' }}>
            <li><strong>Time Savings:</strong> Tasks reduced from hours/days to minutes/seconds (see processing time table)</li>
            <li><strong>Consistency:</strong> Standardized tools and file formats across all operations</li>
            <li><strong>Performance:</strong> Algorithmic optimization (O(1) lookups) efficiently handles 100K+ files</li>
            <li><strong>Centralization:</strong> Single source of truth for all internal automation tools</li>
            <li><strong>Accessibility:</strong> Web-based platform requires no installation or updates</li>
            <li><strong>Scalability:</strong> Supports 50+ service engineers and 60+ company users</li>
            <li><strong>Integration:</strong> Seamless connection with Van Dyk One App for faster project retrieval</li>
          </ul>
        </div>
      </div>

      {/* Detailed Flowcharts Section */}
      <div style={{ marginTop: '30px', marginBottom: '50px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--vdrs-blue)', marginBottom: '30px', fontSize: '2em' }}>Comprehensive Workflow Diagrams</h2>
        <div style={{ display: 'grid', gap: '30px' }}>
          {sections.map((section, index) => (
            <motion.div 
              key={`section-${index}-${section.title}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ 
                background: 'rgba(255,255,255,0.5)', 
                borderRadius: '15px', 
                padding: '25px', 
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                borderLeft: expandedCard === index ? '4px solid var(--vdrs-orange)' : '1px solid rgba(0,0,0,0.05)'
              }}
              onClick={() => handleCardClick(index)}
              whileHover={{ 
                boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                transform: 'translateY(-2px)'
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <h3 style={{ 
                  color: 'var(--vdrs-blue)', 
                  fontSize: '1.5em', 
                  marginBottom: '10px', 
                  borderBottom: '2px solid var(--vdrs-orange)', 
                  paddingBottom: '10px', 
                  display: 'inline-block',
                  position: 'relative',
                  paddingLeft: '35px',
                  margin: 0
                }}>
                  <span style={{ 
                    position: 'absolute',
                    left: '0',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '1.2em'
                  }}>📊</span>
                  {section.title}
                </h3>
                <motion.span
                  animate={{ rotate: expandedCard === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    fontSize: '1.5em', 
                    color: 'var(--vdrs-orange)',
                    marginLeft: '15px'
                  }}
                >
                  ▼
                </motion.span>
              </motion.div>
              
              <AnimatePresence>
                {expandedCard === index && section.mermaid && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ 
                      marginTop: '20px',
                      overflow: 'hidden',
                      width: '100%'
                    }}
                  >
                    <div style={{ 
                      width: '100%',
                      maxWidth: '100%',
                      overflow: 'auto'
                    }}>
                      <MermaidDiagram chart={section.mermaid} id={`chart-${index}`} title={section.title} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div style={{ marginTop: '20px', background: 'rgba(255,255,255,0.8)', padding: '15px', borderRadius: '8px' }}>
                  {section.content.map((line, i) => (
                    <p key={i} style={{ marginBottom: '5px', lineHeight: '1.4', color: '#444' }}>{line}</p>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PresentationSlide>
  );
}

export default VanDykTools;
