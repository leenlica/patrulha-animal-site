import prisma from '../database/database.js';

async function changeUserImage(imagePath, userId) {
    return await prisma.user.update({
      where: {
        id_usuario: userId
      },
      data: {
        imagem: imagePath
      }
    })
}

export default { changeUserImage };