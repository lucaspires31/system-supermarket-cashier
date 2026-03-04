// src/services/notaFiscalService.js

export function gerarNotaFiscal(venda) {
  if (!venda || !venda.itens || venda.itens.length === 0) {
    console.error("Venda inválida para gerar nota.");
    return;
  }

  let csv = "";

  csv += "NOTA FISCAL SIMULADA\n";
  csv += `Numero da Venda;${venda.numeroVenda}\n`;
  csv += `Data;${venda.data}\n`;
  csv += `CPF;${venda.cpf}\n`;
  csv += `Forma de Pagamento;${venda.formaPagamento}\n\n`;

  csv += "Produto;Quantidade;Preco Unitario;Subtotal\n";

  venda.itens.forEach(item => {
    const subtotal = item.preco * item.quantidade;
    csv += `${item.nome};${item.quantidade};${item.preco};${subtotal}\n`;
  });

  csv += `\nTotal;${venda.total}\n`;
  csv += `Valor Recebido;${venda.valorRecebido || 0}\n`;
  csv += `Troco;${venda.troco || 0}\n`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `nota_fiscal_${venda.numeroVenda}.csv`;
  link.click();
}