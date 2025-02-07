import API from './api.js';

const form = document.querySelector('.cadastro');

// Adiciona evento para validação e submissão
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();

    // Remove mensagens de erro anteriores
    clearErrors();

    // Valida os campos
    const isValid = validateForm();
    if (!isValid) return;

    const user = Object.fromEntries(new FormData(form));
    console.log(user);

    try {
        const response = await API.create('/users', user);

        if (response && response.email) {
            // Se o e-mail foi criado com sucesso, redireciona para a página de login
            location.href = './signin.html';
        } else if (response.error && response.error === 'Email already exists') {
            // Se o e-mail já existe, exibe a mensagem de erro
            const emailField = form.querySelector('input[name="email"]');
            showError(emailField, 'E-mail já cadastrado');
        } else {
            console.log('Erro no cadastro');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário: ' + error.message);
    }
}

// Função para limpar mensagens de erro
function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}

// Função de validação
function validateForm() {
    let isValid = true;

    // Nome
    const nomeField = form.querySelector('input[name="nome"]');
    if (!nomeField.value.trim()) {
        showError(nomeField, 'Nome é obrigatório.');
        isValid = false;
    }

    // E-mail
    const emailField = form.querySelector('input[name="email"]');
    if (!emailField.value.trim()) {
        showError(emailField, 'E-mail é obrigatório.');
        isValid = false;
    } else if (!validateEmail(emailField.value)) {
        showError(emailField, 'O e-mail informado não é válido.');
        isValid = false;
    }

    // Senha
    const passwordField = form.querySelector('input[name="password"]');
    if (!passwordField.value.trim()) {
        showError(passwordField, 'Senha é obrigatório.');
        isValid = false;
    } else if (passwordField.value.length < 6) {
        showError(passwordField, 'A senha deve ter pelo menos 6 caracteres.');
        isValid = false;
    }

    // Confirmação de Senha
    const confirmationField = form.querySelector('input[name="confirmationPassword"]');
    if (!confirmationField.value.trim()) {
        showError(confirmationField, 'Confirmação de Senha é obrigatório.');
        isValid = false;
    } else if (confirmationField.value !== passwordField.value) {
        showError(confirmationField, 'As senhas não coincidem.');
        isValid = false;
    }

    return isValid;
}

// Exibe mensagem de erro abaixo do campo
function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = 'red';
    error.style.marginTop = '5px';
    error.textContent = message;

    // Adiciona o erro logo abaixo do campo
    input.parentElement.appendChild(error);
}

// Validação de e-mail
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
