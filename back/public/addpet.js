const form = document.getElementById("add-pet-form");
const errorContainer = document.getElementById("error-message");
const token = localStorage.getItem("token");

const errorMessages = (inputs) => {
    const messages = [];
    if (!inputs.birthdate) {
        messages.push("A data de nascimento do pet é obrigatória.");
    }
    if (!inputs.age) {
        messages.push("A idade do pet é obrigatória.");
    }
    if (!inputs.species) {
        messages.push("A espécie do pet é obrigatória.");
    }
    if (!inputs.description) {
        messages.push("A descrição do pet é obrigatória.");
    }
    return messages;
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    //recebendo todos os inputs do formulário
    const formData = new FormData(form);

    //criando um objeto com o valor dos inputs
    const inputs = Object.fromEntries(formData.entries());
    console.log(inputs);

    //procura erro nos inputs
    const errors = errorMessages(inputs)
    //caso tenha exibe esta mensagem
    if (errors.length) {
        errorContainer.innerHTML = errors.map(message => `<div class="error-message">${message}</div>`).join('');
        errorContainer.style.display = "block";
        return;
    }
    //caso não tenha erro, limpa a mensagem de erro
    errorContainer.style.display = "none";

    //enviando os dados para o backend
    const response = await fetch("http://localhost:3000/pets", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    console.log(response)
});
