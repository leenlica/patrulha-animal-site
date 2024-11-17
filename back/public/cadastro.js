import API from './api.js';

const form = document.querySelector('.cadastro'); 

window.handleSubmit = handleSubmit;

async function handleSubmit(event) {
    event.preventDefault();

    const user = Object.fromEntries(new FormData(form));

    console.log(user); 

    try {
        const response = await API.create('/users', user);
        if (response && response.email) {
            location.href = '/back/public/signin.html'; 
        } else {
            console.log('Erro no cadastro');
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        alert('Erro ao cadastrar usuário: ' + error.message); 
    }
}


form.addEventListener('submit', handleSubmit);
