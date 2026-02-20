document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       CUSTOM CURSOR
    ========================================= */
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button, .slider-handle');

    // Check if device supports touch (disable custom cursor for touch devices)
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

    if (!isTouchDevice && cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.classList.add('hovering');
            });
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('hovering');
            });
        });
    } else if (cursor) {
        cursor.style.display = 'none'; // Hide if touch device
    }

    /* =========================================
       NAVBAR SCROLL EFFECT
    ========================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       REVEAL ON SCROLL (INTERSECTION OBSERVER)
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal-up');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================
       PARALLAX SCROLLING EFFECT
    ========================================= */
    const heroBg = document.querySelector('.hero-bg');
    const parallaxImgs = document.querySelectorAll('.parallax-img');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Hero Background Parallax
        if (heroBg && scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }

        // Portfolio Images Parallax
        parallaxImgs.forEach(img => {
            const speed = 0.1;
            const rect = img.getBoundingClientRect();
            // Only apply effect if in viewport
            if(rect.top < window.innerHeight && rect.bottom > 0) {
                // calculate offset from center of screen
                const centerOffset = (window.innerHeight / 2) - (rect.top + rect.height / 2);
                img.style.transform = `translateY(${centerOffset * speed}px) scale(1.1)`; // Keep scale up slightly to avoid clipping edges during translateY
            }
        });
    });

    /* =========================================
       VR SLIDER (BEFORE/AFTER EFFECT)
    ========================================= */
    const slider = document.getElementById('slider');
    const sliderWireframe = document.getElementById('slider-wireframe');
    const sliderHandle = document.getElementById('slider-handle');

    if (slider && sliderWireframe && sliderHandle) {
        let isSliding = false;

        const startSlide = (e) => {
            isSliding = true;
            // Prevent default behavior to avoid text selection while dragging
            e.preventDefault(); 
        };

        const stopSlide = () => {
            isSliding = false;
        };

        const moveSlide = (e) => {
            if (!isSliding) return;
            
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }

            const sliderRect = slider.getBoundingClientRect();
            let xPos = clientX - sliderRect.left;
            
            // Constrain constraints
            if (xPos < 0) xPos = 0;
            if (xPos > sliderRect.width) xPos = sliderRect.width;

            // Calculate percentage
            const percentage = (xPos / sliderRect.width) * 100;
            
            // Update UI elements
            sliderWireframe.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;
        };

        // Mouse events
        sliderHandle.addEventListener('mousedown', startSlide);
        window.addEventListener('mouseup', stopSlide);
        window.addEventListener('mousemove', moveSlide);

        // Touch events
        sliderHandle.addEventListener('touchstart', startSlide, { passive: false });
        window.addEventListener('touchend', stopSlide);
        window.addEventListener('touchmove', moveSlide, { passive: false });
    }
});
