import API from './api.js';
import Auth from './auth.js';

const form = document.querySelector('#login-form');

form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    event.preventDefault();
    const user = Object.fromEntries(new FormData(form));

    const { auth, token, user: userData } = await API.create('/signin', user, false);

    if (auth) {
        Auth.signin(token); // Salvar o token
        console.log('Token recebido:', token);

        // Salvar os dados do usuário no localStorage
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('userName', userData.nome);
        localStorage.setItem('userEmail', userData.email);

        // Redirecionar para a página de perfil
        window.location.href = './perfil.html';
    } else {
        console.log('Erro no login');
    }
}
