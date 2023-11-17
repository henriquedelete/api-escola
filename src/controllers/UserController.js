const validateData = require("../services/validateData");
const UserModel = require("../models/UserModel.js");
const { default: isEmail } = require("validator/lib/isEmail.js");
const userSignToken = require("../services/userSignToken.js");

class UserController {
  findMe(req, res) {
    console.log(req.headers.authorization);
    return res.status(200).send(`Index`);
  }

  async store(req, res) {
    try {
      const { username, email, password } = req.body;

      const valide = validateData({
        username,
        email,
        password,
      });

      const register = await UserModel.createUser(valide);
      res.status(201).json({ success: true, email: register });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  modify(req, res) {
    return res.status(200).send(`modify`);
  }

  delete(req, res) {
    return res.status(200).send(`delete`);
  }

  async entry(req, res) {
    try {
      const { email, password } = req.body;

      if (!isEmail(email)) {
        throw new Error(`Email, invalido.`);
      }
      if (password.length <= 5 && password.length >= 50) {
        throw new Error(`Senha, invalido.`);
      }

      let genToken = await userSignToken(email, password);

      return res.json({ genToken });
    } catch (err) {
      return res
        .status(401)
        .json({ err: `Não encontrei seu Email, precisa se cadastrar!` });
    }
  }
}

module.exports = new UserController();
