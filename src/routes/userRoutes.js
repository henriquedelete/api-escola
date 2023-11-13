const { Router } = require("express");
const UserController = require("../controllers/UserController");

const r = new Router();

r.get("/", UserController.index);

module.exports = r;
