import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Servicos.css';
import Header from './Header'; // <--- Importando o componente Header que você criou

function Servicos() {
    // Toda a lógica do dropdown agora vive dentro do Header.jsx,
    // por isso removemos o useState e as funções daqui.

    return (
        <div className="servicos-page-container">
            
            {/* --- Usando o Componente Header --- */}
            <Header />

            {/* CORPO DA PÁGINA (Sidebar + Conteúdo) - Mantido igual */}
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
                            
                            <div className="service-card card-nutricao">
                                <h3>Nutrição</h3>
                                <p>Acompanhamento nutricional personalizado para sua saúde.</p>
                                <button className="btn-saiba-mais">Saiba mais</button>
                            </div>

                            <div className="service-card card-dermatologia">
                                <h3>Dermatologia</h3>
                                <p>Cuidados essenciais para a saúde e beleza da sua pele.</p>
                                <button className="btn-saiba-mais">Saiba mais</button>
                            </div>

                            <div className="service-card card-telemedicina">
                                <h3>Telemedicina</h3>
                                <p>Consulta online, cuidado de qualidade. Agende seu horário conosco.</p>
                                <button className="btn-saiba-mais">Saiba mais</button>
                            </div>

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