const validateUserDataValues = require("../services/validateUserDataValues.js");
const UserModel = require("../models/UserModel/index.js");
const { default: isEmail } = require("validator/lib/isEmail.js");
const userSignToken = require("../services/userSignToken.js");
const handlerErrors = require("../core/errors/handlerErrors.js");
const verifyToken = require("../services/verifyToken.js");

class UserController {
  async findMe(req, res) {
    try {
      const token = req.headers.authorization;
      const myProfile = verifyToken(token).id;
      const response = await UserModel.findOne(myProfile);
      return res.status(200).json(response);
    } catch (err) {
      handlerErrors(err);
      return res.status(404).json({ err: err.message });
    }
  }

  async store(req, res) {
    try {
      const { username, email, password } = req.body;

      const valide = validateUserDataValues({
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

  async modify(req, res) {
    try {
      const token = req.headers.authorization;

      let { username, email, password } = req.body;
      let modifyDataUser = UserModel.updateUser(token, {
        username,
        email,
        password,
      });
      return res.status(200).json({ modifyDataUser });
    } catch (err) {
      handlerErrors(err);
      return res
        .status(403)
        .json({ err: `Erro ao modificar seus dados. vamos tentar novamente!` });
    }
  }

  async desable(req, res) {
    try {
      const token = req.headers.authorization;
      const register = verifyToken(token);
      if (!register.id) {
        return res.status(401).json({ err: `Problemas no token!` });
      }
      let desableUser = await UserModel.disableUser(register.id);
      return res.status(200).json({ desableUser });
    } catch (err) {
      handlerErrors(err);
      return res.status(403).json({ err: `Erro ao desabilitar sua conta` });
    }
  }

  async entry(req, res) {
    try {
      const { email, password } = req.body;

      if (!isEmail(email)) {
        throw new Error(`Email, invalido.`);
      }
      const regex = /^[a-zA-Z0-9]{5,50}$/;

      if (!regex.test(password)) {
        throw new Error(`Senha, precisa ter entre 5 a 50 caracteres!`);
      }

      let genToken = await userSignToken(email, password);

      return res.json({ genToken });
    } catch (err) {
      console.log(err);
      return res
        .status(401)
        .json({ err: `Não encontrei seu Email, precisa se cadastrar!` });
    }
  }

  health(req, res) {
    return res.status(200).send();
  }
}

module.exports = new UserController();
