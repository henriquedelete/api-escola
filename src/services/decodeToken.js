const { decode } = require("jsonwebtoken");

function decodeToken(token) {
  try {
    return decode(token);
  } catch (e) {
    return null;
  }
}
module.exports = decodeToken;
