const { basename, resolve } = require("path");

console.log(basename(__filename, __dirname));
console.log(__dirname);

// pegar o nome do arquivo, pra mim add no log de erros... acho que vai ser uma boa.

/**
 * [Data yyyy-mm-dd] horas:minutos | nome do arquivo
 *  -> error.message \n
 *
 */
