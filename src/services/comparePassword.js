const { compare } = require("bcrypt");
const handlerErrors = require("../core/errors/handlerErrors");
/**
 * Você precisa estar num contexto, em que você já tem o hash da senha. e a senha passada pelo usuário!
 * @param {string} password
 * @param {string} passwordHashed
 * @returns boolean, true. ou um erro
 * @author Carlos
 */
async function comparePasswords(password, passwordHashed) {
  try {
    const comparePassword = await compare(password, passwordHashed);
    return comparePassword;
  } catch (err) {
    handlerErrors(err);
    throw new Error(`Erro na senha, tente novamente.`);
  }
}

module.exports = comparePasswords;
