import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importar Link para voltar

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

// Vamos re-utilizar os mesmos estilos do Login!
import '../styles/Login.css';
// E podemos adicionar estilos específicos se precisarmos
import '../styles/Cadastro.css';

function Cadastro() {
    
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmaSenhaVisivel, setConfirmaSenhaVisivel] = useState(false);
    const [cpf, setCpf] = useState('');
    const [cpfInvalido, setCpfInvalido] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    const [erroSenha, setErroSenha] = useState('');
    const [erroConfirmaSenha, setErroConfirmaSenha] = useState('');

    const handleCpfChange = (e) => {
        const novoCpf = e.target.value;
        setCpf(novoCpf);
        // Oculta a mensagem de erro enquanto o usuário digita
        setCpfInvalido(false); 
    };

    const handleSenhaChange = (e) => {
        setSenha(e.target.value);
        setErroSenha(''); // Limpa o erro ao digitar
    };

    const handleConfirmaSenhaChange = (e) => {
        setConfirmaSenha(e.target.value);
        setErroConfirmaSenha(''); // Limpa o erro ao digitar
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Impede o recarregamento da página

        if (!validarCPF(cpf)) {
            setCpfInvalido(true);
            return; // Impede o envio do formulário se o CPF for inválido
        }

        // Validação da senha
        if (senha.length < 6) {
            setErroSenha('A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        // Validação da confirmação de senha
        if (senha !== confirmaSenha) {
            setErroConfirmaSenha('As senhas não coincidem.');
            return;
        }

        // Se o CPF e as senhas forem válidos, pode continuar com o cadastro
        alert('Cadastro realizado com sucesso!');
        // Aqui você faria a lógica para enviar os dados para o backend, etc.
    };

    return (
        <div className="login-card"> {/* Re-utilizando a classe do Login */}
            <form className="login-form" onSubmit={handleSubmit}> {/* Re-utilizando a classe do Login */}
                
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
                        <input 
                            type="text" 
                            id="cpf" 
                            name="cpf" 
                            required 
                            placeholder="000.000.000-00" 
                            value={cpf}
                            onChange={handleCpfChange}
                        />
                        <i className="fa-solid fa-id-card icon"></i>
                    </div>
                    {cpfInvalido && <p className="mensagem-erro">CPF inválido. Verifique o número.</p>}
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
                            value={senha}
                            onChange={handleSenhaChange}
                        />
                        <i 
                            className={senhaVisivel ? "fa-solid fa-eye-slash icon" : "fa-solid fa-eye icon"}
                            onClick={() => setSenhaVisivel(!senhaVisivel)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    {erroSenha && <p className="mensagem-erro">{erroSenha}</p>}
                </div>

                <div className="input-group">
                    <label htmlFor="confirmaSenha">Confirmar Senha</label>
                    <div className="input-field">
                        <input 
                            type={confirmaSenhaVisivel ? "text" : "password"} 
                            id="confirmaSenha" 
                            name="confirmaSenha" 
                            required 
                            value={confirmaSenha}
                            onChange={handleConfirmaSenhaChange}
                        />
                        <i 
                            className={confirmaSenhaVisivel ? "fa-solid fa-eye-slash icon" : "fa-solid fa-eye icon"}
                            onClick={() => setConfirmaSenhaVisivel(!confirmaSenhaVisivel)}
                            style={{ cursor: 'pointer' }}
                        ></i>
                    </div>
                    {erroConfirmaSenha && <p className="mensagem-erro">{erroConfirmaSenha}</p>}
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