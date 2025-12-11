import { motion } from 'framer-motion';
import PresentationSlide from '../components/PresentationSlide';
import AnimatedCounter from '../components/AnimatedCounter';
import ClickableImage from '../components/ClickableImage';
import { Icon } from '../components/Icons';

function RAGSystem() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const ragImages = [
    { src: "/images/RAG/rag1.png", alt: "RAG System Interface 1" },
    { src: "/images/RAG/rag2.png", alt: "RAG System Interface 2" },
    { src: "/images/RAG/cmdchat.png", alt: "RAG Command Chat Interface" },
    { src: "/images/RAG/cmdch2.png", alt: "RAG Command Chat Interface 2" },
    { src: "/images/RAG/Screenshot 2025-12-11 151205.png", alt: "RAG System Screenshot" }
  ];

  return (
    <PresentationSlide>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '3.5em', 
            background: 'linear-gradient(to right, #00539B, #3182ce)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            margin: '0 0 10px 0'
          }}>
            RAG Chatbot System
          </h1>
          <h2 style={{ fontSize: '1.5em', color: '#4a5568', fontWeight: '300', margin: '0 0 25px 0' }}>
            First Large-Scale Chatbot (10,000+ Docs) - Unstructured Data
          </h2>
        </motion.div>

        {/* Problem & Solution Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.9)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="puzzle" size={32} color="#e53e3e" />
              <h3 style={{ margin: 0, color: '#e53e3e' }}>Problem Statement</h3>
            </div>
            <p style={{ lineHeight: '1.6', color: '#2d3748' }}>
              Technicians spend hours manually searching through thousands of PDF manuals, Word documents, and technical files to find specific answers. The information is scattered across unstructured documents, making it extremely time-consuming and inefficient to locate critical troubleshooting information when equipment issues arise.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="glass-card" style={{ padding: '25px', background: 'rgba(255,255,255,0.9)', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
              <Icon name="lightbulb" size={32} color="#38a169" />
              <h3 style={{ margin: 0, color: '#38a169' }}>Solution Implemented</h3>
            </div>
            <p style={{ lineHeight: '1.6', color: '#2d3748' }}>
              Built a comprehensive RAG (Retrieval-Augmented Generation) system using Python, Streamlit, and ChromaDB that processes 10,000+ documents. The system converts text into vector embeddings for semantic search, supports multiple file types (PDF, DOCX, TXT, XLSX), includes OCR capabilities for scanned documents, and provides intelligent query interfaces. Technicians can ask questions in plain English and receive instant, contextually relevant answers with source citations.
            </p>
          </motion.div>
        </div>

        {/* Image Grid */}
        <motion.div variants={itemVariants} className="image-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', margin: '15px 0' }}>
          {ragImages.map((img, index) => (
            <ClickableImage
              key={index}
              src={img.src}
              alt={img.alt}
              images={ragImages}
              index={index}
              className="grid-image"
              style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            />
          ))}
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="metrics-grid" style={{ margin: '15px 0' }}>
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
        </motion.div>

        {/* System Architecture & Business Impact */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '25px' }}>
          <motion.div variants={itemVariants} style={{ padding: '20px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#00539B', borderBottom: '2px solid #00539B', paddingBottom: '10px' }}>System Architecture & Capabilities</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9em' }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="file" size={18} color="#00539B" /> <strong>Document Processing:</strong> Reads PDFs, Word docs, text files, and handles OCR for scanned documents.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="brain" size={18} color="#00539B" /> <strong>Vector Embeddings:</strong> Converts text into numerical vectors to understand meaning and context.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="search" size={18} color="#00539B" /> <strong>Hybrid Search:</strong> Combines vector similarity with database queries for comprehensive results.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="database" size={18} color="#00539B" /> <strong>ChromaDB:</strong> Efficiently manages 100GB+ of vector data for fast retrieval.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="robot" size={18} color="#00539B" /> <strong>AI Chatbot:</strong> Intelligent conversation using OpenAI's GPT models.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="python" size={18} color="#00539B" /> <strong>Vanna AI Integration:</strong> Advanced SQL generation from natural language.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="refresh" size={18} color="#00539B" /> <strong>Real-time Processing:</strong> Live document indexing and updates.
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} style={{ padding: '20px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)' }}>
            <h4 style={{ margin: '0 0 15px 0', color: '#FF6B35', borderBottom: '2px solid #FF6B35', paddingBottom: '10px' }}>Business Impact</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.9em' }}>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="zap" size={18} color="#FF6B35" /> <strong>Instant Answers:</strong> Reduces technician search time from hours to seconds.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="money" size={18} color="#FF6B35" /> <strong>Cost Savings:</strong> Automates knowledge retrieval, improving efficiency.
              </li>
              <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px', color: '#2d3748' }}>
                <Icon name="lightbulb" size={18} color="#FF6B35" /> <strong>Key Insight: Build vs. Buy:</strong> For large-scale enterprise, off-the-shelf solutions (e.g., Microsoft Copilot) often offer better long-term value due to maintenance and infrastructure costs.
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Future Integration Section */}
        <motion.div 
          variants={itemVariants}
          style={{ 
            marginTop: '25px', 
            padding: '25px', 
            background: 'linear-gradient(135deg, rgba(0, 83, 155, 0.1) 0%, rgba(255, 107, 53, 0.1) 100%)',
            borderRadius: '15px',
            border: '2px solid #00539B',
            boxShadow: '0 5px 15px rgba(0, 83, 155, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <Icon name="link" size={32} color="#00539B" />
            <h3 style={{ margin: 0, color: '#00539B', fontSize: '1.5em' }}>Future Integration</h3>
          </div>
          <p style={{ fontSize: '1em', lineHeight: '1.6', color: '#2d3748', margin: 0 }}>
            Future integration with <strong>DykScribe</strong> will create a comprehensive knowledge system combining structured manuals (RAG) with experiential knowledge (DykScribe Q&A pairs). This unified approach will provide technicians with both documented procedures and real-world troubleshooting insights from experienced engineers, creating a complete "shared brain" that captures both theoretical knowledge and practical field experience.
          </p>
        </motion.div>

        {/* Key Insight */}
        <motion.div 
          variants={itemVariants}
          className="challenge-box" 
          style={{ marginTop: '20px', padding: '20px', background: 'rgba(255,255,255,0.9)', borderRadius: '15px', border: '1px solid rgba(0,0,0,0.1)' }}
        >
          <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>Key Insight: Build vs. Buy</h4>
          <p style={{ fontSize: '0.95em', color: '#2d3748', margin: 0, lineHeight: '1.6' }}>
            While this custom tool works well, I learned that for large companies, it's often better to buy existing solutions (like Microsoft Copilot or Salesforce) rather than building from scratch. 
            Just like we use NetSuite for ERP instead of building our own, buying an AI tool saves money on maintenance and infrastructure in the long run.
          </p>
        </motion.div>
      </motion.div>
    </PresentationSlide>
  );
}

export default RAGSystem;
