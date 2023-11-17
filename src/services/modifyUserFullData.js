const { hash } = require("bcrypt");
const prisma = require("../database/connect");
const verifyToken = require("./verifyToken");
const validateUserDataValues = require("./validateUserDataValues");
const handlerErrors = require("../core/errors/handlerErrors");

async function modifyUserFullData(token, data = {}) {
  try {
    const id = verifyToken(token).id;
    if (data.username || data.password || data.email) {
      const validation = validateUserDataValues({ data });
      if (id) {
        prisma.user.update({
          data: validation,
          select: { username: true, email: true },
          where: { id: id },
        });
      }
    }
  } catch (err) {
    handlerErrors(err);
  }
}

module.exports = modifyUserFullData;
