const validator = require("validator");
const { genSaltSync, hashSync } = require("bcrypt");
const { ValidationInternalErrors } = require("../core/errors/UserModelErros");

module.exports = ({ username, email, password }) => {
  try {
    function validEmail() {
      if (validator.isEmail(email)) {
        return `${email}`;
      } else {
        throw new Error(`Email inválido!`);
      }
    }

    function validPasswordLength() {
      const regex = /^.{5,100}$/;

      if (validator.isEmpty(password)) {
        throw new Error(
          "A senha está vazia ou contém apenas espaços em branco."
        );
      }

      if (regex.test(password)) {
        const salt = genSaltSync(8);
        const hashed = hashSync(password, salt);
        return hashed;
      } else {
        throw new Error(`A senha precisa ter entre 5 e 100 caracteres!`);
      }
    }

    function validName() {
      const regex = /^.{3,50}$/;
      if (regex.test(username)) {
        return `${username}`;
      } else {
        throw new Error(`O nome precisa ter entre 3 e 50 caracteres!`);
      }
    }

    return {
      username: validName(),
      email: validEmail(),
      password: validPasswordLength(),
    };
  } catch (err) {
    throw new ValidationInternalErrors(err.message);
  }
};
