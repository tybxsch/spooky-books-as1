// ===== VALIDAÇÃO DO FORMULÁRIO =====

// Inicializar validação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Form Validation - Script carregado');
    
    const form = document.getElementById('contactForm');
    if (form) {
        initFormValidation();
        console.log('Validação do formulário inicializada');
    }
});

// ===== INICIALIZAR VALIDAÇÃO =====
function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    // Adicionar listeners para validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            // Limpar erro quando usuário começar a digitar
            clearFieldError(this);
        });
        
        // Validação especial para telefone
        if (input.name === 'phone') {
            input.addEventListener('input', function() {
                applyPhoneMask(this);
            });
        }
    });
    
    // Validação no submit
    form.addEventListener('submit', function(e) {
        console.log('Formulário sendo enviado...');
        
        if (!validateForm()) {
            e.preventDefault();
            console.log('Formulário contém erros - envio cancelado');
            showFormErrors();
            showToast('Por favor, corrija os erros no formulário', 'error');
        } else {
            console.log('Formulário válido - prosseguindo com envio');
            showToast('Formulário enviado com sucesso!', 'success');
        }
    });
    
    // Reset do formulário
    const resetButton = form.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            clearAllErrors();
            console.log('Formulário resetado');
            showToast('Formulário limpo', 'info');
        });
    }
}

// ===== VALIDAR CAMPO INDIVIDUAL =====
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    console.log(`Validando campo: ${fieldName} com valor: ${value}`);
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'Nome é obrigatório';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Nome deve ter pelo menos 2 caracteres';
                isValid = false;
            } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
                errorMessage = 'Nome deve conter apenas letras e espaços';
                isValid = false;
            }
            break;
            
        case 'email':
            if (!value) {
                errorMessage = 'E-mail é obrigatório';
                isValid = false;
            } else if (!isValidEmail(value)) {
                errorMessage = 'E-mail deve ter um formato válido';
                isValid = false;
            }
            break;
            
        case 'phone':
            if (value && !isValidPhone(value)) {
                errorMessage = 'Telefone deve ter um formato válido (ex: (11) 99999-9999)';
                isValid = false;
            }
            break;
            
        case 'age':
            if (!value) {
                errorMessage = 'Idade é obrigatória';
                isValid = false;
            } else {
                const age = parseInt(value);
                if (age < 13) {
                    errorMessage = 'Idade mínima é 13 anos';
                    isValid = false;
                } else if (age > 120) {
                    errorMessage = 'Idade deve ser realista';
                    isValid = false;
                }
            }
            break;
            
        case 'genre':
            if (!value) {
                errorMessage = 'Selecione um subgênero favorito';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'Mensagem é obrigatória';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Mensagem deve ter pelo menos 10 caracteres';
                isValid = false;
            } else if (value.length > 1000) {
                errorMessage = 'Mensagem deve ter no máximo 1000 caracteres';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
        console.log(`Erro no campo ${fieldName}: ${errorMessage}`);
    } else {
        clearFieldError(field);
        console.log(`Campo ${fieldName} válido`);
    }
    
    return isValid;
}

// ===== VALIDAR FORMULÁRIO COMPLETO =====
function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    console.log('Iniciando validação completa do formulário...');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    console.log(`Resultado da validação: ${isFormValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
    return isFormValid;
}

// ===== MOSTRAR ERRO EM CAMPO ESPECÍFICO =====
function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    field.classList.add('error');
    
    // Adicionar shake effect
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

// ===== LIMPAR ERRO DE CAMPO ESPECÍFICO =====
function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    field.classList.remove('error');
}

// ===== LIMPAR TODOS OS ERROS =====
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const fieldElements = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    errorElements.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    fieldElements.forEach(field => {
        field.classList.remove('error');
    });
}

// ===== MOSTRAR ERROS DO FORMULÁRIO =====
function showFormErrors() {
    const errorFields = document.querySelectorAll('.form-input.error, .form-select.error, .form-textarea.error');
    
    if (errorFields.length > 0) {
        // Scroll para o primeiro campo com erro
        errorFields[0].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Focar no primeiro campo com erro
        setTimeout(() => {
            errorFields[0].focus();
        }, 500);
    }
}

// ===== VALIDAÇÕES ESPECÍFICAS =====

// Validar e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validar telefone
function isValidPhone(phone) {
    // Remove todos os caracteres não numéricos
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Verifica se tem entre 10 e 11 dígitos (com DDD)
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        return false;
    }
    
    // Verifica se começa com 9 (celular) ou não (fixo)
    if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') {
        return false;
    }
    
    return true;
}

// Aplicar máscara de telefone
function applyPhoneMask(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        if (value.length <= 2) {
            value = `(${value}`;
        } else if (value.length <= 6) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        } else if (value.length <= 10) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        } else {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
        }
    }
    
    input.value = value;
}

// ===== SISTEMA DE TOAST =====
function showToast(message, type = 'info') {
    // Remover toasts existentes
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Criar novo toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Adicionar ao DOM
    document.body.appendChild(toast);
    
    // Mostrar toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remover toast após 5 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 5000);
    
    // Permitir fechar toast ao clicar
    toast.addEventListener('click', function() {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
}

// ===== CONTADOR DE CARACTERES =====
function initCharacterCounter() {
    const textarea = document.querySelector('.form-textarea');
    if (textarea) {
        const counter = document.createElement('div');
        counter.className = 'char-counter';
        counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: var(--light-gray);
            margin-top: 0.5rem;
        `;
        
        textarea.parentNode.appendChild(counter);
        
        function updateCounter() {
            const current = textarea.value.length;
            const max = 1000;
            counter.textContent = `${current}/${max} caracteres`;
            
            if (current > max * 0.9) {
                counter.style.color = 'var(--blood-red)';
            } else {
                counter.style.color = 'var(--light-gray)';
            }
        }
        
        textarea.addEventListener('input', updateCounter);
        updateCounter(); // Contador inicial
    }
}

// ===== INICIALIZAR CONTADOR DE CARACTERES =====
document.addEventListener('DOMContentLoaded', function() {
    initCharacterCounter();
}); 