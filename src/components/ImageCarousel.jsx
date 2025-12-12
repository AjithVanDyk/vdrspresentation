import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClickableImage from './ClickableImage';
import './ImageCarousel.css';

const ImageCarousel = ({ images, height = '400px', autoPlay = false }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index, e) => {
    if (e) e.stopPropagation();
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="image-carousel-container" style={{ height }}>
      <div className="image-carousel-slide">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ClickableImage 
              src={images[currentIndex].src} 
              alt={images[currentIndex].alt}
              className="image-carousel-image"
              images={images}
              index={currentIndex}
            />
          </motion.div>
        </AnimatePresence>
        
        {images[currentIndex].alt && (
          <div className="carousel-caption">
            {images[currentIndex].alt}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <>
          <button className="carousel-nav-button carousel-prev" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="carousel-nav-button carousel-next" onClick={nextSlide}>
            &#10095;
          </button>

          <div className="carousel-indicators">
            {images.map((_, index) => (
              <div 
                key={index} 
                className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => goToSlide(index, e)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
