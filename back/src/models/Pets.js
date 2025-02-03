import prisma from '../database/database.js';

// create
async function create({ name, imagem, age, description, species, user_id }) {
    try {
        console.log('Dados recebidos para criação:', { name, imagem, age, description, species, user_id });
        if (!age || !description || !species) {
            throw new Error('Os campos age, description e species são obrigatórios.');
        }

        const pet = await prisma.pets.create({
            data: {
                name: name || null,
                imagem: imagem || null,
                age: age,
                description: description,
                species: species,
                user_id: user_id
            },
        });

        return await readById(pet.id);
    } catch (error) {
        console.error('Erro ao criar pet:', error);
        throw new Error('Erro ao adicionar pet.'); 
    }
}

// update
async function update(id, imagem, name, age, description, species) {
    if (id && name && imagem && age && description && species) {
        const pet = await prisma.pets.update({
            where: { id: id },
            data: {
                name: name,
                imagem: imagem,
                age: age,
                description: description,
                species: species
            }
        });

        return pet;
    } else {
        throw new Error('Unable to update pet');
    }
}

// readById
async function readById(id) {
    if (id) {
        const pet = await prisma.pets.findUnique({
            where: { id: id }
        });

        if (pet) {
            return pet;
        } else {
            throw new Error('Pet not found');
        }
    } else {
        throw new Error('Unable to find pet');
    }
}

// read
async function read(field, id) {
    if (field && id) {
        const pets = await prisma.pets.findMany({
            where: { [field]: id },
            select: {
                name: true,
                imagem: true,
                id: true,
                species: true,
                description: true
            }
        });

        return pets;
    }

    const pets = await prisma.pets.findMany({
        select: {
            name: true,
            imagem: true,
            id: true,
            species: true,
            description: true,
        }
    });

    return pets;
}

// remove
async function remove(id) {
    if (id) {
        const pet = await prisma.pets.delete({
            where: { id: id }
        });

        return !!pet;
    } else {
        throw new Error('Pet not found');
    }
}

export default { create, update, readById, read, remove };
