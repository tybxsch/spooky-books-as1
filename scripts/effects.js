document.addEventListener('DOMContentLoaded', function () {
    initThemeEffects();
    initScrollAnimations();
    initTypeWriterEffect();
});

function initThemeEffects() {
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.01)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const authors = document.querySelectorAll('.author');
    authors.forEach(author => {
        author.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        author.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    const genreItems = document.querySelectorAll('.genre-list li');
    genreItems.forEach(item => {
        item.addEventListener('mouseenter', function () {
            this.style.paddingLeft = 'var(--spacing-md)';
            this.style.color = 'var(--smoke-white)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.paddingLeft = 'var(--spacing-sm)';
            this.style.color = 'var(--light-gray)';
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.book-card, .content-card, .author, .data-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

function initTypeWriterEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriterEffect(heroTitle);
    }
}

function typeWriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.borderRight = '2px solid var(--smoke-white)';
    element.style.animation = 'blink 1s infinite';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, 100);
}

function initFormEffects() {
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentNode.classList.remove('focused');
        });

        input.addEventListener('input', function () {
            if (this.value.length > 0) {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });

    const buttons = document.querySelectorAll('.btn, .submit-button, .reset-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initResultEffects() {
    const dataItems = document.querySelectorAll('.data-item');

    dataItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function () {
            this.style.background = 'rgba(139, 0, 0, 0.1)';
            this.style.paddingLeft = 'var(--spacing-lg)';
        });

        item.addEventListener('mouseleave', function () {
            this.style.background = 'transparent';
            this.style.paddingLeft = 'var(--spacing-md)';
        });
    });
}

function addCustomAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.1; }
            50% { opacity: 0.5; }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 5px rgba(220, 20, 60, 0.3); }
            50% { box-shadow: 0 0 20px rgba(220, 20, 60, 0.6); }
        }
        
        .form-group.focused .form-label {
            color: var(--blood-red);
        }
        
        .form-input.filled {
            border-color: var(--blood-red);
        }
        
        .glow-effect {
            animation: glow 2s ease-in-out infinite;
        }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', function () {
    addCustomAnimations();
    initFormEffects();
    initResultEffects();
});