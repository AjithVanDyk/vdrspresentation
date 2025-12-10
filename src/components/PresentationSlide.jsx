import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const PresentationSlide = ({ children, className = "" }) => {
  return (
    <div className={`page ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }} // Keep some stagger effect logic if possible, though standard stagger is harder with independent viewports. Just standard delay for first few might be tricky.
              // Actually, simply using the variant's transition is better. 
              // We'll override the delay in the variant if needed, or just let them trigger naturally.
              style={{ 
                width: '100%',
                marginBottom: '20px'
              }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </div>
  );
};

export default PresentationSlide;
