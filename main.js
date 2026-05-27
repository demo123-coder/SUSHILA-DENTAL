document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       STICKY HEADER LOGIC
       ========================================================================== */
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       MOBILE NAVIGATION MENU
       ========================================================================== */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    const closeMenu = () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    hamburgerBtn.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==========================================================================
       ACTIVE LINK HIGHLIGHTING ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);

    /* ==========================================================================
       SCROLL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const animItems = document.querySelectorAll('.animate-scroll');
    
    const scrollObserverOption = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, scrollObserverOption);

    animItems.forEach(item => {
        scrollObserver.observe(item);
    });

    /* ==========================================================================
       TESTIMONIALS SLIDER
       ========================================================================== */
    const slider = document.getElementById('reviewsSlider');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dotsContainer = document.getElementById('sliderDots');
    const reviewCards = document.querySelectorAll('.review-card');
    
    let currentIndex = 0;
    let cardsPerView = window.innerWidth > 992 ? 2 : 1;
    let maxIndex = Math.ceil(reviewCards.length / cardsPerView) - 1;
    let slideTimer;

    // Generate indicator dots dynamically
    const buildDots = () => {
        dotsContainer.innerHTML = '';
        const dotsCount = Math.ceil(reviewCards.length / cardsPerView);
        for (let i = 0; i < dotsCount; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(i);
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    };

    const updateSlider = () => {
        // Calculate offset based on slider parent size
        const cardWidth = reviewCards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(slider).gap) || 32;
        const offset = currentIndex * (cardWidth * cardsPerView + gap * cardsPerView);
        
        slider.style.transform = `translateX(-${offset}px)`;
        
        // Update dots active class
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    const goToSlide = (index) => {
        currentIndex = index;
        if (currentIndex < 0) currentIndex = 0;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updateSlider();
    };

    const nextSlide = () => {
        if (currentIndex < maxIndex) {
            goToSlide(currentIndex + 1);
        } else {
            goToSlide(0); // Loop back
        }
    };

    const prevSlide = () => {
        if (currentIndex > 0) {
            goToSlide(currentIndex - 1);
        } else {
            goToSlide(maxIndex); // Loop to end
        }
    };

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Handle screen resize events
    window.addEventListener('resize', () => {
        const prevCardsPerView = cardsPerView;
        cardsPerView = window.innerWidth > 992 ? 2 : 1;
        maxIndex = Math.ceil(reviewCards.length / cardsPerView) - 1;
        
        if (prevCardsPerView !== cardsPerView) {
            currentIndex = 0;
            buildDots();
            updateSlider();
        } else {
            updateSlider(); // Simply recalculate dimensions
        }
    });

    // Auto Play Slider
    const startAutoPlay = () => {
        slideTimer = setInterval(nextSlide, 6000);
    };

    const resetAutoPlay = () => {
        clearInterval(slideTimer);
        startAutoPlay();
    };

    // Pause autoplay on mouse enter
    slider.addEventListener('mouseenter', () => clearInterval(slideTimer));
    slider.addEventListener('mouseleave', startAutoPlay);

    // Initial setup for slider
    buildDots();
    startAutoPlay();

    /* ==========================================================================
       APPOINTMENT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const form = document.getElementById('appointmentForm');
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const serviceSelect = document.getElementById('dentalService');
    const dateInput = document.getElementById('preferredDate');
    const submitBtn = document.getElementById('submitBtn');

    // Success Modal elements
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Validate name field
    const validateName = () => {
        const value = nameInput.value.trim();
        const parent = nameInput.parentElement;
        if (value === "") {
            parent.classList.add('invalid');
            return false;
        } else {
            parent.classList.remove('invalid');
            return true;
        }
    };

    // Validate phone field (10 digits)
    const validatePhone = () => {
        const value = phoneInput.value.trim();
        const parent = phoneInput.parentElement;
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(value)) {
            parent.classList.add('invalid');
            return false;
        } else {
            parent.classList.remove('invalid');
            return true;
        }
    };

    // Validate service selection
    const validateService = () => {
        const value = serviceSelect.value;
        const parent = serviceSelect.parentElement;
        if (value === "") {
            parent.classList.add('invalid');
            return false;
        } else {
            parent.classList.remove('invalid');
            return true;
        }
    };

    // Validate date selection (must be present and in the future/today)
    const validateDate = () => {
        const value = dateInput.value;
        const parent = dateInput.parentElement;
        if (!value) {
            parent.classList.add('invalid');
            return false;
        }
        
        const selectedDate = new Date(value);
        selectedDate.setHours(0,0,0,0);
        
        const today = new Date();
        today.setHours(0,0,0,0);
        
        if (selectedDate < today) {
            parent.classList.add('invalid');
            return false;
        } else {
            parent.classList.remove('invalid');
            return true;
        }
    };

    // Live validation triggers on input blur
    nameInput.addEventListener('blur', validateName);
    phoneInput.addEventListener('blur', validatePhone);
    serviceSelect.addEventListener('change', validateService);
    dateInput.addEventListener('change', validateDate);

    // Prevent selecting past dates in HTML Datepicker
    const setMinDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        
        const minDate = `${yyyy}-${mm}-${dd}`;
        dateInput.setAttribute('min', minDate);
    };
    setMinDate();

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isPhoneValid = validatePhone();
        const isServiceValid = validateService();
        const isDateValid = validateDate();
        
        if (isNameValid && isPhoneValid && isServiceValid && isDateValid) {
            // Show loading animation on button
            submitBtn.textContent = 'Submitting Request...';
            submitBtn.disabled = true;
            
            // Simulate API request delay
            setTimeout(() => {
                // Show modal overlay
                successModal.classList.add('active');
                
                // Reset form values
                form.reset();
                submitBtn.textContent = 'Submit Appointment Request';
                submitBtn.disabled = false;
                
                // Set default inputs standard state
                document.querySelectorAll('.form-group').forEach(el => el.classList.remove('invalid'));
            }, 1500);
        }
    });

    // Close Modal Controls
    closeModalBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
});
