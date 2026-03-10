import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./caixa.css";
import logo from "../assets/logotwo.png";
import bip from "../assets/bip.mp3";

function Caixa() {
  const inputCodigoRef = useRef(null);
  const inputQuantidadeRef = useRef(null);

  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState(1);

  const [produtoAtual, setProdutoAtual] = useState(null);
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);
  const [imagemProduto, setImagemProduto] = useState(
    "https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
  );

  const totalItens = itens.reduce((soma, item) => soma + item.quantidade, 0);

  // Modal cliente
  const [modalClienteAberto, setModalClienteAberto] = useState(false);
  const [cliente, setCliente] = useState({ nome: "", contato: "", cpf: "" });

  // Modal pagamento
  const [modalPagamentoAberto, setModalPagamentoAberto] = useState(false);
  const [tipoPagamento, setTipoPagamento] = useState(""); // dinheiro, pix, cartao
  const [valorRecebido, setValorRecebido] = useState("");
  const [troco, setTroco] = useState(0);

  // Modal nota fiscal
  const [modalNotaAberto, setModalNotaAberto] = useState(false);

  useEffect(() => {
    inputCodigoRef.current.focus();
  }, []);

  async function buscarProduto(codigo) {
    try {
      const res = await axios.get(`http://localhost:8080/produtos/${codigo}`);
      return res.data;
    } catch (erro) {
      console.error("Erro ao buscar produto:", erro);
      alert("Produto não encontrado ou erro no backend");
      return null;
    }
  }

  async function adicionarProduto() {
    if (!codigo) return;

    const produto = await buscarProduto(codigo);
    if (!produto) return;

    setProdutoAtual(produto);
    setImagemProduto(produto.imagem || "https://cdn-icons-png.flaticon.com/512/1170/1170678.png");

    const audio = new Audio(bip);
    audio.currentTime = 0;
    audio.play();

    const itemExistente = itens.find((item) => item.id === produto.id);
    let novaLista;

    if (itemExistente) {
      novaLista = itens.map((item) =>
        item.id === produto.id
          ? { ...item, quantidade: item.quantidade + Number(quantidade) }
          : item
      );
    } else {
      const novoItem = {
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: Number(quantidade),
        imagem: produto.imagem, // adiciona imagem na lista
      };
      novaLista = [...itens, novoItem];
    }

    setItens(novaLista);

    const novoTotal = novaLista.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );
    setTotal(novoTotal);

    setCodigo("");
    setQuantidade(1);
    inputCodigoRef.current.focus();
  }

  function cancelarItem() {
    if (itens.length === 0) return;

    const novaLista = itens.slice(0, -1);
    setItens(novaLista);

    const novoTotal = novaLista.reduce(
      (soma, item) => soma + item.preco * item.quantidade,
      0
    );
    setTotal(novoTotal);
  }

  function abrirModalCliente() {
    if (itens.length === 0) {
      alert("Adicione pelo menos um produto antes de finalizar a venda.");
      return;
    }
    setModalClienteAberto(true);
  }

  function confirmarCliente() {
    setModalClienteAberto(false);
    setModalPagamentoAberto(true);
  }

  function selecionarPagamento(tipo) {
    setTipoPagamento(tipo);
    setValorRecebido("");
    setTroco(0);
  }

  function calcularTroco(valor) {
    const recebido = parseFloat(valor) || 0;
    setValorRecebido(valor);
    setTroco(recebido - total);
  }

  function finalizarVenda() {
    setModalPagamentoAberto(false);
    setModalNotaAberto(true);
  }

  function fecharNota() {
    setItens([]);
    setTotal(0);
    setProdutoAtual(null);
    setImagemProduto("https://cdn-icons-png.flaticon.com/512/1170/1170678.png");
    setCliente({ nome: "", contato: "", cpf: "" });
    setModalNotaAberto(false);
    setTipoPagamento("");
    setValorRecebido("");
    setTroco(0);
  }

  return (
    <div>
      {/* HEADER */}
      <header className="titulo">
        <div className="logo-container">
          <img src={logo} alt="Boa Vista" />
        </div>
        <div className="caixa-info">
          Caixa: 01 | Operador: João | Status: CAIXA ABERTO
        </div>
      </header>

      {/* PAINEL */}
      <div className="painel">
        <div className="esquerda">
          {produtoAtual ? (
            <div className="produtoCard">
              <h2>{produtoAtual.nome}</h2>
              <h3>R$ {produtoAtual.preco.toFixed(2)}</h3>
            </div>
          ) : (
            <h2>Nenhum Produto</h2>
          )}

          <div className="imagemProduto">
            <img src={imagemProduto} alt="Produto" />
          </div>

          <input
            ref={inputCodigoRef}
            className="inputCodigo"
            placeholder="Código de barras"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") inputQuantidadeRef.current.focus();
              if (e.key === "Enter") adicionarProduto();
            }}
          />

          <input
            ref={inputQuantidadeRef}
            className="inputCodigo"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") inputCodigoRef.current.focus();
              if (e.key === "Enter") adicionarProduto();
            }}
          />

          <button className="botaoAdicionar" onClick={adicionarProduto}>
            Adicionar
          </button>
        </div>

        <div className="direita">
          <table className="tabela">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Produto</th>
                <th>Qtd</th>
                <th>Valor Unit</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {itens.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.imagem || "https://cdn-icons-png.flaticon.com/512/1170/1170678.png"}
                      alt={item.nome}
                      style={{ width: 50, height: 50, objectFit: "contain" }}
                    />
                  </td>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOTAL */}
      <div className="totalArea">
        <h2>Itens: {totalItens}</h2>
        <h2>Subtotal: R$ {total.toFixed(2)}</h2>
        <h1>Total: R$ {total.toFixed(2)}</h1>
      </div>

      {/* RODAPÉ */}
      <div className="rodape">
        <button className="botaoCancelar" onClick={cancelarItem}>
          Cancelar Item (F1)
        </button>
        <button className="botaoFinalizar" onClick={abrirModalCliente}>
          Finalizar Venda (F2)
        </button>
      </div>

      {/* MODAL CLIENTE */}
      {modalClienteAberto && (
        <div className="modalCliente">
          <div className="modal-content">
            <h2>Dados do Cliente</h2>
            <input
              type="text"
              placeholder="Nome"
              value={cliente.nome}
              onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contato"
              value={cliente.contato}
              onChange={(e) => setCliente({ ...cliente, contato: e.target.value })}
            />
            <input
              type="text"
              placeholder="CPF"
              value={cliente.cpf}
              onChange={(e) => setCliente({ ...cliente, cpf: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={() => setModalClienteAberto(false)}>Cancelar</button>
              <button onClick={confirmarCliente}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PAGAMENTO */}
      {modalPagamentoAberto && (
        <div className="modalCliente">
          <div className="modal-content">
            <h2>Pagamento</h2>

            {!tipoPagamento && (
              <div className="opcoesPagamento">
                <button className="dinheiro" onClick={() => selecionarPagamento("dinheiro")}>Dinheiro</button>
                <button className="pix" onClick={() => selecionarPagamento("pix")}>Pix</button>
                <button className="cartao" onClick={() => selecionarPagamento("cartao")}>Cartão Crédito</button>
                <button className="cartao" onClick={() => selecionarPagamento("cartao")}>Cartão Débito</button>
              </div>
            )}

            {tipoPagamento === "dinheiro" && (
              <div className="pagamentoDinheiro">
                <p>Total: R$ {total.toFixed(2)}</p>
                <input
                  type="number"
                  placeholder="Valor recebido"
                  value={valorRecebido}
                  onChange={(e) => calcularTroco(e.target.value)}
                />
                <p>Troco: R$ {troco >= 0 ? troco.toFixed(2) : "0.00"}</p>
                <button onClick={finalizarVenda}>Confirmar Pagamento</button>
              </div>
            )}

            {tipoPagamento === "pix" && (
              <div className="pagamentoPix">
                <p>Escaneie o QR Code</p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PIX_EXEMPLO"
                  alt="QR Code Pix"
                />
                <button onClick={finalizarVenda}>Pagamento Confirmado</button>
              </div>
            )}

            {tipoPagamento === "cartao" && (
              <div className="pagamentoCartao">
                <p>Pagamento Finalizado!</p>
                <button onClick={finalizarVenda}>OK</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL NOTA FISCAL */}
      {modalNotaAberto && (
        <div className="modalCliente">
          <div className="modal-content">
            <h2>Nota Fiscal</h2>
            <div style={{ fontFamily: "monospace", fontSize: "14px" }}>
              <p>Cliente: {cliente.nome}</p>
              <p>CPF: {cliente.cpf}</p>
              <p>Contato: {cliente.contato}</p>
              <hr />
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Qtd</th>
                    <th>Valor</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {itens.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nome}</td>
                      <td>{item.quantidade}</td>
                      <td>R$ {item.preco.toFixed(2)}</td>
                      <td>R$ {(item.preco * item.quantidade).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr />
              <p>Total: R$ {total.toFixed(2)}</p>
            </div>
            <div className="modal-buttons">
              <button onClick={fecharNota}>Fechar</button>
              <button onClick={() => window.print()}>Imprimir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Caixa;