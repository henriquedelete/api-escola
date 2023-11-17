const handlerErrors = require("../core/errors/handlerErrors");
const prisma = require("../database/connect");

async function disableUser(id) {
  try {
    const user = await prisma.user.update({
      data: { active: false },
      select: { email: true },
      where: { id },
    });
    return user;
  } catch (err) {
    handlerErrors(err);
  }
}

module.exports = disableUser;
