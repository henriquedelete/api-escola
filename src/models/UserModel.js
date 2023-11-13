const prisma = require("../database/connect");

class EmailExistsError extends Error {
  constructor(message) {
    super(message);
    this.name = "EmailExistsError";
  }
}

class UserModel {
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
    } catch (error) {
      if (error.code === "P2002" && error.meta.target.includes("email")) {
        throw new EmailExistsError("Email já existe, tente outro.");
      } else {
        throw error;
      }
    }
  }
}

module.exports = {
  UserModel,
  EmailExistsError,
};
