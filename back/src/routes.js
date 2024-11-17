import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import prisma from './database/database.js';

import { isAuthenticated } from './middleware/auth.js';

import Pets from './models/Pets.js';
import curtida from './models/curtida.js'; 
import User from './models/User.js';

class HTTPError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

const router = express.Router();


//rota para criar user
router.post('/users', async (req, res) => {
    try {
        const { nome, email, password, confirmationPassword } = req.body;

        if (password !== confirmationPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        const newUser = await User.create(nome, email, password);

        delete newUser.password; 
        res.status(201).json(newUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Unable to create user' });
    }
});

// Rota de login
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Requisição de login recebida:', { email });

        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        if (!user) {
            console.log('Usuário não encontrado');
            return res.status(401).json({ auth: false, message: 'User not found' });
        }

        console.log('Usuário encontrado:', user);

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            console.log('Senha inválida');
            return res.status(401).json({ auth: false, message: 'Invalid password' });
        }

        console.log('Senha validada com sucesso');

        // Gerar um token JWT
        const token = jwt.sign(
            { userId: user.id_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Token gerado com sucesso');

        return res.json({ auth: true, token });
    } catch (error) {
        console.error('Erro durante o login:', error);
        res.status(500).json({ auth: false, message: 'Internal server error' });
    }
});

router.get('/users/me',  isAuthenticated, async (req, res) => {
    try {
        const userId = req.userId;

        const user = await User.readById(userId);

        delete user.password;

        return res.json(user);
    } catch (error) {
        throw new HTTPError('Unable to find user', 400);
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
router.put('/users/:id', isAuthenticated, async (req, res) => {
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
router.delete('/users/:id', isAuthenticated, async (req, res) => {
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
router.get('/pets/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params.id;
    const pet = await Pets.find(p => p.id === id);
    if (!pet) {
        return res.status(404).json({ message: 'Pet não encontrado' });
    }
    res.json(pet);
});

// Rota para adicionar um novo pet 
router.post('/pets', isAuthenticated, async (req, res) => {
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
router.put('/pets/:id', isAuthenticated, async (req, res) => {
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
router.delete('/pets/:id', isAuthenticated, async (req, res) => {
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

    if (!pet_id || !usuario_id) {
        return res.status(400).json({ error: 'Pet ID e Usuario ID são obrigatórios' });
    }

    try {
        const curtidaId = await curtida.create(pet_id, usuario_id);

        return res.status(201).json({ id_curtida: curtidaId });
    } catch (error) {
        console.error('Erro ao adicionar curtida:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
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