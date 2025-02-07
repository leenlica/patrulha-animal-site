import bcrypt from 'bcrypt';
import prisma from '../database/database.js';

const saltRounds = Number(process.env.BCRYPT_SALT);

async function create(nome, email, password, imagePath = null) {
    if (!nome || !email || !password) {
        throw new Error('Missing required fields');
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const createdUser = await prisma.user.create({
        data: {
            nome,
            email,
            password: hash,
            imagem: imagePath ? { create: { path: imagePath } } : null,
        },

    });

    return createdUser;
}


// Busca um usuário no banco de dados usando o ID fornecido.
async function readById(userId) {
    if (!userId) {
        throw new Error('O ID do usuário é obrigatório.');
    }

    const user = await prisma.user.findUnique({
        where: { id_usuario: userId }, 
        select: {
            id_usuario: true,
            nome: true,
            email: true,
            image: {
                select: {
                    path: true
                }
            }  
        },
    });

    if (!user) {
        throw new Error('Usuário não encontrado.');
    }
    return user;
}


// Retorna uma lista de usuários com informações básicas (ID, nome e e-mail).
async function read() {
    return await prisma.user.findMany({
        select: {
            id_usuario: true,
            nome: true,
            email: true,
            image: {
                select: {
                    path: true
                }
            }  
        },
    });
}

// Atualizar as informações de um usuário existente.
async function update(id, { nome, email, password }) {
    if (!id) {
        throw new Error('O ID do usuário é obrigatório.');
    }

    const dataToUpdate = {};

    if (nome) dataToUpdate.nome = nome; 
    if (email) dataToUpdate.email = email;

    if (password) {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        dataToUpdate.password = hashedPassword;
    }

    const user = await prisma.user.update({
        where: { id },
        data: dataToUpdate,
    });

    return { id: user.id, nome: user.nome, email: user.email };
}

// Remover um usuário do banco de dados.
async function remove(id) {
    if (!id) {
        throw new Error('O ID do usuário é obrigatório.');
    }

    const user = await prisma.user.delete({
        where: { id },
    });

    return !!user;
}

// Autenticar um usuário com base no e-mail e na senha fornecidos.
async function authenticate(email, password) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('E-mail ou senha inválida.');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('E-mail ou senha inválida.');
    }

    return { id: user.id, nome: user.nome, email: user.email }; 
}

export default { create, readById, read, update, remove, authenticate };
