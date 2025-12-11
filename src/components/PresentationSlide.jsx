import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../utils/animations';

const PresentationSlide = ({ children, className = "", backgroundImage }) => {
  const pageStyle = backgroundImage ? {
    backgroundImage: `url(${encodeURI(backgroundImage)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'relative'
  } : {};
  
  return (
    <div className={`page ${className}`} style={{ 
      minHeight: '100vh', 
      padding: '40px', 
      ...pageStyle
    }}>
      {backgroundImage && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '12px',
          zIndex: 0
        }} />
      )}
      <div style={{ position: 'relative', zIndex: 1 }}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          // Check if child is a motion component or has motion props - if so, don't double-wrap
          const isMotionComponent = child.type && (child.type.toString().includes('motion') || child.type.displayName === 'motion.div' || child.type.displayName === 'motion');
          const hasMotionProps = child.props && (child.props.variants || child.props.initial || child.props.animate);
          
          if (isMotionComponent || hasMotionProps) {
            return child;
          }
          
          return (
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
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
    </div>
  );
};

export default PresentationSlide;
