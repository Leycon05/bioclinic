import { Link } from 'react-router-dom';      // Para o link "Cadastre-se"
import InputMask from 'react-input-mask';   // Para a máscara de CPF
import React, { useState } from 'react';

import '../styles/Login.css';

function Login() {
    
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [metodoLogin, setMetodoLogin] = useState('padrao'); 
    
    // Estados para os campos
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    
    // Estado para a mensagem de alerta
    const [mensagem, setMensagem] = useState('');

    function toggleVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel); 
    }

    function handleLoginSubmit(event) {
        event.preventDefault(); 
        setMensagem(''); // Limpa mensagens antigas
        
        if (metodoLogin === 'padrao') {
            console.log("A tentar logar com Nome/Senha...");
            // Simulação de erro:
            if (nome === '' || senha === '') {
                setMensagem('Erro: Preencha todos os campos.');
            } else if (senha.length < 6) {
                 setMensagem('Erro: A senha deve ter no mínimo 6 caracteres.');
            } else {
                setMensagem('Erro: Nome de usuário ou senha inválidos.');
            }
        } else if (metodoLogin === 'cpf') {
            console.log("A tentar logar com CPF:", cpf);
            setMensagem('Erro: CPF não encontrado.');
        } else if (metodoLogin === 'faceid') {
            console.log("A tentar logar com FaceID...");
            setMensagem('Erro: Rosto não reconhecido.');
        }
    }

    // Função para limpar a mensagem ao trocar de método
    function mudarMetodo(novoMetodo) {
        setMetodoLogin(novoMetodo);
        setMensagem(''); 
    }

    return (
        <div className="login-card">
            <form className="login-form" onSubmit={handleLoginSubmit}>
                
                {/* Título e Subtítulo (escondidos no modo FaceID) */}
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
                                <input 
                                    type="text" id="nome" name="nome" required 
                                    value={nome} 
                                    onChange={(e) => setNome(e.target.value)} 
                                />
                                <i className="fa-solid fa-user icon"></i>
                            </div>
                        </div>

                        <div className="input-group">
                            <label htmlFor="senha">Senha</label>
                            <div className="input-field">
                                <input 
                                    type={senhaVisivel ? "text" : "password"} 
                                    id="senha" name="senha" required minLength="6"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
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

                {/* --- MODO CPF (com Máscara) --- */}
                {metodoLogin === 'cpf' && (
                    <div className="input-group">
                        <label htmlFor="cpf">CPF</label>
                        <div className="input-field">
                            <InputMask 
                                mask="999.999.999-99" 
                                maskChar={null}
                                id="cpf" name="cpf" required 
                                placeholder="000.000.000-00"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <i className="fa-solid fa-id-card icon"></i>
                        </div>
                    </div>
                )}

                {/* --- MODO FACEID (Tela Limpa) --- */}
                {metodoLogin === 'faceid' && (
                    <div className="scan-placeholder">
                        <span className="camera-text">CÂMERA</span>
                    </div>
                )}
                
                {/* Bloco da Mensagem de Alerta */}
                {mensagem && (
                    <p className="mensagem-alerta">{mensagem}</p>
                )}

                {/* Botões (escondidos no modo FaceID) */}
                {metodoLogin !== 'faceid' && (
                    <>
                        <div className="opcoes-entrada">
                            <p>Opções de entrada:</p>
                            <div className="botoes-opcoes">
                                <button type="button" className="btn-opcao" onClick={() => mudarMetodo('faceid')}>
                                    FaceID
                                </button>
                                {metodoLogin !== 'cpf' && (
                                    <button type="button" className="btn-opcao" onClick={() => mudarMetodo('cpf')}>
                                        CPF
                                    </button>
                                )}
                                {metodoLogin === 'cpf' && (
                                    <button type="button" className="btn-opcao btn-voltar" onClick={() => mudarMetodo('padrao')}>
                                        Nome/Senha
                                    </button>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="btn-entrar">ENTRAR</button>

                        <p className="link-cadastro">
                            Não tem login? <Link to="/cadastro">Cadastre-se aqui</Link>
                        </p>
                    </>
                )}
                
                {/* Botão de "Voltar" específico do FaceID */}
                {metodoLogin === 'faceid' && (
                    <button type="button" className="btn-opcao btn-voltar btn-faceid-voltar" onClick={() => mudarMetodo('padrao')}>
                        Voltar
                    </button>
                )}

            </form>
        </div>
    );
}

export default Login;