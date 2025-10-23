import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para voltar

// Vamos re-utilizar os mesmos estilos do Login!
import '../styles/Login.css';
// E podemos adicionar estilos específicos se precisarmos
import '../styles/Cadastro.css';

function Cadastro() {
    
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);

    return (
        <div className="login-card"> {/* Re-utilizando a classe do Login */}
            <form className="login-form"> {/* Re-utilizando a classe do Login */}
                
                <h1>Cadastro</h1>
                <p className="subtitulo">Crie sua conta para continuar.</p>

                <div className="input-group">
                    <label htmlFor="nome">Nome completo</label>
                    <div className="input-field">
                        <input type="text" id="nome" name="nome" required />
                        <i className="fa-solid fa-user icon"></i>
                    </div>
                </div>

                {/* --- MUDANÇA AQUI --- */}
                <div className="input-group">
                    <label htmlFor="cpf">CPF</label>
                    <div className="input-field">
                        <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00" />
                        <i className="fa-solid fa-id-card icon"></i>
                    </div>
                </div>
                {/* --- FIM DA MUDANÇA --- */}

                <div className="input-group">
                    <label htmlFor="senha">Criar Senha</label>
                    <div className="input-field">
                        <input 
                            type={senhaVisivel ? "text" : "password"} 
                            id="senha" 
                            name="senha" 
                            required 
                        />
                        <i 
                            className={senhaVisivel ? "fa-solid fa-eye-slash icon" : "fa-solid fa-eye icon"}
                            onClick={() => setSenhaVisivel(!senhaVisivel)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                </div>

                <div className="input-group">
                    <label htmlFor="confirmaSenha">Confirmar Senha</label>
                    <div className="input-field">
                        <input 
                            type={confirmaSenhaVisivel ? "text" : "password"} 
                            id="confirmaSenha" 
                            name="confirmaSenha" 
                            required 
                        />
                        <i 
                            className={confirmaSenhaVisivel ? "fa-solid fa-eye-slash icon" : "fa-solid fa-eye icon"}
                            onClick={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                </div>

                <button type="submit" className="btn-entrar">CADASTRAR</button>

                <p className="link-cadastro">
                    Já tem uma conta? <Link to="/">Faça login aqui</Link>
                </p>

            </form>
        </div>
    );
}

export default Cadastro;