require("dotenv").config();
const { verify } = require("jsonwebtoken");
const handlerErrors = require("../core/errors/handlerErrors");

const getSecret = process.env.STRING_JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const verification = verify(req.headers.authorization.token, getSecret(), {
      complete: true,
      data: verification.payload,
    });
    console.log(verification.payload);

    req.headers.authorization = { auth: true, verification };
    next();
  } catch (err) {
    handlerErrors(err);
    return res
      .status(400)
      .json({ err: "Erro ao processar a sua requisição, tente mais tarde." });
  }
};
