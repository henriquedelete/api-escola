require("dotenv").config();
const { verify } = require("jsonwebtoken");
const handlerErrors = require("../core/errors/handlerErrors");

const secret = process.env.STRING_JWT_SECRET;

module.exports = (req, res, next) => {
  try {
    const token = req.headers["authtoken"];
    if (!token) {
      return res
        .status(400)
        .json({ err: "Erro ao processar a sua requisição..." });
    }
    const verification = verify(token, secret, {
      complete: true,
    });

    req.userData = {
      id: verification.payload.id,
      email: verification.payload.email,
    };

    next();
  } catch (err) {
    handlerErrors(err);
    return res
      .status(400)
      .json({ err: "Erro ao processar a sua requisição, tente mais tarde." });
  }
};
