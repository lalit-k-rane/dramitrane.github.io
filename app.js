// Dr. Amit Rane Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect form data
    var fullName = document.getElementById('fullName').value;
    var phone = document.getElementById('phone').value;
    var email = document.getElementById('email').value;
    var date = document.getElementById('date').value;
    var reason = document.getElementById('reason').value;
    var additionalInfo = document.getElementById('additionalInfo').value;

    // Send email via EmailJS
    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        fullName: fullName,
        phone: phone,
        email: email,
        date: date,
        reason: reason,
        additionalInfo: additionalInfo
    })
    .then(function(response) {
        alert("Appointment request sent successfully! We will contact you soon.");
        document.getElementById('appointment-form').reset();
    }, function(error) {
        alert("There was an error sending your request. Please try again later.");
    });
});


function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupForms();
    setupSmoothScrolling();
    setupActiveSection();
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
}

// Mobile menu functionality
function setupMobileMenu() {
    const toggleButton = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    
    if (toggleButton && navbarMenu) {
        toggleButton.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            if (navbarMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

function closeMobileMenu() {
    const navbarMenu = document.getElementById('navbar-menu');
    const toggleButton = document.getElementById('navbar-toggle');
    
    if (navbarMenu && navbarMenu.classList.contains('active')) {
        navbarMenu.classList.remove('active');
        
        // Reset hamburger menu
        const spans = toggleButton.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Show specific section
function showSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scrolling for all internal links
function setupSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash or handled elsewhere
            if (href === '#' || this.classList.contains('nav-link')) {
                return;
            }
            
            e.preventDefault();
            const targetId = href.substring(1);
            showSection(targetId);
        });
    });
}

// Active section detection on scroll
function setupActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100; // Offset for navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    });
}

// Form handling
function setupForms() {
    setupAppointmentForm();
    setupContactForm();
}

function setupAppointmentForm() {
    const appointmentForm = document.getElementById('appointment-form');
    
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                }
            });
            
            if (isValid) {
                // Show success message
                showFormSuccess(this, 'Appointment request submitted successfully! We will contact you within 24 hours to confirm your appointment.');
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    clearFormMessages(this);
                }, 3000);
            }
        });
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showFieldError(field, 'This field is required');
                } else {
                    clearFieldError(field);
                }
            });
            
            // Validate email format
            const emailField = this.querySelector('input[type="email"]');
            if (emailField && emailField.value && !isValidEmail(emailField.value)) {
                isValid = false;
                showFieldError(emailField, 'Please enter a valid email address');
            }
            
            if (isValid) {
                // Show success message
                showFormSuccess(this, 'Message sent successfully! We will get back to you soon.');
                
                // Reset form after delay
                setTimeout(() => {
                    this.reset();
                    clearFormMessages(this);
                }, 3000);
            }
        });
    }
}

// Form validation helpers
function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = 'var(--color-error)';
    errorDiv.style.fontSize = 'var(--font-size-sm)';
    errorDiv.style.marginTop = 'var(--space-4)';
    errorDiv.textContent = message;
    
    field.style.borderColor = 'var(--color-error)';
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.style.borderColor = '';
}

function showFormSuccess(form, message) {
    clearFormMessages(form);
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success status status--success';
    successDiv.style.marginTop = 'var(--space-16)';
    successDiv.textContent = message;
    
    form.appendChild(successDiv);
}

function clearFormMessages(form) {
    const messages = form.querySelectorAll('.form-success, .form-error');
    messages.forEach(message => message.remove());
    
    const fieldErrors = form.querySelectorAll('.field-error');
    fieldErrors.forEach(error => error.remove());
    
    const fields = form.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.style.borderColor = '';
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility functions for external use
window.showSection = showSection;

// Add some interactive enhancements
function addInteractiveEnhancements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.specialty-card, .service-card, .blog-post');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add click functionality to blog posts
    const blogPosts = document.querySelectorAll('.blog-post');
    blogPosts.forEach(post => {
        const readMoreLink = post.querySelector('.read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                // In a real application, this would navigate to the full blog post
                alert('This would navigate to the full blog post. Blog functionality can be expanded with a proper backend.');
            });
        }
    });
}

// Initialize interactive enhancements after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addInteractiveEnhancements, 100);
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
    
    // Handle Enter key on buttons
    if (e.key === 'Enter' && e.target.tagName === 'BUTTON') {
        e.target.click();
    }
});

// Performance optimization: Lazy loading for better performance
function initializeLazyLoading() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe cards and sections for animation
    const animateElements = document.querySelectorAll('.specialty-card, .service-card, .blog-post');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize lazy loading if Intersection Observer is supported
if ('IntersectionObserver' in window) {
    document.addEventListener('DOMContentLoaded', initializeLazyLoading);
}

// Accessibility improvements
function enhanceAccessibility() {
    // Add proper ARIA labels
    const navToggle = document.getElementById('navbar-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
        
        navToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Add skip link for keyboard users
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '6px';
    skipLink.style.background = 'var(--color-primary)';
    skipLink.style.color = 'white';
    skipLink.style.padding = '8px';
    skipLink.style.textDecoration = 'none';
    skipLink.style.zIndex = '1000';
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content ID
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.id = 'main-content';
        homeSection.setAttribute('tabindex', '-1');
    }
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);
