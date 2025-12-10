import React, { useEffect, useRef, useState, useMemo } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import flowchartsMd from '../data/TOOLS_FLOWCHARTS.md?raw';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  securityLevel: 'loose',
  fontFamily: 'Outfit, sans-serif',
  themeVariables: {
    primaryColor: '#1a202c',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#FF6B00',
    lineColor: '#00539B',
    secondaryColor: '#2d3748',
    tertiaryColor: '#2c5282',
  }
});

const MermaidDiagram = ({ chart, id }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      containerRef.current.innerHTML = '<div class="loading-chart" style="color: var(--vdrs-blue)">Rendering chart...</div>';
      
      const timer = setTimeout(() => {
        try {
          mermaid.render(`mermaid-${id}`, chart)
            .then(({ svg }) => {
              if (containerRef.current) {
                containerRef.current.innerHTML = svg;
              }
            })
            .catch((error) => {
              console.error('Mermaid render error:', error);
              if (containerRef.current) containerRef.current.innerHTML = 'Error rendering chart';
            });
        } catch (error) {
          console.error('Mermaid sync error:', error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [chart, id]);

  return <div ref={containerRef} className="mermaid-diagram" style={{ background: 'rgba(255,255,255,0.9)', padding: '20px', borderRadius: '10px', overflowX: 'auto', display: 'flex', justifyContent: 'center' }} />;
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

      {/* Detailed Flowcharts Section */}
      <div style={{ marginTop: '30px' }}>
        <h2 style={{ textAlign: 'center', color: 'var(--vdrs-blue)', marginBottom: '30px', fontSize: '2em' }}>Comprehensive Workflow Diagrams</h2>
        <div style={{ display: 'grid', gap: '30px' }}>
          {sections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ 
                background: 'rgba(255,255,255,0.5)', 
                borderRadius: '15px', 
                padding: '25px', 
                boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}
            >
              <h3 style={{ color: 'var(--vdrs-blue)', fontSize: '1.5em', marginBottom: '10px', borderBottom: '2px solid var(--vdrs-orange)', paddingBottom: '10px', display: 'inline-block' }}>
                {section.title}
              </h3>
              
              {section.mermaid && (
                <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                  <MermaidDiagram chart={section.mermaid} id={`chart-${index}`} />
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
