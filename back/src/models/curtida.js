import prisma from '../database/database.js';

async function create(pet_id, usuario_id) {
    const result = await prisma.curtida.create({
        data: {
            pet_id: pet_id,
            usuario_id: usuario_id || null
        }
    });

    return result.id_curtida;
}

export default { create };