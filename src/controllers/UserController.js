const validateData = require("../services/validateData");
const { EmailExistsError, UserModel } = require("../models/UserModel.js");

class UserController {
  index(req, res) {
    return res.status(200).send(`Index`);
  }

  async store(req, res) {
    try {
      const { username, email, password } = req.body;
      const register = await new UserModel().createUser({
        username,
        email,
        password,
      });
      res.status(201).json({ success: true, email: register });
    } catch (error) {
      if (error instanceof EmailExistsError) {
        res.status(400).json({ error: error.message });
      } else {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar usuário." });
      }
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
