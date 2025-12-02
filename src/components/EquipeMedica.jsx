import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/EquipeMedica.css'; 

import LogoBioClinic from '../assets/imagens/logo-nome-lateral.svg';
const IconePerfil = "src/assets/imagens/perfil.svg"; 
import Perfil from './Perfil';

// --- DADOS COMPLETOS ---
const listaMedicos = [
    { 
        id: 1, 
        nome: "Dra. Ana Clara", 
        foto: "https://i.pravatar.cc/150?img=5",
        especialidade: "Dermatologia",
        crm: "123456-SP",
        idade: "32 anos",
        formacao: "Medicina pela USP - Dermatologia",
        tempoAtuacao: "8 anos",
        horario: "08:00 - 17:00",
        pacientesAtendidos: "+2.500"
    },
    { 
        id: 2, 
        nome: "Dr. Roberto Campos", 
        foto: "https://i.pravatar.cc/150?img=11",
        especialidade: "Cardiologia",
        crm: "654321-SP",
        idade: "45 anos",
        formacao: "Medicina pela UNIFESP - Cardiologia",
        tempoAtuacao: "15 anos",
        horario: "09:00 - 18:00",
        pacientesAtendidos: "+5.000"
    },
    { 
        id: 3, 
        nome: "Dra. Juliana Paes", 
        foto: "https://i.pravatar.cc/150?img=9",
        especialidade: "Nutrologia",
        crm: "987654-SP",
        idade: "29 anos",
        formacao: "Medicina pela UFRJ - Nutrologia",
        tempoAtuacao: "6 anos",
        horario: "10:00 - 19:00",
        pacientesAtendidos: "+1.800"
    },
    { 
        id: 4, 
        nome: "Dr. Marcelo Silva", 
        foto: "https://i.pravatar.cc/150?img=3",
        especialidade: "Endocrinologia",
        crm: "112233-SP",
        idade: "38 anos",
        formacao: "Medicina pela UNICAMP - Endocrinologia",
        tempoAtuacao: "12 anos",
        horario: "08:00 - 16:00",
        pacientesAtendidos: "+3.200"
    },
    { 
        id: 5, 
        nome: "Dra. Fernada Souza", 
        foto: "https://i.pravatar.cc/150?img=1",
        especialidade: "Pediatria",
        crm: "445566-SP",
        idade: "41 anos",
        formacao: "Medicina pela UFMG - Pediatria",
        tempoAtuacao: "20 anos",
        horario: "08:00 - 14:00",
        pacientesAtendidos: "+8.000"
    },
    { 
        id: 6, 
        nome: "Dr. Paulo Mendes", 
        foto: "https://i.pravatar.cc/150?img=13",
        especialidade: "Ortopedia",
        crm: "778899-SP",
        idade: "50 anos",
        formacao: "Medicina pela Santa Casa - Ortopedia",
        tempoAtuacao: "22 anos",
        horario: "09:00 - 18:00",
        pacientesAtendidos: "+4.100"
    },
];

