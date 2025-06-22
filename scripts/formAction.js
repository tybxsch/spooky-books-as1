
// JavaScript para processar dados recebidos via GET
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de resultado carregada');
    processFormData();
});

// Não entendi o que fazer aqui, mas foi a forma que pensei para fazer o formAction.html funcionar e recuperar as informações do formulário sem usar o backend
function processFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultContainer = document.getElementById('resultData');
    
    if (!resultContainer) {
        console.error('Container de resultado não encontrado');
        return;
    }

    if (urlParams.toString() === '') {
        showNoDataMessage();
        return;
    }

    const fieldLabels = {
        'name': 'Nome',
        'email': 'E-mail',
        'phone': 'Telefone',
        'age': 'Idade',
        'genre': 'Subgênero Favorito',
        'message': 'Mensagem',
        'newsletter': 'Newsletter'
    };
    
    const genreNames = {
        'horror-gotico': 'Horror Gótico',
        'horror-cosmico': 'Horror Cósmico',
        'horror-psicologico': 'Horror Psicológico',
        'horror-sobrenatural': 'Horror Sobrenatural',
        'slasher': 'Slasher',
        'body-horror': 'Body Horror'
    };
    
    let hasData = false;
    let dataHtml = '';
    
    for (const [key, value] of urlParams.entries()) {
        if (value && value.trim() !== '') {
            hasData = true;
            const label = fieldLabels[key] || key;
            let displayValue = value;
            
            switch (key) {
                case 'genre':
                    displayValue = genreNames[value] || value;
                    break;
                case 'newsletter':
                    displayValue = value === 'sim' ? 'Sim, desejo receber' : 'Não informado';
                    break;
                case 'phone':
                    if (!value || value.trim() === '') {
                        displayValue = 'Não informado';
                    }
                    break;
                case 'message':
                    if (value.length > 100) {
                        displayValue = value.substring(0, 100) + '...<br><br><strong>Mensagem completa:</strong><br>' + value;
                    }
                    break;
            }
            
            dataHtml += createDataItem(label, displayValue);
        }
    }
    
    if (hasData) {
        resultContainer.innerHTML = dataHtml;
        addCopyButton();
        addPrintButton();
        logFormSubmission(urlParams);
        showSuccessAnimation();
    } else {
        showNoDataMessage();
    }
}

function createDataItem(label, value) {
    return `
        <div class="data-item">
            <span class="data-label">${label}:</span>
            <span class="data-value">${value}</span>
        </div>
    `;
}
function showNoDataMessage() {
    const resultContainer = document.getElementById('resultData');
    resultContainer.innerHTML = `
        <div class="no-data-message" style="text-align: center; color: var(--light-gray);">
            <h3 style="color: var(--blood-red); margin-bottom: 1rem;">Nenhum dado recebido</h3>
            <p>Não foram encontrados dados do formulário.</p>
            <p>Verifique se o formulário foi preenchido e enviado corretamente.</p>
        </div>
    `;
    
    console.log('Nenhum dado encontrado na URL');
}

// Adicionar botão de copiar dados
function addCopyButton() {
    const resultCard = document.querySelector('.result-card');
    if (!resultCard) return;
    
    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copiar Dados';
    copyButton.style.cssText = `
        background: var(--dark-gray);
        color: var(--smoke-white);
        border: 1px solid var(--medium-gray);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin: 1rem 0;
        transition: all 0.3s ease;
    `;
    
    copyButton.addEventListener('click', function() {
        copyDataToClipboard();
    });
    
    copyButton.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--blood-red)';
        this.style.color = 'var(--blood-red)';
    });
    
    copyButton.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--medium-gray)';
        this.style.color = 'var(--smoke-white)';
    });
    
    resultCard.insertBefore(copyButton, document.querySelector('.result-actions'));
}

function addPrintButton() {
    const resultCard = document.querySelector('.result-card');
    if (!resultCard) return;
    
    const printButton = document.createElement('button');
    printButton.textContent = 'Imprimir Dados';
    printButton.style.cssText = `
        background: var(--dark-gray);
        color: var(--smoke-white);
        border: 1px solid var(--medium-gray);
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin: 1rem 0 1rem 1rem;
        transition: all 0.3s ease;
    `;
    
    printButton.addEventListener('click', function() {
        printData();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.borderColor = 'var(--blood-red)';
        this.style.color = 'var(--blood-red)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--medium-gray)';
        this.style.color = 'var(--smoke-white)';
    });
    
    resultCard.insertBefore(printButton, document.querySelector('.result-actions'));
}

function copyDataToClipboard() {
    const dataItems = document.querySelectorAll('.data-item');
    let textToCopy = 'Dados do Formulário - Terror Literário\n\n';
    
    dataItems.forEach(item => {
        const label = item.querySelector('.data-label').textContent;
        const value = item.querySelector('.data-value').textContent;
        textToCopy += `${label} ${value}\n`;
    });
    
    textToCopy += `\nData: ${new Date().toLocaleString('pt-BR')}`;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Dados copiados para a área de transferência!', 'success');
        console.log('Dados copiados para clipboard');
    }).catch(err => {
        console.error('Erro ao copiar dados:', err);
        showToast('Erro ao copiar dados', 'error');
    });
}

function printData() {
    const printWindow = window.open('', '_blank');
    const dataHtml = document.getElementById('resultData').innerHTML;
    
    const printHtml = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Dados do Formulário - Terror Literário</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                    line-height: 1.6;
                }
                .header {
                    text-align: center;
                    border-bottom: 2px solid #8b0000;
                    padding-bottom: 20px;
                    margin-bottom: 30px;
                }
                .data-item {
                    margin-bottom: 15px;
                    padding: 10px;
                    border-left: 3px solid #8b0000;
                    background: #f5f5f5;
                }
                .data-label {
                    font-weight: bold;
                    color: #8b0000;
                    display: inline-block;
                    min-width: 120px;
                }
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    color: #666;
                    font-size: 12px;
                    border-top: 1px solid #ccc;
                    padding-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Terror Literário</h1>
                <h2>Dados do Formulário de Contato</h2>
            </div>
            <div class="content">
                ${dataHtml}
            </div>
            <div class="footer">
                <p>Gerado em: ${new Date().toLocaleString('pt-BR')}</p>
                <p>Terror Literário - www.terrorliterario.com</p>
            </div>
        </body>
        </html>
    `;
    
    printWindow.document.write(printHtml);
    printWindow.document.close();
    printWindow.print();
}

function logFormSubmission(urlParams) {
    const submissionData = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        data: {}
    };
    
    for (const [key, value] of urlParams.entries()) {
        submissionData.data[key] = value;
    }

    // Implementar aqui o post, quando estiver pronto
}

function showSuccessAnimation() {
    const resultCard = document.querySelector('.result-card');
    if (!resultCard) return;
    
    // Adicionar classe de animação
    resultCard.style.animation = 'slideInUp 0.6s ease-out';
    
    setTimeout(() => {
        showToast('Dados recebidos e processados com sucesso!', 'success');
    }, 500);
}


// Função para mostrar toast
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#dc143c' : type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

// Adicionar animações CSS
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes slideInUp {
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
document.head.appendChild(animationStyles);

// Função para voltar ao formulário (caso necessário)
function goBackToForm() {
    window.location.href = 'form.html';
}
