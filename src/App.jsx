import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import Cadastro from './components/Cadastro.jsx';
import FaceSuccess from './components/FaceSuccess.jsx';
import FaceError from './components/FaceError.jsx';
import PermissaoLocalizacao from './components/PermissaoLocalizacao.jsx';
import RoutesList from './components/RoutesList.jsx';
import SobreAClinicaServicos from './components/SobreAClinicaServicos.jsx';

// Nossas importações de rota protegida
import Perfil from './components/Perfil.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Logado from './components/Logado.jsx'; // <-- 1. Importar o novo componente

function App() {
  return (
    <Routes>
      {/* --- Rotas Públicas --- */}
      <Route path="/" element={<Navigate to="/routes-list" />} /> 
      <Route path="/login" element={<Login />} /> 
      <Route path="/cadastro" element={<Cadastro />} /> 
      <Route path="/face-sucesso" element={<FaceSuccess />} /> 
      <Route path="/face-erro" element={<FaceError />} />
      <Route path="/permissao-localizacao" element={<PermissaoLocalizacao />} />
      <Route path="/routes-list" element={<RoutesList />} />
      <Route path="/sobre-a-clinica-servicos" element={<SobreAClinicaServicos />} />
      <Route path="/perfil" element={<Perfil />} />

      {/* --- Rotas Protegidas --- */}
      {/* <Route 
        path="/perfil" 
        element={
          <PrivateRoute>
            <Perfil />
          </PrivateRoute>
        } 
      // />

      // <Route 
      //   path="/logado" 
      //   element={
      //     <PrivateRoute>
      //       <Logado />
      //     </PrivateRoute>
      //   } 
      // /> */}
      
    </Routes>
  );
}

export default App;