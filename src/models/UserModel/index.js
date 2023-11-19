const handlerErrors = require("../../core/errors/handlerErrors");
const prisma = require("../../database/connect");

class UserModel {
  async disableUser(id) {
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

  async updateUser(id, data = {}) {
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

  async findOne(id) {
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

  async createUser({ username, email, password }) {
    try {
      const register = await prisma.user.create({
        data: {
          username,
          email,
          password,
          active: true,
        },
        select: { email: true },
      });

      return register.email;
    } catch (err) {
      handlerErrors(err);
      throw new Error(`Usuário não encontrado!`);
    }
  }
}

module.exports = new UserModel();
