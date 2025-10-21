// 1. Importar React e o hook 'useState'
import React, { useState } from 'react';

// 2. Importar seu CSS da pasta de estilos
// ( ../ sobe de 'components' para 'src', depois entra em 'styles')
import '../styles/Login.css';

// 3. O componente (Função que retorna HTML/JSX)
function Login() {
    
    // 4. "Estado" para controlar a visibilidade da senha
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    // 5. Função para ser chamada no clique do ícone
    function toggleVisibilidadeSenha() {
        setSenhaVisivel(!senhaVisivel); // Inverte o valor (true/false)
    }

    // 6. O JSX (HTML)
    //    Lembre-se: 'class' vira 'className', 'for' vira 'htmlFor'
    return (
        <div className="login-card">
            <form className="login-form">
                <h1>Login</h1>
                <p className="subtitulo">Preencha seus dados para acessar.</p>

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
                        {/* O 'type' do input é controlado pelo React */}
                        <input 
                            type={senhaVisivel ? "text" : "password"} 
                            id="senha" 
                            name="senha" 
                            required 
                        />
                        {/* O ícone e o 'onClick' são controlados pelo React */}
                        <i 
                            className={senhaVisivel ? "fa-solid fa-eye-slash icon" : "fa-solid fa-eye icon"}
                            id="toggle-senha"
                            onClick={toggleVisibilidadeSenha}
                        ></i>
                    </div>
                    <a href="#" className="esqueci-senha">Esqueci minha senha</a>
                </div>

                <div className="opcoes-entrada">
                    <p>Opções de entrada:</p>
                    <div className="botoes-opcoes">
                        <button type="button" className="btn-opcao">
                            FaceID
                        </button>
                        <button type="button" className="btn-opcao">
                            CPF
                        </button>
                    </div>
                </div>

                <button type="submit" className="btn-entrar">ENTRAR</button>

                <p className="link-cadastro">
                    Não tem login? <a href="#">Cadastre-se aqui</a>
                </p>
            </form>
        </div>
    );
}

// 7. Exportar o componente
export default Login;