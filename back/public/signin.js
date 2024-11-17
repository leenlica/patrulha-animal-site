import API from './api.js';
import Auth from './auth.js';

const form = document.querySelector('#login-form'); 

form.addEventListener('submit', handleSubmit);  

async function handleSubmit(event) {
    event.preventDefault();  
    const user = Object.fromEntries(new FormData(form)); 

    const { auth, token } = await API.create('/signin', user, false); 

    if (auth) {
        Auth.signin(token); 
        console.log('Token recebido:', token);  
        localStorage.setItem('authenticated', 'true');
        window.location.href = './perfil.html';  
        console.log('Erro no login'); 
    }
}
