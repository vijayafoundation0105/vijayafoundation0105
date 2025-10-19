// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(44, 62, 80, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
        header.style.backdropFilter = 'none';
    }
});

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                const number = text.match(/\d+/);
                if (number) {
                    animateNumber(target, 0, parseInt(number[0]), text);
                }
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, originalText) {
    const duration = 2000;
    const increment = end / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = originalText.replace(/\d+/, Math.floor(current));
    }, 16);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
    
    // Add click handlers for CTA buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.textContent.includes('Donate')) {
                if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    window.location.href = 'donate.html';
                }
            } else if (this.textContent.includes('Volunteer')) {
                alert('Thank you for your interest in volunteering! Please contact us at +91 88283 28236 to get started.');
            } else if (this.textContent.includes('Learn More')) {
                if (document.querySelector('#about')) {
                    document.querySelector('#about').scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Handle donation form
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        const amountSelect = document.getElementById('amount');
        const customAmountDiv = document.getElementById('customAmount');
        
        amountSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customAmountDiv.style.display = 'block';
            } else {
                customAmountDiv.style.display = 'none';
            }
        });
        
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your donation! You will be redirected to the payment gateway.');
        });
    }
    
    // Handle contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
});

// Mobile menu toggle (if needed for responsive design)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Add fade-in animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in animation to all sections
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
});