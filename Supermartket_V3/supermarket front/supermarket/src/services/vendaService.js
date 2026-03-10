import axios from "axios";

const API = "http://localhost:8080/vendas";

export async function criarVenda() {

  const response = await axios.post(API);

  return response.data;

}

export async function adicionarProdutoVenda(vendaId, codigo) {

  const response = await axios.post(`${API}/${vendaId}/produto/${codigo}`);

  return response.data;

}