import React from 'react';
import { Link } from 'react-router-dom';

function RoutesList() {
    const routes = [
        { path: '/login', name: 'Login (Alias)' },
        { path: '/cadastro', name: 'Cadastro' },
        { path: '/face-sucesso', name: 'FaceID Sucesso' },
        { path: '/face-erro', name: 'FaceID Erro' },
        { path: '/permissao-localizacao', name: 'Permissão Localização' },
    ];

    return (
        <div style={{ 
            padding: '20px', 
            fontFamily: 'Arial, sans-serif', 
            backgroundColor: 'black', 
            color: 'white', 
            minHeight: '100vh', 
            width: '100vw', /* Garante que ocupe a largura total da viewport */
            position: 'fixed', /* Fixa na viewport */
            top: 0,
            left: 0,
            zIndex: 9999 /* Garante que fique acima de tudo */
        }}>
            <h1>Lista de Rotas</h1>
            <p>Clique para navegar:</p>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {routes.map((route, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <Link to={route.path} style={{ 
                            textDecoration: 'none', 
                            color: '#007bff', 
                            fontSize: '18px',
                            fontWeight: 'bold'
                        }}>
                            {route.name} ({route.path})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoutesList;
