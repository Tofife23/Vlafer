/**
 * Vlafer - Bubble Waffles & Desserts
 * JavaScript - Interaktivní prvky a animace
 */

// ==========================================
// Smooth Scroll Animation
// ==========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// Navbar Sticky Effect
// ==========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const maxScroll = 120;
    const scrollValue = Math.min(window.scrollY, maxScroll);
    const progress = scrollValue / maxScroll; // 0...1

    // plynulý shrink (from rozm. start to sticky size)
    const iconHeight = 40 - 16 * progress;            // 40px -> 24px
    const mainLogoHeight = 52 - 12 * progress;        // 52px -> 40px
    const navbarPadding = 1 - 0.25 * progress;        // 1rem -> 0.75rem
    const opacity = 0.25 + 0.75 * progress;           // 0.25 -> 1

    document.documentElement.style.setProperty('--navbar-icon-height', `${iconHeight}px`);
    document.documentElement.style.setProperty('--navbar-main-logo-height', `${mainLogoHeight}px`);
    document.documentElement.style.setProperty('--navbar-padding', `${navbarPadding}rem`);
    document.documentElement.style.setProperty('--navbar-bg', `rgba(255,255,255,${opacity})`);
    document.documentElement.style.setProperty('--navbar-border', `1px solid rgba(255,255,255,${Math.min(0.35 + 0.65 * progress, 1)})`);
    document.documentElement.style.setProperty('--navbar-box-shadow', progress > 0.25 ? '0 2px 10px rgba(0,0,0,0.08)' : 'none');

    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// ==========================================
// Hero Background Click-Slider with Auto-Slide
// ==========================================

const hero = document.querySelector('.hero');
const heroFront = document.querySelector('.hero-background-front');
const heroBack = document.querySelector('.hero-background-back');

if (hero && heroFront && heroBack) {
    const heroImages = [
        'img/dorty-125.jpg',
        'img/stanek.jpg',
        
    ];
    let heroIndex = 0;
    let autoSlideInterval;
    let activeFront = true;

    const changeImage = () => {
        const nextIndex = (heroIndex + 1) % heroImages.length;
        const currentEl = activeFront ? heroFront : heroBack;
        const nextEl = activeFront ? heroBack : heroFront;

        nextEl.style.backgroundImage = `url('${heroImages[nextIndex]}')`;
        nextEl.style.opacity = '1';
        currentEl.style.opacity = '0';

        setTimeout(() => {
            activeFront = !activeFront;
            heroIndex = nextIndex;
        }, 500);
    };

    const startAutoSlide = () => {
        autoSlideInterval = setInterval(changeImage, 5000);
    };

    const stopAutoSlide = () => {
        clearInterval(autoSlideInterval);
    };

    // Start auto-slide
    startAutoSlide();

    // Click to change image and reset auto-slide
    hero.addEventListener('click', () => {
        changeImage();
        stopAutoSlide();
        startAutoSlide();
    });
}

// ==========================================
// Intersection Observer for Animations
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.offer-card, .quality-card, .about-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ==========================================
// Button Click Effects
// ==========================================

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ==========================================
// Hover Effects on Cards
// ==========================================

const cards = document.querySelectorAll('.offer-card, .quality-card');

cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
        this.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.15)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.08)';
    });
});

// ==========================================
// Navbar Link Active State
// ==========================================

const navLinks = document.querySelectorAll('.navbar-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#E94B83';
        } else {
            link.style.color = '#2d2d2d';
        }
    });
});

// ==========================================
// Mobile Menu Toggle (if needed)
// ==========================================

// Add mobile menu functionality here if you add a hamburger menu

// ==========================================
// Image Lazy Loading
// ==========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==========================================
// Scroll to Top Button
// ==========================================

const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopButton.className = 'scroll-to-top';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #E94B83 0%, #F2A900 100%);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    z-index: 40;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(233, 75, 131, 0.3);
`;

document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = 'flex';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1)';
});

scrollToTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
});

// ==========================================
// Initialize on Page Load
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Vlafer website loaded successfully!');
    
    // Add any initialization code here
    // For example, you could load additional content, initialize forms, etc.
});

// ==========================================
// Performance: Debounce function for scroll events
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events if needed
window.addEventListener('scroll', debounce(() => {
    // Scroll event handler
}, 100));

// Handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    fetch(this.action, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('form-success').style.display = 'block';
            this.reset(); // Clear the form
        } else {
            alert('Chyba při odesílání formuláře.');
        }
    })
    .catch(error => {
        alert('Chyba při odesílání formuláře.');
    });
});