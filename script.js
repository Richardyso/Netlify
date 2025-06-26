async function carregarProdutos() {
  try {
    // Obter o nome do arquivo HTML atual (ex.: "relogios.html")
    const nomeArquivo = window.location.pathname.split('/').pop();

    // Extrair a parte antes do .html (ex.: "relogios")
    const nomeBase = nomeArquivo.replace('.html', '');

    // Montar o caminho do JSON correspondente (ex.: "relogios.json")
    const jsonPath = `${nomeBase}.json`;

    // Fazer o fetch do JSON
    const resposta = await fetch(jsonPath);
    if (!resposta.ok) throw new Error(`Não foi possível carregar o arquivo ${jsonPath}`);
    const produtos = await resposta.json();

    // Encontrar o container padronizado
    const container = document.getElementById('lista-produtos');
    if (!container) throw new Error('Elemento com id="lista-produtos" não encontrado no HTML');

    // Renderizar os produtos no container
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
    if (container) container.innerText = 'Erro ao carregar produtos.';
  }
}

carregarProdutos();
