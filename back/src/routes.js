import express from 'express';
import  Pets from './models/Pets.js';
import curtida from './models/curtida.js'; 
import User from './models/User.js';

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const router = express.Router();

//rota para criar
router.post('/users', async (req, res) => {
    try {
        const { nome, email, password } = req.body;
        const user = await User.create(nome, email, password);
        return res.status(201).json(user);
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(400).json({ error: error.message });
    }
});

// Rota para obter todos os usuários
router.get('/users', async (req, res) => {
    try {
        const users = await User.read();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        return res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
});

// Rota para atualizar informações de um usuário existente pelo ID
router.put('/users/:id', async (req, res) => {
    try {
        const user = req.body;
        const { id } = req.params;

        delete user.password;

        const updatedUser = await User.update({ ...user, id });

        delete updatedUser.password;

        return res.json(updatedUser);
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        throw new HTTPError('Unable to update user', 400);
    }
});
// Rota para deletar um usuário pelo ID
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (await User.remove(id)) {
            return res.sendStatus(204);
        } else {
            throw new Error();
        }
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        throw new HTTPError('Unable to remove user', 400);
    }
});


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
    const { name, imagem, age, description, species } = req.body;

    try {
        const newPet = await Pets.create({ name, imagem, age, description, species });
        res.status(201).json(newPet);
    } catch (error) {
        console.error('Erro ao adicionar pet:', error);
        res.status(500).json({ error: 'Erro ao adicionar pet.' });
    }
});

// Rota para atualizar um pet existente pelo id
router.put('/pets/:id', async (req, res) => {
    const  id = req.params.id;
    const {
        name,
        imagem,
        species,
        age,
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
        age,
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