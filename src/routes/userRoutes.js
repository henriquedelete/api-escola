const { Router } = require("express");
const UserController = require("../controllers/UserController");

const r = new Router();

r.get("/", UserController.index);
r.post("/new", UserController.store);
r.get("/edit/:id", UserController.index);
r.get("/:desative", UserController.index);
r.get("/findAll/:token", UserController.index);

module.exports = r;
