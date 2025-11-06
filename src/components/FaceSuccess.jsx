import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Vamos re-utilizar o fundo e o cartão do Login
import '../styles/Login.css';
// E adicionar os estilos específicos desta tela
import '../styles/FaceSuccess.css';

function FaceSuccess() {
    const navigate = useNavigate();

    function handleEntrar() {
        // Esta função levará o utilizador para a tela principal (ex: /home)
        // Lembre-se, /login é onde o login *real* está
        // e / é onde esta tela de sucesso está (temporariamente)
        navigate('/login'); 
    }

    return (
        // Reutilizamos o .login-card para manter o mesmo visual
        <div className="login-card"> 
            <form className="login-form">
                
                <h1 className="faceid-title">Face ID</h1>

                {/* O container de sucesso (ícone e texto) */}
                <div className="faceid-success-container">
                    <i className="fa-solid fa-circle-check face-icon-success"></i>
                    <p className="faceid-success-message">Rosto reconhecido!</p>
                </div>

                {/* Botão "ENTRAR" que chama a função handleEntrar */}
                <button 
                    type="button" 
                    className="btn-faceid-entrar" 
                    onClick={handleEntrar}
                >
                    ENTRAR
                </button>

                {/* O link "Não é você?" foi removido, como na imagem */}

            </form>
        </div>
    );
}

export default FaceSuccess;