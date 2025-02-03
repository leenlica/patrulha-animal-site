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

    // Validação da data de nascimento
    const birthdateInput = document.getElementById("birthdate");
    const ageInput = document.getElementById("age");

    // Verifica se uma data de nascimento foi informada
    if (!birthdateInput.value.trim()) {
        showError(birthdateInput, "A data de nascimento do pet é obrigatória.");
        isValid = false;
    } else if (!ageInput.value.trim()) {
        showError(birthdateInput, "A idade do pet deve ser válida.");
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

    // Adiciona o usuário logado ao objeto de dados do pet
    console.log(localStorage.getItem('userId')) 
    const userId = localStorage.getItem('userId');  // Supondo que o ID do usuário esteja armazenado com a chave 'userId'
    Pets.user_id = userId; 
    if (!userId) {
        alert("Você precisa estar logado para adicionar um pet.");
        return;
    }

    if (!userId) {
        alert("Você precisa estar logado para adicionar um pet.");
        return;
    }

    // Continua se os campos forem válidos
    const formData = new FormData(form);
    formData.append("user_id", userId);
    
    try {
        const response = await API.create('/pets', formData);
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
