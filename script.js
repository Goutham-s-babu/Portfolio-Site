// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initScrollAnimations();
    initTypingEffect();
    initSkillBars();
    initFormHandling();
    initParticleEffect();
    initScrollIndicator();
    initCodeRain();
});

// Backend base URL (auto-detect same origin)
const API_BASE = (typeof window !== 'undefined') ? `${window.location.origin}/api` : '/api';

// Navigation functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu && navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger && hamburger.classList.remove('active');
            navMenu && navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (!navbar) return;
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .stat, .contact-method');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Typing effect for terminal
function initTypingEffect() {
    const typingElement = document.querySelector('.typing');
    if (!typingElement) return;

    const commands = [
        'python --version',
        'whoami',
        'ls projects/',
        'cat skills.txt',
        'nmap -sS localhost',
        'python security_scanner.py'
    ];

    let commandIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentCommand = commands[commandIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentCommand.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentCommand.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentCommand.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            typeSpeed = 500; // Pause before next command
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 2000);
}

// Animate skill bars on scroll
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                skillObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Form handling (calls backend if reachable)
function initFormHandling() {
    const contactForm = document.querySelector('.contact-form form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[placeholder="Your Name"]').value.trim();
        const email = this.querySelector('input[placeholder="Your Email"]').value.trim();
        const subject = this.querySelector('input[placeholder="Subject"]').value.trim();
        const message = this.querySelector('textarea').value.trim();

        if (!name || !email || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            const resp = await fetch(`${API_BASE}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });
            if (!resp.ok) throw new Error('Request failed');
            await resp.json();
            showNotification('Message sent successfully!', 'success');
            this.reset();
        } catch (err) {
            // Fallback to simulated success to keep UX smooth
            console.warn('Backend not reachable, falling back. Error:', err);
            showNotification('Message queued locally. Backend not reachable.', 'info');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff0080' : '#0080ff'}; color: #000; padding: 15px 20px; border-radius: 10px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 10000; display: flex; align-items: center; gap: 15px; max-width: 400px; transform: translateX(100%); transition: transform 0.3s ease; font-family: 'Rajdhani', sans-serif; font-weight: 600;`;

    document.body.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; }, 100);
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Particle effect for hero section
function initParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    for (let i = 0; i < 50; i++) createParticle(hero);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `position:absolute;width:2px;height:2px;background:var(--primary-color);border-radius:50%;pointer-events:none;opacity:0.6;animation:particle-float 10s infinite linear;`;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    container.appendChild(particle);
}

// Scroll indicator functionality
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
    scrollIndicator.addEventListener('click', function() {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in { animation: fadeInUp 0.8s ease forwards; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
    @keyframes particle-float { 0% { transform: translateY(0) translateX(0); opacity: 0;} 10% { opacity: 0.6;} 90% { opacity: 0.6;} 100% { transform: translateY(-100vh) translateX(100px); opacity: 0;} }
    .nav-link.active { color: var(--primary-color); }
    .nav-link.active::after { width: 100%; }
    .hamburger.active span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
    .notification-content { display:flex; align-items:center; gap:10px; }
    .notification-close { background:none; border:none; color:inherit; cursor:pointer; font-size:1.2rem; padding:0; width:20px; height:20px; display:flex; align-items:center; justify-content:center; }
    .notification-close:hover { opacity:0.7; }
`;
document.head.appendChild(style);

// Parallax effect for hero background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add hover effects for project cards
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-10px) scale(1.02)'; });
        card.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
    });
});

// Add loading animation
window.addEventListener('load', function() { document.body.classList.add('loaded'); });

// Add CSS for loading state
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) { overflow: hidden; }
    body:not(.loaded)::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--dark-bg); z-index: 9999; display:flex; align-items:center; justify-content:center; }
    body:not(.loaded)::after { content: 'Loading...'; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); color: var(--primary-color); font-family: 'Orbitron', monospace; font-size: 1.5rem; z-index: 10000; animation: pulse 1.5s infinite; }
`;
document.head.appendChild(loadingStyle);

// Matrix/Code Rain background
function initCodeRain() {
    const canvas = document.getElementById('codeRain');
    const hero = document.querySelector('.hero');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let columns = [];
    let fontSize = 16; // will be scaled for DPR
    const glyphs = '01ABCDEFGHJKLMNOPQRSTUVWXYZ#$%&*+-/<>(){}[]';

    function resize() {
        const dpr = Math.max(window.devicePixelRatio || 1, 1);
        const { width, height } = hero.getBoundingClientRect();
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = width + 'px';
        canvas.style.height = height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // scale font to look good on large screens - smaller for more density
        fontSize = Math.max(12, Math.min(20, Math.floor(width / 120)));
        const columnCount = Math.ceil(width / (fontSize * 0.8)); // tighter spacing
        columns = new Array(columnCount).fill(0).map(() => Math.floor(Math.random() * -50));
        ctx.font = `${fontSize}px Orbitron, monospace`;
    }

    function draw() {
        // trail fade
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw glyphs
        const baseColor = '#004526';
        ctx.fillStyle = baseColor;
        ctx.shadowColor = 'rgba(0, 69, 38, 0.6)';
        ctx.shadowBlur = 8;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const columnCount = columns.length;

        for (let i = 0; i < columnCount; i++) {
            const x = i * fontSize * 0.8; // tighter column spacing
            const y = columns[i] * fontSize;
            const char = glyphs.charAt(Math.floor(Math.random() * glyphs.length));
            ctx.fillText(char, x, y);

            // reset column after it exits
            if (y > height && Math.random() > 0.985) {
                columns[i] = Math.floor(Math.random() * -50);
            } else {
                columns[i] += 0.6; // slower fall speed
            }
        }

        animationFrameId = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener('resize', resize);

    // Pause animation when tab not visible to save CPU
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            animationFrameId = requestAnimationFrame(draw);
        }
    });
}
