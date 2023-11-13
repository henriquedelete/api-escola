const validateData = require("../services/validateData");
const UserModel = require("../models/UserModel.js");
const { EmailExistsError } = require("../core/errors/UserModelErros.js");

class UserController {
  index(req, res) {
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

  findAll(req, res) {
    return res.status(200).send(`findAll`);
  }
}

module.exports = new UserController();
