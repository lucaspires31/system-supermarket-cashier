const API = "http://localhost:8080";

export async function buscarProduto(codigo) {

  const response = await fetch(`${API}/produtos/${codigo}`);

  if (!response.ok) {
    throw new Error("Produto não encontrado");
  }

  return response.json();

}

export async function criarVenda() {

  const response = await fetch(`${API}/vendas`, {
    method: "POST"
  });

  return response.json();

}

export async function adicionarProdutoVenda(vendaId, codigo) {

  const response = await fetch(`${API}/vendas/${vendaId}/produto/${codigo}`, {
    method: "POST"
  });

  return response.json();

}