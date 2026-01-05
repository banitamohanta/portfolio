// Personal Portfolio Website - JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menuBtn');
    const navLinksContainer = document.getElementById('navLinks');
    const themeIcon = document.getElementById('themeIcon');
    const backToTop = document.getElementById('backToTop');
    const contactForm = document.getElementById('contactForm');
    const currentYear = document.getElementById('currentYear');
    const statNumbers = document.querySelectorAll('.stat-number');
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    const sections = document.querySelectorAll('section');
    const particlesContainer = document.getElementById('particles');
    
    // Initialize
    init();
    
    function init() {
        // Set current year
        currentYear.textContent = new Date().getFullYear();
        
        // Create particle background
        createParticles();
        
        // Initialize event listeners
        setupEventListeners();
        
        // Initialize animations
        initAnimations();
        
        // Check scroll position on load
        handleScroll();
    }
    
    function createParticles() {
        const particleCount = 30;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random size and position
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 10 + 10;
            
            // Apply styles
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: var(--accent);
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                opacity: ${Math.random() * 0.3 + 0.1};
                animation: floatParticle ${duration}s ease-in-out ${delay}s infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Add CSS for particle animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatParticle {
                0%, 100% {
                    transform: translate(0, 0);
                }
                25% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
                }
                50% {
                    transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px);
                }
                75% {
                    transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    function setupEventListeners() {
        // Mobile Navigation Toggle
        menuBtn.addEventListener('click', toggleMobileMenu);
        
        // Close mobile menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', handleNavLinkClick);
        });
        
        // Theme Toggle
        themeIcon.addEventListener('click', toggleTheme);
        
        // Scroll Events
        window.addEventListener('scroll', handleScroll);
        
        // Back to Top
        backToTop.addEventListener('click', scrollToTop);
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', smoothScroll);
        });
        
        // Form Submission
        if (contactForm) {
            contactForm.addEventListener('submit', handleFormSubmit);
        }
        
        // Form input focus effects
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
    
    function toggleMobileMenu() {
        navLinksContainer.classList.toggle('active');
        const isActive = navLinksContainer.classList.contains('active');
        menuBtn.innerHTML = isActive 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isActive ? 'hidden' : '';
    }
    
    function handleNavLinkClick(e) {
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Close mobile menu
        if (window.innerWidth <= 768) {
            navLinksContainer.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        }
    }
    
    function toggleTheme() {
        document.body.classList.toggle('dark-theme');
        
        // Update icon
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-fire';
        } else {
            themeIcon.className = 'fas fa-fire';
        }
        
        // Save preference
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme ? 'true' : 'false');
    }
    
    function handleScroll() {
        // Back to Top Button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Active Navigation
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentSection) {
                link.classList.add('active');
            }
        });
        
        // Trigger animations on scroll
        triggerAnimationsOnScroll();
    }
    
    function scrollToTop(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    function initAnimations() {
        // Animate statistics counters
        function animateCounters() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
        
        // Animate skill bars
        function animateSkillBars() {
            skillProgressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = `${width}%`;
            });
        }
        
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    
                    // Trigger specific animations
                    if (entry.target.closest('#about')) {
                        animateCounters();
                    }
                    
                    if (entry.target.closest('#skills')) {
                        animateSkillBars();
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        // Observe all animated elements
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
        
        // Animate hero image on load
        setTimeout(() => {
            const heroImage = document.querySelector('.image-container img');
            if (heroImage) {
                heroImage.style.transform = 'scale(1)';
            }
        }, 500);
    }
    
    function triggerAnimationsOnScroll() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form elements
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const btnText = document.querySelector('.submit-btn .btn-text');
        const btnLoader = document.querySelector('.submit-btn .btn-loader');
        const formSuccess = document.getElementById('formSuccess');
        
        // Reset previous errors
        clearErrors();
        
        // Validate form
        let isValid = validateForm(name, email, subject, message);
        
        if (isValid) {
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'block';
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading state
                btnText.style.display = 'block';
                btnLoader.style.display = 'none';
                
                // Show success message
                formSuccess.style.display = 'flex';
                
                // Reset form
                contactForm.reset();
                
                // Reset form labels
                const formGroups = contactForm.querySelectorAll('.form-group');
                formGroups.forEach(group => group.classList.remove('focused'));
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                }, 5000);
            }, 2000);
        }
    }
    
    function validateForm(name, email, subject, message) {
        let isValid = true;
        
        // Name validation
        if (!name.value.trim()) {
            showError('nameError', 'Name is required');
            isValid = false;
        } else if (name.value.trim().length < 2) {
            showError('nameError', 'Name must be at least 2 characters');
            isValid = false;
        }
        
        // Email validation
        if (!email.value.trim()) {
            showError('emailError', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError('emailError', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Subject validation
        if (!subject.value.trim()) {
            showError('subjectError', 'Subject is required');
            isValid = false;
        }
        
        // Message validation
        if (!message.value.trim()) {
            showError('messageError', 'Message is required');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        return isValid;
    }
    
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
            element.style.display = 'none';
        });
        
        const formSuccess = document.getElementById('formSuccess');
        if (formSuccess) {
            formSuccess.style.display = 'none';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.project-card, .skill-category, .feature');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.matches(':hover')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add typing effect to hero text
    function initTypingEffect() {
        const title = document.querySelector('.hero .title');
        if (title) {
            const text = title.textContent;
            title.textContent = '';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    title.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            }
            
            setTimeout(typeWriter, 1000);
        }
    }
    
    // Load saved theme preference
    const darkTheme = localStorage.getItem('darkTheme');
    if (darkTheme === 'true') {
        document.body.classList.add('dark-theme');
    }
    
    // Initialize typing effect
    setTimeout(initTypingEffect, 500);
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.getBoundingClientRect().left;
            const y = e.clientY - e.target.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
});