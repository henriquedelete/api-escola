const { compareSync } = require("bcrypt");
const prisma = require("../database/connect");
const signToken = require("./signToken");

async function userSignToken(email, password) {
  const verifyUser = await prisma.user.findUnique({ where: { email } });
  const comparePasswords = compareSync(password, verifyUser.password);
  if (comparePasswords === true) {
    return signToken({ email, id: verifyUser.id });
  } else {
    throw new Error(
      `A senha, ou o email está errados. tente novamente mais tarde.`
    );
  }
}

module.exports = userSignToken;
