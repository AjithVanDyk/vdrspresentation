import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
import { technicalTerms } from '../data/technicalTerms';
import './Tooltip.css';

function Tooltip({ term, children, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const termData = technicalTerms[term];

  if (!termData) {
    // If term not found, just render children without tooltip
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={`tooltip-wrapper ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      <span className="tooltip-icon">
        <Icon name="question" size={14} color="currentColor" />
      </span>
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="tooltip-content"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="tooltip-header">
              <Icon name="lightbulb" size={16} color="#f59e0b" />
              <strong>{termData.term}</strong>
            </div>
            <div className="tooltip-body">
              {termData.explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

// Higher-order component to wrap text with tooltips
export function TooltipText({ text, className = '' }) {
  const terms = Object.keys(technicalTerms);
  const parts = [];
  let lastIndex = 0;
  let currentIndex = 0;

  // Simple word-based matching
  const words = text.split(/(\s+)/);
  
  words.forEach((word) => {
    const cleanWord = word.trim().replace(/[.,!?;:]/g, '');
    const matchedTerm = terms.find(term => {
      const termLower = term.toLowerCase();
      const termWords = termLower.split(/\s+/);
      return termWords.some(tw => cleanWord.toLowerCase() === tw || cleanWord.toLowerCase().includes(tw));
    });

    if (matchedTerm && cleanWord.length > 2) {
      parts.push(
        <span key={`text-${currentIndex++}`}>
          {text.substring(lastIndex, text.indexOf(word, lastIndex))}
        </span>
      );
      parts.push(
        <Tooltip key={`tooltip-${currentIndex++}`} term={matchedTerm}>
          {word}
        </Tooltip>
      );
      lastIndex = text.indexOf(word, lastIndex) + word.length;
    }
  });

  if (parts.length === 0) {
    return <span className={className}>{text}</span>;
  }

  parts.push(
    <span key={`text-${currentIndex++}`}>
      {text.substring(lastIndex)}
    </span>
  );

  return <span className={className}>{parts}</span>;
}

export default Tooltip;

