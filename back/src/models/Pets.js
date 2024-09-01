import Database from '../database/database.js';

//create

async function create({ nome, idade, condicao_fisica, especie}) {
    const db = await Database.connect();

    if (nome && idade && condicao_fisica && especie){
        const sql = `
            INSERT INTO
                pets (nome, age, condicao_fisica, especie)
            Values (?, ?)
        `;

        const { lastID } = await db.run(sql, [nome, idade, condicao_fisica, especie]);

        return await readById(lastID);
    } else {
        throw new Error('Unable to create investment');
    }
}



//update

async function update(id, nome, idade, condicao_fisica, especie) { 
    const db = await Database.connect();

    if (nome && idade && condicao_fisica && especie && id) {
        const sql = `
            UPDATE
                pets
            SET
            nome = ?, idade = ?, condicao_fisica = ?, especie = ?,
                
        `;
        const { changes } = await db.run(sql, [nome, idade, condicao_fisica, especie, id]);
        if (changes === 1) {
            return readById(id);
        } else {
            throw new Error('Pet not found');
        }
    } else {
        throw new Error('Unable to update pet');
    }
}



export default { create, update };
