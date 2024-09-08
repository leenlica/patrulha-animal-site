import Database from '../database/database.js';

async function create(pet_id, usuario_id) {
    const db = await Database.connect();

    const sql = `
        INSERT INTO curtidas (pet_id, usuario_id)
        VALUES (?, ?)
    `;

    const result = await db.run(sql, [pet_id, usuario_id || null]);

    return result.lastID;
}

export default { create}