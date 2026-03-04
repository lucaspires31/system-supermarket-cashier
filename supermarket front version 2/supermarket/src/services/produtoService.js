// src/services/produtoService.js

// IMPORTANDO IMAGENS (CAMINHO RELATIVO CORRETO)
import arrozImg from "../assets/arroz.png";
import feijaoImg from "../assets/feijao.png";
import refrigeranteImg from "../assets/refrigerante.png";
import macarraoImg from "../assets/macarrao.png";

// Base simulada de produtos
const produtos = [
  {
    codigo: "7891000100101",
    nome: "Arroz 5kg",
    preco: 25.90,
    imagem: arrozImg
  },
  {
    codigo: "7891000100202",
    nome: "Feijão 1kg",
    preco: 8.50,
    imagem: feijaoImg
  },
  {
    codigo: "7891000100303",
    nome: "Refrigerante 2L",
    preco: 6.99,
    imagem: refrigeranteImg
  },
  {
    codigo: "7891000100404",
    nome: "Macarrão 500g",
    preco: 4.75,
    imagem: macarraoImg
  }
];

// Retorna todos os produtos
export function listarProdutos() {
  return produtos;
}

// Busca por código
export function buscarProdutoPorCodigo(codigo) {
  return produtos.find(produto => produto.codigo === codigo);
}

// Busca por nome
export function buscarProdutoPorNome(nome) {
  return produtos.filter(produto =>
    produto.nome.toLowerCase().includes(nome.toLowerCase())
  );
}