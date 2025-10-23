// 1. Importar o Link do React Router
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

// Importa o CSS da sua pasta de estilos
import '../styles/Login.css';

function Login() {
    
    // "Estado" para controlar a visibilidade da senha
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    // "Estado" para controlar qual formulário mostrar
    const [metodoLogin, setMetodoLogin] = useState('padrao'); // 'padrao', 'cpf', 'faceid'

    // Função para ser chamada no clique do ícone
    function toggleVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel); // Inverte o valor (true/false)
    }

    // Função para lidar com o envio do formulário (impede recarregar a pág)
    function handleLoginSubmit(event) {
        event.preventDefault(); 
        
        if (metodoLogin === 'padrao') {
            console.log("A tentar logar com Nome/Senha...");
        } else if (metodoLogin === 'cpf') {
            console.log("A tentar logar com CPF...");
        } else if (metodoLogin === 'faceid') {
            console.log("A tentar logar com FaceID...");
        }
    }

    return (
        <div className="login-card">
            {/* O formulário agora usa a função handleLoginSubmit */}
            <form className="login-form" onSubmit={handleLoginSubmit}>
                
                {/* O título e o subtítulo agora são escondidos no modo FaceID */}
                {metodoLogin !== 'faceid' && (
                    <>
                        <h1>Login</h1>
                        <p className="subtitulo">Preencha seus dados para acessar.</p>
                    </>
                )}

                {/* --- MODO PADRÃO (Nome/Senha) --- */}
                {metodoLogin === 'padrao' && (
                    <> 
                        <div className="input-group">
                            <label htmlFor="nome">Nome completo</label>
                            <div className="input-field">
                                <input type="text" id="nome" name="nome" required />
                                <i className="fa-solid fa-user icon"></i>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="senha">Senha</label>
                            <div className="input-field">
                                <input 
                                    type={senhaVisivel ? "text" : "password"} 
                                    id="senha" 
                                    name="senha" 
                                    required 
                                />
                                <i 
                                    className={senhaVisivel ? "fa-solid fa-eye-slash icon" : "fa-solid fa-eye icon"}
                                    id="toggle-senha"
                                    onClick={toggleVisibilidadeSenha}
                                ></i>
                            </div>
                            <a href="#" className="esqueci-senha">Esqueci minha senha</a>
                        </div>
                    </>
                )}

                {/* --- MODO CPF --- */}
                {metodoLogin === 'cpf' && (
                    <div className="input-group">
                        <label htmlFor="cpf">CPF</label>
                        <div className="input-field">
                            <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00" />
                            <i className="fa-solid fa-id-card icon"></i>
                        </div>
                    </div>
                )}

                {/* --- MODO FACEID --- */}
                {metodoLogin === 'faceid' && (
                    <div className="scan-placeholder">
                        <span className="camera-text">CÂMERA</span>
                    </div>
                )}
                
                {/* Esta secção inteira é escondida no modo FaceID */}
                {metodoLogin !== 'faceid' && (
                    <>
                        <div className="opcoes-entrada">
                            <p>Opções de entrada:</p>
                            <div className="botoes-opcoes">
                                
                                {/* Mostra "FaceID" */}
                                <button type="button" className="btn-opcao" onClick={() => setMetodoLogin('faceid')}>
                                    FaceID
                                </button>

                                {/* Mostra "CPF" se o método NÃO for 'cpf' */}
                                {metodoLogin !== 'cpf' && (
                                    <button type="button" className="btn-opcao" onClick={() => setMetodoLogin('cpf')}>
                                        CPF
                                    </button>
                                )}
                                
                                {/* Mostra "Voltar" (para Nome/Senha) se estivermos no modo CPF */}
                                {metodoLogin === 'cpf' && (
                                    <button type="button" className="btn-opcao btn-voltar" onClick={() => setMetodoLogin('padrao')}>
                                        Nome/Senha
                                    </button>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn-entrar">ENTRAR</button>

                        {/* 2. MUDANÇA: <a href> trocado por <Link to> */}
                        <p className="link-cadastro">
                            Não tem login? <Link to="/cadastro">Cadastre-se aqui</Link>
                        </p>
                    </>
                )}
                
                {/* Botão de "Voltar" específico para o modo FaceID */}
                {metodoLogin === 'faceid' && (
                    <button type="button" className="btn-opcao btn-voltar btn-faceid-voltar" onClick={() => setMetodoLogin('padrao')}>
                        Voltar
                    </button>
                )}

            </form>
        </div>
    );
}

export default Login;