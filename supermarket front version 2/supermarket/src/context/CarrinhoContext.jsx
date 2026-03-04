import { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

  function adicionarProduto(produto) {
    setCarrinho(prev => {
      const existente = prev.find(p => p.codigo === produto.codigo);

      if (existente) {
        return prev.map(p =>
          p.codigo === produto.codigo
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      }

      return [...prev, { ...produto, quantidade: 1 }];
    });
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  function removerProduto(codigo) {
    setCarrinho(prev =>
      prev.filter(p => p.codigo !== codigo)
    );
  }

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarProduto,
        limparCarrinho,
        removerProduto
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  return useContext(CarrinhoContext);
}