// --- HEADER (Igual ao anterior) ---
const Header = () => {
    const [dropdownAberto, setDropdownAberto] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({ nome: "Dra. Leyla", idade: "34", sexo: "Feminino" });
    const [tempData, setTempData] = useState(userData);
    const [showBiometriaModal, setShowBiometriaModal] = useState(false);

    const toggleDropdown = () => { setDropdownAberto(!dropdownAberto); if(dropdownAberto) setIsEditing(false); };
    const handleEditClick = () => { setTempData(userData); setIsEditing(true); };
    const handleSave = () => { setUserData(tempData); setIsEditing(false); };
    const handleCancel = () => { setIsEditing(false); };
    const handleChange = (e) => { setTempData({ ...tempData, [e.target.name]: e.target.value }); };
    const handleRefazerBiometria = () => setShowBiometriaModal(true);
    const handleAtualizarLocal = () => alert("Atualizando localização GPS...");

    return (
        <header className="main-header">
            <div className="header-left">
                <div className="header-logo"><img src={LogoBioClinic} alt="Logo" className="logo-img" /></div>
                <div className="header-search">
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                    <input type="text" placeholder="Pesquisar médico..." className="search-input" />
                </div>
            </div>
            <div className="header-profile-container">
                <div className="profile-trigger" onClick={toggleDropdown}>
                    <div className="profile-avatar"><img src={IconePerfil} alt="Perfil" className="profile-icon-img" /></div>
                    <i className={`fa-solid fa-chevron-down dropdown-arrow ${dropdownAberto ? 'open' : ''}`}></i>
                </div>
                {dropdownAberto && (
                    <div className="profile-dropdown-menu">
                        <div className="dropdown-user-info">
                            <div className="dropdown-user-avatar"><img src={IconePerfil} alt="Perfil" /></div>
                            {!isEditing ? (
                                <>
                                    <p className="user-name"><strong>{userData.nome}</strong></p>
                                    <p className="user-detail">{userData.idade} anos</p>
                                    <p className="user-detail">{userData.sexo}</p>
                                    <div className="user-status-row">
                                        <span className="status-tag bio">Biometria OK</span>
                                        <span className="status-tag loc">Localização OK</span>
                                    </div>
                                </>
                            ) : (
                                <div className="edit-mode-container">
                                    <span className="edit-mode-title">Editar Perfil</span>
                                    <input type="text" name="nome" className="user-edit-input" value={tempData.nome} onChange={handleChange} placeholder="Nome" />
                                    <div className="edit-row">
                                        <input type="text" name="idade" className="user-edit-input small" value={tempData.idade} onChange={handleChange} placeholder="Idade" />
                                        <select name="sexo" className="user-edit-input small" value={tempData.sexo} onChange={handleChange}>
                                            <option value="Feminino">Feminino</option>
                                            <option value="Masculino">Masculino</option>
                                        </select>
                                    </div>
                                    <div className="edit-extra-options">
                                        <button className="btn-extra-action" onClick={handleRefazerBiometria}><i className="fa-solid fa-fingerprint"></i> Refazer Biometria</button>
                                        <button className="btn-extra-action" onClick={handleAtualizarLocal}><i className="fa-solid fa-location-dot"></i> Atualizar Local</button>
                                    </div>
                                    <div className="edit-actions">
                                        <button className="btn-save" onClick={handleSave}>Salvar</button>
                                        <button className="btn-cancel" onClick={handleCancel}>X</button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="dropdown-divider"></div>
                        {!isEditing && (
                            <button className="dropdown-item btn-edit-menu" onClick={handleEditClick}>
                                <i className="fa-solid fa-pen-to-square"></i> Editar Dados
                            </button>
                        )}
                        <div className="dropdown-divider"></div>
                        <Link to="/login" className="dropdown-item logout-item"><i className="fa-solid fa-arrow-right-from-bracket"></i> Sair</Link>
                    </div>
                )}
            </div>
            {showBiometriaModal && (
                <div className="bio-modal-overlay">
                    <button className="bio-modal-close-btn" onClick={() => setShowBiometriaModal(false)}><i className="fa-solid fa-xmark"></i></button>
                    <div className="bio-modal-wrapper"><Perfil /></div>
                </div>
            )}
        </header>
    );
};

// --- COMPONENTE PRINCIPAL ---
function EquipeMedica() {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleOpenModal = (medico) => { setSelectedDoctor(medico); };
    const handleCloseModal = () => { setSelectedDoctor(null); };

    return (
        <div className="equipe-page-container">
            <Header />
            
            <div className="page-body">
                <aside className="sidebar">
                    <nav className="sidebar-nav">
                        <ul className="nav-list">
                            <li><Link to="/home" className="nav-item"><span>Clínica</span></Link></li>
                            <li><Link to="/informacoes-gerais" className="nav-item"><span>Informações Gerais</span></Link></li>
                            <li><Link to="/equipe-medica" className="nav-item active"><span>Equipe Médica</span></Link></li>
                            <li><Link to="/sobre-a-clinica-servicos" className="nav-item"><span>Serviços</span></Link></li>
                        </ul>
                    </nav>
                </aside>

                <main className="main-content">
                    <div className="content-area">
                        <div className="page-header">
                            <h1>Equipe Médica</h1>
                            <p>Conheça nossos especialistas dedicados à sua saúde.</p>
                        </div>

                        <div className="doctors-list">
                            {listaMedicos.map((medico) => (
                                <div className="doctor-card-horizontal" key={medico.id}>
                                    <div className="doc-left-content">
                                        <div className="doctor-image-wrapper">
                                            <img src={medico.foto} alt={medico.nome} />
                                        </div>
                                        <div className="doctor-info">
                                            <h3>{medico.nome}</h3>
                                        </div>
                                    </div>
                                    <div className="doc-right-action" onClick={() => handleOpenModal(medico)}>
                                        <i className="fa-solid fa-chevron-right arrow-black"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>

            {/* --- MODAL DO MÉDICO --- */}
            {selectedDoctor && (
                <div className="doctor-modal-overlay" onClick={handleCloseModal}>
                    <div className="doctor-modal-detailed" onClick={(e) => e.stopPropagation()}>
                        
                        <button className="close-modal-btn" onClick={handleCloseModal}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>

                        <div className="modal-detailed-content">
                            
                            {/* COLUNA ESQUERDA: FOTO + DADOS TÉCNICOS */}
                            <div className="modal-col-left">
                                <div className="modal-img-container">
                                    <img src={selectedDoctor.foto} alt={selectedDoctor.nome} />
                                </div>
                                
                                <div className="modal-fields-container">
                                    
                                    <div className="modal-field-item">
                                        <label>Especialidade</label>
                                        <span>{selectedDoctor.especialidade}</span>
                                    </div>

                                    <div className="modal-field-item">
                                        <label>CRM</label>
                                        <span>{selectedDoctor.crm}</span>
                                    </div>

                                    <div className="modal-field-item">
                                        <label>Tempo de Atuação</label>
                                        <span>{selectedDoctor.tempoAtuacao}</span>
                                    </div>

                                    <div className="modal-field-item">
                                        <label>Horário Disponível</label>
                                        <span>{selectedDoctor.horario}</span>
                                    </div>

                                    <div className="modal-field-item">
                                        <label>Pacientes Atendidos</label>
                                        <span className="highlight-blue">{selectedDoctor.pacientesAtendidos}</span>
                                    </div>

                                </div>
                            </div>

                            {/* COLUNA DIREITA: NOME + INFO PESSOAL */}
                            <div className="modal-col-right">
                                <h2>{selectedDoctor.nome}</h2>
                                
                                <div className="info-group">
                                    <label>Idade:</label>
                                    <p>{selectedDoctor.idade}</p>
                                </div>

                                <div className="info-group">
                                    <label>Formação:</label>
                                    <p>{selectedDoctor.formacao}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default EquipeMedica;