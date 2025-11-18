import api from './api';

/**
 * Registra um novo usuário.
 * @param {object} userData - Dados do usuário {nome, cpf, senha}.
 */
export const registrar = async (userData) => {
  try {
    const response = await api.post('/auth/registrar', {
      nome: userData.nome,
      cpf: userData.cpf, // CPF já deve estar sem formatação
      senha: userData.senha
    });
    return response.data;
  } catch (error) {
    // Lança a mensagem de erro do backend ou uma padrão
    throw new Error(error.response?.data?.message || 'Erro ao tentar cadastrar.');
  }
};

/**
 * Autentica um usuário com CPF e Senha.
 * @param {object} credentials - Credenciais {cpf, senha}.
 */
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login-nome', {
      nome: credentials.nome, // CPF já deve estar sem formatação
      senha: credentials.senha
    });
    
    // Retorna os dados (que devem incluir o token)
    return response.data;
  } catch (error) {
    // Lança a mensagem de erro do backend ou uma padrão
    throw new Error(error.response?.data || 'CPF ou senha inválidos.');
  }
};

/**
 * Desloga o usuário (remove o token).
 */
export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login'; 
};

/**
 * Registra o descritor facial para o usuário logado.
 * @param {string} descriptor - O descritor facial como string.
 */
export const registerFace = async (descriptor) => {
  try {
    // Note: O token JWT já está sendo enviado pelo interceptor da 'api'
    const response = await api.post('/facial/register-face', { descriptor });
    return response.data;
  } catch (error) {
    // Lança a mensagem de erro específica do backend ou uma genérica
    throw new Error(error.response?.data || error.message || 'Erro ao cadastrar rosto.');
  }
};

/**
 * Busca o descritor facial salvo para um CPF.
 * @param {string} cpf - CPF do usuário (sem formatação).
 */
export const getFaceDescriptor = async (cpf) => {
  try {
    const response = await api.get(`/auth/face-descriptor/${cpf}`);
    return response.data; // Retorna o string do descritor
  } catch (error) {
    // Lança a mensagem do backend ou uma padrão
    throw new Error(error.response?.data || 'Nenhum rosto cadastrado para este CPF.');
  }
};

/**
 * Efetua o login após a validação facial do frontend.
 * @param {string} cpf - CPF do usuário (sem formatação).
 */
export const loginFace = async (cpf) => {
  try {
    const response = await api.post('/auth/login-face', { cpf });
    return response.data; // Retorna { token: "..." }
  } catch (error) {
    throw new Error(error.response?.data || 'Erro ao finalizar login facial.');
  }
};