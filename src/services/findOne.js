const handlerErrors = require("../core/errors/handlerErrors");
const prisma = require("../database/connect");

async function findOne(id) {
  try {
    const find = await prisma.user.findUnique({
      select: {
        email: true,
        username: true,
      },
      where: { id },
    });

    return find;
  } catch (err) {
    handlerErrors(err);
    throw new Error(`Usuário não encontrado!`);
  }
}

module.exports = findOne;
