function isAuthenticated() {
    if (!getToken()) {
        window.location.href = '/signin.html';
    } else {
        return true;
    }
}

function getToken() {
    return localStorage.getItem('@pet-app:token');
}

function signin(token) {
    localStorage.setItem('@pet-app:token', token);

    window.location.href = '/perfil.html';
}

function signout() {
    localStorage.removeItem('@pet-app:token');

    window.location.href = '/signin.html';
}

export default { isAuthenticated, getToken, signin, signout };
