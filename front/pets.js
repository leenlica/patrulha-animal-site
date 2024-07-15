import API from './api.js';

async function carregar() {
    try {
        const pets = await API.read('/pets');
        const container = document.querySelector("#pets-container")

        pets.forEach(pet => {
            const card = document.createElement("div")
            card.classList.add("card")

            const img = document.createElement("img")
            img.src = 'http://localhost:3000/img/'+pet.imagem
            img.alt = pet.name

            const titulo = document.createElement("h3")
            titulo.textContent = pet.name

            const descricao = document.createElement("p")
            descricao.textContent = pet.description

            const button = document.createElement("button")
            button.classList.add("botao")
            button.textContent = "Adote!"

            card.appendChild(img)
            card.appendChild(titulo)
            card.appendChild(descricao)
            card.appendChild(button)
            container.appendChild(card)
        });
    }
    catch (error) {
        console.error('Erro ao carregar pets:', error);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    carregar();
});
