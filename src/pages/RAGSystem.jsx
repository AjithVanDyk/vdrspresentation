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
          <p>Technicians spend hours manually searching through thousands of PDF manuals, Word documents, and technical files to find specific answers. The information is scattered across unstructured documents, making it extremely time-consuming and inefficient to locate critical troubleshooting information when equipment issues arise.</p>
        </div>

        <div className="solution-box" style={{ margin: 0 }}>
          <h4>Solution Implemented</h4>
          <p>Built a comprehensive RAG (Retrieval-Augmented Generation) system using Python, Streamlit, and ChromaDB that processes 10,000+ documents. The system converts text into vector embeddings for semantic search, supports multiple file types (PDF, DOCX, TXT, XLSX), includes OCR capabilities for scanned documents, and provides intelligent query interfaces. Technicians can ask questions in plain English and receive instant, contextually relevant answers with source citations.</p>
        </div>
      </div>

      <div className="metrics-grid" style={{ margin: '15px 0' }}>
        <div className="metric-card" style={{ background: 'var(--vd-gradient-hero)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>60%</div>
          <div className="metric-label">Accuracy Rate</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-primary)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100K+</div>
          <div className="metric-label">Files Processed</div>
        </div>

        <div className="metric-card" style={{ background: 'linear-gradient(135deg, var(--vd-primary-light) 0%, var(--vd-primary) 100%)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>100GB</div>
          <div className="metric-label">ChromaDB Size</div>
        </div>

        <div className="metric-card" style={{ background: 'var(--vd-gradient-accent)', padding: '15px' }}>
          <div className="metric-value" style={{ fontSize: '2em' }}>30s</div>
          <div className="metric-label">Response Time</div>
        </div>
      </div>

      <div className="two-column" style={{ margin: '15px 0', gap: '20px' }}>
        <div className="tech-list" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>System Architecture</h4>
          <ul style={{ fontSize: '0.9em' }}>
            <li><strong>Multi-Format Support:</strong> Processes PDFs, DOCX, TXT, XLSX with OCR for scanned documents.</li>
            <li><strong>Vector Embeddings:</strong> Converts text into semantic vectors using OpenAI embeddings for meaning-based search.</li>
            <li><strong>Hybrid Search:</strong> Combines document search with SQL database queries for comprehensive results.</li>
            <li><strong>ChromaDB Storage:</strong> Efficiently manages 100GB+ of vector data with advanced chunking strategies.</li>
            <li><strong>Streamlit Interface:</strong> User-friendly web application for querying and document management.</li>
            <li><strong>Vanna AI Integration:</strong> Advanced SQL generation for equipment database queries.</li>
          </ul>
        </div>

        <div className="impact-box" style={{ margin: 0, padding: '15px' }}>
          <h4 style={{ margin: '5px 0' }}>Future Integration</h4>
          <p style={{ fontSize: '0.9em' }}>Future integration with DykScribe will create a comprehensive knowledge system combining structured manuals (RAG) with experiential knowledge (DykScribe Q&A pairs), providing technicians with both documented procedures and real-world troubleshooting insights from experienced engineers.</p>
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
