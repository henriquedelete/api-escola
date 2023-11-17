const express = require("express");
const userRoutes = require("../src/routes/userRoutes");
const cors = require("cors");
const optionsCors = require("./config/optionsCors");

class App {
  constructor() {
    this.app = express();
    this.cors();
    this.middlewares();
    this.routes();
  }
  cors() {
    this.app.use(cors(optionsCors));
  }
  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }
  routes() {
    this.app.use("/user", userRoutes);
  }
}

module.exports = new App().app;
