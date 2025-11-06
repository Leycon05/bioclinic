import { Routes, Route } from 'react-router-dom'
import Login from './components/Login.jsx'
import Cadastro from './components/Cadastro.jsx' // Importar a nova tela
import FaceSuccess from './components/FaceSuccess.jsx' // 1. Importar a nova tela
import FaceError from './components/FaceError.jsx' // 1. Importar a nova tela
import PermissaoLocalizacao from './components/PermissaoLocalizacao.jsx' // 1. Importar a nova tela

function App() {
  return (
    <Routes>
      {/* A URL "/" (raiz) mostra a tela de Login */}
      <Route path="/" element={<Login />} /> 
     <Route path="/login" element={<Login />} /> 

      
      {/* A URL "/cadastro" mostra a tela de Cadastro */}
      <Route path="/cadastro" element={<Cadastro />} /> 
    {/* 2. Adicionar a nova rota de sucesso */}
      <Route path="/face-sucesso" element={<FaceSuccess />} /> 

      <Route path="/face-erro" element={<FaceError />} />

      <Route path="/permissao-localizacao" element={<PermissaoLocalizacao />} />
    </Routes>
  );
}

export default App;