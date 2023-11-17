require("dotenv").config();
const { verify } = require("jsonwebtoken");
const handlerErrors = require("../core/errors/handlerErrors");

const getSecret = () => {
  if (process.env.STRING_JWT_SECRET) {
    return `${process.env.STRING_JWT_SECRET}`;
  } else {
    const errorMessage = `middlewares/verifyTokenUsers.js | Problemas na leitura do dotenv!  process.env.STRING_JWT_SECRET => ${process.env.STRING_JWT_SECRET}`;
    handlerErrors(new Error(errorMessage));
    return null;
  }
};

module.exports = (req, res, next) => {
  try {
    const verification = verify(req.headers.authorization.token, getSecret(), {
      complete: true,
      data: verification.payload,
    });

    req.headers.authorization = { auth: true, verification };
    next();
  } catch (err) {
    handlerErrors(err);
    return res
      .status(400)
      .json({ err: "Erro ao processar a sua requisição, tente mais tarde." });
  }
};
