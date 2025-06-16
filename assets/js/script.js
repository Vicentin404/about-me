// script.js - Portfolio Maycon Dias Vicentin
// Cybersecurity Specialist & Developer

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// =============================================================================
// LOADING SCREEN
// =============================================================================
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
    }, 3500);
});

// Enhanced Loading Screen Animation
function enhancedLoadingAnimation() {
    const loadingText = document.querySelector('.typewriter');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (loadingText) {
        const messages = [
            'Enumerando portas abertas',
            'Injetando exploit remoto',
            'Executando payload.bin',
            'Acesso root concedido!'
        ];
        
        let messageIndex = 0;
        let isTyping = false;
        
        function showNextMessage() {
            if (messageIndex < messages.length && !isTyping) {
                isTyping = true;
                loadingText.textContent = '';
                terminalType(loadingText, messages[messageIndex], 25); // Mais rápido
                messageIndex++;
                
                // Timing mais agressivo para caber no tempo de carregamento
                const typingTime = messages[messageIndex - 1].length * 25;
                setTimeout(() => {
                    isTyping = false;
                    if (messageIndex < messages.length) {
                        setTimeout(showNextMessage, 300); // Intervalo menor
                    }
                }, typingTime + 100);
            }
        }
        
        showNextMessage();
    }
}

// =============================================================================
// NAVIGATION
// =============================================================================

// Navbar Scroll Effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingNavLink = document.querySelector(`a[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (correspondingNavLink) {
                correspondingNavLink.classList.add('active');
            }
        }
    });
}

// =============================================================================
// TEXT EFFECTS
// =============================================================================

// Typewriter Effect for Hero Section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (typeof callback === 'function') {
            callback();
        }
    }
    
    type();
}

// Terminal Typing Effect
function terminalType(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor
            const cursor = element.querySelector('.cursor');
            if (cursor) cursor.remove(); // Remove cursor anterior
            element.innerHTML += '<span class="cursor">_</span>';
        }
    }
    
    type();
}

// Glitch Effect for Main Title
function triggerGlitch() {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        glitchElement.style.animationDuration = '0.3s';
        setTimeout(() => {
            glitchElement.style.animationDuration = '2s';
        }, 1000);
    }
}

// =============================================================================
// ANIMATIONS
// =============================================================================

// Counter Animation for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Terminal Animation
function animateTerminal() {
    const terminalLines = document.querySelectorAll('.hero-terminal .terminal-line');
    
    terminalLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 800);
    });
}

// Dynamic Skill Bar Animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const percent = bar.getAttribute('data-percent');
        bar.style.transition = `width 1.5s ease-in-out ${index * 0.1}s`;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = percent + '%';
        }, 500);
    });
}

// Smooth Reveal Animation for Elements
function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-category, .project-card, .contact-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('fade-in-up');
        }
    });
}

// =============================================================================
// INTERSECTION OBSERVER
// =============================================================================

const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate counters when hero section is visible
            if (entry.target.id === 'home') {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                });
            }
            
            // Animate skill bars when skills section is visible
            if (entry.target.id === 'skills') {
                const skillBars = document.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const percent = bar.getAttribute('data-percent');
                    setTimeout(() => {
                        bar.style.width = percent + '%';
                    }, 200);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// =============================================================================
// VISUAL EFFECTS
// =============================================================================

// Matrix Rain Effect
function createMatrixRain() {
    const matrixContainer = document.querySelector('.matrix-rain');
    if (!matrixContainer) return;
    
    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = i * 20 + 'px';
        column.style.top = '-100%';
        column.style.color = '#00ff88';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.opacity = '0.3';
        column.style.animation = `matrixDrop ${Math.random() * 3 + 2}s linear infinite`;
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }
}

// CSS for matrix drop animation
const style = document.createElement('style');
style.textContent = `
    @keyframes matrixDrop {
        0% {
            transform: translateY(-100vh);
            opacity: 0;
        }
        10% {
            opacity: 0.3;
        }
        90% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const matrixRain = document.querySelector('.matrix-rain');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    if (matrixRain) {
        matrixRain.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// =============================================================================
// HOVER EFFECTS
// =============================================================================

// Project Card Hover Effects
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0)';
    });
});

// Skill Category Hover Effects
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', () => {
        category.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    category.addEventListener('mouseleave', () => {
        category.style.transform = 'translateY(0) scale(1)';
    });
});

// Social Media Hover Effects
function enhanceSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-links a, .footer-social a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-5px) rotate(5deg)';
            link.style.boxShadow = '0 10px 30px rgba(0, 255, 136, 0.3)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) rotate(0deg)';
            link.style.boxShadow = 'none';
        });
    });
}

// =============================================================================
// CONTACT FORM
// =============================================================================

// Contact Form Enhancement
function handleContactForm() {
    const contactBtns = document.querySelectorAll('.contact-buttons .btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Add click effect
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// =============================================================================
// KEYBOARD SUPPORT
// =============================================================================

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// =============================================================================
// PERFORMANCE OPTIMIZATION
// =============================================================================

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    updateActiveNavLink();
    revealOnScroll();
}, 10);

// =============================================================================
// INITIALIZATION
// =============================================================================

// Initialize typewriter effect when page loads
window.addEventListener('load', () => {
    setTimeout(() => {
        const typewriterElement = document.querySelector('.typewriter-hero');
        if (typewriterElement) {
            typeWriter(typewriterElement, 'Cybersecurity Specialist & Developer', 80);
        }
    }, 3500);
});

// Start terminal animation after page load
window.addEventListener('load', () => {
    setTimeout(animateTerminal, 2000);
});

// Initialize matrix rain
setTimeout(createMatrixRain, 1000);

// Trigger glitch effect periodically
setInterval(triggerGlitch, 10000);

// Initialize animations on load
window.addEventListener('load', () => {
    revealOnScroll();
});

// Initialize contact form enhancements
handleContactForm();

// Initialize social link enhancements
enhanceSocialLinks();

// Start enhanced loading animation
enhancedLoadingAnimation();

// =============================================================================
// EVENT LISTENERS
// =============================================================================

// Scroll event listeners
window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', throttledScrollHandler);
window.addEventListener('scroll', revealOnScroll);

//==============================================================================
document.addEventListener("DOMContentLoaded", () => {
    const lines = document.querySelectorAll('.terminal-line');
    let delay = 4500; // Espera inicial de 4.5 segundos

    lines.forEach((line) => {
        line.style.display = 'none'; // Oculta todas inicialmente

        setTimeout(() => {
            line.style.display = 'block';

            // Aplica animação de digitação apenas em elementos com a classe 'command'
            const command = line.querySelector('.command');
            if (command) {
                const fullText = command.textContent;
                command.textContent = ''; // Limpa para começar a "digitar"
                let i = 0;

                const typeInterval = setInterval(() => {
                    command.textContent += fullText.charAt(i);
                    i++;
                    if (i === fullText.length) {
                        clearInterval(typeInterval);
                    }
                }, 50); // Velocidade da digitação
            }

        }, delay);

        delay += 700; // Tempo entre as linhas (em milissegundos)
    });
});



// =============================================================================
// CONSOLE MESSAGE
// =============================================================================

console.log('%c🚀 Portfolio Maycon Dias Vicentin', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cCybersecurity Specialist & Developer', 'color: #0066ff; font-size: 14px;');
console.log('%cContact: maycondias@icloud.com', 'color: #b0b0b0; font-size: 12px;');