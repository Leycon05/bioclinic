import { Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Cadastro from './components/Cadastro.jsx' // Importar a nova tela

function App() {
  return (
    <Routes>
      {/* A URL "/" (raiz) mostra a tela de Login */}
      <Route path="/" element={<Login />} /> 
      
      {/* A URL "/cadastro" mostra a tela de Cadastro */}
      <Route path="/cadastro" element={<Cadastro />} /> 
    </Routes>
  );
}

export default App;