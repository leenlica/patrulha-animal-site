import API from './api.js';
import Auth from './auth.js';

const form = document.querySelector('#login-form');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    // Limpa mensagens de erro anteriores
    document.querySelectorAll(".error-message").forEach((message) => message.remove());

    let isValid = true;

    // Função auxiliar para exibir mensagens de erro
    function showError(input, message) {
        const error = document.createElement("div");
        error.className = "error-message";
        error.style.color = "red";
        error.style.marginTop = "5px";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    // Validação do campo E-mail/CNPJ/CPF
    const emailInput = form.querySelector('input[name="email"]');
    if (!emailInput.value.trim()) {
        showError(emailInput, "E-mail é obrigatório.");
        isValid = false;
    } else if (!isValidEmailOrCnpjOrCpf(emailInput.value)) {
        showError(emailInput, "Insira um E-mail, CNPJ ou CPF válido.");
        isValid = false;
    }

    // Validação do campo Senha
    const passwordInput = form.querySelector('input[name="password"]');
    if (!passwordInput.value.trim()) {
        showError(passwordInput, "Senha é obrigatório.");
        isValid = false;
    }

    // Interrompe se a validação falhar
    if (!isValid) return;

    const user = Object.fromEntries(new FormData(form));

    try {
        const { auth, token, user: userData } = await API.create('/signin', user, false);

        if (auth) {
            Auth.signin(token); // Salvar o token
            console.log('Token recebido:', token);

            // Salvar os dados do usuário no localStorage
            localStorage.setItem('authenticated', 'true');
            localStorage.setItem('userName', userData.nome);
            localStorage.setItem('userEmail', userData.email);
            localStorage.setItem('userId', userData.id_usuario); 

            // Redirecionar para a página de perfil
            window.location.href = './perfil.html';
        } else {
            showError(emailInput, "Credenciais inválidas. Tente novamente.");
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Erro ao fazer login: ' + error.message);
    }
}

// Função auxiliar para validar e-mail, CNPJ ou CPF
function isValidEmailOrCnpjOrCpf(input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cnpjCpfRegex = /^\d{11,14}$/; // CNPJ ou CPF simples
    return emailRegex.test(input) || cnpjCpfRegex.test(input.replace(/\D/g, ''));
}
