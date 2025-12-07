import PresentationSlide from '../components/PresentationSlide';

function RAGSystem() {
  return (
    <PresentationSlide>
      <div className="slide-header">
        <h1>RAG Chatbot System</h1>
        <h2>First Large-Scale Chatbot (10,000+ Docs) - Unstructured Data</h2>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="challenge-box" style={{ margin: 0 }}>
          <h4>Problem Statement</h4>
          <p>Technicians spend hours searching through manuals to find answers. The information is hidden in thousands of PDF files and is hard to find quickly.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>Solution Implemented</h4>
          <p>I built an AI search tool that reads over 10,000 documents. Technicians can ask questions in plain English, and the system finds the exact answer instantly.</p>
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
          <div className="metric-label">Response Time</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>System Architecture</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Reading Files:</strong> System reads PDFs, Word docs, and text files.</li>
            <li><strong>Understanding Text:</strong> Converts text into numbers (vectors) to understand meaning.</li>
            <li><strong>Smart Search:</strong> Finds the most relevant paragraphs for any question.</li>
            <li><strong>ChromaDB:</strong> Handles 100GB+ of vector data efficiently.</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Future Integration</h4>
          <p style={{ fontSize: '0.9em' }}>Combining this document search with the DykScribe knowledge base creates a complete assistant that knows both the manuals AND the engineers' experience.</p>
        </div>
      </div>

      <div className="challenge-box" style={{ marginTop: 'auto', padding: '15px' }}>
        <h4 style={{ margin: '5px 0' }}>Key Insight: Build vs. Buy</h4>
        <p style={{ fontSize: '0.95em' }}>
          While this custom tool works well, I learned that for large companies, it's often better to buy existing solutions (like Microsoft Copilot or Salesforce) rather than building from scratch. 
          Just like we use NetSuite for ERP instead of building our own, buying an AI tool saves money on maintenance and infrastructure in the long run.
        </p>
      </div>
    </PresentationSlide>
  );
}

export default RAGSystem;
