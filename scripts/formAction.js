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
}