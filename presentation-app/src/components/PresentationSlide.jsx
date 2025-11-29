import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const PresentationSlide = ({ children, className = "" }) => {
  return (
    <motion.div 
      className={`page ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      // Inline styles removed to let CSS control layout
    >
      {React.Children.map(children, (child) => {
        // Wrap each direct child in a motion div for staggered animation
        if (React.isValidElement(child)) {
          return (
            <motion.div 
              variants={itemVariants} 
              style={{ 
                width: '100%',
                flexShrink: 1, // Allow shrinking
                minHeight: 0   // Allow shrinking below content size
              }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
};

export default PresentationSlide;
