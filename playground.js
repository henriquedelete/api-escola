const validator = require("validator");

const testString = "s";

if (validator.isEmpty(testString)) {
  console.log("A string está vazia ou contém apenas espaços em branco.");
} else {
  console.log("A string contém caracteres.");
}
