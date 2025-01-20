import API from './api.js';

const form = document.querySelector('#add-pet-form');

window.handleSubmit = handleSubmit;

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

    // Validação dos campos
   
    const ageInput = document.getElementById("age");
    if (!ageInput.value.trim()) {
        showError(ageInput, "A idade do pet é obrigatória.");
        isValid = false;
    }

    const speciesSelect = document.getElementById("species");
    if (!speciesSelect.value.trim()) {
        showError(speciesSelect, "A espécie do pet é obrigatória.");
        isValid = false;
    }

    const descriptionInput = document.getElementById("description");
    if (!descriptionInput.value.trim()) {
        showError(descriptionInput, "A descrição do pet é obrigatória.");
        isValid = false;
    }

    // Interrompe se a validação falhar
    if (!isValid) return;

    // Continua se os campos forem válidos
    const Pets = Object.fromEntries(new FormData(form));

    console.log(Pets);

    try {
        const response = await API.create('/pets', Pets);
        if (response) {
            location.href = '/back/public/perfil.html';
        } else {
            console.log('Erro no cadastro');
        }
    } catch (error) {
        console.error('Erro ao cadastrar pet:', error);
        alert('Erro ao cadastrar pet: ' + error.message);
    }
}

form.addEventListener('submit', handleSubmit);
