import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CarrinhoProvider } from "./context/CarrinhoContext";
import './css/index.css'
import App from './App.jsx'
import BarraBusca from './components/BarraBusca.jsx'

createRoot(document.getElementById('root')).render(
 <CarrinhoProvider>
  <App />
</CarrinhoProvider>
)
