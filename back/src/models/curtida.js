import prisma from '../database/database.js';

async function create(pet_id, usuario_id) {
    const data = {
        pet: { connect: { id: pet_id } },
        data_curtida: new Date()
    };

    if (usuario_id) {
        data.user = { connect: { id_usuario: usuario_id } };
    }

    const result = await prisma.curtida.create({
        data
    });

    return result.id_curtida;
}


export default { create };