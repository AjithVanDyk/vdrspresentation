import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icons';
import './ImageModal.css';

function ImageModal({ image, onClose, images = null, currentIndex = 0, onNavigate = null }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleArrowKeys = (e) => {
      if (!images || !onNavigate) return;
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'ArrowRight' && currentIndex < images.length - 1) {
        onNavigate(currentIndex + 1);
      }
    };

    document.addEventListener('keydown', handleEscape);
    if (images && onNavigate) {
      document.addEventListener('keydown', handleArrowKeys);
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleArrowKeys);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, images, currentIndex, onNavigate]);

  if (!image) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="image-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="image-modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="image-modal-close"
            onClick={onClose}
            aria-label="Close image modal"
          >
            <span style={{ fontSize: '2em', lineHeight: 1, color: 'white' }}>×</span>
          </button>

          {images && onNavigate && images.length > 1 && (
            <>
              {currentIndex > 0 && (
                <button
                  className="image-modal-nav image-modal-nav-left"
                  onClick={() => onNavigate(currentIndex - 1)}
                  aria-label="Previous image"
                >
                  <span>‹</span>
                </button>
              )}
              {currentIndex < images.length - 1 && (
                <button
                  className="image-modal-nav image-modal-nav-right"
                  onClick={() => onNavigate(currentIndex + 1)}
                  aria-label="Next image"
                >
                  <span>›</span>
                </button>
              )}
              <div className="image-modal-counter">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}

          <motion.img
            src={image.src || image}
            alt={image.alt || 'Modal image'}
            className="image-modal-image"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ImageModal;

