document.addEventListener('DOMContentLoaded', () => {
    const isAuthenticated = localStorage.getItem('authenticated'); // Verifica se o usuário está autenticado
    const perfilNavItem = document.getElementById('nav-perfil'); // Seleciona o link do Perfil no navbar
    const authBar = document.getElementById('auth-bar'); // Seleciona o menu de autenticação no navbar

    if (!isAuthenticated) {
        // Se o usuário não estiver autenticado, oculte o link do Perfil
        authBar.style.display = 'block';
        perfilNavItem.style.display = 'none';
    } else {
        // Se estiver autenticado, exiba o link do Perfil
        authBar.style.display = 'none';
        perfilNavItem.style.display = 'block';
    }
});