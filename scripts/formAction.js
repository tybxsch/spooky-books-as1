
// JavaScript para processar dados recebidos via GET
document.addEventListener('DOMContentLoaded', function() {
    console.log('Página de resultado carregada');
    processFormData();
});

// Processar dados do formulário recebidos via GET
function processFormData() {
    const urlParams = new URLSearchParams(window.location.search);
    const resultContainer = document.getElementById('resultData');
    
    if (!resultContainer) {
        console.error('Container de resultado não encontrado');
        return;
    }
    
    // Verificar se há dados na URL
    if (urlParams.toString() === '') {
        showNoDataMessage();
        return;
    }
    
    console.log('Processando dados recebidos...');
    
    // Mapear campos para labels mais amigáveis
    const fieldLabels = {
        'name': 'Nome',
        'email': 'E-mail',
        'phone': 'Telefone',
        'age': 'Idade',
        'genre': 'Subgênero Favorito',
        'message': 'Mensagem',
        'newsletter': 'Newsletter'
    };
    
    // Mapear valores de gênero para nomes mais amigáveis
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
    
    // Processar cada parâmetro
    for (const [key, value] of urlParams.entries()) {
        if (value && value.trim() !== '') {
            hasData = true;
            const label = fieldLabels[key] || key;
            let displayValue = value;
            
            // Formatar valores especiais
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
                    // Quebrar linhas longas para melhor visualização
                    if (value.length > 100) {
                        displayValue = value.substring(0, 100) + '...<br><br><strong>Mensagem completa:</strong><br>' + value;
                    }
                    break;
            }
            
            dataHtml += createDataItem(label, displayValue);
            console.log(`Dado processado - ${label}: ${value}`);
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

// Criar item de dados
function createDataItem(label, value) {
    return `
        <div class="data-item">
            <span class="data-label">${label}:</span>
            <span class="data-value">${value}</span>
        </div>
    `;
}

// Mostrar mensagem quando não há dados
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

// Adicionar botão de imprimir
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

// Copiar dados para clipboard
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

// Imprimir dados
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
    
    console.log('Dados enviados para impressão');
}

// Log da submissão do formulário
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
    
    console.log('Dados do formulário submetido:', submissionData);
    
    // Aqui você poderia enviar os dados para um servidor ou analytics
    // trackFormSubmission(submissionData);
}

// Mostrar animação de sucesso
function showSuccessAnimation() {
    const resultCard = document.querySelector('.result-card');
    if (!resultCard) return;
    
    // Adicionar classe de animação
    resultCard.style.animation = 'slideInUp 0.6s ease-out';
    
    // Criar confetti effect
    createConfettiEffect();
    
    setTimeout(() => {
        showToast('Dados recebidos e processados com sucesso!', 'success');
    }, 500);
}

// Efeito confetti
function createConfettiEffect() {
    const colors = ['#dc143c', '#8b0000', '#ffffff', '#f5f5f5'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    
    document.body.appendChild(confettiContainer);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfettiPiece(confettiContainer, colors);
        }, i * 50);
    }
    
    // Remover container após animação
    setTimeout(() => {
        if (confettiContainer.parentNode) {
            confettiContainer.parentNode.removeChild(confettiContainer);
        }
    }, 3000);
}

function createConfettiPiece(container, colors) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: absolute;
        width: 8px;
        height: 8px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        border-radius: 50%;
        animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
    `;
    
    container.appendChild(confetti);
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
    
    @keyframes confettiFall {
        from {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);

// Função para voltar ao formulário (caso necessário)
function goBackToForm() {
    window.location.href = 'form.html';
}

// Analytics (exemplo - não funcional sem servidor)
function trackFormSubmission(data) {
    // Exemplo de como você enviaria dados para analytics
    console.log('Dados que seriam enviados para analytics:', data);
    
    // fetch('/api/analytics/form-submission', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // });
}
