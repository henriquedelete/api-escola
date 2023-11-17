require("dotenv").config();
const { sign } = require("jsonwebtoken");
const handlerErrors = require("../core/errors/handlerErrors");
const isEmail = require("validator/lib/isEmail");

const getSecret = () => {
  const secret = process.env.STRING_JWT_SECRET;
  if (!secret) {
    const errorMessage =
      "middlewares/signToken.js | Problemas na leitura do dotenv! process.env.STRING_JWT_SECRET não definido";
    handlerErrors(new Error(errorMessage));
    throw new Error("Não foi possível obter o segredo para assinar o token.");
  }
  return secret;
};

module.exports = (payload = { email: "", id: "" }) => {
  try {
    if (isEmail(payload.email) && payload.id) {
      return sign(payload, getSecret(), { expiresIn: "1h" });
    } else {
      const errorMessage =
        "Email passado para gerar o token é inválido ou o ID está ausente.";
      handlerErrors(new Error(errorMessage));
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = `middlewares/signToken.js | Erro ao criar o token: ${error.message}`;
    handlerErrors(new Error(errorMessage));
    return "Ocorreu um erro, tente novamente mais tarde!";
  }
};
