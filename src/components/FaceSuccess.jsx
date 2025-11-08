import React from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Não precisa mais de Link ou useNavigate
import CheckmarkSVG from '../assets/imagens/Checkmark.svg'; // Importa o SVG

// Vamos re-utilizar o fundo e o cartão do Login
import '../styles/Login.css';
// E adicionar os estilos específicos desta tela
import '../styles/FaceSuccess.css';

function FaceSuccess() {
    // const navigate = useNavigate(); // Não precisa mais de navigate

    // function handleEntrar() {
    //     // Esta função levará o utilizador para a tela principal (ex: /home)
    //     // Lembre-se, /login é onde o login *real* está
    //     // e / é onde esta tela de sucesso está (temporariamente)
    //     navigate('/login'); 
    // }

    return (
        // Reutilizamos o .login-card para manter o mesmo visual
        <div className="face-success-card"> 
            <form className="login-form">
                
                {/* O container de sucesso (ícone e texto) */}
                <div className="faceid-success-container">
                    <img src={CheckmarkSVG} alt="Checkmark" className="face-icon-success" />
                    <p className="faceid-success-message">FaceID identificado com sucesso!</p>
                </div>

            </form>
        </div>
    );
}

export default FaceSuccess;