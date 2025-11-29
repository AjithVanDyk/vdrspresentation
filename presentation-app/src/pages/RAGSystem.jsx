import PresentationSlide from '../components/PresentationSlide';

function RAGSystem() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>RAG Chatbot System</h1>
        <h2>AI-Powered Knowledge Retrieval - My First AI Project</h2>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>Problem I Observed</h4>
          <p>Technicians spend 2+ hours searching through equipment manuals and troubleshooting documents. Knowledge exists only as scattered PDFs and tickets.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>What I Built</h4>
          <p>AI-powered search system using RAG that understands natural language questions and finds answers instantly from 100,000+ documents. My introduction to AI/ML!</p>
        </div>
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>60%</div>
          <div className="metric-label">Accuracy Rate</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100K+</div>
          <div className="metric-label">Files Processed</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100GB</div>
          <div className="metric-label">ChromaDB Size</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>30s</div>
          <div className="metric-label">API Response</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>System Architecture</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Document Processing:</strong> Ingestion pipeline handling 100K+ files</li>
            <li><strong>Vector Database:</strong> 100GB ChromaDB for semantic search</li>
            <li><strong>Intelligent Chunking:</strong> Smart document splitting</li>
            <li><strong>No Hallucination:</strong> Returns "data not found" if unsure</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Future Integration</h4>
          <p style={{ fontSize: '0.9em' }}>Combining RAG's document search with DykScribe's engineer knowledge creates a comprehensive troubleshooting assistant.</p>
          <ul style={{ fontSize: '0.9em' }}>
            <li>Troubleshooting guidance from documents AND experience</li>
            <li>Machine-specific data retrieval</li>
          </ul>
        </div>
      </div>

      <div className="challenge-box" style={{ marginTop: 'auto', padding: '15px' }}>
        <h4 style={{ margin: '5px 0' }}>Key Insight</h4>
        <p style={{ fontSize: '0.95em' }}>While technically successful, this POC validates the business case for evaluating commercial solutions like Microsoft 365 Copilot to avoid infrastructure maintenance.</p>
      </div>
    </PresentationSlide>
  );
}

export default RAGSystem;
