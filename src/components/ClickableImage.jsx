import React, { useState } from 'react';
import ImageModal from './ImageModal';

function ClickableImage({ src, alt, className = '', style = {}, images = null, index = 0 }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(index);

  const handleClick = () => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (newIndex) => {
    if (images && newIndex >= 0 && newIndex < images.length) {
      setCurrentIndex(newIndex);
    }
  };

  const currentImage = images ? images[currentIndex] : { src, alt };

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={`clickable-image ${className}`}
        style={style}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`Click to view ${alt} in full screen`}
      />
      {isModalOpen && (
        <ImageModal
          image={currentImage}
          onClose={handleClose}
          images={images}
          currentIndex={currentIndex}
          onNavigate={images ? handleNavigate : null}
        />
      )}
    </>
  );
}

export default ClickableImage;


