import Database from '../database/database.js';

//create

async function create({ name, age, description, species }) {
    const db = await Database.connect();

    if (age && description && species) {
        const sql = `
            INSERT INTO
                pets (name, age, description, species)
            VALUES (?, ?, ?, ?)
        `;

        const { lastID } = await db.run(sql, [name || null, age, description, species]);

        return await readById(lastID);
    } else {
        throw new Error('Unable to create pet'); 
    }
}


//update

async function update(id, name, age, description, species) {
    const db = await Database.connect();

    if (id && nome && idade && condicao_fisica && especie) {
        const sql = `
            UPDATE
                pets
            SET
                name = ?, age = ?, description = ?, species = ?
            WHERE
                id = ?
        `;

        const { changes } = await db.run(sql, [name, age, description, species, id]);

        if (changes === 1) {
            return readById(id);
        } else {
            throw new Error('Pet not found');
        }
    } else {
        throw new Error('Unable to update pet');
    }
}

async function readById(id) {
    const db = await Database.connect();

    const sql = `
        SELECT * FROM pets WHERE id = ?
    `;

    try {
        const pet = await db.get(sql, [id]);
        if (pet) {
            console.log('Pet encontrado:', pet);
            return pet;
        } else {
            throw new Error('Pet not found');
        }
    } catch (error) {
        console.error('Erro ao ler o pet:', error);
        throw error;
    }
}


export default { create, update, readById };
