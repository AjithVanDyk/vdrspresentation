import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

function AnimatedCounter({ value, duration = 2 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    // Handle different value types
    if (typeof value === 'string') {
      // For strings like "50+", "99%", "$200K+", extract the number
      const numMatch = value.match(/[\d,]+/);
      if (numMatch) {
        const _num = parseInt(numMatch[0].replace(/,/g, ''));
        return value.replace(/[\d,]+/, Math.round(latest).toLocaleString());
      }
      return value;
    }
    return Math.round(latest).toLocaleString();
  });

  const nodeRef = useRef(null);

  useEffect(() => {
    // Extract numeric value
    let targetValue = value;
    if (typeof value === 'string') {
      const numMatch = value.match(/[\d,]+/);
      if (numMatch) {
        targetValue = parseInt(numMatch[0].replace(/,/g, ''));
      } else {
        return; // Can't animate non-numeric strings
      }
    }

    const controls = animate(count, targetValue, {
      duration: duration,
      ease: "easeOut"
    });

    return controls.stop;
  }, [value, duration, count]);

  return <motion.span ref={nodeRef}>{rounded}</motion.span>;
}

export default AnimatedCounter;
