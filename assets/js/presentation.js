// Presentation Controller
let currentSlide = 1;
const totalSlides = 13;
let touchStartX = 0;
let touchEndX = 0;

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlide);
    setupKeyboardNavigation();
    setupTouchGestures();
    setupImageModals();
    setupExpandableSections();
    updateProgressBar();
    setupSidebarNavigation();
});

// Show specific slide
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    
    if (n > totalSlides) { currentSlide = totalSlides; }
    if (n < 1) { currentSlide = 1; }
    else { currentSlide = n; }
    
    slides.forEach((slide, index) => {
        slide.classList.remove('active');
        if (index === currentSlide - 1) {
            slide.classList.add('active');
        }
    });
    
    document.getElementById('currentSlide').textContent = currentSlide;
    document.getElementById('totalSlides').textContent = totalSlides;
    
    document.getElementById('prevBtn').disabled = currentSlide === 1;
    document.getElementById('nextBtn').disabled = currentSlide === totalSlides;
    
    updateProgressBar();
    updateSidebarActive();
    updateSlideCounter();
}

// Change slide by direction
function changeSlide(direction) {
    currentSlide += direction;
    showSlide(currentSlide);
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'Home') { currentSlide = 1; showSlide(1); }
        if (e.key === 'End') { currentSlide = totalSlides; showSlide(totalSlides); }
        if (e.key === 'Escape') closeImageModal();
    });
}

// Touch gestures for mobile
function setupTouchGestures() {
    const slideContainer = document.querySelector('.slide-container');
    
    slideContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    slideContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(1);
        } else {
            // Swipe right - previous slide
            changeSlide(-1);
        }
    }
}

// Progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const progress = (currentSlide / totalSlides) * 100;
        progressBar.style.width = `${progress}%`;
    }
}

// Sidebar navigation
function setupSidebarNavigation() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarNav = document.getElementById('sidebarNav');
    
    if (sidebarToggle && sidebarNav) {
        sidebarToggle.addEventListener('click', () => {
            sidebarNav.classList.toggle('active');
        });
        
        // Create sidebar navigation items
        const navList = sidebarNav.querySelector('ul');
        for (let i = 1; i <= totalSlides; i++) {
            const slide = document.querySelector(`.slide[data-slide="${i}"]`);
            if (slide) {
                const title = slide.querySelector('.slide-header h1')?.textContent || `Slide ${i}`;
                const li = document.createElement('li');
                li.textContent = `${i}. ${title.substring(0, 40)}${title.length > 40 ? '...' : ''}`;
                li.addEventListener('click', () => {
                    currentSlide = i;
                    showSlide(i);
                    sidebarNav.classList.remove('active');
                });
                navList.appendChild(li);
            }
        }
    }
}

function updateSidebarActive() {
    const sidebarItems = document.querySelectorAll('.sidebar-nav li');
    sidebarItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentSlide - 1);
    });
}

// Image modal functionality
function setupImageModals() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalClose = document.querySelector('.modal-close');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img && imageModal && modalImg) {
                modalImg.src = img.src;
                modalImg.alt = img.alt || 'Project Screenshot';
                imageModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (modalClose) {
        modalClose.addEventListener('click', closeImageModal);
    }
    
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }
}

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Expandable sections
function setupExpandableSections() {
    const expandableHeaders = document.querySelectorAll('.expandable-header');
    
    expandableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const expandable = header.closest('.expandable');
            const content = expandable.querySelector('.expandable-content');
            
            expandable.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
}

// Animated counters
function animateCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(numericValue) && numericValue > 0) {
            const duration = 2000;
            const increment = numericValue / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < numericValue) {
                    if (target.includes('$')) {
                        counter.textContent = `$${Math.floor(current).toLocaleString()}+`;
                    } else if (target.includes('%')) {
                        counter.textContent = `${Math.floor(current)}%`;
                    } else if (target.includes('+')) {
                        counter.textContent = `${Math.floor(current).toLocaleString()}+`;
                    } else if (target.includes('→')) {
                        counter.textContent = target; // Don't animate arrows
                    } else {
                        counter.textContent = Math.floor(current).toLocaleString();
                    }
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            // Start animation when slide becomes active
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        }
    });
}

// Initialize counter animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(animateCounters, 500);
});

// Update slide counter with animation
function updateSlideCounter() {
    const counter = document.getElementById('currentSlide');
    if (counter) {
        counter.style.transform = 'scale(1.2)';
        setTimeout(() => {
            counter.style.transform = 'scale(1)';
        }, 200);
    }
}

// Copy code to clipboard
function setupCodeCopyButtons() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach(block => {
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copy';
        copyBtn.className = 'copy-code-btn';
        copyBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #FF6B35;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8em;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        block.style.position = 'relative';
        block.appendChild(copyBtn);
        
        block.addEventListener('mouseenter', () => {
            copyBtn.style.opacity = '1';
        });
        
        block.addEventListener('mouseleave', () => {
            copyBtn.style.opacity = '0';
        });
        
        copyBtn.addEventListener('click', () => {
            const code = block.textContent.replace('Code', '').trim();
            navigator.clipboard.writeText(code).then(() => {
                copyBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyBtn.textContent = 'Copy';
                }, 2000);
            });
        });
    });
}

// Initialize code copy buttons
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setupCodeCopyButtons, 500);
});

// Smooth scroll to top when changing slides
function scrollToTop() {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide) {
        activeSlide.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Enhanced slide change with scroll reset
const originalChangeSlide = changeSlide;
changeSlide = function(direction) {
    scrollToTop();
    originalChangeSlide(direction);
};

const originalShowSlide = showSlide;
showSlide = function(n) {
    scrollToTop();
    originalShowSlide(n);
};

// Export functions for global access
window.changeSlide = changeSlide;
window.showSlide = showSlide;
window.closeImageModal = closeImageModal;

