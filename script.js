
// ---- Optimized script.js (added debouncing and rAF for scroll effects) ----

// Utility: debounce
function debounce(fn, wait) {
    let t;
    return function(...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}

// Mobile Menu Toggle with keyboard support
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

function toggleMenu() {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    // set aria-expanded
    const expanded = hamburger.classList.contains('active');
    hamburger.setAttribute('aria-expanded', expanded ? 'true' : 'false');
}

hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Navbar scroll effect (debounced)
const navbar = document.getElementById('navbar');

function handleScroll() {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}
window.addEventListener('scroll', debounce(handleScroll, 30));

// Smooth scroll for anchor links (keep original behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations (unchanged)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Animate cards on scroll
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.experience-card, .project-card, .skill-category').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    cardObserver.observe(card);
});

// Active nav link on scroll (debounced)
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', debounce(updateActiveLink, 50));

// Typing effect for hero subtitle (kept but guarded)
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    heroSubtitle.style.borderRight = '2px solid var(--primary-color)';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            heroSubtitle.style.borderRight = 'none';
        }
    }
    setTimeout(typeWriter, 500);
}

// Parallax using rAF for smoother performance
const hero = document.querySelector('.hero');
let lastKnownScrollY = 0;
let ticking = false;

function onScroll() {
    lastKnownScrollY = window.pageYOffset;
    if (!ticking) {
        window.requestAnimationFrame(function() {
            if (hero) {
                hero.style.transform = `translateY(${lastKnownScrollY * 0.5}px)`;
            }
            ticking = false;
        });
        ticking = true;
    }
}
window.addEventListener('scroll', debounce(onScroll, 20));

// Loading animation (improved)
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Console message
console.log('%c👋 Hello there!', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cThanks for checking out my portfolio!', 'font-size: 16px; color: #8b5cf6;');
console.log('%cFeel free to reach out: sohamgugale170@gmail.com', 'font-size: 14px; color: #94a3b8;');
