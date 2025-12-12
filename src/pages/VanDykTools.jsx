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

const MermaidDiagram = ({ chart, id, title, isModal = false }) => {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [error, setError] = useState(null);
  const [isRendering, setIsRendering] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current && chart) {
      // Clear previous content
      containerRef.current.innerHTML = '';
      setError(null);
      setIsRendering(true);

      // Sanitize ID to make it a valid CSS selector (remove spaces, parentheses, and other invalid chars)
      const sanitizedId = String(id).replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      const uniqueId = `mermaid-${sanitizedId}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Small delay to ensure DOM is ready, especially for modals
      const renderTimeout = setTimeout(() => {
        try {
          mermaid.render(uniqueId, chart)
            .then(({ svg }) => {
              if (containerRef.current) {
                containerRef.current.innerHTML = svg;
                setIsRendering(false);
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
              setError('Failed to render chart. Please try again.');
              setIsRendering(false);
            });
        } catch (e) {
          console.error('Mermaid syntax error:', e);
          setError('Invalid chart syntax');
          setIsRendering(false);
        }
      }, isModal ? 100 : 0); // Small delay for modal to ensure DOM is ready

      return () => {
        clearTimeout(renderTimeout);
      };
    }
  }, [chart, id, isModal]);

  // Zoom and Pan handlers for modal
  useEffect(() => {
    if (!isModal || !wrapperRef.current) return;

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        setZoom(prev => Math.max(0.5, Math.min(3, prev * delta)));
      }
    };

    const handleMouseDown = (e) => {
      if (e.button === 0) { // Left mouse button
        setIsDragging(true);
        setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      }
    };

    const handleMouseMove = (e) => {
      if (isDragging) {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const wrapper = wrapperRef.current;
    wrapper.addEventListener('wheel', handleWheel, { passive: false });
    wrapper.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      wrapper.removeEventListener('wheel', handleWheel);
      wrapper.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isModal, isDragging, dragStart, pan]);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(3, prev + 0.2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(0.5, prev - 0.2));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div style={{ 
      background: isModal ? 'transparent' : 'white', 
      padding: isModal ? '0' : '15px', 
      borderRadius: '8px', 
      boxShadow: isModal ? 'none' : 'inset 0 0 10px rgba(0,0,0,0.05)', 
      border: isModal ? 'none' : '1px solid #e2e8f0',
      minHeight: isModal ? 'auto' : '150px',
      maxHeight: isModal ? 'none' : '400px',
      overflow: isModal ? 'hidden' : 'auto',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column',
      width: '100%',
      position: 'relative'
    }}>
      {isModal && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          display: 'flex',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '8px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
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
              fontSize: '14px',
              fontWeight: 'bold'
            }}
            title="Zoom In (Ctrl + Scroll)"
          >
            +
          </button>
          <button
            onClick={handleZoomOut}
            style={{
              padding: '6px 12px',
              background: 'var(--vdrs-orange)',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
            title="Zoom Out (Ctrl + Scroll)"
          >
            −
          </button>
          <button
            onClick={handleReset}
            style={{
              padding: '6px 12px',
              background: '#4a5568',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 'bold'
            }}
            title="Reset Zoom & Pan"
          >
            Reset
          </button>
          <div style={{
            padding: '6px 12px',
            background: '#e2e8f0',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#2d3748',
            display: 'flex',
            alignItems: 'center'
          }}>
            {Math.round(zoom * 100)}%
          </div>
        </div>
      )}
      {isRendering && !error && (
        <div style={{ color: '#718096', textAlign: 'center', padding: '20px' }}>
          <p>Loading flowchart...</p>
        </div>
      )}
      {error ? (
        <div style={{ color: '#e53e3e', textAlign: 'center', padding: '20px' }}>
          <p>⚠️ {error}</p>
          <p style={{ fontSize: '0.9em', marginTop: '10px' }}>Chart ID: {id}</p>
        </div>
      ) : (
        <div 
          ref={wrapperRef}
          style={{ 
            width: '100%', 
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
            cursor: isModal && isDragging ? 'grabbing' : isModal ? 'grab' : 'default'
          }}
        >
          <div 
            ref={containerRef} 
            className="mermaid-diagram"
            style={{ 
              width: '100%', 
              maxWidth: '100%',
              overflow: 'visible',
              display: isRendering ? 'none' : 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: isModal ? '200px' : 'auto',
              transform: isModal ? `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` : 'none',
              transformOrigin: 'center center',
              transition: isDragging ? 'none' : 'transform 0.1s ease-out'
            }}
          />
        </div>
      )}
      {title && !isModal && <p style={{ marginTop: '10px', color: '#718096', fontSize: '0.9em' }}>{title}</p>}
      {isModal && !error && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '6px 12px',
          borderRadius: '6px',
          fontSize: '11px',
          zIndex: 10
        }}>
          Drag to pan • Ctrl + Scroll to zoom
        </div>
      )}
    </div>
  );
};

function VanDykTools() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Tool creators mapping
  // Contributors: Ajith Srikanth (Primary Developer), Ainsley Jebaraj, Kishan B
  // TODO: Update with correct author assignments for each tool
  const toolCreators = {
    'PDF Matcher': 'Ajith Srikanth',
    'Serial Copier': 'Ajith Srikanth',
    'AI Extractor': 'Ajith Srikanth',
    'Machine Info Extractor': 'Ajith Srikanth',
    'Excel Comparator': 'Ajith Srikanth',
    'File Organizer': 'Ajith Srikanth',
    'Serial Matcher': 'Ajith Srikanth',
    'Duplicate Finder': 'Ajith Srikanth',
    'Part Number Formatter': 'Zachary M',
    'Filter Serial Numbers': 'Claudia H',
    'Spare List Formatter': 'Claudia H',
    'Part Dash Remover': 'Zachary M',
    'VDRS Sync': 'Ainsley Jebaraj',
    'DataDropper': 'Ainsley Jebaraj',
    'Parser': 'Ajith Srikanth',
    'Pipeline 1 (YOLO Processing)': 'Ainsley Jebaraj',
    'Pipeline 2 (GPT Processing)': 'Ainsley Jebaraj',
    'Folder Creator': 'Ajith Srikanth',
    'Drawing Extractor': 'Ajith Srikanth',
    'Folder Renamer': 'Ajith Srikanth',
  };

  const sections = useMemo(() => {
    const lines = flowchartsMd.split('\n');
    const parsedSections = [];
    let currentSection = null;
    let captureMermaid = false;
    let mermaidContent = '';

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        if (currentSection) parsedSections.push(currentSection);
        const title = line.replace('## ', '').replace(/^\d+\.\s*/, '').trim();
        currentSection = {
          title: title,
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
    const filtered = parsedSections.filter(s => s.title !== 'Summary' && s.mermaid);
    console.log('Parsed sections:', filtered.length, 'sections with flowcharts');
    return filtered;
  }, []);

  const handleCardClick = (section) => {
    console.log('Card clicked:', section.title, 'Has mermaid:', !!section.mermaid);
    if (!section.mermaid) {
      console.warn('No mermaid chart found for:', section.title);
      return;
    }
    setSelectedTool(section);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTool(null);
  };

  return (
    <PresentationSlide>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
        <h4 style={{ margin: '0 0 10px 0', color: '#1a202c' }}>Processing Time Analysis</h4>
        <p style={{ margin: '0 0 15px 0', fontSize: '0.85em', color: '#718096', fontStyle: 'italic' }}>
          * Times shown per machine in 1 project. Real-world scalability example below.
        </p>
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
              { step: 'Step 1: Machine Info Extractor + Folder Creation', orig: 'Per Machine 2 mins', new: '10s' },
              { step: 'Step 2: Renaming the Folder Names + AMI Creation', orig: 'Per Machine 1 min', new: '5s' },
              { step: 'Step 3: Creation of Spare Parts DB', orig: 'Per Machine 5 mins', new: '60s' },
              { step: 'Step 4: Extraction of Sub assembly Drawings', orig: 'Per Machine 80 mins', new: '5 mins' },
              { step: 'Step 5: Adding Subassemblies to Respective Folders', orig: 'Per Machine 1 hr', new: '1 min' },
              { step: 'Step 6: Addition of Machine into AMI', orig: 'Per Machine 24hrs 6mins', new: '6 mins' },
              { step: 'Step 7: Motor & Name Plate Tags Addition to AMI', orig: 'Per Machine 15 mins', new: '60s' },
            ].map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                <td style={{ padding: '8px', fontWeight: '500', color: '#2d3748' }}>{row.step}</td>
                <td style={{ padding: '8px', color: '#e53e3e' }}>{row.orig}</td>
                <td style={{ padding: '8px', color: '#38a169', fontWeight: 'bold' }}>{row.new}</td>
              </tr>
            ))}
            <tr style={{ background: '#f8f9fa', fontWeight: 'bold' }}>
              <td style={{ padding: '10px 8px', color: 'var(--vdrs-blue)' }}>TOTAL (Per Machine)</td>
              <td style={{ padding: '10px 8px', color: '#e53e3e' }}>50 mins</td>
              <td style={{ padding: '10px 8px', color: '#38a169' }}>6.5 mins</td>
            </tr>
            <tr style={{ background: 'linear-gradient(135deg, rgba(0,83,155,0.1) 0%, rgba(255,107,53,0.1) 100%)', fontWeight: 'bold', borderTop: '3px solid var(--vdrs-orange)' }}>
              <td style={{ padding: '12px 8px', color: 'var(--vdrs-blue)', fontSize: '1.05em' }}>
                REAL-WORLD EXAMPLE: WM Indianapolis (007948-802259)
                <br />
                <span style={{ fontSize: '0.85em', fontWeight: 'normal', color: '#718096' }}>
                  180 Machines × 3 Drawings Average
                </span>
              </td>
              <td style={{ padding: '12px 8px', color: '#e53e3e', fontSize: '1.05em' }}>
                9,000 mins<br />
                <span style={{ fontSize: '0.9em' }}>(150 hrs / 6.25 days)</span>
              </td>
              <td style={{ padding: '12px 8px', color: '#38a169', fontSize: '1.05em' }}>
                1,170 mins<br />
                <span style={{ fontSize: '0.9em' }}>(19.5 hrs)</span>
              </td>
            </tr>
            <tr style={{ background: 'linear-gradient(135deg, rgba(38,169,105,0.15) 0%, rgba(0,83,155,0.1) 100%)', fontWeight: 'bold' }}>
              <td style={{ padding: '12px 8px', color: 'var(--vdrs-blue)', fontSize: '1.1em' }}>TIME SAVED PER PROJECT</td>
              <td colSpan="2" style={{ padding: '12px 8px', color: '#38a169', fontSize: '1.1em', textAlign: 'center' }}>
                7,830 mins = <strong style={{ fontSize: '1.2em' }}>130.5 hours</strong> = <strong style={{ fontSize: '1.2em' }}>5.4 days saved</strong>
              </td>
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

        <div className="impact-box" style={{ margin: 0, padding: '15px', background: 'linear-gradient(135deg, rgba(0,83,155,0.95) 0%, rgba(49,130,206,0.95) 100%)' }}>
          <h4 style={{ margin: '5px 0', color: '#ffffff', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>Business Impact</h4>
          <ul className="force-white-text" style={{ fontSize: '0.9em', color: '#f7fafc', listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px', paddingLeft: '0' }}><strong style={{ color: '#ffffff' }}>Time Savings:</strong> <span style={{ color: '#e2e8f0' }}>Tasks reduced from hours/days to minutes/seconds (see processing time table)</span></li>
            <li style={{ marginBottom: '10px', paddingLeft: '0' }}><strong style={{ color: '#ffffff' }}>Consistency:</strong> <span style={{ color: '#e2e8f0' }}>Standardized tools and file formats across all operations</span></li>
            <li style={{ marginBottom: '10px', paddingLeft: '0' }}><strong style={{ color: '#ffffff' }}>Performance:</strong> <span style={{ color: '#e2e8f0' }}>Algorithmic optimization (O(1) lookups) efficiently handles 100K+ files</span></li>
            <li style={{ marginBottom: '10px', paddingLeft: '0' }}><strong style={{ color: '#ffffff' }}>Centralization:</strong> <span style={{ color: '#e2e8f0' }}>Single source of truth for all internal automation tools</span></li>
            <li style={{ marginBottom: '10px', paddingLeft: '0' }}><strong style={{ color: '#ffffff' }}>Accessibility:</strong> <span style={{ color: '#e2e8f0' }}>Web-based platform requires no installation or updates</span></li>
            <li style={{ marginBottom: '10px', paddingLeft: '0' }}><strong style={{ color: '#ffffff' }}>Scalability:</strong> <span style={{ color: '#e2e8f0' }}>Supports 50+ service engineers and 60+ company users</span></li>
            <li style={{ marginBottom: '10px', paddingLeft: '0' }}><strong style={{ color: '#ffffff' }}>Integration:</strong> <span style={{ color: '#e2e8f0' }}>Seamless connection with Van Dyk One App for faster project retrieval</span></li>
          </ul>
        </div>
      </div>

      {/* Tools with Flowcharts Section */}
      <div style={{ marginTop: '30px', marginBottom: '20px', flex: '1', overflowY: 'auto', maxHeight: 'calc(100vh - 650px)', minHeight: '400px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--vdrs-blue)', marginBottom: '30px', fontSize: '2em' }}>Tools with Workflow Diagrams</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '20px',
          paddingBottom: '20px'
        }}>
          {sections.map((section, index) => (
            <motion.div 
              key={`section-${index}-${section.title}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              style={{ 
                background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)', 
                borderRadius: '15px', 
                padding: '20px', 
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                border: '2px solid rgba(0,83,155,0.1)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => handleCardClick(section)}
              whileHover={{ 
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                transform: 'translateY(-5px)',
                borderColor: 'var(--vdrs-orange)'
              }}
            >
              <div style={{ 
                position: 'absolute',
                top: '0',
                right: '0',
                width: '60px',
                height: '60px',
                background: 'linear-gradient(135deg, var(--vdrs-orange) 0%, #ff8c5a 100%)',
                borderRadius: '0 15px 0 100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5em'
              }}>
                📊
              </div>
              
              <h3 style={{ 
                color: 'var(--vdrs-blue)', 
                fontSize: '1.3em', 
                marginBottom: '15px',
                marginTop: '0',
                fontWeight: 'bold',
                paddingRight: '50px'
              }}>
                {section.title}
              </h3>
              
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                marginTop: '15px',
                padding: '8px',
                background: 'rgba(0,83,155,0.05)',
                borderRadius: '8px'
              }}>
                <span style={{ fontSize: '0.85em', color: '#718096' }}>👤</span>
                <span style={{ fontSize: '0.9em', color: '#4a5568', fontWeight: '500' }}>
                  {toolCreators[section.title] || 'Ajith Srikanth'}
                </span>
              </div>
              
              <div style={{ 
                marginTop: '12px',
                padding: '10px',
                background: 'rgba(255,107,53,0.1)',
                borderRadius: '8px',
                fontSize: '0.85em',
                color: '#2d3748',
                fontStyle: 'italic'
              }}>
                Click to view flowchart →
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Popup Modal for Flowcharts */}
      <AnimatePresence mode="wait">
        {showModal && selectedTool && selectedTool.mermaid && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10000,
              padding: '20px'
            }}
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                maxWidth: '90vw',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                position: 'relative',
                width: '100%'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                borderBottom: '2px solid var(--vdrs-orange)',
                paddingBottom: '15px'
              }}>
                <div>
                  <h2 style={{ 
                    color: 'var(--vdrs-blue)', 
                    margin: 0,
                    fontSize: '1.8em',
                    fontWeight: 'bold'
                  }}>
                    {selectedTool.title}
                  </h2>
                  <p style={{ 
                    margin: '8px 0 0 0',
                    color: '#718096',
                    fontSize: '0.95em'
                  }}>
                    Created by: <strong>{toolCreators[selectedTool.title] || 'Ajith Srikanth'}</strong>
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseModal}
                  style={{
                    background: 'var(--vdrs-orange)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    fontSize: '1.5em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold'
                  }}
                >
                  ×
                </motion.button>
              </div>
              
              <div style={{
                width: '100%',
                overflow: 'auto',
                maxHeight: '70vh',
                padding: '10px',
                background: '#f7fafc',
                borderRadius: '10px'
              }}>
                <MermaidDiagram 
                  chart={selectedTool.mermaid} 
                  id={`modal-chart-${selectedTool.title}`} 
                  title={selectedTool.title}
                  isModal={true}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </PresentationSlide>
  );
}

export default VanDykTools;
