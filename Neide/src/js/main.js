document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Carregando produtos...');
    
    const path = window.location.pathname.toLowerCase();
    let jsonFile = '';

    // Determina qual JSON carregar baseado na página atual
    // Estrutura: Neide/public/assets/paginas/[pagina].html -> Neide/public/assets/data/[arquivo].json
    if (path.includes('jequiti.html')) {
        jsonFile = '../data/jequiti.json';
    } else if (path.includes('relogios.html')) {
        jsonFile = '../data/relogios.json';
    } else if (path.includes('oculos.html')) {
        jsonFile = '../data/oculos.json';
    } else if (path.includes('semi_joias.html')) {
        jsonFile = '../data/semi_joias.json';
    } else {
        console.log('❌ Página não corresponde a nenhuma categoria de JSON.');
        return;
    }

    console.log('📁 Tentando carregar:', jsonFile);

    fetch(jsonFile)
        .then(response => {
            console.log('📡 Status da resposta:', response.status);
            if (!response.ok) {
                throw new Error(`Erro ${response.status}: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('✅ Produtos carregados:', data);
            renderProdutos(data);
        })
        .catch(error => {
            console.error('❌ Erro ao carregar os produtos:', error);
            // Exibe mensagem de erro para o usuário
            const container = document.getElementById('produtos-lista');
            if (container) {
                container.innerHTML = `
                    <div style="text-align: center; color: #666; padding: 40px;">
                        <h3>⚠️ Erro ao carregar produtos</h3>
                        <p>Não foi possível carregar os produtos no momento.</p>
                        <p>Verifique sua conexão e tente novamente.</p>
                        <button onclick="location.reload()" style="padding: 10px 20px; margin-top: 10px; background-color: #C2185B; color: white; border: none; border-radius: 5px; cursor: pointer;">
                            🔄 Tentar Novamente
                        </button>
                    </div>
                `;
            }
        });
});

function renderProdutos(produtos) {
    const container = document.getElementById('produtos-lista');

    if (!container) {
        console.error('❌ Elemento com id "produtos-lista" não encontrado no HTML.');
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

    // Adiciona link para voltar - CAMINHO CORRETO
    const voltarLink = document.createElement('div');
    voltarLink.style.marginTop = '30px';
    voltarLink.innerHTML = `
        <a href="../../index.html" class="btn-voltar">← Voltar para a página principal</a>
    `;
    container.appendChild(voltarLink);

    console.log('✅ Produtos renderizados na página!');
}

// Função para contato via WhatsApp
function entrarEmContato(nomeProduto, valor) {
    const numeroWhatsApp = '5521978496336';
    const mensagem = `Olá! Tenho interesse no produto: ${nomeProduto} - R$ ${valor.toFixed(2).replace('.', ',')}`;
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
    
    console.log('📱 Abrindo WhatsApp para:', nomeProduto);
    window.open(url, '_blank');
}