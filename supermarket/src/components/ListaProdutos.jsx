export default function ListaProdutos({ produtos, onAdicionar }) {
  return (
    <div>
      <h2>Produtos</h2>

      {produtos.length === 0 ? (
        <p>Nenhum produto encontrado</p>
      ) : (
        produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco.toFixed(2)}</p>

            <button onClick={() => onAdicionar(produto)}>
              Adicionar
            </button>
          </div>
        ))
      )}
    </div>
  );
}