import { Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Cadastro from './components/Cadastro.jsx' // Importar o novo componente

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
    </Routes>
  );
}

export default App;