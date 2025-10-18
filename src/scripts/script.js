// Espera o HTML ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    // Seleciona o ícone do olho
    const toggleSenha = document.getElementById('toggle-senha');
    // Seleciona o campo de senha
    const inputSenha = document.getElementById('senha');

    // Adiciona um evento de "clique" no ícone
    toggleSenha.addEventListener('click', () => {
        
        // Verifica qual é o tipo atual do campo (password ou text)
        const tipo = inputSenha.getAttribute('type') === 'password' ? 'text' : 'password';
        
        // Define o novo tipo
        inputSenha.setAttribute('type', tipo);

        // Troca o ícone do olho (aberto vs fechado)
        if (tipo === 'password') {
            // Se for senha, mostra o olho normal
            toggleSenha.classList.remove('fa-eye-slash');
            toggleSenha.classList.add('fa-eye');
        } else {
            // Se for texto, mostra o olho com risco
            toggleSenha.classList.remove('fa-eye');
            toggleSenha.classList.add('fa-eye-slash');
        }
    });

});