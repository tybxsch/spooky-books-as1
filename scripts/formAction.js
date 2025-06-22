document.addEventListener('DOMContentLoaded', function() {
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
        console.log('Dados copiados para clipboard');
    }).catch(err => {
        console.error('Erro ao copiar dados:', err);
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