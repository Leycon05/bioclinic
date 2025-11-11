// 1. Importar o Link do React Router
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import * as faceapi from 'face-api.js'; // Importa a biblioteca face-api.js
import '../styles/SharedBackground.css'; // Importar o novo arquivo de fundo compartilhado

// Função para validar CPF
const validarCPF = (cpf) => {
    cpf = cpf.replace(/[.\\-\s]/g, ''); // Remove pontos, traços e espaços

    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
        return false;
    }

    // Verifica CPFs com todos os dígitos iguais
    if (/^(\d)\\1{10}$/.test(cpf)) {
        return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
};

// Importa o CSS da sua pasta de estilos
import '../styles/Login.css';

function Login() {
    
    // "Estado" para controlar a visibilidade da senha
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    // "Estado" para controlar qual formulário mostrar
    const [metodoLogin, setMetodoLogin] = useState('padrao'); // 'padrao', 'cpf', 'faceid'
    const [cpf, setCpf] = useState('');
    const [cpfInvalido, setCpfInvalido] = useState(false);
    const [faceIdReconhecido, setFaceIdReconhecido] = useState(false);
    const [cameraStream, setCameraStream] = useState(null); // Novo estado para o stream da câmera
    const videoRef = useRef(null); // Referência para o elemento de vídeo
    const canvasRef = useRef(null); // Referência para o elemento canvas
    const [modelsLoaded, setModelsLoaded] = useState(false); // Novo estado para rastrear o carregamento dos modelos

    // Efeito para gerenciar o acesso à câmera
    useEffect(() => {
        console.log("useEffect para câmera/FaceID ativado. MetodoLogin:", metodoLogin);
        async function startCamera() {
            console.log("Tentando iniciar a câmera para FaceID. modelsLoaded:", modelsLoaded);
            if (metodoLogin === 'faceid' && modelsLoaded) {
                try {
                    console.log("Chamando navigator.mediaDevices.getUserMedia...");
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setCameraStream(stream);
                    console.log("Stream da câmera obtido.", stream);
                    if (videoRef.current) {
                        console.log("videoRef.current está disponível. Atribuindo srcObject.");
                        videoRef.current.srcObject = stream;
                        console.log("Stream da câmera atribuído ao elemento de vídeo.");
                    } else {
                        console.log("videoRef.current NÃO disponível ao tentar atribuir stream.");
                    }
                } catch (err) {
                    console.error("Erro ao acessar a câmera: ", err);
                    alert("Não foi possível acessar a câmera para FaceID. Por favor, verifique as permissões.");
                }
            } else if (metodoLogin !== 'faceid' && cameraStream) {
                console.log("Parando stream da câmera (mudança de método).");
                cameraStream.getTracks().forEach(track => track.stop());
                setCameraStream(null);
                setFaceIdReconhecido(false); 
            }
        }

        // Iniciar ou parar a câmera baseando-se no metodoLogin e modelsLoaded
        if (metodoLogin === 'faceid' && modelsLoaded) {
            if (!cameraStream) { // Só inicia se não houver um stream ativo
                startCamera();
            } else {
                // Se já tem stream e está em faceid, apenas verifica se está atribuído ao vídeo
                if (videoRef.current && videoRef.current.srcObject !== cameraStream) {
                    console.log("Re-atribuindo stream ao videoRef.current.");
                    videoRef.current.srcObject = cameraStream;
                }
            }
        } else if (cameraStream) {
            console.log("Parando stream da câmera (useEffect final).");
            cameraStream.getTracks().forEach(track => track.stop());
            setCameraStream(null);
            setFaceIdReconhecido(false);
        }

        return () => {
            if (cameraStream) {
                console.log("Função de limpeza do useEffect: parando stream da câmera.");
                cameraStream.getTracks().forEach(track => track.stop());
                setCameraStream(null);
            }
        };
    }, [metodoLogin, cameraStream, modelsLoaded]); // Dependências

    // Função assíncrona para carregar os modelos da face-api.js
    const loadModels = async () => {
        const MODEL_URL = '/models'; // Caminho direto para a pasta public/models
        try {
            console.log("Iniciando carregamento dos modelos Face-API...");
            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
            await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
            setModelsLoaded(true);
            console.log("Modelos Face-API carregados com sucesso!");
        } catch (error) {
            console.error("Erro ao carregar modelos Face-API:", error);
            alert("Erro ao carregar os modelos de reconhecimento facial.");
        }
    };

    // Efeito para carregar os modelos quando o componente montar
    useEffect(() => {
        loadModels();
    }, []); // Executa apenas uma vez ao montar o componente

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
            if (!validarCPF(cpf)) {
                setCpfInvalido(true);
                return; 
            }
            alert("Login realizado com sucesso!");
            console.log("A tentar logar com CPF...");
        } else if (metodoLogin === 'faceid') {
            if (faceIdReconhecido) {
                alert("Login simulado com sucesso via FaceID (detecção)!");
                console.log("A tentar logar com FaceID...");
            } else {
                alert("Reconhecimento FaceID pendente ou falhou. Tente novamente.");
                console.log("Reconhecimento FaceID pendente ou falhou.");
            }
        }
    }

    const handleCpfChange = (e) => {
        let novoCpf = e.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
        if (novoCpf.length > 11) {
            novoCpf = novoCpf.substring(0, 11);
        }

        if (novoCpf.length > 3 && novoCpf.length <= 6) {
            novoCpf = novoCpf.replace(/(\d{3})(\d+)/, '$1.$2');
        } else if (novoCpf.length > 6 && novoCpf.length <= 9) {
            novoCpf = novoCpf.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        } else if (novoCpf.length > 9) {
            novoCpf = novoCpf.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
        }
        setCpf(novoCpf);
        setCpfInvalido(false); 
    };

    return (
        <div className="background-container">
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
                                        minLength={6}
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
                                <input 
                                    type="text" 
                                    id="cpf" 
                                    name="cpf" 
                                    required 
                                    placeholder="000.000.000-00" 
                                    pattern="\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}"
                                    value={cpf}
                                    onChange={handleCpfChange}
                                />
                                <i className="fa-solid fa-id-card icon"></i>
                            </div>
                            {cpfInvalido && <p className="mensagem-erro">CPF inválido. Verifique o número.</p>}
                        </div>
                    )}

                    {/* --- MODO FACEID --- */}
                    {metodoLogin === 'faceid' && (
                        <>
                            <div className="scan-placeholder">
                                {modelsLoaded ? (
                                    cameraStream ? (
                                        <video id="camera-feed" ref={videoRef} autoPlay playsInline className="camera-feed"></video>
                                    ) : (
                                        <span className="camera-text">Aguardando acesso à câmera...</span>
                                    )
                                ) : (
                                    <span className="camera-text">Carregando modelos de FaceID...</span>
                                )}
                                <canvas ref={canvasRef} style={{ display: 'none' }}></canvas> {/* Canvas escondido para captura */}
                            </div>
                            
                            {/* Botão de "Capturar Rosto" */}
                            <button type="button" className="btn-opcao btn-capturar-rosto" style={{ zIndex: 10 }} onClick={() => {
                                // Simula a captura e reconhecimento do rosto
                                if (videoRef.current && canvasRef.current && modelsLoaded) {
                                    const video = videoRef.current;
                                    const canvas = canvasRef.current;
                                    const context = canvas.getContext('2d');

                                    // Ajusta o tamanho do canvas para o do vídeo
                                    canvas.width = video.videoWidth;
                                    canvas.height = video.videoHeight;

                                    // Desenha o frame atual do vídeo no canvas
                                    context.drawImage(video, 0, 0, canvas.width, canvas.height);

                                    // Obtém a imagem em Base64
                                    const imageData = canvas.toDataURL('image/png');
                                    console.log("Imagem capturada (Base64):", imageData.substring(0, 100) + "..."); // Loga uma parte da imagem

                                    alert("Rosto capturado! Simulando envio para API de reconhecimento...");
                                    setTimeout(async () => {
                                        // Simula a resposta da API
                                        // Usar face-api.js para detecção
                                        const detections = await faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptor();
                                        
                                        if (detections) {
                                            // Aqui você faria a lógica de comparação com rostos conhecidos
                                            // Por enquanto, apenas simulamos um sucesso
                                            setFaceIdReconhecido(true);
                                            alert("Rosto detectado com sucesso!");
                                        } else {
                                            setFaceIdReconhecido(false);
                                            alert("Nenhum rosto detectado ou FaceID falhou. Tente novamente.");
                                        }
                                    }, 2000); // Simula o tempo de resposta da API
                                } else {
                                    alert("Câmera não disponível, modelos não carregados ou não iniciada.");
                                }
                            }}>
                                Capturar Rosto
                            </button>

                            {/* Botão de "Voltar" específico para o modo FaceID */}
                            {metodoLogin === 'faceid' && (
                                <button type="button" className="btn-opcao btn-voltar btn-faceid-voltar" onClick={() => setMetodoLogin('padrao')}>
                                    Voltar
                                </button>
                            )}
                        </>
                    )}
                    
                    {/* Esta secção inteira é escondida no modo FaceID */}
                    {metodoLogin !== 'faceid' && (
                        <>
                            <div className="opcoes-entrada">
                                <p>Opções de entrada:</p>
                                <div className="botoes-opcoes">
                                    
                                    {/* Mostra "FaceID" */}
                                    <button type="button" className="btn-opcao" onClick={() => {
                                        setMetodoLogin('faceid');
                                        // Simula um reconhecimento de FaceID após um pequeno atraso
                                        setTimeout(() => {
                                            setFaceIdReconhecido(true);
                                            alert("FaceID reconhecido com sucesso!");
                                        }, 2000); // 2 segundos de atraso
                                    }}>
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
                    
                </form>
            </div>
        </div>
    );
}

export default Login;