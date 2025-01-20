
const pets = [
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

let filters = {
    species: '',
    age: '',
    size: '',
    breed: ''
  };

  function openFilterCard() {
    document.getElementById('filterCard').style.display = 'flex';
  }

  function closeFilterCard() {
    document.getElementById('filterCard').style.display = 'none';
  }

  function applyFilter(key, value) {
    filters[key] = value.toLowerCase();
    filterPets();
  }

  function displayPets(filteredPets) {
    const petsContainer = document.getElementById('pets');
    petsContainer.innerHTML = '';
    filteredPets.forEach(pet => {
      const petCard = document.createElement('div');
      petCard.className = 'pet-card';
      petCard.innerHTML = `
        <h3>${pet.nome}</h3>
        <p>Espécie: ${pet.especie}</p>
        <p>Idade: ${pet.idade}</p>
        <p>Porte: ${pet.porte}</p>
        <p>Raça: ${pet.raca}</p>
      `;
      petsContainer.appendChild(petCard);
    });
  }

  function filterPets() {
    const filteredPets = pets.filter(pet => {
      return (
        (!filters.species || pet.especie.toLowerCase() === filters.species) &&
        (!filters.age || pet.idade.toLowerCase() === filters.age) &&
        (!filters.size || pet.porte.toLowerCase() === filters.size) &&
        (!filters.breed || pet.raca.toLowerCase().includes(filters.breed))
      );
    });
    displayPets(filteredPets);
  }

  // Exibe todos os pets inicialmente
  displayPets(pets);

  // Adicionando os listeners para os filtros
  document.getElementById('species').addEventListener('change', function() {
    applyFilter('species', this.value);
  });
  document.getElementById('age').addEventListener('change', function() {
    applyFilter('age', this.value);
  });
  document.getElementById('size').addEventListener('change', function() {
    applyFilter('size', this.value);
  });
  document.getElementById('breed').addEventListener('input', function() {
    applyFilter('breed', this.value);
  });