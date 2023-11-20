const { Router } = require("express");
const UserController = require("../controllers/UserController");
const loginRequired = require("../middlewares/loginRequired");

const r = new Router();

r.get("/", UserController.findMe);

r.post("/new", UserController.store);
r.post("/login", UserController.entry);

r.put("/desable", UserController.desable);
r.put("/modify", UserController.modify);

r.get("/health", loginRequired, UserController.health);

module.exports = r;
