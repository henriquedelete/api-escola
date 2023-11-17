const handlerErrors = require("../core/errors/handlerErrors");
const prisma = require("../database/connect");

async function updateUser(id, data = {}) {
  try {
    const user = await prisma.user.update({
      data: data,
      select: { email: true },
      where: { id },
    });
    return user;
  } catch (err) {
    handlerErrors(err);
    throw new Error(`Erro, ao modificar seus dados! x-x`);
  }
}

module.exports = updateUser;
