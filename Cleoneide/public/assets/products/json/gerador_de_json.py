import json

produtos = {}

while True:
    categoria = input("Digite a categoria (ex: batom): ").strip().lower()
    nome = input("Digite o nome do produto: ").strip()
    preco = input("Digite o preço (ex: 10.00): ").strip()
    descricao = input("Digite a descrição do produto: ").strip()
    imagem = input("Digite a URL da imagem do produto: ").strip()
    
    disponivel_str = input("O produto está disponível? (True/False): ").strip().lower()
    disponivel = disponivel_str == "true"
    
    quantidade = int(input("Digite a quantidade inicial em estoque (ex: 0): ").strip())
    
    chave_produto = f"{categoria}_{len(produtos) + 1}"
    
    produtos[chave_produto] = {
        "nome": nome,
        "preco": preco,
        "descricao": descricao,
        "imagem": imagem,
        "disponivel": disponivel,
        "quantidade": quantidade
    }
    
    continuar = input("Deseja adicionar outro produto? (s/n): ").strip().lower()
    if continuar != 's':
        break

saida = {"produtos": produtos}

with open("produtos.json", "w", encoding="utf-8") as f:
    json.dump(saida, f, indent=2, ensure_ascii=False)

print("\nArquivo produtos.json gerado com sucesso!")
