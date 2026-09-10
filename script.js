// ===== DOM Elements =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const darkModeBtn = document.getElementById('darkModeBtn');
const workBtn = document.getElementById('workBtn');
const contactBtn = document.getElementById('contactBtn');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// ===== Mobile Menu Toggle =====
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
    }
});

// Close menu when clicking a link
document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuBtn.textContent = '☰';
    });
});

// ===== Dark Mode Toggle =====
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Update button icon
    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = '☀️';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        darkModeBtn.textContent = '🌙';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
}

// ===== Scroll Buttons =====
workBtn.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({
        behavior: 'smooth'
    });
});

contactBtn.addEventListener('click', () => {
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// ===== Contact Form =====
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate
    if (!name || !email || !message) {
        formStatus.textContent = '⚠️ Please fill in all required fields.';
        formStatus.className = 'form-status error';
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = '⚠️ Please enter a valid email address.';
        formStatus.className = 'form-status error';
        return;
    }
    
    // Success message
    formStatus.textContent = `✅ Thank you ${name}! Your message has been sent successfully.`;
    formStatus.className = 'form-status';
    formStatus.style.color = '#0284c7';
    
    // Reset form
    contactForm.reset();
    
    // Clear status after 5 seconds
    setTimeout(() => {
        formStatus.textContent = '';
    }, 5000);
});

// ===== Scroll Animation (Optional) =====
// Intersection Observer for skill bars
const skillBars = document.querySelectorAll('.skill-bar span');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => observer.observe(bar));

// ===== Smooth reveal for cards =====
const cards = document.querySelectorAll('.skill-card, .service-card, .project-card, .about-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// ===== Console Greeting =====
console.log('%c👋 Welcome to Assad Ali\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #0284c7;');
console.log('%c🚀 Front-End Web Developer', 'font-size: 14px; color: #0ea5e9;');