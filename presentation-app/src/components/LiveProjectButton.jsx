import { motion } from 'framer-motion';
import './LiveProjectButton.css';

function LiveProjectButton({ url, label = "View Live Project" }) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="live-project-btn"
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span className="btn-icon">🚀</span>
      <span className="btn-text">{label}</span>
      <span className="btn-arrow">→</span>
    </motion.a>
  );
}

export default LiveProjectButton;
