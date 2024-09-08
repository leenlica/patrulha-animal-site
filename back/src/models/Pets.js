import Database from '../database/database.js';

//create

async function create({ name, imagem, age, description, species }) {
    const db = await Database.connect();

    if (age && description && species) {
        const sql = `
            INSERT INTO
                pets (name, imagem, age, description, species)
            VALUES (?, ?, ?, ?, ?)
        `;

        const { lastID } = await db.run(sql, [name || null, imagem || null, age, description, species]);

        return await readById(lastID);
    } else {
        throw new Error('Unable to create pet'); 
    }
}


//update

async function update(id, imagem, name, age, description, species) {
    const db = await Database.connect();

    if (id && name && imagem && age && description && species) {
        const sql = `
            UPDATE
                pets
            SET
                name = ?, imagem = ?, age = ?, description = ?, species = ?
            WHERE
                id = ?
        `;

        const { changes } = await db.run(sql, [name, imagem, age, description, species, id]);

        if (changes === 1) {
            return readById(id);
        } else {
            throw new Error('Pet not found');
        }
    } else {
        throw new Error('Unable to update pet');
    }
}

//readById
async function readById(id) {
    const db = await Database.connect();

    if (id) {
        const sql = `
         SELECT * FROM pets WHERE id = ? `;

        const pet = await db.get(sql, [id]);

        if (pet) {
            return pet;
        } else {
            throw new Error('Pet not found');
        }
    } else {
        throw new Error('Unable to find pet');
    }
}

//READ

async function read(field, id) {
    const db = await Database.connect();

    if (field && id) {
        const sql = `
      SELECT
          name, imagem, id, species, description
        FROM
          pets
        WHERE
          ${field} = '?'
      `;

        const pets = await db.all(sql, [id]);

        return pets;
    }

    const sql = `
    SELECT
      name, imagem, id, species, description
    FROM
      pets
  `;

    const pets = await db.all(sql);

    return pets;
}

// REMOVE 
async function remove(id) {
    const db = await Database.connect();

    if (id) {
        const sql = `
      DELETE FROM
        pets
      WHERE
        id = ?
    `;

        const { changes } = await db.run(sql, [id]);

        if (changes === 1) {
            return true;
        } else {
            throw new Error('pet not found');
        }
    } else {
        throw new Error('pet not found');
    }
}

export default { create, update, readById, read, remove, };
