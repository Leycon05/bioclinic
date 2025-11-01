import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import '../styles/Login.css';
import * as faceapi from 'face-api.js';

function Login() {
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [metodoLogin, setMetodoLogin] = useState('padrao');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [faceIdStatus, setFaceIdStatus] = useState('Aguardando');
    const videoRef = useRef(null); 
    const canvasRef = useRef(null); 
    const intervalRef = useRef(null); 

    function toggleVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel);
    }

    // (O seu código de validação de CPF e FaceID permanece igual)
    function validarCpf(cpf) {
        // ... (seu código de validação)
    }
    async function autenticarFaceID() {
        // ... (seu código de Face ID)
    }
    const loadModels = () => {
         // ... (seu código de Face ID)
    };
    const startVideo = () => {
         // ... (seu código de Face ID)
    };
    const handlePlay = () => {
         // ... (seu código de Face ID)
    };
    useEffect(() => {
         // ... (seu código de Face ID)
    }, []);
     useEffect(() => {
         // ... (seu código de Face ID)
    }, [metodoLogin]);


    // --- MUDANÇA 1: ATIVAR ALERTAS NO SUBMIT ---
    function handleLoginSubmit(event) {
        event.preventDefault();
        setMensagem(''); // Limpa mensagens antigas

        if (metodoLogin === 'padrao') {
            console.log("A tentar logar com Nome/Senha...");
            if (nome === '' || senha === '') {
                setMensagem('Erro: Preencha todos os campos.');
            } else if (senha.length < 6) {
                 setMensagem('Erro: A senha deve ter no mínimo 6 caracteres.');
            } else {
                setMensagem('Erro: Nome de usuário ou senha inválidos.');
            }
        
        } else if (metodoLogin === 'cpf') {
            console.log("A tentar logar com CPF:", cpf);
            if (cpf.includes('_') || cpf === '') {
                 setMensagem('Erro: Por favor, preencha um CPF válido.');
            } else {
                setMensagem('Erro: CPF não encontrado.');
            }

        } else if (metodoLogin === 'faceid') {
            console.log("A tentar logar com FaceID...");
            // A sua lógica de 'autenticarFaceID' deve tratar o 'setMensagem'
            autenticarFaceID();
        }
    }

    // --- MUDANÇA 2: FUNÇÃO PARA LIMPAR ALERTAS AO MUDAR DE MÉTODO ---
    function mudarMetodo(novoMetodo) {
        setMetodoLogin(novoMetodo);
        setMensagem(''); // Limpa qualquer alerta ao trocar de método
        
        // Se o novo método for FaceID, inicia a câmera
        if (novoMetodo === 'faceid') {
            startVideo();
        } else {
            // Se for outro método, para o vídeo (se estiver a ser executado)
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        }
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
                            {/* O seu Login.jsx já tinha esta máscara, o que é ótimo! */}
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

                {/* --- MODO FACEID (Tela Limpa com Câmera) --- */}
                {metodoLogin === 'faceid' && (
                    <div className="scan-placeholder" style={{ position: 'relative' }}>
                        {/* A sua lógica de vídeo/canvas do Face ID */}
                        <video ref={videoRef} id="video" width="230" height="230" autoPlay muted playsInline></video>
                        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
                        <span className="camera-text">{faceIdStatus}</span>
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
                            {/* --- MUDANÇA 3: Usar 'mudarMetodo' nos onClick --- */}
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