import axios from "axios";

const API = "http://localhost:8080/produtos";

export async function buscarProduto(codigo) {

  const codigoLimpo = codigo.trim();

  const response = await axios.get(`${API}/${codigoLimpo}`);

  return response.data;

}