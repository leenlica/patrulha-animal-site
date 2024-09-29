import prisma from '../database/database.js';

// create
async function create({ name, imagem, age, description, species }) {
    if (age && description && species) {
        const pet = await prisma.pets.create({
            data: {
                name: name || null,
                imagem: imagem || null,
                age: age,
                description: description,
                species: species
            }
        });

        return await readById(pet.id);
    } else {
        throw new Error('Unable to create pet');
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
            description: true
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
