import React, { useEffect, useRef, useState, useMemo } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import flowchartsMd from '../data/TOOLS_FLOWCHARTS.md?raw';

// Initialize mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'Inter, sans-serif',
});

const MermaidDiagram = ({ chart, id }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && chart) {
      containerRef.current.innerHTML = ''; // Clear previous
      try {
        mermaid.render(`mermaid-${id}`, chart).then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        });
      } catch (error) {
        console.error('Mermaid render error:', error);
        containerRef.current.innerHTML = '<div class="text-red-400">Error rendering chart</div>';
      }
    }
  }, [chart, id]);

  return <div ref={containerRef} className="mermaid-diagram overflow-x-auto p-4 bg-black/40 rounded-xl" />;
};

const ToolCard = ({ tool, onClick }) => (
  <motion.div
    layoutId={`card-${tool.title}`}
    onClick={onClick}
    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 cursor-pointer hover:bg-white/10 transition-colors group relative overflow-hidden"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <motion.h3 
      layoutId={`title-${tool.title}`}
      className="text-xl font-bold text-cyan-300 mb-2 relative z-10"
    >
      {tool.title}
    </motion.h3>
    <p className="text-gray-400 text-sm line-clamp-3 relative z-10">
      {tool.content[0] || "Click to explore workflow details..."}
    </p>
    <div className="mt-4 flex items-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
      <span>Explore Workflow</span>
      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  </motion.div>
);

const ToolDetail = ({ tool, onClose }) => (
  <motion.div
    layoutId={`card-${tool.title}`}
    className="fixed inset-0 z-50 bg-[#0a192f] overflow-y-auto"
  >
    <div className="max-w-5xl mx-auto px-6 py-12">
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-50"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <motion.h2 
        layoutId={`title-${tool.title}`}
        className="text-4xl font-bold text-cyan-300 mb-8"
      >
        {tool.title}
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        <div className="space-y-6">
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-semibold text-white mb-4">How it Works</h3>
            {tool.content.map((line, i) => (
              <p key={i} className="text-gray-300 leading-relaxed">{line}</p>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Process Logic
          </h3>
          {tool.mermaid && (
            <MermaidDiagram chart={tool.mermaid} id={`detail-${tool.title.replace(/\s+/g, '-')}`} />
          )}
        </div>
      </motion.div>
    </div>
  </motion.div>
);

const VanDykToolsDetail = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const sections = useMemo(() => {
    const lines = flowchartsMd.split('\n');
    const parsedSections = [];
    let currentSection = null;
    let captureMermaid = false;
    let mermaidContent = '';

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        if (currentSection) {
          parsedSections.push(currentSection);
        }
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
        if (currentSection) {
          currentSection.mermaid = mermaidContent.trim();
        }
      } else if (captureMermaid) {
        mermaidContent += line + '\n';
      } else if (currentSection && line.trim() !== '' && !line.startsWith('---')) {
        currentSection.content.push(line);
      }
    });

    if (currentSection) {
      parsedSections.push(currentSection);
    }

    // Filter out Summary section if present
    return parsedSections.filter(s => s.title !== 'Summary');
  }, []);

  return (
    <div className="min-h-screen bg-[#0a192f] text-white overflow-y-auto selection:bg-cyan-500/30">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <Link 
              to="/tools"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Hub
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
              Tool Explorer
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Interactive documentation for the VDRS ecosystem. Select a tool to view its logic.
            </p>
          </div>
          <div className="hidden md:block text-right">
            <div className="text-3xl font-bold text-white">{sections.length}</div>
            <div className="text-sm text-gray-400 uppercase tracking-wider">Active Tools</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section, index) => (
            <ToolCard 
              key={index} 
              tool={section} 
              onClick={() => setSelectedTool(section)} 
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedTool && (
            <ToolDetail 
              tool={selectedTool} 
              onClose={() => setSelectedTool(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VanDykToolsDetail;
