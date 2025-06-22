//  EFEITOS E INTERAÇÕES 
document.addEventListener('DOMContentLoaded', function () {
    initThemeEffects();
    initScrollAnimations();
    initParticleEffects();
    initTypeWriterEffect();
});

//  EFEITOS DE TEMA E INTERATIVIDADE 
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

//  ANIMAÇÕES DE SCROLL 
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
                console.log('Elemento animado:', entry.target.className);
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

    const sections = document.querySelectorAll('.section, .form-section, .result-content');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });
}

//  EFEITO DE PARTÍCULAS 
function initParticleEffects() {
    if (document.querySelector('.hero')) {
        createParticleEffect();
    }

    if (document.querySelector('.about-hero')) {
        createDotPatternEffect();
    }

    if (document.querySelector('.form-hero')) {
        createFormParticleEffect();
    }
}

function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;

    hero.appendChild(particlesContainer);
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: var(--blood-red);
        border-radius: 50%;
        opacity: 0.3;
        animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 2}s;
    `;

    container.appendChild(particle);

    // Remover partícula após um tempo para evitar acúmulo
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 10000);
}

// Criar efeito de padrão de pontos
function createDotPatternEffect() {
    const hero = document.querySelector('.about-hero');
    if (!hero) return;

    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'dots-container';
    dotsContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        opacity: 0.1;
    `;

    for (let i = 0; i < 100; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position: absolute;
            width: 1px;
            height: 1px;
            background: var(--blood-red);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${2 + Math.random() * 3}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        dotsContainer.appendChild(dot);
    }

    hero.appendChild(dotsContainer);
}

// Criar efeito de partículas para formulário
function createFormParticleEffect() {
    const hero = document.querySelector('.form-hero');
    if (!hero) return;

    const formParticlesContainer = document.createElement('div');
    formParticlesContainer.className = 'form-particles-container';
    formParticlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;

    hero.appendChild(formParticlesContainer);

    // Criar partículas menores e mais sutis
    for (let i = 0; i < 30; i++) {
        createFormParticle(formParticlesContainer);
    }
}

function createFormParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 1px;
        height: 1px;
        background: var(--blood-red);
        border-radius: 50%;
        opacity: 0.2;
        animation: float ${4 + Math.random() * 3}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 3}s;
    `;

    container.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 12000);
}

//  EFEITO DE MÁQUINA DE ESCREVER 
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
            // Remover cursor após terminar
            setTimeout(() => {
                element.style.borderRight = 'none';
                element.style.animation = 'none';
            }, 1000);
        }
    }, 100);
}

//  EFEITOS DE FORMULÁRIO 
function initFormEffects() {
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');

    formInputs.forEach(input => {
        // Efeito de foco
        input.addEventListener('focus', function () {
            this.parentNode.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentNode.classList.remove('focused');
        });

        // Efeito de preenchimento
        input.addEventListener('input', function () {
            if (this.value.length > 0) {
                this.classList.add('filled');
            } else {
                this.classList.remove('filled');
            }
        });
    });

    // Efeito de hover nos botões
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

//  EFEITOS DE RESULTADO 
function initResultEffects() {
    const dataItems = document.querySelectorAll('.data-item');

    dataItems.forEach((item, index) => {
        // Animação sequencial
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);

        // Efeito de hover
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

//  ANIMAÇÕES CSS ADICIONAIS 
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

//  INICIALIZAR TODOS OS EFEITOS 
document.addEventListener('DOMContentLoaded', function () {
    addCustomAnimations();
    initFormEffects();
    initResultEffects();
});

//  EFEITOS DE PERFORMANCE 
function optimizePerformance() {
    let ticking = false;

    function updateAnimations() {
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateAnimations);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

document.addEventListener('DOMContentLoaded', function () {
    optimizePerformance();
}); 