document.addEventListener('DOMContentLoaded', function() {    
    const form = document.getElementById('contactForm');
    if (form) {
        initFormValidation();
    }
});

function initFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');

    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });

        if (input.name === 'phone') {
            input.addEventListener('input', function() {
                applyPhoneMask(this);
            });
        }
    });

    form.addEventListener('submit', function(e) {        
        if (!validateForm()) {
            e.preventDefault();
            showFormErrors();
        } else {
        }
    });
    
    const resetButton = form.querySelector('button[type="reset"]');
    if (resetButton) {
        resetButton.addEventListener('click', function() {
            clearAllErrors();
        });
    }
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
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
    } else {
        clearFieldError(field);
    }
    
    return isValid;
}

function validateForm() {
    const form = document.getElementById('contactForm');
    const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    field.classList.add('error');
    
    field.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        field.style.animation = '';
    }, 500);
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    field.classList.remove('error');
}

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

function showFormErrors() {
    const errorFields = document.querySelectorAll('.form-input.error, .form-select.error, .form-textarea.error');
    
    if (errorFields.length > 0) {
        errorFields[0].scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        setTimeout(() => {
            errorFields[0].focus();
        }, 500);
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const cleanPhone = phone.replace(/\D/g, '');
    
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        return false;
    }
    
    if (cleanPhone.length === 11 && cleanPhone.charAt(2) !== '9') {
        return false;
    }
    
    return true;
}

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
        updateCounter();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initCharacterCounter();
}); 