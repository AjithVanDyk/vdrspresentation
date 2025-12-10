import PresentationSlide from '../components/PresentationSlide';
import ClickableImage from '../components/ClickableImage';

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
          <p>Engineers and technicians spend countless hours manually extracting critical data from PDF documents and technical drawings (DWG files). This repetitive, error-prone process wastes valuable engineering time, introduces human error, and creates bottlenecks in project workflows, especially when processing large volumes of technical documentation.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>My Solution</h4>
          <p>Built a comprehensive suite of specialized data extraction tools using multiple PDF processing engines (PyMuPDF and pdfplumber) for robust extraction, DWG file processing capabilities, and Azure Files integration with FTP synchronization. These tools were integrated as modular components in the Van Dyk Tools Hub, providing the entire team with easy access to automated data extraction capabilities that reduce processing time from hours to seconds.</p>
        </div>
      </div>

      <div className="image-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', margin: '15px 0' }}>
        {[
          { src: "/images/vdt/Screenshot 2025-10-27 110500.png", alt: "Data Extractor Interface" },
          { src: "/images/vdt/Screenshot 2025-10-28 112718.png", alt: "PDF Processing" },
          { src: "/images/vdt/Screenshot 2025-11-10 161206.png", alt: "Extraction Results" }
        ].map((img, index) => (
          <ClickableImage
            key={index}
            src={img.src}
            alt={img.alt}
            images={[
              { src: "/images/vdt/Screenshot 2025-10-27 110500.png", alt: "Data Extractor Interface" },
              { src: "/images/vdt/Screenshot 2025-10-28 112718.png", alt: "PDF Processing" },
              { src: "/images/vdt/Screenshot 2025-11-10 161206.png", alt: "Extraction Results" }
            ]}
            index={index}
            className="grid-image"
            style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
          />
        ))}
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
            <li><strong>Dual PDF Engines:</strong> PyMuPDF & pdfplumber for maximum extraction reliability</li>
            <li><strong>DWG Processing:</strong> Extract structured data from technical CAD drawings</li>
            <li><strong>Cloud Infrastructure:</strong> Azure Files integration with automated FTP synchronization</li>
            <li><strong>Modular Architecture:</strong> Reusable code modules for maintainability</li>
            <li><strong>Batch Processing:</strong> Handle multiple files simultaneously</li>
            <li><strong>Error Handling:</strong> Robust validation and error recovery mechanisms</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Business Impact</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Time Savings:</strong> Eliminates hours of manual data entry per document</li>
            <li><strong>Speed:</strong> 10-second processing vs. hours of manual extraction</li>
            <li><strong>Accuracy:</strong> Automated extraction significantly reduces human error</li>
            <li><strong>Scalability:</strong> Process hundreds of documents in batch operations</li>
            <li><strong>Consistency:</strong> Standardized extraction format across all documents</li>
          </ul>
        </div>
      </div>
    </PresentationSlide>
  );
}

export default DataExtractor;
