document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname.toLowerCase();
    let jsonFile = '';

    // Caminhos corretos baseados na estrutura: paginas está em public/assets/paginas/
    // e os JSONs estão na raiz do projeto
    if (path.includes('jequiti.html')) {
        jsonFile = '../../../jequiti.json'; // Sobe 3 níveis: paginas -> assets -> public -> raiz
    } else if (path.includes('relogios.html')) {
        jsonFile = '../../../relogios.json';
    } else if (path.includes('oculos.html')) {
        jsonFile = '../../../oculos.json';
    } else if (path.includes('semi_joias.html')) {
        jsonFile = '../../../semi_joias.json';
    } else {
        console.log('Página não corresponde a nenhuma categoria de JSON.');
        return;
    }

    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o JSON: ' + jsonFile);
            }
            return response.json();
        })
        .then(data => {
            renderProdutos(data);
        })
        .catch(error => {
            console.error('Erro ao carregar os produtos:', error);
            // Exibe mensagem de erro para o usuário
            const container = document.getElementById('produtos-lista');
            if (container) {
                container.innerHTML = '<p style="color: red;">Erro ao carregar produtos. Verifique se o arquivo JSON existe.</p>';
            }
        });
});

function renderProdutos(produtos) {
    const container = document.getElementById('produtos-lista');

    if (!container) {
        console.error('Elemento com id "produtos-lista" não encontrado no HTML.');
        return;
    }

    // Limpa o container antes de adicionar produtos
    container.innerHTML = '';

    // Cria o container dos produtos usando a classe CSS existente
    const produtosContainer = document.createElement('div');
    produtosContainer.className = 'produtos-container';

    produtos.forEach(produto => {
        const item = document.createElement('div');
        item.className = 'produto-item';
        item.innerHTML = `
            <h3>${produto.nome}</h3>
            <p class="preco">R$ ${produto.valor.toFixed(2).replace('.', ',')}</p>
            <button onclick="entrarEmContato('${produto.nome}', ${produto.valor})" class="btn-contato">
                💬 Tenho Interesse
            </button>
        `;
        produtosContainer.appendChild(item);
    });

    // Adiciona o container de produtos
    container.appendChild(produtosContainer);

    // Adiciona link para voltar
    const voltarLink = document.createElement('div');
    voltarLink.style.marginTop = '30px';
    voltarLink.innerHTML = `
        <a href="../index.html" class="btn-voltar">← Voltar para a página principal</a>
    `;
    container.appendChild(voltarLink);
}

// Função para contato via WhatsApp
function entrarEmContato(nomeProduto, valor) {
    const numeroWhatsApp = '5521978496336';
    const mensagem = `Olá! Tenho interesse no produto: ${nomeProduto} - R$ ${valor.toFixed(2).replace('.', ',')}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    window.open(url, '_blank');
}