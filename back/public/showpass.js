function Mostrarsenha() {
    var inputPass = document.getElementById('Senha');
    var btnshowpass = document.getElementById('btn-senha');
    if (inputPass.type === 'password') {
        inputPass.type = 'text';
        btnshowpass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    } else {
        inputPass.type = 'password';
        btnshowpass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
}

function Mostrarsenha2() {
    var inputPass = document.getElementById('Senha2');
    var btnshowpass = document.getElementById('btn-senha2');
    if (inputPass.type === 'password') {
        inputPass.type = 'text';
        btnshowpass.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
    } else {
        inputPass.type = 'password';
        btnshowpass.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
    }
}
