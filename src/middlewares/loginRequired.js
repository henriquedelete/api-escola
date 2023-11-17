const { default: isEmail } = require("validator/lib/isEmail");
const prisma = require("../database/connect");
const { compare } = require("bcrypt");
const signToken = require("../services/signToken");

module.exports = async (req, res, next) => {
  next();
};
