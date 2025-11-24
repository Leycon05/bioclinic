import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Servicos.css';

function Servicos() {
    return (
        <div className="servicos-page-container">
            
            {/* --- HEADER SUPERIOR (Igual à imagem) --- */}
            <header className="main-header">
                
                {/* 1. Logo na Esquerda */}
                <div className="header-logo">
                    <img src="src/assets/imagens/logo-nome-lateral.svg" />
                </div>

                {/* 2. Menu no Centro */}
                <nav className="header-nav">
                    <ul className="nav-list">
                        <li>
                            <Link to="/home" className="nav-item">Início</Link>
                        </li>
                        <li>
                            <Link to="/agendamentos" className="nav-item">Agendamentos</Link>
                        </li>
                        <li>
                            <Link to="/pacientes" className="nav-item">Pacientes</Link>
                        </li>
                        <li>
                            {/* Este item tem a classe 'active' para mostrar o sublinhado */}
                            <Link to="/sobre-a-clinica-servicos" className="nav-item active">Serviços</Link>
                        </li>
                        <li>
                            <Link to="/configuracoes" className="nav-item">Configurações</Link>
                        </li>
                    </ul>
                </nav>

                {/* 3. Perfil na Direita */}
                <div className="header-profile">
                    <div className="profile-avatar">
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <span className="profile-name">Dra. Leyla</span>
                    <Link to="/login" className="profile-logout">Sair</Link>
                </div>

            </header>

            {/* --- CONTEÚDO PRINCIPAL --- */}
            <main className="main-content">
                
                <div className="content-area">
                    <div className="page-header">
                        <h1>Serviços</h1>
                        <p>Conheça nossas especialidades e tratamentos disponíveis.</p>
                    </div>

                    <div className="services-grid">
                        
                        {/* Card 1 */}
                        <div className="service-card">
                            <div className="icon-box">
                                <i className="fa-solid fa-apple-whole"></i>
                            </div>
                            <h3>Nutrologia</h3>
                            <p>Acompanhamento nutricional personalizado para sua saúde.</p>
                            <button className="btn-saiba-mais">Saiba mais</button>
                        </div>

                        {/* Card 2 */}
                        <div className="service-card">
                            <div className="icon-box">
                                <i className="fa-solid fa-hand-sparkles"></i>
                            </div>
                            <h3>Dermatologia</h3>
                            <p>Cuidados essenciais para a saúde e beleza da sua pele.</p>
                            <button className="btn-saiba-mais">Saiba mais</button>
                        </div>

                        {/* Card 3 */}
                        <div className="service-card">
                            <div className="icon-box">
                                <i className="fa-solid fa-dna"></i>
                            </div>
                            <h3>Endocrinologia</h3>
                            <p>Tratamento de distúrbios hormonais e metabólicos.</p>
                            <button className="btn-saiba-mais">Saiba mais</button>
                        </div>

                        {/* Card 4 */}
                        <div className="service-card">
                            <div className="icon-box">
                                <i className="fa-solid fa-heart-pulse"></i>
                            </div>
                            <h3>Cardiologia</h3>
                            <p>Cuidado especializado para a saúde do seu coração.</p>
                            <button className="btn-saiba-mais">Saiba mais</button>
                        </div>

                    </div>

                    <div className="footer-actions">
                        <Link to="/home" className="btn-voltar-servicos">
                            Voltar
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

export default Servicos;