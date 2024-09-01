import express from 'express';
import  { pets }  from './data/apatrulha.js';

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const router = express.Router();

// Rota para obter todos os pets 

router.get('/pets', (req, res) => {
    res.json(pets);
});

// Rota para obter um pet específico por ID 
router.get('/pets/:id', async (req, res) => {
    const { id } = req.params.id;
    const pet = await pets.find(p => p.id === id);
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

    await pets.push(newPet);
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

    const petIndex = await pets.findIndex(p => p.id === id);
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

    pets[petIndex] = updatedPet;
    res.json(updatedPet);
});

// Rota para deletar um pet pelo id
router.delete('/pets/:id', async (req, res) => {
    const  id  = req.params.id;
    const petIndex = pets.findIndex(p => p.id === id);
    if (petIndex === -1) {
        return res.status(404).json({ message: 'Pet não encontrado' });
    }

    const deletedPet = await pets.splice(petIndex, 1);
    res.json(deletedPet[0]);
});

// 404 handler
router.use((req, res, next) => {
    res.status(404).json({ message: 'Content not found!' });
});

// Error handler
router.use((err, req, res, next) => {
    // console.error(err.stack);
    if (err instanceof HTTPError) {
        res.status(err.code).json({ message: err.message });
    } else {
        res.status(500).json({ message: 'Something broke!' });
    }
});

export default router;