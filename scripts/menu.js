// ===== CONTROLE DO MENU E NAVEGAÇÃO =====

// Inicializar funcionalidades do menu quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Menu - Script carregado');
    initMobileMenu();
    initScrollEffects();
    initActiveNavLink();
});

// ===== CONTROLE DO MENU MOBILE =====
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        // Toggle do menu mobile
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Adicionar/remover classe no body para prevenir scroll
            document.body.classList.toggle('menu-open');
            
            console.log('Menu mobile toggled');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
                console.log('Menu mobile fechado após click no link');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                closeMobileMenu();
            }
        });
        
        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMobileMenu();
            }
        });
    }
}

// Função para fechar o menu mobile
function closeMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// ===== EFEITOS DE SCROLL =====
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Mudança de background baseada no scroll
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
                navbar.style.backdropFilter = 'blur(10px)';
            }
            
            // Hide/show navbar no scroll (opcional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Smooth scroll para links internos
        const internalLinks = document.querySelectorAll('a[href^="#"]');
        internalLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== DESTACAR LINK ATIVO =====
function initActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        // Remover classe active de todos os links
        link.classList.remove('active');
        
        // Adicionar classe active ao link da página atual
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
        
        // Para a página inicial
        if (currentPage === 'index.html' && linkHref === 'index.html') {
            link.classList.add('active');
        }
    });
}

// ===== FUNÇÕES UTILITÁRIAS =====

// Função para scroll suave para um elemento
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    const navbar = document.getElementById('navbar');
    
    if (targetElement && navbar) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Função para verificar se o menu mobile está aberto
function isMobileMenuOpen() {
    const hamburger = document.getElementById('hamburger');
    return hamburger ? hamburger.classList.contains('active') : false;
}

// Função para obter a altura da navbar
function getNavbarHeight() {
    const navbar = document.getElementById('navbar');
    return navbar ? navbar.offsetHeight : 0;
}

// ===== EVENT LISTENERS GLOBAIS =====

// Fechar menu ao redimensionar a janela
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Prevenir scroll do body quando menu mobile está aberto
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        body.menu-open {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
}); 