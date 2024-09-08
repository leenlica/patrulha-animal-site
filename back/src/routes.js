import express from 'express';
import  Pets from './models/Pets.js';
import curtida from './models/curtida.js'; 

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const router = express.Router();

// Rota para obter todos os pets 

router.get('/pets', async (req, res) => {
    const pets = await Pets.read();

    res.json(pets);
});

// Rota para obter um pet específico por ID 
router.get('/pets/:id', async (req, res) => {
    const { id } = req.params.id;
    const pet = await Pets.find(p => p.id === id);
    if (!pet) {
        return res.status(404).json({ message: 'Pet não encontrado' });
    }
    res.json(pet);
});

// Rota para adicionar um novo pet 
router.post('/pets', async (req, res) => {
    const {
        name,
        imagem,
        species,
        breed,
        size,
        neighborhood,
        age,
        color,
        description
    } = req.body;
    
    const newPet = {
        id,
        name,
        imagem,
        species,
        breed,
        size,
        neighborhood,
        age,
        color,
        description
    };

    await Pets.push(newPet);
    res.status(201).json(newPet);
});

// Rota para atualizar um pet existente pelo id
router.put('/pets/:id', async (req, res) => {
    const  id = req.params.id;
    const {
        name,
        imagem,
        species,
        breed,
        size,
        neighborhood,
        age,
        color,
        description
    } = req.body;

    const petIndex = await Pets.findIndex(p => p.id === id);
    if (petIndex === -1) {
        return res.status(404).json({ message: 'Pet não encontrado' });
    }

    const updatedPet = {
        id,
        name,
        imagem,
        species,
        breed,
        size,
        neighborhood,
        age,
        color,
        description
    };

    Pets[petIndex] = updatedPet;
    res.json(updatedPet);
});

// Rota para deletar um pet pelo id
router.delete('/pets/:id', async (req, res) => {
    const  id  = req.params.id;
    const petIndex = Pets.findIndex(p => p.id === id);
    if (petIndex === -1) {
        return res.status(404).json({ message: 'Pet não encontrado' });
    }

    const deletedPet = await Pets.splice(petIndex, 1);
    res.json(deletedPet[0]);
});

// Rota para adicionar uma curtida
router.post('/like', async (req, res) => {
    const { pet_id, usuario_id } = req.body;

    try {
        const id_curtida = await curtida.create(pet_id, usuario_id);
        res.status(201).json({ message: 'Curtida adicionada', id_curtida });
    } catch (error) {
        console.error('Erro ao adicionar curtida:', error);
        res.status(500).json({ error: 'Erro ao adicionar curtida' });
    }
});

// 404 handler
router.use((req, res, next) => {
    res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof HTTPError) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Something broke!' });
    }
});

export default router;