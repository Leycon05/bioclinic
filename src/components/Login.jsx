import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import '../styles/SharedBackground.css';
import '../styles/Login.css';
import { login, loginFace, getFaceDescriptor } from '../services/authService';

const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    return true;
};

function Login() {
    const navigate = useNavigate();
    
    // Estados de Dados
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');
    
    // Estados de Fluxo
    // 'padrao': Nome + Senha
    // 'cpf_facial': Apenas Input CPF (Preparo para FaceID)
    // 'faceid': Câmera ligada
    const [metodoLogin, setMetodoLogin] = useState('padrao'); 
    
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [mensagem, setMensagem] = useState('');
    const [statusFaceID, setStatusFaceID] = useState('');
    
    // Câmera e IA
    const [modelsLoaded, setModelsLoaded] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    // 1. Carregar Modelos
    useEffect(() => {
        const loadModels = async () => {
            const MODEL_URL = '/models';
            try {
                await Promise.all([
                    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)
                ]);
                setModelsLoaded(true);
            } catch (error) {
                console.error("Erro FaceAPI:", error);
            }
        };
        loadModels();
    }, []);

    // 2. Controle da Câmera (Só liga se metodoLogin for 'faceid')
    useEffect(() => {
        const startCamera = async () => {
            if (modelsLoaded && !cameraStream) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setCameraStream(stream);
                } catch (err) {
                    setMensagem("Erro ao abrir câmera.");
                    setMetodoLogin('cpf_facial'); // Volta para o input de CPF se falhar
                }
            }
        };
        const stopCamera = () => {
            if (cameraStream) {
                cameraStream.getTracks().forEach(track => track.stop());
                setCameraStream(null);
            }
        };

        if (metodoLogin === 'faceid') startCamera();
        else stopCamera();

        return () => { if (cameraStream) cameraStream.getTracks().forEach(track => track.stop()); };
    }, [metodoLogin, modelsLoaded]);

    useEffect(() => {
        if (cameraStream && videoRef.current) videoRef.current.srcObject = cameraStream;
    }, [cameraStream]);

    // --- AÇÕES ---

    const handleCpfChange = (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);
        if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
        else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        else if (v.length > 3) v = v.replace(/(\d{3})(\d+)/, '$1.$2');
        setCpf(v);
        setMensagem('');
    };

    // 1. Ao clicar no botão "FaceID" na tela inicial
    const selecionarModoFacial = () => {
        setMensagem('');
        setNome(''); 
        setSenha('');
        setMetodoLogin('cpf_facial'); // Vai para tela de CPF apenas
    };

    // 2. Ao clicar em "Escanear Rosto" (após digitar CPF)
    const iniciarEscaneamento = () => {
        const cpfLimpo = cpf.replace(/[^\d]+/g, '');
        
        if (!validarCPF(cpfLimpo)) {
            setMensagem('CPF inválido. Corrija para prosseguir.');
            return;
        }

        if (!modelsLoaded) {
            setMensagem('Sistema carregando, aguarde um momento...');
            return;
        }

        // Tudo ok, liga a câmera
        setMetodoLogin('faceid');
        setStatusFaceID('Posicione o rosto...');
    };

    // 3. Submit do Login Padrão (Nome + Senha)
    const handleLoginPadrao = async (e) => {
        e.preventDefault();
        setMensagem('');
        
        if (!nome.trim()) { setMensagem('Nome completo.'); return; }
        if (senha.length < 6) { setMensagem('No mínimo 6 caracteres.'); return; }

        try {
            const response = await login({ usuario: nome, senha });
            localStorage.setItem('token', response.token);
            navigate('/perfil');
        } catch (err) {
            setMensagem("Nome ou senha inválidos" || "Erro ao logar.");
        }
    };

    // Botão Voltar (reseta para Login Padrão)
    const voltarParaPadrao = () => {
        setMetodoLogin('padrao');
        setMensagem('');
        setStatusFaceID('');
    };

    return (
        <div className="background-container">
            <div className="login-card">
                {/* Usamos onSubmit apenas no modo padrão. Nos outros, usamos botões normais */}
                <form className="login-form" onSubmit={metodoLogin === 'padrao' ? handleLoginPadrao : (e) => e.preventDefault()}>

                    {/* --- CABEÇALHO --- */}
                    {metodoLogin !== 'faceid' && (
                        <>
                            <h1>Login</h1>
                            <p className="subtitulo">
                                {metodoLogin === 'cpf_facial' ? 'Identificação Facial' : 'Bem-vindo de volta'}
                            </p>
                        </>
                    )}

                    {mensagem && <p className="mensagem-alerta">{mensagem}</p>}
                    {statusFaceID && <p className="mensagem-sucesso">{statusFaceID}</p>}

                    {/* --- CAMPO NOME (Só no modo Padrão) --- */}
                    {metodoLogin === 'padrao' && (
                        <div className="input-group">
                            <label>Nome Completo</label>
                            <div className="input-field">
                                <input 
                                    type="text" placeholder="Digite seu nome"
                                    value={nome} onChange={e => setNome(e.target.value)}
                                />
                                <i className="fa-solid fa-user icon"></i>
                            </div>
                        </div>
                    )}

                    {/* --- CAMPO SENHA (Só no modo Padrão) --- */}
                    {metodoLogin === 'padrao' && (
                        <div className="input-group">
                            <label>Senha</label>
                            <div className="input-field">
                                <input 
                                    type={senhaVisivel ? "text" : "password"}
                                    value={senha} onChange={e => setSenha(e.target.value)}
                                />
                                <i 
                                    className={senhaVisivel ? "fa-solid fa-eye-slash icon" : "fa-solid fa-eye icon"}
                                    onClick={() => setSenhaVisivel(!senhaVisivel)}
                                    style={{cursor:'pointer'}}
                                ></i>
                            </div>
                        </div>
                    )}

                    {/* --- CAMPO CPF (Aparece no modo 'cpf_facial' - SEM SENHA) --- */}
                    {metodoLogin === 'cpf_facial' && (
                        <div className="input-group">
                            <label>Informe seu CPF para reconhecimento</label>
                            <div className="input-field">
                                <input 
                                    type="number" placeholder="000.000.000-00"
                                    value={cpf} onChange={handleCpfChange}
                                    autoFocus
                                />
                                <i className="fa-solid fa-id-card icon"></i>
                            </div>
                        </div>
                    )}

                    {/* --- CÂMERA (Modo 'faceid') --- */}
                    {metodoLogin === 'faceid' && (
                        <div className="scan-placeholder">
                            {cameraStream ? (
                                <video ref={videoRef} autoPlay playsInline muted className="camera-feed" />
                            ) : (
                                <span className="camera-text">Ligando câmera...</span>
                            )}
                            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
                            
                            <button type="button" className="btn-opcao btn-voltar btn-faceid-voltar" 
                                onClick={() => setMetodoLogin('cpf_facial')}>
                                Cancelar
                            </button>
                        </div>
                    )}

                    {/* --- ÁREA DE BOTÕES INFERIORES --- */}
                    
                    {/* 1. Botões do Modo Padrão (Nome/Senha) */}
                    {metodoLogin === 'padrao' && (
                        <div className="opcoes-entrada">
                            <div className="botoes-opcoes">
                                <button 
                                    type="button" 
                                    className="btn-opcao" 
                                    onClick={selecionarModoFacial}
                                >
                                    <i className="fa-solid fa-face-viewfinder"></i> FaceID
                                </button>

                                <button 
                                    type="submit" 
                                    className="btn-opcao" 
                                >
                                    ENTRAR
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 2. Botões do Modo CPF Facial (Só CPF, Sem Senha) */}
                    {metodoLogin === 'cpf_facial' && (
                        <div className="opcoes-entrada">
                            <button 
                                type="button" 
                                className="btn-opcao" 
                                onClick={iniciarEscaneamento}
                                style={{ width: '100%', marginBottom: '10px' }}
                            >
                                ESCANEAR ROSTO <i className="fa-solid fa-camera"></i>
                            </button>

                            <p 
                                style={{cursor:'pointer', color:'#630527', fontSize:'13px', textAlign:'center'}} 
                                onClick={voltarParaPadrao}
                            >
                                <i className="fa-solid fa-arrow-left"></i> Voltar para Login com Senha
                            </p>
                        </div>
                    )}

                    <p className="link-cadastro">
                        Não tem login? <Link to="/cadastro">Cadastre-se</Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Login;