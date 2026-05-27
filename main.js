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
    
    if (slider && prevBtn && nextBtn && dotsContainer && reviewCards.length > 0) {
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
    }

    /* ==========================================================================
       APPOINTMENT FORM VALIDATION & SUBMISSION
       ========================================================================== */
    const form = document.getElementById('appointmentForm');
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const serviceSelect = document.getElementById('dentalService');
    const dateInput = document.getElementById('preferredDate');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    // Success Modal elements
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (form && nameInput && phoneInput && serviceSelect && dateInput && submitBtn) {
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
                
                // Web3Forms API Integration
                fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        access_key: 'e794427a-7841-43c6-80e4-c463f3bd648f',
                        name: nameInput.value.trim(),
                        phone: phoneInput.value.trim(),
                        service: serviceSelect.options[serviceSelect.selectedIndex].text,
                        date: dateInput.value,
                        message: messageInput ? messageInput.value.trim() : ''
                    })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Show success modal overlay
                        if (successModal) successModal.classList.add('active');
                        
                        // Reset form values
                        form.reset();
                        
                        // Set default inputs standard state
                        document.querySelectorAll('.form-group').forEach(el => el.classList.remove('invalid'));
                    } else {
                        alert('Submission failed. Please try again or contact us directly.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    alert('An error occurred. Please check your internet connection and try again.');
                })
                .finally(() => {
                    submitBtn.textContent = 'Submit Appointment Request';
                    submitBtn.disabled = false;
                });
            }
        });
    }

    // Close Modal Controls
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.classList.remove('active');
        });
    }

    if (successModal) {
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                successModal.classList.remove('active');
            }
        });
    }

    /* ==========================================================================
       SCROLL PROGRESS BAR LOGIC
       ========================================================================== */
    const scrollProgress = document.getElementById('scrollProgress');
    const updateScrollProgress = () => {
        if (scrollProgress) {
            const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = windowHeight > 0 ? (window.scrollY / windowHeight) * 100 : 0;
            scrollProgress.style.width = percentage + '%';
        }
    };
    window.addEventListener('scroll', updateScrollProgress);
    updateScrollProgress(); // Run once initially

    /* ==========================================================================
       LIGHT / DARK THEME TOGGLE LOGIC
       ========================================================================== */
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const savedTheme = localStorage.getItem('theme') || 'light';

    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            }
        });
    }

    /* ==========================================================================
       INTERACTIVE SYMPTOM CHECKER LOGIC
       ========================================================================== */
    const symptomCards = document.querySelectorAll('.symptom-card');
    const advicePlaceholder = document.getElementById('advicePlaceholder');
    const adviceContents = document.querySelectorAll('.advice-content');
    const applyButtons = document.querySelectorAll('.apply-symptom-btn');

    symptomCards.forEach(card => {
        card.addEventListener('click', () => {
            // Highlight clicked card, remove active from others
            symptomCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');

            // Hide placeholder panel
            if (advicePlaceholder) {
                advicePlaceholder.style.display = 'none';
            }

            // Hide all advice contents, display target
            adviceContents.forEach(content => content.classList.remove('active'));
            const symptomType = card.getAttribute('data-symptom');
            const targetAdvice = document.getElementById(`advice-${symptomType}`);
            if (targetAdvice) {
                targetAdvice.classList.add('active');
            }
        });
    });

    applyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceCode = btn.getAttribute('data-service');
            const description = btn.getAttribute('data-desc');

            if (serviceSelect) {
                serviceSelect.value = serviceCode;
                // Dispatch change event to validate immediately
                serviceSelect.dispatchEvent(new Event('change'));
            }

            if (messageInput) {
                messageInput.value = description;
            }

            // Scroll smoothly to appointment section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ==========================================================================
       FAQ ACCORDION TOGGLE LOGIC
       ========================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const faqHeader = item.querySelector('.faq-header');
        const faqCollapse = item.querySelector('.faq-collapse');

        if (faqHeader && faqCollapse) {
            faqHeader.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Collapse all items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherCollapse = otherItem.querySelector('.faq-collapse');
                    if (otherCollapse) {
                        otherCollapse.style.maxHeight = null;
                    }
                });

                // Expand clicked item if it was closed
                if (!isActive) {
                    item.classList.add('active');
                    faqCollapse.style.maxHeight = faqCollapse.scrollHeight + 'px';
                }
            });
        }
    });
});
