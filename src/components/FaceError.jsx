import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Reutiliza o estilo do Login para o cartão e botões
import '../styles/Login.css';
// Adiciona os estilos específicos desta tela
import '../styles/FaceError.css';

function FaceError() {
    const navigate = useNavigate();

    function handleTentarNovamente() {
        // No futuro, isto reiniciaria o scan.
        // Por agora, volta para a tela de login real (que está em /login)
        navigate('/login'); 
    }

    return (
        // Reutilizamos o .login-card para manter o mesmo visual
        <div className="login-card"> 
            <form className="login-form">
                
                <h1 className="faceid-title">Face ID</h1>

                {/* O container de erro (ícone e texto) */}
                <div className="faceid-error-container">
                    <i className="fa-solid fa-face-frown-open face-icon-error"></i>
                    <p className="faceid-error-message">Rosto não reconhecido</p>
                </div>

                {/* Botão "TENTAR NOVAMENTE" (reutilizando estilos do Login.css) */}
                <button 
                    type="button" 
                    className="btn-opcao btn-voltar btn-faceid-voltar" 
                    onClick={handleTentarNovamente}
                >
                    TENTAR NOVAMENTE
                </button>

                {/* O link "Tentar de outra forma" */}
                <p className="link-cadastro link-tentar-outra-forma">
                    Não é você? <Link to="/login">Tentar de outra forma</Link>
                </p>

            </form>
        </div>
    );
}

export default FaceError;