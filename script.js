async function carregarProdutos() {
  try {
    // Obter o nome do arquivo HTML atual, ex: "relogios.html"
    const nomeArquivo = window.location.pathname.split('/').pop();

    // Extrair a parte antes do .html, ex: "relogios"
    const nomeBase = nomeArquivo.replace('.html', '');

    // Mapear nome da página para chave do JSON no Firebase
    const mapaCategorias = {
      "jequiti": "Jequiti",
      "relogios": "Relógio",
      "oculos": "Óculos",
      "semi_joias": "Semi_joias",
      "etc": "ETC"
    };

    const categoria = mapaCategorias[nomeBase.toLowerCase()];
    if (!categoria) {
      throw new Error(`Categoria não mapeada para página: ${nomeBase}`);
    }

    // Buscar dados do JSON único no Firebase
    const urlFirebase = "https://cleoneide-d1b5d-default-rtdb.firebaseio.com/.json";
    const resposta = await fetch(urlFirebase);
    if (!resposta.ok) throw new Error(`Falha ao carregar dados do Firebase: ${resposta.status}`);
    const dados = await resposta.json();

    // Obter a lista de produtos da categoria
    const produtos = dados[categoria];
    if (!produtos || !Array.isArray(produtos)) {
      throw new Error(`Categoria "${categoria}" não encontrada ou inválida no JSON`);
    }

    // Encontrar o container no HTML
    const container = document.getElementById('lista-produtos');
    if (!container) throw new Error('Elemento com id="lista-produtos" não encontrado no HTML');

    // Limpar o container (importante caso haja recarregamento)
    container.innerHTML = "";

    // Renderizar os produtos
    produtos.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('produto-item');
      div.innerHTML = `
        <h2>${item.nome}</h2>
        <p>${item.descricao}</p>
        <p class="preco">${item.preco}</p>
      `;
      container.appendChild(div);
    });

  } catch (erro) {
    console.error(erro);
    const container = document.getElementById('lista-produtos');
    if (container) container.innerHTML = '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
  }
}

// Só executa carregarProdutos se existir o container na página
if (document.getElementById('lista-produtos')) {
  carregarProdutos();
}
