import "./css/App.css";

function App() {
  return (
    <div className="pdv">

      {/* TOPO */}
      <header className="topo">
        <div className="logo">SUPERMERCADO PDV</div>
        <div className="caixa-info">
          Caixa: 01 | Operador: João | Status: CAIXA ABERTO
        </div>
      </header>

      <div className="conteudo">

        {/* COLUNA ESQUERDA */}
        <div className="painel-esquerdo">

          <div className="imagem-produto">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1170/1170678.png"
              alt="Produto"
            />
          </div>

          <div className="campo">
            <label>Código de Barras</label>
            <input type="text" placeholder="Digite ou escaneie..." />
          </div>

          <div className="campo">
            <label>Valor Unitário</label>
            <input type="text" value="R$ 0,00" readOnly />
          </div>

          <div className="campo destaque">
            <label>Total do Item</label>
            <input type="text" value="R$ 0,00" readOnly />
          </div>

        </div>

        {/* LISTA CENTRAL */}
        <div className="lista-produtos">

          <div className="titulo-lista">LISTA DE PRODUTOS</div>

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
              <tr>
                <td>1</td>
                <td>789001</td>
                <td>Arroz</td>
                <td>1</td>
                <td>20,00</td>
                <td>20,00</td>
              </tr>
              <tr>
                <td>2</td>
                <td>789002</td>
                <td>Macarrão</td>
                <td>2</td>
                <td>5,00</td>
                <td>10,00</td>
              </tr>
            </tbody>
          </table>

        </div>

      </div>

      {/* PARTE INFERIOR */}
      <div className="resumo">

        <div className="bloco subtotal">
          SUBTOTAL
          <span>R$ 30,00</span>
        </div>

        <div className="bloco">
          TOTAL RECEBIDO
          <span>R$ 0,00</span>
        </div>

        <div className="bloco">
          TROCO
          <span>R$ 0,00</span>
        </div>

        <div className="forma-pagamento">
          <label>Forma de Pagamento</label>
          <select>
            <option>Dinheiro</option>
            <option>Cartão Crédito</option>
            <option>Cartão Débito</option>
            <option>PIX</option>
          </select>
        </div>

      </div>

      {/* TECLAS DE ATALHO */}
      <footer className="atalhos">
        F1 - Novo Item |
        F2 - Cancelar Item |
        F3 - Finalizar Venda |
        F4 - Cancelar Venda |
        ESC - Sair
      </footer>

    </div>
  );
}

export default App;