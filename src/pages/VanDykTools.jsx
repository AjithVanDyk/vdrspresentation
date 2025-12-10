import React, { useEffect, useRef, useState, useMemo } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import flowchartsMd from '../data/TOOLS_FLOWCHARTS.md?raw';
import ClickableImage from '../components/ClickableImage';

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
    lineColor: '#00539B',
    secondaryColor: '#feb47b',
    tertiaryColor: '#2c5282',
    background: '#ffffff',
    mainBkg: '#ffffff',
    secondBkg: '#f8f9fa',
    tertiaryBkg: '#e9ecef',
    secondaryBorderColor: '#00539B',
    tertiaryBorderColor: '#2c5282',
    secondaryTextColor: '#4a5568',
    tertiaryTextColor: '#718096',
    textColor: '#1a202c',
    fontSize: '16px',
    fontFamily: 'Outfit, sans-serif',
  },
  flowchart: {
    curve: 'basis',
    padding: 20,
    useMaxWidth: true,
    htmlLabels: true,
  },
  themeCSS: `
    .node rect, .node circle, .node ellipse, .node polygon {
      fill: #ffffff;
      stroke: #FF6B35;
      stroke-width: 2px;
      transition: all 0.3s ease;
    }
    .node:hover rect, .node:hover circle, .node:hover ellipse, .node:hover polygon {
      fill: #fff5f0;
      stroke: #FF6B35;
      stroke-width: 3px;
      filter: drop-shadow(0 4px 8px rgba(255, 107, 53, 0.3));
    }
    .edgePath .path {
      stroke: #00539B;
      stroke-width: 2px;
      transition: all 0.3s ease;
    }
    .edgePath:hover .path {
      stroke: #FF6B35;
      stroke-width: 3px;
    }
    .nodeLabel {
      font-family: 'Outfit', sans-serif;
      font-weight: 600;
      transition: all 0.3s ease;
    }
    .nodeLabel:hover {
      font-weight: 700;
      fill: #FF6B35;
    }
  `
});

