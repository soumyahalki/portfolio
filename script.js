// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling
document.querySelectorAll('a[href^=\"#"]').forEach(anchor => {
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

// Dark mode toggle
const darkToggle = document.getElementById('darkToggle');
const html = document.documentElement;

darkToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    darkToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
darkToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Navbar background on scroll (dynamic for theme)
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(45, 55, 72, 0.98)' 
            : 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 30px var(--shadow-light)';
    } else {
        navbar.style.background = document.documentElement.getAttribute('data-theme') === 'dark' 
            ? 'rgba(45, 55, 72, 0.95)' 
            : 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px var(--shadow-light)';
    }
});

// Animate skill bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill');
            progressBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width;
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill sections
document.querySelectorAll('.skill-category').forEach(category => {
    observer.observe(category);
});

// Animate sections on scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = '0.1s';
            entry.target.style.animationPlayState = 'running';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Contact Form Handling with Formspree
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formAction = contactForm.getAttribute('action');
    
    // Check if Formspree is configured
    if (formAction.includes('YOUR_FORMSPREE_ID') || !formAction) {
        alert('Please configure Formspree first!\n\n1. Go to https://formspree.io\n2. Create a new form\n3. Replace "YOUR_FORMSPREE_ID" in index.html with your form ID');
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    formStatus.innerHTML = '';
    formStatus.className = 'form-status';
    
    try {
        const response = await fetch(formAction, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            formStatus.innerHTML = '✓ Thank you! Your message has been sent successfully.';
            formStatus.className = 'form-status success';
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        formStatus.innerHTML = '✗ Oops! Something went wrong. Please try again.';
        formStatus.className = 'form-status error';
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});

// Visitor Counter using localStorage
function initVisitorCounter() {
    const counterKey = 'portfolio_visitors';
    const lastVisitKey = 'portfolio_last_visit';
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem(lastVisitKey);
    
    let visitors = parseInt(localStorage.getItem(counterKey)) || 0;
    
    // Only increment once per day
    if (lastVisit !== today) {
        visitors++;
        localStorage.setItem(counterKey, visitors);
        localStorage.setItem(lastVisitKey, today);
    }
    
    // Display visitor count (optional - add to your page if needed)
    console.log(`Total visitors: ${visitors} - script.js:170`);
}


initVisitorCounter();
// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect
window.addEventListener('load', () => {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const typingText = "Full Stack Developer creating modern web experiences";
    typeWriter(heroSubtitle, typingText, 80);
    
    // Fade in body
    document.body.style.opacity = '1';
});

// Enhanced project card 3D tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    let rotateX = 0, rotateY = 0;
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        rotateX = (y - centerY) / 10;
        rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Loading animation (optional)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
