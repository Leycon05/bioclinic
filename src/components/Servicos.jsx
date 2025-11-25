import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Servicos.css';

// Importação da Logo
import LogoBioClinic from '../assets/imagens/logo-nome-lateral.svg';

// Caminho do ícone de perfil
const IconePerfil = "src/assets/imagens/perfil.svg"; 

function Servicos() {
    const [dropdownAberto, setDropdownAberto] = useState(false);

    const toggleDropdown = () => {
        setDropdownAberto(!dropdownAberto);
    };

    return (
        <div className="servicos-page-container">
            
            {/* HEADER SUPERIOR */}
            <header className="main-header">
                <div className="header-left">
                    <div className="header-logo">
                        <img src={LogoBioClinic} alt="Logo BioClinic" className="logo-img" />
                    </div>
                    <div className="header-search">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input type="text" placeholder="Pesquisar" className="search-input" />
                    </div>
                </div>

                <div className="header-profile-container">
                    <div className="profile-trigger" onClick={toggleDropdown}>
                        <div className="profile-avatar">
                            <img src={IconePerfil} alt="Perfil" className="profile-icon-img" />
                        </div>
                        <i className={`fa-solid fa-chevron-down dropdown-arrow ${dropdownAberto ? 'open' : ''}`}></i>
                    </div>

                    {dropdownAberto && (
                        <div className="profile-dropdown-menu">
                            <Link to="/perfil" className="dropdown-item"><i className="fa-solid fa-user-doctor"></i> Meu Perfil</Link>
                            <Link to="/configuracoes" className="dropdown-item"><i className="fa-solid fa-gear"></i> Configurações</Link>
                            <div className="dropdown-divider"></div>
                            <Link to="/login" className="dropdown-item logout-item"><i className="fa-solid fa-arrow-right-from-bracket"></i> Sair</Link>
                        </div>
                    )}
                </div>
            </header>

            {/* CORPO DA PÁGINA */}
            <div className="page-body">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        <ul className="nav-list">
                            <li><Link to="/home" className="nav-item"><span>Clínica</span></Link></li>
                            <li><Link to="/informacoes-gerais" className="nav-item"><span>Informações Gerais</span></Link></li>
                            <li><Link to="/equipe-medica" className="nav-item"><span>Equipe Médica</span></Link></li>
                            <li><Link to="/sobre-a-clinica-servicos" className="nav-item active"><span>Serviços</span></Link></li>
                        </ul>
                    </nav>
                </aside>

                <main className="main-content">
                    <div className="content-area">
                        <div className="page-header">
                            <h1>Serviços</h1>
                            <p>Conheça nossas especialidades e tratamentos disponíveis.</p>
                        </div>

                        <div className="services-grid">
                            
                            {/* Card 1 - NUTROLOGIA */}
                            <div className="service-card card-nutrologia">
                                <h3>Nutrologia</h3>
                                <p>Acompanhamento nutricional personalizado para sua saúde.</p>
                                <button className="btn-saiba-mais">Saiba mais</button>
                            </div>

                            {/* Card 2 - DERMATOLOGIA */}
                            <div className="service-card card-dermatologia">
                                <h3>Dermatologia</h3>
                                <p>Cuidados essenciais para a saúde e beleza da sua pele.</p>
                                <button className="btn-saiba-mais">Saiba mais</button>
                            </div>

                            {/* Card 3 - ENDOCRINOLOGIA */}
                            <div className="service-card card-endocrinologia">
                                <h3>Endocrinologia</h3>
                                <p>Tratamento de distúrbios hormonais e metabólicos.</p>
                                <button className="btn-saiba-mais">Saiba mais</button>
                            </div>

                            {/* Card 4 - CARDIOLOGIA */}
                            <div className="service-card card-cardiologia">
                                <h3>Cardiologia</h3>
                                <p>Cuidado especializado para a saúde do seu coração.</p>
                                <button className="btn-saiba-mais">Saiba mais</button>
                            </div>

                        </div>

                        <div className="footer-actions">
                            <Link to="/home" className="btn-voltar-servicos">Voltar</Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Servicos;