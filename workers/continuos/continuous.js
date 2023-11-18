const { parentPort } = require("worker_threads");

function continuousOperation() {
  console.log(`Executando!`);
}

continuousOperation();

parentPort.on("message", (msg) => {
  console.log(`msg dentro do worker => ${msg}`);
});
