import "../css/BarraBusca.css";

export default function BarraBusca({ busca, setBusca }) {
  return (
    <input
      className="busca"
      type="text"
      value={busca}
      onChange={(e) => setBusca(e.target.value)}
      placeholder="Buscar produto..."
    />
  );
}