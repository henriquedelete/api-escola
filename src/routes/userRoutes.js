const { Router } = require("express");
const UserController = require("../controllers/UserController");
const verifyTokenUsers = require("../middlewares/verifyTokenUsers");
const loginRequired = require("../middlewares/loginRequired");

const r = new Router();

r.get("/", verifyTokenUsers, UserController.findMe);
r.post("/new", UserController.store);

r.post("/login", UserController.entry);

module.exports = r;
