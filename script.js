// ============================================
// Navigation & Smooth Scrolling
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');
    const sidebar = document.querySelector('.sidebar');

    // Update active nav item on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Smooth scroll on nav item click
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                sidebar.classList.remove('active');
            }
        });
    });
});

// ============================================
// Contact Form Handling
// ============================================

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        // Validate form
        if (!validateForm(data)) {
            showNotification('يرجى ملء جميع الحقول بشكل صحيح', 'error');
            return;
        }

        // Show success message
        showNotification('تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.', 'success');

        // Reset form
        contactForm.reset();

        console.log('Form Data:', data);
    });
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name || data.name.trim() === '') return false;
    if (!data.email || !emailRegex.test(data.email)) return false;
    if (!data.subject || data.subject.trim() === '') return false;
    if (!data.message || data.message.trim() === '') return false;

    return true;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        background: ${type === 'success' ? '#06ffa5' : '#ff006e'};
        color: ${type === 'success' ? '#0a0e27' : '#ffffff'};
        font-weight: 600;
        z-index: 9999;
        animation: slideInLeft 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// Scroll to Top Button
// ============================================

const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #00d4ff, #8338ec);
    color: #0a0e27;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 999;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 212, 255, 0.3);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseover', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px)';
});

scrollToTopBtn.addEventListener('mouseout', () => {
    scrollToTopBtn.style.transform = 'translateY(0)';
});

// ============================================
// Mobile Menu Toggle
// ============================================

const sidebar = document.querySelector('.sidebar');
let menuToggle = false;

// Create mobile menu toggle button
const toggleBtn = document.createElement('button');
toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
toggleBtn.className = 'mobile-menu-toggle';
toggleBtn.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #00d4ff, #8338ec);
    color: #0a0e27;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1.2rem;
    z-index: 1999;
    display: none;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
`;

document.body.appendChild(toggleBtn);

// Show toggle button on mobile
function updateMenuToggle() {
    if (window.innerWidth <= 768) {
        toggleBtn.style.display = 'flex';
    } else {
        toggleBtn.style.display = 'none';
        sidebar.classList.remove('active');
    }
}

updateMenuToggle();
window.addEventListener('resize', updateMenuToggle);

toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

// ============================================
// Animate on Scroll
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.project-card, .stat-box, .skill-group, .timeline-item');
animateElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============================================
// Add CSS Animation Styles Dynamically
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Project Links Handler
// ============================================

document.querySelectorAll('.project-link').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const projectNames = [
            'ecommerce-platform',
            'chat-app',
            'project-management',
            'cloud-storage',
            'analytics-dashboard',
            'learning-platform'
        ];
        alert(`رابط المشروع: https://github.com/abdulkarim/${projectNames[index]}`);
    });
});

// ============================================
// Console Welcome Message
// ============================================

console.log('%c👋 مرحباً بك في موقع عبدالكريم العبدلي', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cمطور ويب متخصص في بناء تطبيقات ويب حديثة', 'font-size: 14px; color: #b0b8d4;');
console.log('%cهل تبحث عن فرصة عمل؟ تواصل معي!', 'font-size: 12px; color: #06ffa5;');

// ============================================
// Parallax Effect on Hero
// ============================================

const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < window.innerHeight) {
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
        }
    });
}

// ============================================
// Debounce Function for Performance
// ============================================

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

// ============================================
// Lazy Loading for Images
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
