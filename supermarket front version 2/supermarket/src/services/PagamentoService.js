// src/services/pagamentoService.js

export function processarPagamento({
  carrinho,
  formaPagamento,
  valorRecebido = 0,
  cpf = ""
}) {
  //Validação do carrinho
  if (!carrinho || carrinho.length === 0) {
    return {
      sucesso: false,
      mensagem: "Carrinho vazio."
    };
  }

  //Validação da forma de pagamento
  if (!formaPagamento) {
    return {
      sucesso: false,
      mensagem: "Selecione a forma de pagamento."
    };
  }

  // Cálculo do total
  const total = carrinho.reduce((acc, item) => {
    return acc + item.preco * item.quantidade;
  }, 0);

  let troco = 0;

  // Regra para dinheiro
  if (formaPagamento === "dinheiro") {
    if (valorRecebido < total) {
      return {
        sucesso: false,
        mensagem: "Valor recebido é menor que o total."
      };
    }

    troco = valorRecebido - total;
  }

  //Simulação de aprovação
  const aprovado = true; // aqui depois pode virar integração real

  if (!aprovado) {
    return {
      sucesso: false,
      mensagem: "Pagamento recusado."
    };
  }

  //Retorno organizado
  return {
    sucesso: true,
    mensagem: "Pagamento aprovado!",
    venda: {
      numeroVenda: gerarNumeroVenda(),
      data: new Date().toLocaleString(),
      cpf: cpf || "Não informado",
      formaPagamento,
      total,
      valorRecebido,
      troco,
      itens: carrinho
    }
  };
}

// Função privada para gerar número da venda
function gerarNumeroVenda() {
  return Math.floor(Math.random() * 1000000);
}