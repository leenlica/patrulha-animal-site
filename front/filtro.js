function filterAnimals(animals, query) {
    return animals.filter(animal => {
        return (
            animal.name.toLowerCase().includes(query) ||
            animal.species.toLowerCase().includes(query) ||
            animal.age.toLowerCase().includes(query) ||
            animal.size.toLowerCase().includes(query) ||
            animal.neighborhood.toLowerCase().includes(query) ||
            animal.breed.toLowerCase().includes(query)
        );
    });
}

const animals = [
    {
        id: "01",
        name: "Black",
        imagem: "https://i.pinimg.com/564x/25/1e/1a/251e1ac34e6ad6e3ddbd9e9981ea0db9.jpg",
        species: "Cachorro",
        breed: "Labrador",
        size: "Grande",
        neighborhood: "Bairro das Indústrias",
        age: "2 anos",
        color: "Preto",
        description: "Black é um Labrador amigável e enérgico que adora brincar e passear."
    },
    {
        id: "02",
        name: "Daisy",
        imagem: "https://i.pinimg.com/564x/0b/16/92/0b16923013bcfec513f2cf517406e96c.jpg",
        species: "Cachorro",
        breed: "Pincher",
        size: "Pequeno",
        neighborhood: "Jaguaribe",
        age: "9 meses",
        color: "Caramelo",
        description: "Daisy é uma doce e gentil cadelinha que adora ser abraçada e receber carinho."
    },
    {
        id: "03",
        name: "Belinha",
        imagem: "https://i.pinimg.com/564x/68/f1/d0/68f1d07dd0594972fd13642d2f8f7f6d.jpg",
        species: "Cachorra",
        breed: "Pincher",
        size: "Pequeno",
        neighborhood: "Oitizeiro",
        age: "2 anos",
        color: "Vermelho castanho",
        description: "Belinha é uma cachorra muito esperta, agitada, carinhosa e leal para quem te dá amor."
    },
    {
        id: "04",
        name: "Luna",
        imagem: "https://i.pinimg.com/564x/25/1e/1a/251e1ac34e6ad6e3ddbd9e9981ea0db9.jpg",
        species: "Gato",
        breed: "Siames",
        size: "Médio",
        neighborhood: "Bairro das Indústrias",
        age: "1 ano",
        color: "Preto",
        description: "Luna é um gato muito carinhoso e brincalhão que adora ser o centro de atenção."
    },
    {
        id: "05",
        name: "Felix",
        imagem: "https://i.pinimg.com/564x/0b/16/92/0b16923013bcfec513f2cf517406e96c.jpg",
        species: "Gato",
        breed: "Persa",
        size: "Grande",
        neighborhood: "Jaguaribe",
        age: "3 anos",
        color: "Branco",
        description: "Felix é um gato muito calmo e tranquilo que adora dormir e relaxar."
    }
];

document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const filteredAnimals = filterAnimals(animals, query);
    const listaanimais = document.getElementById('listaanimais');
    listaanimais.innerHTML = '';

    filteredAnimals.forEach(animal => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#">${animal.name} - ${animal.species}</a>`;
        listaanimais.appendChild(li);
    });
});
