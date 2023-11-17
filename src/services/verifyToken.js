require("dotenv").config();
const { verify } = require("jsonwebtoken");
const handlerErrors = require("../core/errors/handlerErrors");

const getSecret = () => {
  if (process.env.STRING_JWT_SECRET) {
    return `${process.env.STRING_JWT_SECRET}`;
  } else {
    const errorMessage = `middlewares/verifyToken.js | Problemas na leitura do dotenv!  process.env.STRING_JWT_SECRET => ${process.env.STRING_JWT_SECRET}`;
    handlerErrors(new Error(errorMessage));
    return null;
  }
};

function verifyToken(token) {
  try {
    const verificado = verify(token, getSecret(), { complete: true });
    return verificado.payload;
  } catch (err) {
    handlerErrors(err);
    return null;
  }
}
module.exports = verifyToken;
