import { motion } from 'framer-motion';
import { useState } from 'react';
import './ImageGallery.css';
import TiltImage from './TiltImage';

function ImageGallery({ images, layout = 'grid' }) {
  const [lightboxImage, setLightboxImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <motion.div 
        className={`image-gallery ${layout}`}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="gallery-item"
            variants={imageVariants}
            style={{ perspective: 1000 }}
          >
            <TiltImage 
              src={img.src} 
              alt={img.alt || `Image ${index + 1}`}
              onClick={() => setLightboxImage(img)}
              className="gallery-tilt-image"
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      {lightboxImage && (
        <motion.div
          className="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightboxImage(null)}
        >
          <motion.img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          <button className="close-btn" onClick={() => setLightboxImage(null)}>×</button>
        </motion.div>
      )}
    </>
  );
}

export default ImageGallery;
