import "../css/BarraBusca.css";

export default function BarraCodigo({ codigo, setCodigo, onAdicionar }) {
  return (
    <div className="barra-codigo">
      <input
        type="text"
        placeholder="Código do produto"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
      />
      <button onClick={onAdicionar}>Adicionar</button>
    </div>
  );
}