const MermaidDiagram = ({ chart, id, title }) => {
  const containerRef = useRef(null);
  const renderedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isInteractive, setIsInteractive] = useState(false);
  const svgRef = useRef(null);
  const zoomLevelRef = useRef(1);

  useEffect(() => {
    if (containerRef.current && chart && !renderedRef.current) {
      renderedRef.current = true;
      
      // Use setTimeout to avoid setState in effect warning
      setTimeout(() => {
        setIsLoading(true);
        setProgress(0);
      }, 0);
      
      // Simulate progress for gamification
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const renderTimer = setTimeout(() => {
        try {
          const uniqueId = `mermaid-${id}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          mermaid.render(uniqueId, chart)
            .then(({ svg }) => {
              if (containerRef.current) {
                setProgress(100);
                clearInterval(progressInterval);
                
                // Add interactive styling to SVG
                const styledSvg = svg
                  .replace(/<svg/, '<svg class="mermaid-svg-interactive"')
                  .replace(/<g class="node"/g, '<g class="node mermaid-node-interactive"')
                  .replace(/<path class="flowchart-link"/g, '<path class="flowchart-link mermaid-link-animated"')
                  .replace(/<text class="nodeLabel"/g, '<text class="nodeLabel mermaid-text-interactive"');
                
                containerRef.current.innerHTML = styledSvg;
                
                // Add click handlers and animations
                const svgElement = containerRef.current.querySelector('svg');
                if (svgElement) {
                  svgRef.current = svgElement;
                  svgElement.style.cursor = 'grab';
                  svgElement.style.transition = 'transform 0.3s ease';
                  
                  // Make nodes interactive
                  const nodes = svgElement.querySelectorAll('.node, .nodeLabel');
                  nodes.forEach((node, index) => {
                    node.style.cursor = 'pointer';
                    node.style.transition = 'all 0.3s ease';
                    node.style.opacity = '0';
                    node.style.transform = 'scale(0.8)';
                    
                    // Animate nodes in sequence
                    setTimeout(() => {
                      node.style.opacity = '1';
                      node.style.transform = 'scale(1)';
                    }, index * 50);
                    
                    // Add hover effects
                    node.addEventListener('mouseenter', () => {
                      node.style.transform = 'scale(1.1)';
                      node.style.filter = 'drop-shadow(0 4px 8px rgba(255, 107, 53, 0.5))';
                    });
                    
                    node.addEventListener('mouseleave', () => {
                      node.style.transform = 'scale(1)';
                      node.style.filter = 'none';
                    });
                  });
                  
                  // Animate paths/edges
                  const paths = svgElement.querySelectorAll('path.flowchart-link, path.edge');
                  paths.forEach((path, index) => {
                    const length = path.getTotalLength();
                    path.style.strokeDasharray = length;
                    path.style.strokeDashoffset = length;
                    path.style.opacity = '0';
                    path.style.transition = 'opacity 0.5s ease, stroke-dashoffset 1s ease';
                    
                    setTimeout(() => {
                      path.style.opacity = '1';
                      path.style.strokeDashoffset = '0';
                    }, 300 + index * 100);
                  });
                }
                
                setIsLoading(false);
                setIsInteractive(true);
              }
            })
            .catch((error) => {
              console.error('Mermaid render error:', error);
              clearInterval(progressInterval);
              if (containerRef.current) {
                containerRef.current.innerHTML = `
                  <div style="padding: 20px; text-align: center; color: #e53e3e;">
                    <p>Error rendering chart</p>
                    <p style="font-size: 0.8em; margin-top: 10px;">${error.message}</p>
                  </div>
                `;
              }
              setIsLoading(false);
              renderedRef.current = false;
            });
        } catch (error) {
          console.error('Mermaid sync error:', error);
          clearInterval(progressInterval);
          setIsLoading(false);
          renderedRef.current = false;
        }
      }, 200);

      return () => {
        clearTimeout(renderTimer);
        clearInterval(progressInterval);
      };
    }
  }, [chart, id]);

  const handleZoomIn = () => {
    if (svgRef.current) {
      zoomLevelRef.current = Math.min(zoomLevelRef.current + 0.2, 2);
      svgRef.current.style.transform = `scale(${zoomLevelRef.current})`;
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current) {
      zoomLevelRef.current = Math.max(zoomLevelRef.current - 0.2, 0.5);
      svgRef.current.style.transform = `scale(${zoomLevelRef.current})`;
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current) {
      zoomLevelRef.current = 1;
      svgRef.current.style.transform = 'scale(1)';
    }
  };

  return (
    <div style={{ position: 'relative', background: 'rgba(255,255,255,0.95)', padding: '20px', borderRadius: '15px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', border: '2px solid rgba(255, 107, 53, 0.2)' }}>
      {isLoading && (
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          background: 'rgba(255,255,255,0.95)', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          borderRadius: '15px',
          zIndex: 10
        }}>
          <div style={{ 
            width: '200px', 
            height: '8px', 
            background: '#e5e7eb', 
            borderRadius: '4px',
            overflow: 'hidden',
            marginBottom: '15px'
          }}>
            <motion.div
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #FF6B35 0%, #feb47b 100%)',
                borderRadius: '4px',
                width: `${progress}%`,
                transition: 'width 0.3s ease'
              }}
            />
          </div>
          <p style={{ color: 'var(--vdrs-blue)', fontWeight: '600', fontSize: '1.1em' }}>
            {progress < 100 ? `Rendering flowchart... ${progress}%` : 'Finalizing...'}
          </p>
          <p style={{ color: '#666', fontSize: '0.9em', marginTop: '5px' }}>
            {title || 'Preparing interactive diagram'}
          </p>
        </div>
      )}
      
      {isInteractive && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          gap: '8px',
          zIndex: 20,
          background: 'rgba(255,255,255,0.9)',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <button
            onClick={handleZoomIn}
            style={{
              padding: '6px 12px',
              background: 'var(--vdrs-orange)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            style={{
              padding: '6px 12px',
              background: 'var(--vdrs-blue)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            −
          </button>
          <button
            onClick={handleResetZoom}
            style={{
              padding: '6px 12px',
              background: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '12px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            ⟲
          </button>
        </div>
      )}
      
      <div 
        ref={containerRef} 
        className="mermaid-diagram" 
        style={{ 
          overflow: 'auto',
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '300px',
          maxHeight: '600px',
          position: 'relative'
        }} 
      />
      
      {isInteractive && (
        <div style={{
          marginTop: '15px',
          padding: '10px',
          background: 'rgba(255, 107, 53, 0.1)',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '0.85em',
          color: '#666'
        }}>
          <span style={{ fontWeight: '600', color: 'var(--vdrs-orange)' }}>💡 Tip:</span> Hover over nodes to highlight them • Click and drag to pan • Use zoom controls
        </div>
      )}
    </div>
  );
};

function VanDykTools() {
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

      <div className="image-grid" style={{ margin: '15px 0', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        {[
          { src: "/images/vdt/vdt1.png", alt: "Van Dyk Tools Hub Dashboard" },
          { src: "/images/vdt/vdt2.png", alt: "Van Dyk Tools Login" }
        ].map((img, index) => (
          <ClickableImage
            key={index}
            src={img.src}
            alt={img.alt}
            images={[
              { src: "/images/vdt/vdt1.png", alt: "Van Dyk Tools Hub Dashboard" },
              { src: "/images/vdt/vdt2.png", alt: "Van Dyk Tools Login" }
            ]}
            index={index}
            className="main-image"
            style={{ maxHeight: '200px', objectFit: 'contain', width: 'auto' }}
          />
        ))}
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
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
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
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              style={{ 
                background: 'rgba(255,255,255,0.5)', 
                borderRadius: '15px', 
                padding: '25px', 
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)',
                minHeight: '200px'
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '15px' }}
              >
                <h3 style={{ 
                  color: 'var(--vdrs-blue)', 
                  fontSize: '1.5em', 
                  marginBottom: '10px', 
                  borderBottom: '2px solid var(--vdrs-orange)', 
                  paddingBottom: '10px', 
                  display: 'inline-block',
                  position: 'relative',
                  paddingLeft: '35px'
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
              </motion.div>
              
              {section.mermaid && (
                <div style={{ marginTop: '20px' }}>
                  <MermaidDiagram chart={section.mermaid} id={`chart-${index}`} title={section.title} />
                </div>
              )}
              
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
