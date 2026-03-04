import React, { useState, useEffect } from "react";
import arrozImg from "../assets/arroz.png";
import feijaoImg from "../assets/feijao.png";
import macarraoImg from "../assets/macarrao.png";
import refrigeranteImg from "../assets/refrigerante.png";
import "../css/App.css";

export default function PDV() {
  const [codigo, setCodigo] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [totalRecebido, setTotalRecebido] = useState("");
  const [mostrarPagamento, setMostrarPagamento] = useState(false);
  const [mostrarComprovante, setMostrarComprovante] = useState(false);
  const [formaPagamento, setFormaPagamento] = useState("Dinheiro");

  const imagemCarrinho =
    "https://cdn-icons-png.flaticon.com/512/1170/1170678.png";

  const [imagemProduto, setImagemProduto] = useState(imagemCarrinho);

  const produtos = {
    "789001": { nome: "Arroz", preco: 20, imagem: arrozImg },
    "789002": { nome: "Macarrão", preco: 5, imagem: macarraoImg },
    "789003": { nome: "Feijão", preco: 8.5, imagem: feijaoImg },
    "789004": { nome: "Refrigerante", preco: 6, imagem: refrigeranteImg }
  };

  function adicionarItem() {
    if (!codigo || !produtos[codigo]) return;

    const produto = produtos[codigo];
    setImagemProduto(produto.imagem);

    const itemExistente = carrinho.find(
      (item) => item.codigo === codigo
    );

    if (itemExistente) {
      setCarrinho(
        carrinho.map((item) =>
          item.codigo === codigo
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          codigo,
          nome: produto.nome,
          quantidade: 1,
          preco: produto.preco
        }
      ]);
    }

    setCodigo("");
  }

  function cancelarUltimoItem() {
    setCarrinho(carrinho.slice(0, -1));
  }

  function cancelarVenda() {
    setCarrinho([]);
    setTotalRecebido("");
    setImagemProduto(imagemCarrinho);
    setMostrarPagamento(false);
    setMostrarComprovante(false);
  }

  function finalizarVenda() {
    if (carrinho.length === 0) return;
    setMostrarPagamento(true);
  }

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.key) {
        case "F2":
          e.preventDefault();
          cancelarUltimoItem();
          break;
        case "F3":
          e.preventDefault();
          finalizarVenda();
          break;
        case "F4":
          e.preventDefault();
          cancelarVenda();
          break;
        default:
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [carrinho]);

  const subtotal = carrinho.reduce(
    (acc, item) => acc + item.quantidade * item.preco,
    0
  );

  const troco =
    parseFloat(totalRecebido || 0) > subtotal
      ? parseFloat(totalRecebido) - subtotal
      : 0;

  return (
    <div className="pdv">
      <header className="topo">
        <div className="logo">SUPERMERCADO PDV</div>
        <div className="caixa-info">
          Caixa: 01 | Operador: João | Status: CAIXA ABERTO
        </div>
      </header>

      <div className="conteudo">
        <div className="painel-esquerdo">
          <div className="imagem-produto">
            <img src={imagemProduto} alt="Produto" />
          </div>

          <div className="campo">
            <input
              type="text"
              placeholder="Código do produto"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && adicionarItem()
              }
              className="input-codigo"
            />
            <br />
             <label>Valor Unitário</label>
             <input type="text" />
              <br />
            <label>Total do Item</label>
            <input type="text" />
              <br />
            <label>Quantidade</label>
            <input type="number" />
          </div>
        </div>

        <div className="lista-produtos">
          <div className="titulo-lista">
            LISTA DE PRODUTOS
          </div>

          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Descrição</th>
                <th>Qtd</th>
                <th>Vl. Unit</th>
                <th>Total</th>
              </tr>
            </thead>

            <tbody>
              {carrinho.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.codigo}</td>
                  <td>{item.nome}</td>
                  <td>{item.quantidade}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>
                    R$ {(item.quantidade * item.preco).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="resumo">
        <div className="bloco subtotal">
          SUBTOTAL
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className="bloco">
          TOTAL RECEBIDO
          <input
            type="number"
            value={totalRecebido}
            onChange={(e) =>
              setTotalRecebido(e.target.value)
            }
          />
        </div>

        <div className="bloco">
          TROCO
          <span>R$ {troco.toFixed(2)}</span>
        </div>

        <div className="forma-pagamento">
          <label>Forma de Pagamento</label>
          <select
            value={formaPagamento}
            onChange={(e) =>
              setFormaPagamento(e.target.value)
            }
          >
            <option>Dinheiro</option>
            <option>Cartão Crédito</option>
            <option>Cartão Débito</option>
            <option>Pix</option>
          </select>
        </div>
      </div>

      <footer className="atalhos">
        F2 - Cancelar Item | F3 - Finalizar Venda | F4 -
        Cancelar Venda
      </footer>

      {/* MODAL PAGAMENTO */}
      {mostrarPagamento && !mostrarComprovante && (
        <div className="modal">
          <div className="modal-conteudo">
            <h2>Pagamento - {formaPagamento}</h2>
            <p>Total: R$ {subtotal.toFixed(2)}</p>

            {(formaPagamento === "Cartão Crédito" ||
              formaPagamento === "Cartão Débito") && (
              <>
                <p>Aguardando confirmação da maquininha...</p>
                <button onClick={() => setMostrarComprovante(true)}>
                  Confirmar
                </button>
              </>
            )}

            {formaPagamento === "Pix" && (
              <>
                <p>Escaneie o QR Code:</p>
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PixFicticio123"
                  alt="QR Pix"
                />
                <br />
                <button onClick={() => setMostrarComprovante(true)}>
                  Confirmar
                </button>
              </>
            )}

            {formaPagamento === "Dinheiro" && (
              <>
                <p>Troco: R$ {troco.toFixed(2)}</p>
                <button onClick={() => setMostrarComprovante(true)}>
                  Confirmar
                </button>
              </>
            )}

            <button onClick={() => setMostrarPagamento(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* MODAL COMPROVANTE */}
 {mostrarComprovante && (
  <div className="modal-overlay">
    <div className="modal-comprovante">
      
      <h3>SUPERMERCADO BOA VISTA LTDA</h3>
      <p>CNPJ: 12.345.678/0001-99</p>
      <p>Data: {new Date().toLocaleDateString()}</p>
      <p>Hora: {new Date().toLocaleTimeString()}</p>
      <p>Forma de Pagamento: {formaPagamento}</p>
      <p>IE: 123.456.789.000</p>
      <p>Rua Jarborba Tucuruvi, 123 - Centro</p>
      <p>São Paulo - SP</p>
      <hr />
      <p>CUPOM FISCAL</p>
      <p>Data: {new Date().toLocaleDateString()}</p>
      <p>Hora: {new Date().toLocaleTimeString()}</p>
      <p>Operador: João</p>
      <p>Caixa: 01</p>
      <hr />
      {carrinho.map((item, index) => (
        <p key={index}>
          {item.nome} x{item.quantidade} - R$ {(item.quantidade * item.preco).toFixed(2)}
        </p>
      ))}

      <hr />
      <h4>Total: R$ {subtotal.toFixed(2)}</h4>

      <div className="botoes-comprovante">
        <button onClick={() => window.print()}>
          Imprimir
        </button>

        <button onClick={cancelarVenda}>
          Nova Venda
        </button>
      </div>

    </div>
  </div>
)}
    </div>
  );
}