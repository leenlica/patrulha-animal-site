/*Em andamento... Não adicionado ao site */
let divAnimais = document.getElementById("animais");
fetch("dados.json").then((response) => {
    response.json().then((animais) => {
        console.log(animais);
        let listaAnimais = document.getElementById("listaanimais");
        animais.forEach((animal) => {
            let listItem = document.createElement("li");
            let link = document.createElement("a");
            link.href = "#";
            let img = document.createElement("img");
            img.setAttribute("width", "50px");
            img.src = animal.imagem;
            link.appendChild(img);
            let span = document.createElement("span");
            span.className = "animal-name";
            span.textContent = animal.name;
            link.appendChild(span);
            listItem.appendChild(link);
            listItem.appendChild(document.createTextNode(animal.description));
            listaAnimais.appendChild(listItem);
        });
    });
});
