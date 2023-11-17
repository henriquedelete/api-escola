const { decode } = require("jsonwebtoken");

module.exports = (token) => {
  try {
    return decode(token);
  } catch (e) {
    return null;
  }
};
